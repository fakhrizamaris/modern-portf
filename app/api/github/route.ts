import { NextResponse } from 'next/server';

export async function GET() {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const USERNAME = 'fakhrizamaris';

  // This query requests repo ownership and specific language stats
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
        repositories(first: 20, orderBy: {field: UPDATED_AT, direction: DESC}, ownerAffiliations: OWNER) {
          nodes {
            name
            languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
              edges {
                size
                node {
                  name
                  color
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables: { username: USERNAME } }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API Error (HTTP):', response.status, errorText);
      // Using 200 with error object so client SWR can handle it without retry loops if permanent
      return NextResponse.json({ error: `GitHub API Error: ${response.status}`, details: errorText }, { status: response.status });
    }

    const json = await response.json();

    if (json.errors) {
      console.error('GitHub GraphQL Error:', json.errors);
      return NextResponse.json({ error: 'GitHub GraphQL Error', details: json.errors }, { status: 200 });
    }

    const user = json.data?.user;

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Process Data
    const calendar = user?.contributionsCollection?.contributionCalendar;
    const weeks = calendar?.weeks || [];

    // 1. Calculate Streaks
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    const today = new Date().toISOString().split('T')[0];
    const days = weeks.flatMap((w: any) => w.contributionDays);

    // Longest Streak Logic
    days.forEach((day: any) => {
      if (day.contributionCount > 0) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 0;
      }
    });
    longestStreak = Math.max(longestStreak, tempStreak);

    // Current Streak Logic (Iterate backwards)
    let foundEnd = false;
    for (let i = days.length - 1; i >= 0; i--) {
      const day = days[i];
      if (day.date > today) continue;

      if (day.contributionCount > 0) {
        currentStreak++;
        foundEnd = true;
      } else {
        // Allow 0 contributions ONLY on today (if user hasn't committed yet today)
        if (foundEnd) {
          if (i === days.length - 1 && day.date === today && day.contributionCount === 0) continue;
          break;
        }
      }
    }

    // 2. Calculate Languages
    const languageMap: Record<string, { size: number; color: string }> = {};
    let totalSize = 0;

    user?.repositories?.nodes?.forEach((repo: any) => {
      repo.languages?.edges?.forEach((edge: any) => {
        const { size, node } = edge;
        if (languageMap[node.name]) {
          languageMap[node.name].size += size;
        } else {
          languageMap[node.name] = { size, color: node.color };
        }
        totalSize += size;
      });
    });

    const languages = Object.entries(languageMap)
      .map(([name, data]) => ({
        name,
        color: data.color,
        percentage: totalSize > 0 ? ((data.size / totalSize) * 100).toFixed(1) : 0,
        size: data.size,
      }))
      .sort((a, b) => b.size - a.size)
      .slice(0, 5);

    return NextResponse.json({
      user: {
        ...user,
        stats: {
          totalContributions: calendar?.totalContributions,
          currentStreak,
          longestStreak,
          languages,
        },
      },
    });
  } catch (error) {
    console.error('GitHub API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 });
  }
}
