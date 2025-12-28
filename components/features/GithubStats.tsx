'use client';

import useSWR from 'swr';
import { motion } from 'framer-motion';
import { Github, Flame, Zap, Code2, GitCommit } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function GithubStats() {
  const { data, error, isLoading } = useSWR('/api/github', fetcher);

  if (isLoading) {
    return (
      <div className="w-full bg-[#0a0c10] rounded-2xl border border-gray-800/50 p-6 animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gray-800 rounded-lg"></div>
          <div className="h-6 w-32 bg-gray-800 rounded"></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-gray-800/50 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || data?.error) {
    return (
      <div className="w-full bg-red-900/10 border border-red-900/30 p-6 rounded-2xl text-center">
        <p className="text-red-400 text-sm">Unable to load GitHub data</p>
      </div>
    );
  }

  const user = data?.user;
  const stats = user?.stats;
  const weeks = user?.contributionsCollection?.contributionCalendar?.weeks || [];
  const recentWeeks = weeks.slice(-16);

  const statCards = [
    {
      label: 'Contributions',
      value: stats?.totalContributions || 0,
      sublabel: 'This Year',
      icon: GitCommit,
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-500/20',
    },
    {
      label: 'Current Streak',
      value: stats?.currentStreak || 0,
      sublabel: 'Days',
      icon: Flame,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
    },
    {
      label: 'Longest Streak',
      value: stats?.longestStreak || 0,
      sublabel: 'Days',
      icon: Zap,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
    },
    {
      label: 'Top Language',
      value: stats?.languages?.[0]?.name || 'N/A',
      sublabel: `${stats?.languages?.[0]?.percentage || 0}%`,
      icon: Code2,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
    },
  ];

  return (
    <div className="w-full bg-[#0a0c10] border border-gray-800/50 rounded-2xl p-5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/5 rounded-full blur-3xl"></div>

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-gray-800/50 rounded-lg">
            <Github className="w-5 h-5 text-gray-300" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">GitHub Activity</h3>
            <p className="text-[11px] text-gray-500">Coding contributions & stats</p>
          </div>
        </div>
        <a href={user?.url} target="_blank" className="text-[10px] font-medium text-teal-400 hover:text-teal-300 transition-colors">
          @fakhrizamaris →
        </a>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`${stat.bgColor} ${stat.borderColor} border rounded-xl p-3 transition-all hover:scale-[1.02]`}>
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-3.5 h-3.5 ${stat.color}`} />
                <span className="text-[10px] text-gray-400 uppercase tracking-wide">{stat.label}</span>
              </div>
              <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-[10px] text-gray-500">{stat.sublabel}</div>
            </div>
          );
        })}
      </div>

      {/* Languages */}
      <div className="mb-4">
        <h4 className="text-[10px] text-gray-500 uppercase tracking-wider mb-3">Top Languages</h4>
        <div className="space-y-2">
          {stats?.languages?.slice(0, 4).map((lang: any, idx: number) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color || '#6b7280' }}></div>
              <span className="text-xs text-gray-300 flex-1">{lang.name}</span>
              <span className="text-[10px] text-gray-500">{lang.percentage}%</span>
              <div className="w-16 h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${lang.percentage}%` }} transition={{ duration: 0.8, delay: idx * 0.1 }} className="h-full rounded-full" style={{ backgroundColor: lang.color || '#6b7280' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contribution Graph */}
      <div>
        <h4 className="text-[10px] text-gray-500 uppercase tracking-wider mb-3">Recent Activity</h4>
        <div className="flex gap-[2px] overflow-x-auto pb-1">
          {recentWeeks.map((week: any, wIdx: number) => (
            <div key={wIdx} className="flex flex-col gap-[2px]">
              {week.contributionDays.map((day: any, dIdx: number) => {
                let intensity = 'bg-gray-800/50';
                if (day.contributionCount > 0) intensity = 'bg-teal-900/50';
                if (day.contributionCount > 2) intensity = 'bg-teal-700/60';
                if (day.contributionCount > 5) intensity = 'bg-teal-500';
                if (day.contributionCount > 10) intensity = 'bg-teal-400';

                return <div key={dIdx} className={`w-2.5 h-2.5 rounded-[2px] ${intensity} hover:ring-1 hover:ring-teal-400/50 transition-all`} title={`${day.date}: ${day.contributionCount} contributions`} />;
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
