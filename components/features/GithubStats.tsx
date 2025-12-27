'use client';

import useSWR from 'swr';
import { motion } from 'framer-motion';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function GithubStats() {
  const { data, error, isLoading } = useSWR('/api/github', fetcher);

  if (isLoading) {
    return (
      <div className="w-full h-96 bg-[#0a0a0a] rounded-3xl border border-gray-800 animate-pulse flex items-center justify-center">
        <p className="text-gray-500 font-mono">Loading GitHub Intelligence...</p>
      </div>
    );
  }

  if (error || data?.error) {
    return (
      <div className="w-full bg-red-900/10 border border-red-900/30 p-6 rounded-3xl text-center">
        <p className="text-red-400">Failed to load GitHub Data.</p>
      </div>
    );
  }

  const user = data?.user;
  const stats = user?.stats;
  const weeks = user?.contributionsCollection?.contributionCalendar?.weeks || [];

  // Ambil 3 bulan terakhir untuk grafik (sekitar 12 minggu)
  const recentWeeks = weeks.slice(-20);

  return (
    <div className="col-span-1 md:col-span-2 w-full bg-[#0a0a0a] border border-gray-800 rounded-3xl p-6 md:p-8 relative overflow-hidden group">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[100px] -z-10 group-hover:bg-green-500/10 transition-all duration-1000"></div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 98 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M48.854 0C21.839 0 0 22 0 49.217C0 71.747 14.604 90.852 34.38 96C36.883 96.402 37.817 94.965 37.817 93.758C37.817 92.677 37.804 89.813 37.751 86.819C23.57 89.888 20.613 80.009 20.613 80.009C18.349 74.312 15.116 72.809 15.116 72.809C10.491 69.664 15.485 69.752 15.485 69.752C20.638 70.137 23.364 74.962 23.364 74.962C27.91 82.695 35.32 80.528 38.204 79.206C38.649 75.922 39.957 73.713 41.385 72.484C30.076 71.187 18.064 66.864 18.064 47.702C18.064 42.193 19.997 37.7 23.159 34.253C22.68 33.003 20.916 27.859 23.636 21.056C23.636 21.056 27.876 19.722 37.524 26.241C41.569 25.107 45.892 24.551 50.187 24.562C54.492 24.551 58.835 25.107 62.869 26.241C72.497 19.722 76.717 21.056 76.717 21.056C79.468 27.859 77.714 33.003 77.205 34.253C80.407 37.7 82.32 42.193 82.32 47.702C82.32 66.924 70.301 71.166 58.914 72.396C60.678 73.916 62.241 76.906 62.241 81.52C62.241 87.971 62.148 93.354 62.148 93.758C62.148 94.925 63.09 96.425 65.652 95.895C85.509 90.871 100 71.737 100 49.217C100 22 78.141 0 48.854 0Z"
                fill="currentColor"
              />
            </svg>
            GitHub Intelligence
          </h2>
          <p className="text-gray-400 mt-2 text-sm">Real-time analysis of coding habits & contributions.</p>
        </div>
        <div className="mt-4 md:mt-0 text-right">
          <a href={user?.url} target="_blank" className="text-xs font-semibold text-white bg-[#1a1a1a] border border-gray-700 px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
            @fakhrizamaris
          </a>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Contributions (Year)', value: stats?.totalContributions, color: 'text-green-400' },
          { label: 'Current Streak', value: `${stats?.currentStreak} Days`, color: 'text-orange-400' },
          { label: 'Longest Streak', value: `${stats?.longestStreak} Days`, color: 'text-blue-400' },
          { label: 'Most Used Lang', value: stats?.languages[0]?.name || 'N/A', color: 'text-purple-400' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-[#111] border border-gray-800/50 p-4 rounded-2xl flex flex-col justify-center items-center text-center hover:border-gray-700 transition-colors">
            <span className={`text-2xl md:text-3xl font-black ${stat.color} tracking-tight`}>{stat.value}</span>
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-semibold mt-1">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Split View: Graph & Languages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Languages Progress */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4">Top Languages</h3>
          <div className="space-y-3">
            {stats?.languages.map((lang: any, idx: number) => (
              <div key={idx}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-gray-300">{lang.name}</span>
                  <span className="text-gray-500">{lang.percentage}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${lang.percentage}%` }} transition={{ duration: 1, delay: idx * 0.1 }} className="h-full rounded-full" style={{ backgroundColor: lang.color || '#ccc' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contribution Graph (Heatmap Lookalike) */}
        <div className="lg:col-span-2 bg-[#111] border border-gray-800/50 rounded-2xl p-4 overflow-x-auto custom-scrollbar">
          <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-4 sticky left-0">Contribution Activity (Last 5 Months)</h3>
          <div className="flex gap-1 min-w-max">
            {recentWeeks.map((week: any, wIdx: number) => (
              <div key={wIdx} className="flex flex-col gap-1">
                {week.contributionDays.map((day: any, dIdx: number) => {
                  let bgColor = 'bg-[#1a1a1a]';
                  if (day.contributionCount > 0) bgColor = 'bg-green-900/40';
                  if (day.contributionCount > 2) bgColor = 'bg-green-800/60';
                  if (day.contributionCount > 5) bgColor = 'bg-green-600';
                  if (day.contributionCount > 10) bgColor = 'bg-green-400';

                  return <div key={dIdx} className={`w-3.5 h-3.5 rounded-[2px] ${bgColor} hover:ring-1 hover:ring-white/50 transition-all`} title={`${day.date}: ${day.contributionCount} commits`}></div>;
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
