export default function Skills() {
  const customSkills = [
    {
      category: 'Data Science & AI',
      items: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-Learn', 'Pandas', 'NumPy', 'OpenCV', 'Deep Learning', 'NLP'],
      color: 'blue',
    },
    {
      category: 'Web Development',
      items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Laravel', 'MySQL', 'PostgreSQL'],
      color: 'emerald',
    },
    {
      category: 'Tools & Cloud',
      items: ['Google Cloud Platform', 'Git', 'Docker', 'VS Code', 'Jupyter', 'Postman'],
      color: 'purple',
    },
  ];

  return (
    <section className="py-20">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white">Technical Arsenal</h2>
        <p className="text-gray-400 mt-2">Teknologi dan tools yang saya gunakan untuk membangun solusi.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {customSkills.map((skillGroup, idx) => (
          <div key={idx} className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-colors">
            <h3 className={`text-xl font-bold mb-4 text-${skillGroup.color}-400`}>{skillGroup.category}</h3>
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((item, i) => (
                <span key={i} className="px-3 py-1.5 bg-[#151515] text-gray-300 text-sm font-medium rounded-lg border border-gray-800 hover:border-gray-600 hover:text-white transition-all cursor-default">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
