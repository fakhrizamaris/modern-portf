'use client';

import { useState } from 'react';
import ProfileSidebar from '@/components/layout/ProfileSidebar';
import Projects from '@/components/sections/Projects';
import ArcadeStats from '@/components/features/ArcadeStats';
import GithubStats from '@/components/features/GithubStats';
import Skills from '@/components/sections/Skills';
import SkillsMatrix from '@/components/sections/SkillsMatrix';
import Certificates from '@/components/sections/Certificates';
import Dashboard from '@/components/sections/Dashboard';
import AILab from '@/components/sections/AILab';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');

  const techStack = [
    // Data Science & AI
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
    { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
    { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg', invert: true },
    { name: 'Scikit-Learn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg' },
    { name: 'Matplotlib', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg' },
    // Web Development
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', invert: true },
    { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
    { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
    { name: 'Go', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
    // Database & Cloud
    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
    { name: 'GCP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  ];

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
                  <h1 className="text-3xl border-b border-gray-800 pb-2 mb-6">Hi there, I'm Fakhri! 👋</h1>

                  <h3 className="text-xl text-teal-400 mt-4 mb-2">🎯 About Me</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Fresh graduate in <b>Informatics Engineering (D3)</b> from <b>Universitas Sumatera Utara</b> with GPA 3.86. I'm a junior developer passionate about building practical solutions using
                    <span className="text-teal-400"> Machine Learning</span>,<span className="text-cyan-400"> Data Science</span>, and
                    <span className="text-blue-400"> Web Development</span>. Currently focused on expanding my skills through real-world projects and certifications.
                  </p>

                  <h3 className="text-xl text-teal-400 mt-6 mb-2">🏆 Certifications & Training</h3>
                  <ul className="list-none text-gray-400 space-y-2 pl-0">
                    <li>
                      🎓 <b className="text-white">Bangkit Academy 2024 Batch 2</b> - Machine Learning Path (Distinction Graduate)
                    </li>
                    <li>
                      📜 <b className="text-white">Celerates Acceleration Program</b> - Data Science Basics
                    </li>
                    <li>
                      🤖 <b className="text-white">Dev Certification</b> for Machine Learning with TensorFlow (DCML)
                    </li>
                  </ul>

                  <h3 className="text-xl text-teal-400 mt-6 mb-2">🔭 Current Focus</h3>
                  <ul className="list-disc list-inside text-gray-400 space-y-2">
                    <li>
                      Learning to build <b className="text-white">end-to-end ML pipelines</b> with TensorFlow & Cloud deployment
                    </li>
                    <li>
                      Developing <b className="text-white">fullstack web applications</b> using modern frameworks (Next.js, Laravel)
                    </li>
                    <li>
                      Exploring <b className="text-white">data visualization</b> and analysis with Python libraries
                    </li>
                  </ul>

                  <h3 className="text-xl text-teal-400 mt-6 mb-3">🛠️ Technologies I Work With</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {techStack.map((tech, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-[#161b22] hover:bg-[#21262d] text-gray-300 text-xs rounded-lg border border-gray-700/50 hover:border-teal-500/30 transition-all group cursor-default">
                        <img src={tech.icon} alt={tech.name} className={`w-4 h-4 ${tech.invert ? 'invert opacity-80' : ''} group-hover:scale-110 transition-transform`} />
                        <span className="group-hover:text-teal-300 transition-colors">{tech.name}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xl text-teal-400 mt-6 mb-2">📫 Open to Opportunities</h3>
                  <p className="text-gray-400">
                    As a fresh graduate, I'm actively seeking <b className="text-teal-300">internship</b> or <b className="text-cyan-300">entry-level positions</b> in Machine Learning, Data Science, or Web Development. I'm eager to learn
                    and contribute to impactful projects.
                  </p>
                </div>
              </div>

              {/* Activity Stats Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-5 bg-teal-500 rounded-full"></div>
                  <h3 className="text-lg font-bold text-white">Live Activity</h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <GithubStats />
                  <ArcadeStats />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="animate-in fade-in duration-500">
              <Dashboard />
            </div>
          )}

          {activeTab === 'ailab' && (
            <div className="animate-in fade-in duration-500">
              <AILab />
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="animate-in fade-in duration-500">
              <Projects />
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-12 animate-in fade-in duration-500">
              <Skills />
              <SkillsMatrix />
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="animate-in fade-in duration-500">
              <Certificates />
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="py-8 text-center text-gray-600 text-xs border-t border-gray-800 mt-12 bg-[#0d1117]">
          <p>&copy; {new Date().getFullYear()} Fakhri Djamaris. Layout inspired by GitHub.</p>
        </footer>
      </main>
    </div>
  );
}
