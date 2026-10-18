import Image from 'next/image';
import type { ReactNode } from 'react';
import { FolderGit2, Github, Globe, Info } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import projectsData from '@/data/projects.json';

// Define the type for better safety
interface Project {
  title: string;
  category_en: string;
  category_id: string;
  context_en: string;
  context_id: string;
  desc_en: string;
  desc_id: string;
  contribution_en: string;
  contribution_id: string;
  note_en?: string;
  note_id?: string;
  image: string;
  tech: string[];
  link?: string;
  app_store?: string;
  website?: string;
  metrics?: Record<string, number>;
}

const PROJECTS: Project[] = projectsData as unknown as Project[];

// Segment colors for the language bar, brightest first so the main stack stands out
const METRIC_COLORS = ['#2dd4bf', '#1d7f74', '#8b949e', '#484f58'];

const PRIMARY_BUTTON = 'bg-teal-500/15 hover:bg-teal-500/25 border-teal-500/30 text-teal-300';
const SECONDARY_BUTTON = 'bg-[#21262d] hover:bg-[#30363d] border-[#30363d] text-gray-200';

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

const getWebsiteLabel = (url: string) => {
  if (url.includes('testflight.apple.com')) return 'TestFlight';
  if (url.includes('sketch.com')) return 'Prototype';
  return 'Live Demo';
};

// Renders an external link when the project has one, otherwise a plain wrapper
function CardLink({ href, className, children }: { href?: string; className?: string; children: ReactNode }) {
  if (!href) return <div className={className}>{children}</div>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

export default function Projects() {
  const { language, t } = useLanguage();

  return (
    <section id="projects" className="py-12 scroll-mt-24">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <FolderGit2 className="w-6 h-6 text-teal-400" />
          {t('projects.title')}
        </h2>
        <p className="text-gray-400 text-sm mt-2">{t('projects.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((project, idx) => {
          const href = project.app_store ?? project.website ?? project.link;
          const note = language === 'en' ? project.note_en : project.note_id;
          const metrics = project.metrics ? Object.entries(project.metrics) : [];

          return (
            <article key={idx} className="group flex flex-col bg-[#0a0c10] border border-gray-800/60 rounded-xl overflow-hidden hover:border-gray-700 transition-colors">
              {/* Project Image */}
              <CardLink href={href} className="block relative h-48 bg-[#161b22] border-b border-gray-800/60 overflow-hidden">
                <Image src={project.image} alt={project.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
              </CardLink>

              <div className="flex flex-col flex-1 p-5 md:p-6">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <CardLink href={href}>
                    <h3 className="text-lg font-semibold text-gray-100 hover:text-teal-400 transition-colors">{project.title}</h3>
                  </CardLink>
                  <span className="px-2 py-0.5 text-[11px] font-medium text-gray-400 border border-gray-700 rounded-full">
                    {language === 'en' ? project.category_en : project.category_id}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{language === 'en' ? project.context_en : project.context_id}</p>

                <p className="text-gray-400 text-sm leading-relaxed mt-4">{language === 'en' ? project.desc_en : project.desc_id}</p>

                {/* Contribution */}
                <div className="mt-4 border-l-2 border-teal-500/40 pl-3">
                  <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">{t('projects.contribution')}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{language === 'en' ? project.contribution_en : project.contribution_id}</p>
                </div>

                {note && (
                  <p className="mt-3 flex gap-2 text-xs text-[#d29922] leading-relaxed">
                    <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    {note}
                  </p>
                )}

                {/* Language bar */}
                {metrics.length > 0 && (
                  <div className="mt-5">
                    <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">{t('projects.techComposition')}</p>
                    <div className="flex h-2 rounded-full overflow-hidden gap-px bg-[#21262d]">
                      {metrics.map(([tech, percentage], i) => (
                        <span key={tech} title={`${tech} ${percentage}%`} style={{ width: `${percentage}%`, backgroundColor: METRIC_COLORS[i % METRIC_COLORS.length] }} />
                      ))}
                    </div>
                    <ul className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs">
                      {metrics.map(([tech, percentage], i) => (
                        <li key={tech} className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: METRIC_COLORS[i % METRIC_COLORS.length] }} />
                          <span className="text-gray-300">{tech}</span>
                          <span className="text-gray-500">{percentage}%</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Topics */}
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-2.5 py-0.5 bg-teal-500/10 text-teal-300 text-xs font-medium rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                {href && (
                  <div className="mt-auto pt-5 flex flex-wrap gap-2">
                    {project.app_store && (
                      <a
                        href={project.app_store}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1.5 px-3 py-1.5 border text-xs font-medium rounded-md transition-colors ${PRIMARY_BUTTON}`}
                      >
                        <AppleLogo />
                        App Store
                      </a>
                    )}
                    {project.website && (
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1.5 px-3 py-1.5 border text-xs font-medium rounded-md transition-colors ${project.app_store ? SECONDARY_BUTTON : PRIMARY_BUTTON}`}
                      >
                        <Globe className="w-3.5 h-3.5" />
                        {getWebsiteLabel(project.website)}
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1.5 px-3 py-1.5 border text-xs font-medium rounded-md transition-colors ${SECONDARY_BUTTON}`}
                      >
                        <Github className="w-3.5 h-3.5" />
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
