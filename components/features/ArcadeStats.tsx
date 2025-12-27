'use client';
import useSWR from 'swr';
import Image from 'next/image';

// Fungsi fetcher sederhana untuk SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ArcadeStats() {
  // Memanggil API route kita sendiri
  const { data, error, isLoading } = useSWR('/api/arcade', fetcher);

  // State: Loading
  if (isLoading) {
    return (
      <div className="w-full h-64 bg-[#111] rounded-xl border border-gray-800 flex items-center justify-center animate-pulse">
        <p className="text-gray-500 font-mono text-sm">Synchronizing with Google Cloud...</p>
      </div>
    );
  }

  // State: Error
  if (error || data?.error) {
    return <div className="w-full p-6 bg-red-900/20 border border-red-800 rounded-xl text-red-200 text-sm text-center">Gagal memuat data Arcade. Pastikan profil kamu publik.</div>;
  }

  const { stats, badges } = data;

  return (
    <div className="col-span-1 w-full bg-[#0a0a0a] border border-gray-800 rounded-3xl p-6 md:p-8 overflow-hidden relative group h-full flex flex-col">
      {/* Background Glow */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -z-10 group-hover:bg-blue-600/20 transition-all duration-700"></div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-900/20 rounded-lg text-blue-400">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Google Arcade</h2>
          </div>
          <p className="text-sm text-gray-400">Mastering Cloud with hands-on labs.</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-black text-white">{stats.totalBadges}</div>
          <div className="text-[10px] uppercase tracking-wider text-blue-500 font-bold">Badges</div>
        </div>
      </div>

      {/* Badges Grid - Larger & Cleaner */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 max-h-[400px]">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {badges.map((badge: any, idx: number) => (
            <div key={idx} className="flex flex-col items-center p-4 rounded-xl bg-[#141414] border border-gray-800 hover:border-blue-500/50 hover:bg-[#1a1a1a] transition-all group/card text-center" title={badge.title}>
              <div className="relative w-24 h-24 mb-3 transition-transform duration-300 group-hover/card:scale-110">
                <Image src={badge.image} alt={badge.title} fill sizes="(max-width: 768px) 100px, 100px" className="object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
              </div>
              <p className="text-xs font-medium text-gray-300 line-clamp-2 leading-snug group-hover/card:text-white">{badge.title}</p>
              <p className="text-[10px] text-gray-600 mt-2">{badge.date}</p>
            </div>
          ))}
        </div>
      </div>

      <a href={stats.profileUrl} target="_blank" className="mt-6 block w-full text-center py-3 rounded-xl bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors text-xs font-medium">
        View Public Profile
      </a>
    </div>
  );
}
