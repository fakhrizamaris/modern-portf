'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

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
  'profile.bio': { en: 'Informatics Engineering Graduate @ USU', id: 'Lulusan Teknik Informatika @ USU' },
  'profile.role': { en: 'ML Engineer • Data Scientist • Web Dev', id: 'ML Engineer • Data Scientist • Web Dev' },

  // Overview - README
  'readme.greeting': { en: "Hi there, I'm Fakhri! 👋", id: 'Halo, Saya Fakhri! 👋' },
  'readme.aboutTitle': { en: '🎯 About Me', id: '🎯 Tentang Saya' },
  'readme.aboutContent': {
    en: "Fresh graduate in Informatics Engineering (D3) from Universitas Sumatera Utara. I'm a junior developer passionate about building practical solutions using",
    id: 'Fresh graduate Teknik Informatika (D3) dari Universitas Sumatera Utara. Saya seorang junior developer yang antusias membangun solusi praktis menggunakan',
  },
  'readme.certTitle': { en: '🏆 Certifications & Training', id: '🏆 Sertifikasi & Pelatihan' },
  'readme.focusTitle': { en: '🔭 Current Focus', id: '🔭 Fokus Saat Ini' },
  'readme.focus1': { en: 'Learning to build end-to-end ML pipelines with TensorFlow & Cloud deployment', id: 'Belajar membangun ML pipeline end-to-end dengan TensorFlow & deployment Cloud' },
  'readme.focus2': { en: 'Developing fullstack web applications using modern frameworks (Next.js, Laravel)', id: 'Mengembangkan aplikasi web fullstack menggunakan framework modern (Next.js, Laravel)' },
  'readme.focus3': { en: 'Exploring data visualization and analysis with Python libraries', id: 'Mengeksplorasi visualisasi dan analisis data dengan library Python' },
  'readme.techTitle': { en: '🛠️ Technologies I Work With', id: '🛠️ Teknologi yang Saya Gunakan' },
  'readme.opportunityTitle': { en: '📫 Open to Opportunities', id: '📫 Terbuka untuk Kesempatan' },
  'readme.opportunityContent': {
    en: "As a fresh graduate, I'm actively seeking internship or entry-level positions in Machine Learning, Data Science, or Web Development. I'm eager to learn and contribute to impactful projects.",
    id: 'Sebagai fresh graduate, saya aktif mencari posisi magang atau entry-level di bidang Machine Learning, Data Science, atau Web Development. Saya ingin belajar dan berkontribusi pada proyek-proyek berdampak.',
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
  'section.hireMeDesc': { en: "I'm actively looking for opportunities to grow and contribute to impactful projects.", id: 'Saya aktif mencari kesempatan untuk berkembang dan berkontribusi pada proyek berdampak.' },

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
  'projects.viewProject': { en: 'View Project', id: 'Lihat Proyek' },
  'projects.viewCode': { en: 'View Code', id: 'Lihat Kode' },

  // Certificates
  'certificates.title': { en: 'Certifications', id: 'Sertifikasi' },
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
  'hire.location': { en: 'Based in Deli Serdang, Indonesia (Open to Remote)', id: 'Berbasis di Deli Serdang, Indonesia (Terbuka untuk Remote)' },

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

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation not found for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
