import { MapPin, Link as LinkIcon, Mail, Download, LayoutGrid, FolderGit2, Cpu, Award, BarChart3, Sparkles, Github, Linkedin } from 'lucide-react';
import Image from 'next/image';

interface ProfileSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function ProfileSidebar({ activeTab, setActiveTab }: ProfileSidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'ailab', label: 'AI Lab', icon: Sparkles },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'skills', label: 'Tech Stack', icon: Cpu },
    { id: 'certificates', label: 'Certificates', icon: Award },
  ];

  return (
    <aside className="w-full md:w-[260px] lg:w-[280px] md:shrink-0 flex flex-col md:sticky md:top-0 md:h-screen border-b md:border-b-0 md:border-r border-gray-800/30 bg-[#0d1117] sidebar-scroll">
      <div className="p-4 md:p-5 flex flex-col gap-4 overflow-y-auto flex-1">
        {/* Profile Header - Centered */}
        <div className="flex flex-col items-center gap-3">
          {/* Profile Picture - Smaller and Centered with Teal Glow */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/40 via-cyan-500/40 to-teal-400/40 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"></div>
            <div className="relative w-[100px] h-[100px] rounded-full border border-teal-500/30 bg-gray-900 overflow-hidden shadow-lg shadow-teal-500/10">
              <Image src="/images/hero-profile.png" alt="Fakhri Djamaris" fill className="object-cover" priority />
            </div>
            {/* Online Status */}
            <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-teal-400 rounded-full border-2 border-[#0d1117]"></div>
          </div>

          {/* Name & Username - Centered */}
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-100 tracking-tight">Fakhri Djamaris</h1>
            <p className="text-xs text-gray-500 font-mono">@fakhrizamaris</p>
          </div>

          {/* Bio - Centered */}
          <p className="text-xs text-gray-400 leading-relaxed text-center px-1">
            Informatics Engineering Graduate @ USU
            <br />
            ML Engineer • Data Scientist • Web Dev
          </p>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
            <MapPin size={12} className="text-teal-500/70" />
            <span>Deli Serdang, Indonesia</span>
          </div>
        </div>

        {/* Download CV Button */}
        <a
          href="/resume.pdf"
          target="_blank"
          className="w-full py-2 px-4 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 hover:border-teal-400/50 rounded-lg text-teal-300 text-xs font-medium transition-all text-center flex items-center justify-center gap-2"
        >
          <Download size={14} />
          Download CV
        </a>

        {/* Social Links */}
        <div className="flex gap-2">
          <a
            href="https://github.com/fakhrizamaris"
            target="_blank"
            className="flex-1 py-1.5 px-2 bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 hover:border-teal-500/30 rounded-md text-gray-400 hover:text-teal-300 text-[11px] font-medium transition-all flex items-center justify-center gap-1.5"
          >
            <Github size={12} />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/fakhri-djamaris"
            target="_blank"
            className="flex-1 py-1.5 px-2 bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 hover:border-teal-500/30 rounded-md text-gray-400 hover:text-teal-300 text-[11px] font-medium transition-all flex items-center justify-center gap-1.5"
          >
            <Linkedin size={12} />
            LinkedIn
          </a>
        </div>

        <hr className="border-gray-800/30 my-1" />

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-0.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all text-left ${
                  isActive ? 'bg-teal-500/10 text-teal-300 font-medium border-l-2 border-teal-400' : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-teal-400' : 'text-gray-500'} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Contact */}
        <div className="mt-auto pt-3 border-t border-gray-800/30 space-y-2">
          <a href="mailto:djamarisfakhri@gmail.com" className="flex items-center gap-2 text-[10px] text-gray-500 hover:text-teal-400 transition-colors">
            <Mail size={11} className="shrink-0" />
            <span className="truncate">djamarisfakhri@gmail.com</span>
          </a>
          <div className="flex items-center justify-end text-[10px] text-gray-600">
          
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-teal-400 shadow-teal-500/50 rounded-full"></span>
              Online
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
