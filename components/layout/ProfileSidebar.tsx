'use client';

import { useState } from 'react';
import { MapPin, Mail, Download, LayoutGrid, FolderGit2, Cpu, Award, BarChart3, Sparkles, Github, Linkedin, Menu, X, Rocket, BookOpen, Briefcase, Globe } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

interface ProfileSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function ProfileSidebar({ activeTab, setActiveTab }: ProfileSidebarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const menuItems = [
    { id: 'overview', label: t('nav.overview'), icon: LayoutGrid },
    { id: 'dashboard', label: t('nav.dashboard'), icon: BarChart3 },
    { id: 'ailab', label: t('nav.ailab'), icon: Sparkles },
    { id: 'projects', label: t('nav.projects'), icon: FolderGit2 },
    { id: 'skills', label: t('nav.skills'), icon: Cpu },
    { id: 'certificates', label: t('nav.certificates'), icon: Award },
    { id: 'journey', label: t('nav.journey'), icon: Rocket },
    { id: 'blog', label: t('nav.blog'), icon: BookOpen },
    { id: 'hireme', label: t('nav.hireme'), icon: Briefcase },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#0d1117]/95 backdrop-blur-md border-b border-gray-800/50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden">
              <Image src="/hero-profile.png" alt="FD Logo" fill className="object-contain" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white">Fakhri Djamaris</h1>
              <p className="text-[10px] text-gray-500">ML Engineer • Web Dev</p>
            </div>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800 transition-all">
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[60px] left-0 right-0 z-40 bg-[#0d1117]/98 backdrop-blur-md border-b border-gray-800/50 p-4 animate-in slide-in-from-top duration-200">
          <nav className="grid grid-cols-3 gap-2 mb-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl text-xs transition-all ${
                    isActive ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30' : 'bg-gray-800/30 text-gray-400 border border-gray-800/50 hover:bg-gray-800/50'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-[10px]">{item.label}</span>
                </button>
              );
            })}
          </nav>
          <div className="flex gap-2">
            <a href="/resume.pdf" target="_blank" className="flex-1 py-2 bg-teal-500/10 border border-teal-500/30 rounded-lg text-teal-300 text-xs font-medium text-center flex items-center justify-center gap-2">
              <Download size={14} />
              CV
            </a>
            <a href="https://github.com/fakhrizamaris" target="_blank" className="py-2 px-4 bg-gray-800/50 border border-gray-700/50 rounded-lg text-gray-400 text-xs flex items-center gap-2">
              <Github size={14} />
            </a>
            <a href="https://linkedin.com/in/fakhri-djamaris" target="_blank" className="py-2 px-4 bg-gray-800/50 border border-gray-700/50 rounded-lg text-gray-400 text-xs flex items-center gap-2">
              <Linkedin size={14} />
            </a>
          </div>
        </div>
      )}

      {/* Mobile Spacer */}
      <div className="md:hidden h-[60px]"></div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-[260px] lg:w-[280px] md:shrink-0 flex-col md:sticky md:top-0 md:h-screen border-r border-gray-800/30 bg-[#0d1117] sidebar-scroll">
        <div className="p-5 flex flex-col gap-4 overflow-y-auto flex-1">
          {/* Profile Header */}
          <div className="flex flex-col items-center gap-3">
            {/* Profile Picture */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/40 via-cyan-500/40 to-teal-400/40 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"></div>
              <div className="relative w-[100px] h-[100px] rounded-full border border-teal-500/30 bg-gray-900 overflow-hidden shadow-lg shadow-teal-500/10">
                <Image src="/images/hero-profile.png" alt="Fakhri Djamaris" fill className="object-cover" priority />
              </div>
              <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-teal-400 rounded-full border-2 border-[#0d1117]"></div>
            </div>

            {/* Name & Username */}
            <div className="text-center">
              <h1 className="text-lg font-bold text-gray-100 tracking-tight">Fakhri Djamaris</h1>
              <p className="text-xs text-gray-500 font-mono">@fakhrizamaris</p>
            </div>

            {/* Bio */}
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

          {/* Contact & Language Toggle */}
          <div className="mt-auto pt-3 border-t border-gray-800/30 space-y-3">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
              className="w-full flex items-center justify-between px-3 py-2 bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700/50 hover:border-teal-500/30 rounded-lg transition-all group"
            >
              <div className="flex items-center gap-2">
                <Globe size={12} className="text-gray-500 group-hover:text-teal-400" />
                <span className="text-[11px] text-gray-400 group-hover:text-gray-200">{language === 'en' ? 'English' : 'Bahasa Indonesia'}</span>
              </div>
              <div className="flex gap-1">
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${language === 'en' ? 'bg-teal-500/20 text-teal-300' : 'text-gray-600'}`}>EN</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${language === 'id' ? 'bg-teal-500/20 text-teal-300' : 'text-gray-600'}`}>ID</span>
              </div>
            </button>

            <a href="mailto:djamarisfakhri@gmail.com" className="flex items-center gap-2 text-[10px] text-gray-500 hover:text-teal-400 transition-colors">
              <Mail size={11} className="shrink-0" />
              <span className="truncate">djamarisfakhri@gmail.com</span>
            </a>
            <div className="flex items-center justify-end text-[10px] text-gray-600">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-teal-400 shadow-teal-500/50 rounded-full"></span>
                {t('profile.online')}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
