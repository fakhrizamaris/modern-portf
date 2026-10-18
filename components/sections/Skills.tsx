// Mirrors the "Technical Skills" groups in public/resume.pdf, keep both in sync
const customSkills = [
  {
    category: 'iOS',
    items: ['Swift', 'SwiftUI', 'SwiftData', 'UIKit', 'ARKit', 'RealityKit', 'WidgetKit', 'ActivityKit', 'Combine', 'Firebase Firestore', 'Git'],
    dot: 'bg-orange-400',
    titleColor: 'text-orange-400',
    description: 'Native iOS apps built in cross-functional teams, from user research to real devices',
  },
  {
    category: 'ML & Backend',
    items: ['Python', 'FastAPI', 'TensorFlow', 'Deep Learning', 'Computer Vision (YOLO/CNN)', 'CoreML', 'Gemini API', 'SQL', 'PostgreSQL', 'MySQL', 'ETL Pipelines'],
    dot: 'bg-teal-400',
    titleColor: 'text-teal-400',
    description: 'Training models and serving them as low-latency services',
  },
  {
    category: 'Web & Cloud',
    items: ['PHP', 'Laravel', 'Next.js', 'React', 'Vue.js', 'Prisma ORM', 'Google Cloud Platform', 'Cloud Run', 'Cloud Build', 'Cloud Storage', 'Docker', 'CI/CD'],
    dot: 'bg-cyan-400',
    titleColor: 'text-cyan-400',
    description: 'Web applications for clients, deployed to the cloud and Linux servers',
  },
];

const skillIcons: { [key: string]: string } = {
  // iOS
  Swift: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
  SwiftUI: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
  SwiftData: 'https://cdn.simpleicons.org/apple/000000',
  UIKit: 'https://cdn.simpleicons.org/apple/000000',
  ARKit: 'https://cdn.simpleicons.org/arkit/000000',
  RealityKit: 'https://cdn.simpleicons.org/apple/000000',
  WidgetKit: 'https://cdn.simpleicons.org/apple/000000',
  ActivityKit: 'https://cdn.simpleicons.org/apple/000000',
  Combine: 'https://cdn.simpleicons.org/apple/000000',
  'Firebase Firestore': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg',
  Git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  // ML & Backend
  Python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  FastAPI: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
  TensorFlow: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
  CoreML: 'https://cdn.simpleicons.org/apple/000000',
  'Gemini API': 'https://cdn.simpleicons.org/googlegemini/8E75B2',
  PostgreSQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  MySQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  // Web & Cloud
  PHP: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  Laravel: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
  'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  React: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Vue.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
  'Prisma ORM': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg',
  'Google Cloud Platform': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
  'Cloud Run': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
  'Cloud Build': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
  'Cloud Storage': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
  Docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'CI/CD': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg',
};

// js-set-map-lookups: Use Set for O(1) lookups
const invertIcons = new Set(['Next.js', 'Prisma ORM', 'SwiftData', 'UIKit', 'ARKit', 'RealityKit', 'WidgetKit', 'ActivityKit', 'Combine', 'CoreML']);

export default function Skills() {

  return (
    <section className="py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">
          Tech <span className="text-teal-400">Stack</span>
        </h2>
        <p className="text-gray-400 mt-2 text-sm">Technologies and tools I use in my projects. Continuously learning and expanding.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {customSkills.map((skillGroup, idx) => (
          <div key={idx} className="bg-[#0a0c10] border border-gray-800/50 rounded-xl p-5 hover:border-teal-500/30 transition-all group">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${skillGroup.dot}`}></div>
              <h3 className={`text-lg font-bold ${skillGroup.titleColor}`}>{skillGroup.category}</h3>
            </div>
            <p className="text-xs text-gray-500 mb-4">{skillGroup.description}</p>

            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((item, i) => (
                <div
                  key={i}
                  className="px-2.5 py-1.5 bg-[#161b22] text-gray-300 text-xs font-medium rounded-lg border border-gray-700/50 hover:border-teal-500/30 hover:text-teal-300 transition-all cursor-default flex items-center gap-2 group/item"
                >
                  {skillIcons[item] && <img src={skillIcons[item]} alt={item} className={`w-4 h-4 group-hover/item:scale-110 transition-transform ${invertIcons.has(item) ? 'invert opacity-80' : ''}`} />}
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
