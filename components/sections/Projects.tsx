import Image from 'next/image';

import projectsData from '@/data/projects.json';

// Define the type for better safety
interface Project {
  title: string;
  category: string;
  desc: string;
  image: string;
  tech: string[];
  link: string;
  metrics?: Record<string, number>;
}

const PROJECTS: Project[] = projectsData as unknown as Project[];

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
          <p className="text-gray-400 mt-2">Beberapa karya terbaik yang pernah saya kerjakan.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project, idx) => (
          <a
            key={idx}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-[#0a0a0a] border border-gray-800 rounded-3xl overflow-hidden hover:border-gray-600 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300"
          >
            {/* Image Placeholder */}
            <div className="relative h-56 bg-gray-900 overflow-hidden">
              {/* <Image ... /> */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-700 font-mono text-sm">[Project Preview: {project.title}]</div>

              {/* Overlay Categories */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/10 shadow-lg">{project.category}</span>
              </div>
            </div>

            <div className="p-6 md:p-8">
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
              <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-3">{project.desc}</p>

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
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((t, i) => (
                  <span key={i} className="px-2.5 py-1 bg-[#151515] text-gray-400 text-[10px] font-medium rounded-lg border border-gray-800">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
