'use client';

import { Trophy, GitCommit, Code, Cloud, GraduationCap, Star, Zap, Target, Medal } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  earned: boolean;
  progress?: number;
}

export default function AchievementBadges() {
  const { t } = useLanguage();

  const badges: Badge[] = [
    {
      id: 'commits',
      title: '100+ Commits',
      description: 'Made over 100 commits on GitHub',
      icon: <GitCommit className="w-6 h-6" />,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      earned: true,
    },
    {
      id: 'projects',
      title: '5 Projects',
      description: 'Completed 5+ projects',
      icon: <Code className="w-6 h-6" />,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      earned: true,
    },
    {
      id: 'bangkit',
      title: 'Bangkit Graduate',
      description: 'Graduated from Bangkit Academy 2024',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-500/30',
      earned: true,
    },
    {
      id: 'cloud',
      title: 'Cloud Certified',
      description: 'Earned Google Cloud Skills badges',
      icon: <Cloud className="w-6 h-6" />,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      earned: true,
    },
    {
      id: 'ml-cert',
      title: 'ML Certified',
      description: 'Dev Certification for ML with TensorFlow',
      icon: <Medal className="w-6 h-6" />,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      earned: true,
    },
    {
      id: 'contributor',
      title: 'Open Source',
      description: 'Contributed to open source projects',
      icon: <Star className="w-6 h-6" />,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
      earned: false,
      progress: 60,
    },
    {
      id: 'streak',
      title: '30 Day Streak',
      description: 'Coded for 30 consecutive days',
      icon: <Zap className="w-6 h-6" />,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      earned: false,
      progress: 80,
    },
    {
      id: 'fullstack',
      title: 'Fullstack Pro',
      description: 'Master both frontend and backend',
      icon: <Target className="w-6 h-6" />,
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/30',
      earned: false,
      progress: 90,
    },
  ];

  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Trophy className="w-6 h-6 text-yellow-400" />
            {t('section.achievements')}
          </h2>
          <p className="text-gray-400 text-sm mt-1">{t('section.achievementsDesc')}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-teal-400">
            {earnedCount}/{badges.length}
          </div>
          <div className="text-[10px] text-gray-500 uppercase tracking-wider">{t('common.unlocked')}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {badges.map((badge) => (
          <div key={badge.id} className={`relative p-4 rounded-xl border transition-all group ${badge.earned ? `${badge.bgColor} ${badge.borderColor} hover:scale-[1.02]` : 'bg-gray-900/50 border-gray-800/50 opacity-60'}`}>
            {/* Badge Icon */}
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${badge.earned ? badge.bgColor : 'bg-gray-800/50'}`}>
              <span className={badge.earned ? badge.color : 'text-gray-600'}>{badge.icon}</span>
            </div>

            {/* Badge Info */}
            <h4 className={`text-sm font-bold ${badge.earned ? 'text-white' : 'text-gray-500'}`}>{badge.title}</h4>
            <p className="text-[10px] text-gray-500 mt-1">{badge.description}</p>

            {/* Progress bar for locked badges */}
            {!badge.earned && badge.progress && (
              <div className="mt-3">
                <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-600 rounded-full transition-all" style={{ width: `${badge.progress}%` }}></div>
                </div>
                <span className="text-[9px] text-gray-600 mt-1">
                  {badge.progress}% {t('common.complete')}
                </span>
              </div>
            )}

            {/* Earned checkmark */}
            {badge.earned && (
              <div className="absolute top-3 right-3">
                <div className={`w-5 h-5 rounded-full ${badge.bgColor} ${badge.borderColor} border flex items-center justify-center`}>
                  <svg className={`w-3 h-3 ${badge.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
