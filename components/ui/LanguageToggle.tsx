'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
      className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 hover:border-teal-500/30 rounded-lg text-xs font-medium transition-all group"
      title={language === 'en' ? 'Switch to Indonesian' : 'Switch to English'}
    >
      <Globe className="w-3.5 h-3.5 text-gray-400 group-hover:text-teal-400 transition-colors" />
      <span className="text-gray-400 group-hover:text-teal-300 transition-colors">{language === 'en' ? 'ID' : 'EN'}</span>
      <div className="flex gap-0.5">
        <span className={`w-1.5 h-1.5 rounded-full transition-colors ${language === 'en' ? 'bg-teal-400' : 'bg-gray-600'}`}></span>
        <span className={`w-1.5 h-1.5 rounded-full transition-colors ${language === 'id' ? 'bg-teal-400' : 'bg-gray-600'}`}></span>
      </div>
    </button>
  );
}
