'use client';

import { useState, useMemo, useEffect } from 'react';
import { MapPin, Mail, Download, LayoutGrid, FolderGit2, Cpu, Award, Github, Linkedin, Menu, X, Rocket, Briefcase, Building2 } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

interface ProfileSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const profileLinks = [
  { icon: Building2, label: 'Apple Developer Academy', href: undefined },
  { icon: MapPin, label: 'Deli Serdang, Indonesia', href: undefined },
  { icon: Mail, label: 'djamarisfakhri@gmail.com', href: 'mailto:djamarisfakhri@gmail.com' },
  { icon: Github, label: 'fakhrizamaris', href: 'https://github.com/fakhrizamaris' },
  { icon: Linkedin, label: 'in/fakhri-djamaris', href: 'https://linkedin.com/in/fakhri-djamaris' },
];

export default function ProfileSidebar({ activeTab, setActiveTab }: ProfileSidebarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const menuItems = useMemo(() => [
    { id: 'overview', label: t('nav.overview'), icon: LayoutGrid },
    { id: 'projects', label: t('nav.projects'), icon: FolderGit2 },
    { id: 'skills', label: t('nav.skills'), icon: Cpu },
    { id: 'certificates', label: t('nav.certificates'), icon: Award },
    { id: 'journey', label: t('nav.journey'), icon: Rocket },
    { id: 'hireme', label: t('nav.hireme'), icon: Briefcase },
  ], [t]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // bundle-preload: Preload the dynamic component for the given tab on hover
  const preloadTab = (tabId: string) => {
    switch (tabId) {
      case 'projects':
        import('@/components/sections/Projects');
        break;
      case 'skills':
        import('@/components/sections/Skills');
        break;
      case 'certificates':
        import('@/components/sections/Certificates');
        break;
      case 'journey':
        import('@/components/sections/LearningTimeline');
        break;
      case 'hireme':
        import('@/components/sections/HireMeSection');
        break;
    }
  };

  const languageSwitch = (
    <div className="flex items-center rounded-md border border-[#30363d] p-0.5 text-xs" role="group" aria-label="Language">
      {(['en', 'id'] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => setLanguage(lang)}
          aria-pressed={language === lang}
          className={`px-2.5 py-1 rounded-[4px] font-medium transition-colors ${language === lang ? 'bg-[#30363d] text-gray-100' : 'text-gray-500 hover:text-gray-300'}`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#0d1117]/95 backdrop-blur-md border-b border-[#21262d] px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#30363d]">
              <Image src="/images/hero-profile.webp" alt="Fakhri Djamaris" fill className="object-cover" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-gray-100 leading-tight">Fakhri Djamaris</h1>
              <p className="text-xs text-gray-500">{t('profile.role')}</p>
            </div>
          </div>
          <button aria-label="Toggle Menu" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-md border border-[#30363d] text-gray-400 hover:text-gray-100 hover:bg-[#21262d] transition-colors">
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[61px] left-0 right-0 z-40 bg-[#0d1117] border-b border-[#21262d] p-4 animate-in">
          <nav className="flex flex-col mb-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-left transition-colors ${isActive ? 'bg-[#161b22] text-gray-100 font-medium' : 'text-gray-400 hover:bg-[#161b22] hover:text-gray-200'}`}
                >
                  <Icon size={16} className={isActive ? 'text-teal-400' : 'text-gray-500'} />
                  {item.label}
                </button>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <a href="/resume.pdf" target="_blank" className="flex-1 py-2 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] rounded-md text-gray-200 text-sm font-medium text-center flex items-center justify-center gap-2 transition-colors">
              <Download size={14} />
              {t('profile.downloadCV')}
            </a>
            {languageSwitch}
          </div>
        </div>
      )}

      {/* Mobile Spacer */}
      <div className="md:hidden h-[61px]"></div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-[264px] lg:w-[296px] md:shrink-0 flex-col md:sticky md:top-0 md:h-screen border-r border-[#21262d] bg-[#0d1117] sidebar-scroll">
        <div className="px-6 py-8 flex flex-col overflow-y-auto flex-1">
          {/* Profile Header */}
          <div className="relative w-[140px] h-[140px] lg:w-[160px] lg:h-[160px] rounded-full overflow-hidden border border-[#30363d]">
            <Image src="/images/hero-profile.webp" alt="Fakhri Djamaris" fill sizes="160px" className="object-cover" priority />
          </div>

          <div className="mt-4">
            <h1 className="text-[22px] font-semibold text-gray-100 leading-tight">Fakhri Djamaris</h1>
            <p className="text-base text-gray-500 font-light">fakhrizamaris</p>
          </div>

          <p className="mt-3 text-sm text-gray-300 leading-relaxed">{t('profile.bio')}</p>

          <a
            href="/resume.pdf"
            target="_blank"
            className="mt-4 w-full py-1.5 px-4 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] hover:border-[#8b949e] rounded-md text-gray-200 text-sm font-medium transition-colors text-center flex items-center justify-center gap-2"
          >
            <Download size={14} />
            {t('profile.downloadCV')}
          </a>

          <ul className="mt-5 space-y-2 text-sm text-gray-400">
            {profileLinks.map(({ icon: Icon, label, href }) => (
              <li key={label} className="flex items-center gap-2 min-w-0">
                <Icon size={15} className="shrink-0 text-gray-500" />
                {href ? (
                  <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="truncate hover:text-teal-400 transition-colors">
                    {label}
                  </a>
                ) : (
                  <span className="truncate">{label}</span>
                )}
              </li>
            ))}
          </ul>

          <hr className="border-[#21262d] my-6" />

          {/* Navigation Menu */}
          <nav className="flex flex-col gap-0.5 -mx-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  onMouseEnter={() => preloadTab(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative flex items-center gap-2.5 px-3 py-1.5 rounded-md text-sm transition-colors text-left ${
                    isActive ? 'bg-[#161b22] text-gray-100 font-medium' : 'text-gray-400 hover:bg-[#161b22] hover:text-gray-200'
                  }`}
                >
                  {isActive && <span className="absolute -left-2 top-1.5 bottom-1.5 w-1 rounded-full bg-teal-400" />}
                  <Icon size={16} className={isActive ? 'text-gray-200' : 'text-gray-500'} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Language */}
          <div className="mt-auto pt-6 flex items-center justify-between">
            <span className="text-xs text-gray-500">{language === 'en' ? 'Language' : 'Bahasa'}</span>
            {languageSwitch}
          </div>
        </div>
      </aside>
    </>
  );
}
