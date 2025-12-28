export default function Skills() {
  const customSkills = [
    {
      category: 'Data Science & AI',
      items: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-Learn', 'Pandas', 'NumPy', 'Matplotlib', 'OpenCV', 'Tableau', 'Looker'],
      color: 'teal',
      description: 'Tools for building ML models, data analysis, and visualization',
    },
    {
      category: 'Web Development',
      items: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Laravel', 'Bootstrap', 'Tailwind CSS', 'Go'],
      color: 'cyan',
      description: 'Frontend & backend technologies for modern web apps',
    },
    {
      category: 'Database & Cloud',
      items: ['MySQL', 'PostgreSQL', 'Supabase', 'DBeaver', 'Google Cloud Platform', 'Docker', 'Git'],
      color: 'purple',
      description: 'Data storage and cloud infrastructure services',
    },
  ];

  const skillIcons: { [key: string]: string } = {
    // Data Science & AI
    Python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    TensorFlow: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    PyTorch: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
    'Scikit-Learn': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg',
    Pandas: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
    NumPy: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
    Matplotlib: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg',
    OpenCV: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg',
    // Web Development
    JavaScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    TypeScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    React: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    Laravel: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
    Bootstrap: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
    'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    Go: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
    // Database & Cloud
    MySQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    PostgreSQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    Supabase: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
    DBeaver: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dbeaver/dbeaver-original.svg',
    'Google Cloud Platform': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
    Docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    Git: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    // Data Visualization
    Tableau: 'https://billigence.com/wp-content/uploads/2022/08/2-1024x1024.png',
    Looker: 'https://cdn.simpleicons.org/looker/4285F4',
  };

  const invertIcons = ['Next.js', 'Pandas'];

  return (
    <section className="py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">
          Tech <span className="text-teal-400">Stack</span>
        </h2>
        <p className="text-gray-400 mt-2 text-sm">Technologies and tools I use in my projects. Continuously learning and expanding.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {customSkills.map((skillGroup, idx) => (
          <div key={idx} className="bg-[#0a0c10] border border-gray-800/50 rounded-xl p-5 hover:border-teal-500/30 transition-all group">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full bg-${skillGroup.color}-400`}></div>
              <h3 className={`text-lg font-bold text-${skillGroup.color}-400`}>{skillGroup.category}</h3>
            </div>
            <p className="text-xs text-gray-500 mb-4">{skillGroup.description}</p>

            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((item, i) => (
                <div
                  key={i}
                  className="px-2.5 py-1.5 bg-[#161b22] text-gray-300 text-xs font-medium rounded-lg border border-gray-700/50 hover:border-teal-500/30 hover:text-teal-300 transition-all cursor-default flex items-center gap-2 group/item"
                >
                  {skillIcons[item] && <img src={skillIcons[item]} alt={item} className={`w-4 h-4 group-hover/item:scale-110 transition-transform ${invertIcons.includes(item) ? 'invert opacity-80' : ''}`} />}
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
