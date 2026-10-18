'use client';

import { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';

type Language = 'en' | 'id';

interface Translations {
  [key: string]: {
    en: string;
    id: string;
  };
}

// All translations
export const translations: Translations = {
  // Sidebar
  'nav.overview': { en: 'Overview', id: 'Ringkasan' },
  'nav.dashboard': { en: 'Dashboard', id: 'Dashboard' },
  'nav.ailab': { en: 'AI Lab', id: 'Lab AI' },
  'nav.projects': { en: 'Projects', id: 'Proyek' },
  'nav.skills': { en: 'Tech Stack', id: 'Tech Stack' },
  'nav.certificates': { en: 'Certificates', id: 'Sertifikat' },
  'nav.journey': { en: 'Journey', id: 'Perjalanan' },
  'nav.blog': { en: 'TIL Blog', id: 'Blog TIL' },
  'nav.hireme': { en: 'Hire Me', id: 'Rekrut Saya' },

  // Sidebar profile
  'profile.downloadCV': { en: 'Download CV', id: 'Unduh CV' },
  'profile.online': { en: 'Online', id: 'Online' },
  'profile.bio': { en: 'Software Developer focused on iOS development and machine learning. Associate Degree in Informatics Engineering, USU.', id: 'Software Developer dengan fokus iOS development dan machine learning. Associate Degree Teknik Informatika USU.' },
  'profile.role': { en: 'Software Developer • iOS • Machine Learning', id: 'Software Developer • iOS • Machine Learning' },

  // Overview - README
  'readme.greeting': { en: "Hi there, I'm Fakhri! 👋", id: 'Halo, Saya Fakhri! 👋' },
  'readme.aboutTitle': { en: '🎯 About Me', id: '🎯 Tentang Saya' },
  'readme.aboutContent': {
    en: 'I am a learner at Apple Developer Academy @ Infinite Learning in Batam, building iOS apps with SwiftUI in cross-functional teams, from user research to features running on physical devices. I hold an Associate Degree in Informatics Engineering from the University of North Sumatra. As a freelance developer I build and deploy web applications and machine learning services (TensorFlow, FastAPI, Google Cloud Run), and I completed an internship at LLDIKTI Region I working with institutional data.',
    id: 'Saya adalah learner di Apple Developer Academy @ Infinite Learning, Batam, yang membangun aplikasi iOS dengan SwiftUI dalam tim lintas fungsi, mulai dari riset pengguna hingga fitur yang berjalan di perangkat fisik. Saya lulusan Associate Degree Teknik Informatika Universitas Sumatera Utara. Sebagai freelance developer, saya membangun dan men-deploy aplikasi web serta layanan machine learning (TensorFlow, FastAPI, Google Cloud Run), dan pernah magang di LLDIKTI Wilayah I mengelola data institusi.',
  },
  'readme.aboutContent2': {
    en: 'Building models taught me that analysis is only half of the work. The technology has to become an app that real people find useful.',
    id: 'Membangun model mengajarkan saya bahwa analisis hanyalah separuh dari pekerjaan. Teknologi itu harus menjadi aplikasi yang benar-benar berguna bagi orang.',
  },
  'readme.certTitle': { en: '🏆 Certifications & Training', id: '🏆 Sertifikasi & Pelatihan' },
  'readme.focusTitle': { en: '🔭 Current Focus', id: '🔭 Fokus Saat Ini' },
  'readme.focus1': { en: 'Building iOS apps in cross-functional teams at Apple Developer Academy, from user research to features on real devices', id: 'Membangun aplikasi iOS dalam tim lintas fungsi di Apple Developer Academy, dari riset pengguna hingga fitur di perangkat asli' },
  'readme.focus2': { en: 'Building and deploying web applications and machine learning services for freelance clients', id: 'Membangun dan men-deploy aplikasi web serta layanan machine learning untuk klien freelance' },
  'readme.focus3': { en: 'Turning strong technology into apps that are intuitive and useful for people', id: 'Mengubah teknologi yang kuat menjadi aplikasi yang intuitif dan berguna bagi orang' },
  'readme.techTitle': { en: '🛠️ Technologies I Work With', id: '🛠️ Teknologi yang Saya Gunakan' },
  'readme.opportunityTitle': { en: '📫 Open to Opportunities', id: '📫 Terbuka untuk Kesempatan' },
  'readme.opportunityContent': {
    en: 'I am looking for a role in digital product development, in mobile engineering or Data/ML, where I can keep learning from experienced teams.',
    id: 'Saya mencari peran di pengembangan produk digital, baik di mobile engineering maupun Data/ML, sambil terus belajar dari tim yang berpengalaman.',
  },

  // Section headers
  'section.liveActivity': { en: 'Live Activity', id: 'Aktivitas Live' },
  'section.liveDataFeeds': { en: 'Live Data Feeds', id: 'Data Feed Live' },
  'section.techStack': { en: 'Tech Stack', id: 'Tech Stack' },
  'section.techStackDesc': { en: 'Technologies and tools I use in my projects. Continuously learning and expanding.', id: 'Teknologi dan tools yang saya gunakan dalam proyek. Terus belajar dan berkembang.' },
  'section.skillProficiency': { en: 'Skill Proficiency', id: 'Tingkat Keahlian' },
  'section.skillDesc': { en: 'Visualization of skill levels based on project experience and certifications.', id: 'Visualisasi tingkat keahlian berdasarkan pengalaman proyek dan sertifikasi.' },
  'section.learningJourney': { en: 'My Learning Journey', id: 'Perjalanan Belajar Saya' },
  'section.learningJourneyDesc': { en: 'From first code to ML certifications', id: 'Dari kode pertama hingga sertifikasi ML' },
  'section.achievements': { en: 'Achievements', id: 'Pencapaian' },
  'section.achievementsDesc': { en: 'Milestones and badges earned', id: 'Milestone dan badge yang diraih' },
  'section.til': { en: 'Today I Learned', id: 'Hari Ini Saya Belajar' },
  'section.tilDesc': { en: 'Quick notes on things I discover while building', id: 'Catatan singkat tentang hal yang saya temukan saat membangun' },
  'section.hireMeTitle': { en: "Let's Work Together", id: 'Mari Bekerja Sama' },
  'section.hireMeDesc': {
    en: 'My work follows one idea: strong technology only matters when it becomes something intuitive and useful for people. I am ready to learn, contribute and work across disciplines to build digital products with real impact.',
    id: 'Karya saya berpegang pada satu ide: teknologi yang kuat baru berarti ketika menjadi sesuatu yang intuitif dan berguna bagi orang. Saya siap belajar, berkontribusi, dan bekerja lintas disiplin untuk membangun produk digital yang berdampak nyata.',
  },

  // Dashboard
  'dashboard.title': { en: 'Analytics Dashboard', id: 'Dashboard Analitik' },
  'dashboard.desc': { en: 'Visualization of activity data, skill proficiency, and portfolio statistics based on GitHub account.', id: 'Visualisasi data aktivitas, skill proficiency, dan statistik portofolio berdasarkan akun GitHub.' },
  'dashboard.totalProjects': { en: 'Total Projects', id: 'Total Proyek' },
  'dashboard.technologies': { en: 'Technologies', id: 'Teknologi' },
  'dashboard.mlModels': { en: 'ML Models Built', id: 'Model ML Dibuat' },
  'dashboard.cloudDeploy': { en: 'Cloud Deployments', id: 'Deployment Cloud' },
  'dashboard.skillsProf': { en: 'Skills Proficiency', id: 'Tingkat Keahlian' },
  'dashboard.techDist': { en: 'Technology Distribution', id: 'Distribusi Teknologi' },
  'dashboard.weeklyActivity': { en: 'Weekly Activity', id: 'Aktivitas Mingguan' },
  'dashboard.projectsByCat': { en: 'Projects by Category', id: 'Proyek per Kategori' },
  'dashboard.contribution': { en: 'Contribution Activity', id: 'Aktivitas Kontribusi' },
  'dashboard.contributionDesc': { en: '365 days of coding activity', id: '365 hari aktivitas coding' },

  // Projects
  'projects.title': { en: 'Featured Projects', id: 'Proyek Unggulan' },
  'projects.subtitle': { en: 'From the Academy apps to the machine learning projects before them.', id: 'Dari aplikasi di Academy hingga proyek machine learning sebelumnya.' },
  'projects.viewProject': { en: 'View Project', id: 'Lihat Proyek' },
  'projects.viewCode': { en: 'View Code', id: 'Lihat Kode' },
  'projects.contribution': { en: 'My Contribution', id: 'Kontribusi Saya' },
  'projects.techComposition': { en: 'Tech Stack Composition', id: 'Komposisi Tech Stack' },

  // Certificates
  'certificates.title': { en: 'Certifications', id: 'Sertifikasi' },
  'certificates.subtitle': { en: 'Validation of professional competence through globally recognized industry certifications.', id: 'Validasi kompetensi profesional melalui sertifikasi industri yang diakui secara global.' },
  'certificates.viewCert': { en: 'View Certificate', id: 'Lihat Sertifikat' },

  // AI Lab
  'ailab.title': { en: 'AI Lab', id: 'Lab AI' },
  'ailab.desc': { en: 'Interactive demonstrations of Machine Learning capabilities', id: 'Demonstrasi interaktif kemampuan Machine Learning' },
  'ailab.imageClassifier': { en: 'Image Classifier', id: 'Klasifikasi Gambar' },
  'ailab.sentimentAnalyzer': { en: 'Sentiment Analyzer', id: 'Analisis Sentimen' },
  'ailab.uploadImage': { en: 'Click or drag image here', id: 'Klik atau seret gambar ke sini' },
  'ailab.analyze': { en: 'Analyze', id: 'Analisis' },
  'ailab.analyzing': { en: 'Analyzing...', id: 'Menganalisis...' },

  // Hire Me
  'hire.availability': { en: 'Availability', id: 'Ketersediaan' },
  'hire.fulltime': { en: 'Full-time', id: 'Full-time' },
  'hire.internship': { en: 'Internship', id: 'Magang' },
  'hire.freelance': { en: 'Freelance', id: 'Freelance' },
  'hire.contract': { en: 'Contract', id: 'Kontrak' },
  'hire.preferredRoles': { en: 'Preferred Roles', id: 'Peran yang Diinginkan' },
  'hire.quickMessage': { en: 'Quick Message', id: 'Pesan Cepat' },
  'hire.yourName': { en: 'Your Name', id: 'Nama Anda' },
  'hire.email': { en: 'Email Address', id: 'Alamat Email' },
  'hire.message': { en: 'Message', id: 'Pesan' },
  'hire.send': { en: 'Send Message', id: 'Kirim Pesan' },
  'hire.sending': { en: 'Sending...', id: 'Mengirim...' },
  'hire.sent': { en: 'Message Sent!', id: 'Pesan Terkirim!' },
  'hire.sentDesc': { en: "I'll get back to you as soon as possible.", id: 'Saya akan membalas secepat mungkin.' },
  'hire.location': { en: 'Based in Batam, Indonesia (Open to Remote)', id: 'Berbasis di Batam, Indonesia (Terbuka untuk Remote)' },
  'hire.languages': { en: 'Indonesian (native), English (limited working proficiency)', id: 'Bahasa Indonesia (native), Bahasa Inggris (limited working proficiency)' },

  // Common
  'common.showMore': { en: 'Show more', id: 'Tampilkan lebih' },
  'common.showLess': { en: 'Show less', id: 'Tampilkan sedikit' },
  'common.viewAll': { en: 'View all', id: 'Lihat semua' },
  'common.unlocked': { en: 'Unlocked', id: 'Terbuka' },
  'common.complete': { en: 'complete', id: 'selesai' },
  'common.less': { en: 'Less', id: 'Sedikit' },
  'common.more': { en: 'More', id: 'Banyak' },

  // Footer
  'footer.text': { en: 'Layout inspired by GitHub.', id: 'Layout terinspirasi dari GitHub.' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  // rerender-memo: Stabilize t() reference — only changes when language changes
  const t = useCallback((key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation not found for key: ${key}`);
      return key;
    }
    return translation[language];
  }, [language]);

  // rerender-memo: Stable context value — prevents cascade re-renders
  const contextValue = useMemo(
    () => ({ language, setLanguage, t }),
    [language, t]
  );

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
