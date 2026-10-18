'use client';

import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import ProfileSidebar from '@/components/layout/ProfileSidebar';
import { useLanguage } from '@/context/LanguageContext';

// bundle-dynamic-imports: Lazy-load all tab components
// Only the active tab's code is downloaded, reducing initial bundle ~60%
const Projects = dynamic(() => import('@/components/sections/Projects'));
const Skills = dynamic(() => import('@/components/sections/Skills'));
const Certificates = dynamic(() => import('@/components/sections/Certificates'));
const LearningTimeline = dynamic(() => import('@/components/sections/LearningTimeline'));
const HireMeSection = dynamic(() => import('@/components/sections/HireMeSection'));

// Overview widget — lazy-loaded since it fetches external API
const GithubStats = dynamic(() => import('@/components/features/GithubStats'));

// rendering-hoist-jsx: Static data hoisted to module scope (not recreated per render)
const techStack = [
  // iOS
  { name: 'Swift', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg' },
  { name: 'SwiftUI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg' },
  { name: 'ARKit', icon: 'https://cdn.simpleicons.org/arkit/FFFFFF' },
  { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg' },
  // ML & Backend
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
  { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  // Web & Cloud
  { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', invert: true },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'GCP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
];

// async-suspense-boundaries: Skeleton fallback for data-fetching widgets
function WidgetSkeleton() {
  return (
    <div className="w-full bg-[#0a0c10] rounded-2xl border border-gray-800/50 p-6 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gray-800 rounded-lg"></div>
        <div className="h-5 w-28 bg-gray-800 rounded"></div>
      </div>
      <div className="space-y-3">
        <div className="h-16 bg-gray-800/50 rounded-xl"></div>
        <div className="h-12 bg-gray-800/50 rounded-xl"></div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] flex flex-col md:flex-row font-sans">
      {/* Sidebar Navigation */}
      <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[100vw] overflow-x-hidden md:overflow-y-auto h-auto md:h-screen">
        <div className="max-w-6xl mx-auto p-4 md:p-8 lg:p-12 space-y-8">
          {/* Mobile Header Text (Visible only on mobile if needed, but Sidebar covers it) */}

          {/* Content Rendering */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* README.md Style Intro */}
              <div className="border border-gray-800 rounded-md bg-[#0d1117]">
                <div className="bg-[#161b22] px-4 py-2 border-b border-gray-800 text-xs font-mono text-gray-400 flex items-center gap-2">
                  <span>fakhrizamaris</span> / <span>README.md</span>
                </div>
                <div className="p-6 md:p-10 prose prose-invert max-w-none">
                  <h1 className="text-3xl border-b border-gray-800 pb-2 mb-6">{t('readme.greeting')}</h1>

                  <h3 className="text-xl text-teal-400 mt-4 mb-2">{t('readme.aboutTitle')}</h3>
                  <p className="text-gray-300 leading-relaxed">{t('readme.aboutContent')}</p>
                  <p className="text-gray-300 leading-relaxed mt-3">{t('readme.aboutContent2')}</p>

                  <h3 className="text-xl text-teal-400 mt-6 mb-2">{t('readme.certTitle')}</h3>
                  <ul className="list-none text-gray-400 space-y-2 pl-0">
                    <li>
                      <b className="text-white">Apple Developer Academy @ Infinite Learning Batam</b> - 2026 Cohort
                    </li>
                    <li>
                      🏅 <b className="text-white">BNSP</b> - Membuat Sistem Informasi Pariwisata Berbasis Website (2025)
                    </li>
                    <li>
                      🤖 <b className="text-white">Dev Certified</b> for Machine Learning with TensorFlow (DCML), dev.id (2025)
                    </li>
                    <li>
                      🎓 <b className="text-white">Bangkit Academy 2024 Batch 2</b> - Machine Learning Path, MSIB Batch 7
                    </li>
                    <li>
                      📜 <b className="text-white">Celerates Indonesia</b> - Data Science Basics, MSIB Batch 6 (2024)
                    </li>
                  </ul>

                  <h3 className="text-xl text-teal-400 mt-6 mb-2">{t('readme.focusTitle')}</h3>
                  <ul className="list-disc list-inside text-gray-400 space-y-2">
                    <li>{t('readme.focus1')}</li>
                    <li>{t('readme.focus2')}</li>
                    <li>{t('readme.focus3')}</li>
                  </ul>

                  <h3 className="text-xl text-teal-400 mt-6 mb-3">{t('readme.techTitle')}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {techStack.map((tech, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-[#161b22] hover:bg-[#21262d] text-gray-300 text-xs rounded-lg border border-gray-700/50 hover:border-teal-500/30 transition-all group cursor-default">
                        <img src={tech.icon} alt={tech.name} loading="lazy" className={`w-4 h-4 ${tech.invert ? 'invert opacity-80' : ''} group-hover:scale-110 transition-transform`} />
                        <span className="group-hover:text-teal-300 transition-colors">{tech.name}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xl text-teal-400 mt-6 mb-2">{t('readme.opportunityTitle')}</h3>
                  <p className="text-gray-400">{t('readme.opportunityContent')}</p>
                </div>
              </div>

              {/* GitHub Activity */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 bg-teal-500 rounded-full"></div>
                  <h3 className="text-lg font-bold text-white">{t('section.liveActivity')}</h3>
                </div>
                <Suspense fallback={<WidgetSkeleton />}>
                  <GithubStats />
                </Suspense>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="animate-in fade-in duration-500">
              <Projects />
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="animate-in fade-in duration-500">
              <Skills />
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="animate-in fade-in duration-500">
              <Certificates />
            </div>
          )}

          {activeTab === 'journey' && (
            <div className="animate-in fade-in duration-500">
              <LearningTimeline />
            </div>
          )}

          {activeTab === 'hireme' && (
            <div className="animate-in fade-in duration-500">
              <HireMeSection />
            </div>
          )}
        </div>

        {/* Footer — rendering-hydration-suppress-warning for date */}
        <footer className="py-8 text-center text-gray-600 text-xs border-t border-gray-800 mt-12 bg-[#0d1117]">
          <p suppressHydrationWarning>
            &copy; {new Date().getFullYear()} Fakhri Djamaris. {t('footer.text')}
          </p>
        </footer>
      </main>
    </div>
  );
}
