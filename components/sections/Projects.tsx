import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import projectsData from '@/data/projects.json';

// Define the type for better safety
interface Project {
  title: string;
  category_en: string;
  category_id: string;
  desc_en: string;
  desc_id: string;
  image: string;
  tech: string[];
  link: string;
  website?: string;
  metrics?: Record<string, number>;
}

const PROJECTS: Project[] = projectsData as unknown as Project[];

export default function Projects() {
  const { language, t } = useLanguage();

  return (
    <section id="projects" className="scroll-mt-24">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold text-white">{t('projects.title')}</h2>
          <p className="text-gray-400 mt-2">{t('projects.subtitle')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project, idx) => (
          <div
            key={idx}
            className="group flex flex-col bg-[#0a0a0a] border border-gray-800 rounded-3xl overflow-hidden hover:border-gray-600 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300"
          >
            {/* Project Image */}
            <a href={project.website ?? project.link} target="_blank" rel="noopener noreferrer" className="block relative h-56 bg-gray-900 overflow-hidden">
              <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60"></div>

              {/* Overlay Categories */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/10 shadow-lg">
                  {language === 'en' ? project.category_en : project.category_id}
                </span>
              </div>
            </a>

            <div className="flex flex-col flex-1 p-6 md:p-8">
              <a href={project.website ?? project.link} target="_blank" rel="noopener noreferrer">
                <h3 className="text-2xl font-bold text-gray-100 mb-3 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                  {project.title}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-gray-500"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </h3>
              </a>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-3">
                {language === 'en' ? project.desc_en : project.desc_id}
              </p>

              {/* Metrics Visualization */}
              <div className="space-y-3 mb-6">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tech Stack Composition</p>
                {project.metrics &&
                  Object.entries(project.metrics).map(([tech, percentage], i) => (
                    <div key={i} className="group/metric">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-300 font-medium">{tech}</span>
                        <span className="text-gray-500">{percentage}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500/80 group-hover/metric:bg-blue-400 transition-colors rounded-full" style={{ width: `${percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t, i) => (
                  <span key={i} className="px-2.5 py-1 bg-[#151515] text-gray-400 text-[10px] font-medium rounded-lg border border-gray-800">
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="mt-auto flex flex-wrap gap-3">
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition-colors"
                  >
                    {project.website.includes('testflight.apple.com') ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    )}
                    {project.website.includes('testflight.apple.com') ? 'TestFlight' : 'Live Demo'}
                  </a>
                )}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                    project.website
                      ? 'bg-[#151515] hover:bg-[#1f1f1f] text-gray-300 border-gray-800'
                      : 'bg-blue-600 hover:bg-blue-500 text-white border-transparent'
                  }`}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
