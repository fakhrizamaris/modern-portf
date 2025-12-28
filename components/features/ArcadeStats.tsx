'use client';
import useSWR from 'swr';
import Image from 'next/image';
import { Cloud, Trophy, ExternalLink } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ArcadeStats() {
  const { data, error, isLoading } = useSWR('/api/arcade', fetcher);

  if (isLoading) {
    return (
      <div className="w-full bg-[#0a0c10] rounded-2xl border border-gray-800/50 p-6 animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gray-800 rounded-lg"></div>
          <div className="h-6 w-32 bg-gray-800 rounded"></div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-24 bg-gray-800/50 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || data?.error) {
    return (
      <div className="w-full bg-red-900/10 border border-red-900/30 p-6 rounded-2xl text-center">
        <p className="text-red-400 text-sm">Unable to load Arcade data</p>
      </div>
    );
  }

  const { stats, badges } = data;

  return (
    <div className="w-full bg-[#0a0c10] border border-gray-800/50 rounded-2xl p-5 relative overflow-hidden flex flex-col">
      {/* Background Glow */}
      <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl"></div>

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Cloud className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Google Cloud Skills</h3>
            <p className="text-[11px] text-gray-500">Arcade badges & certifications</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-1.5">
          <Trophy className="w-4 h-4 text-blue-400" />
          <span className="text-lg font-bold text-blue-400">{stats.totalBadges}</span>
          <span className="text-[10px] text-blue-400/70">Badges</span>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="flex-1 overflow-y-auto sidebar-scroll max-h-[320px] pr-1">
        <div className="grid grid-cols-3 gap-2">
          {badges.slice(0, 9).map((badge: any, idx: number) => (
            <a
              key={idx}
              href={badge.url || stats.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl bg-[#161b22] border border-gray-800/50 hover:border-blue-500/40 hover:bg-[#1c2128] transition-all group overflow-hidden cursor-pointer"
              title={badge.title}
            >
              {/* Full-width image container */}
              <div className="relative w-full aspect-square p-2">
                <Image src={badge.image} alt={badge.title} fill sizes="120px" className="object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-transform duration-300 group-hover:scale-110" />
              </div>
              {/* Title */}
              <div className="px-2 pb-2">
                <p className="text-[9px] font-medium text-gray-500 line-clamp-1 text-center leading-tight group-hover:text-blue-300 transition-colors">{badge.title}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <a
        href={stats.profileUrl}
        target="_blank"
        className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 hover:border-blue-500/30 text-gray-400 hover:text-blue-300 transition-all text-xs font-medium"
      >
        View All Badges
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}
