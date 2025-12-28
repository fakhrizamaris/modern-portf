'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useState } from 'react';

// Skills data with icons
const skillsData = [
  {
    name: 'Python',
    value: 90,
    color: '#14b8a6',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  },
  {
    name: 'SQL',
    value: 80,
    color: '#06b6d4',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  },
  {
    name: 'PHP/Laravel',
    value: 85,
    color: '#8b5cf6',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
  },
  {
    name: 'JavaScript',
    value: 80,
    color: '#f59e0b',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  },
  {
    name: 'TensorFlow',
    value: 75,
    color: '#ef4444',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
  },
  {
    name: 'Cloud (GCP)',
    value: 70,
    color: '#3b82f6',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
  },
];

// Radar chart data
const radarData = [
  { subject: 'ML/AI', A: 85 },
  { subject: 'Web Dev', A: 90 },
  { subject: 'Data Analysis', A: 85 },
  { subject: 'Cloud', A: 70 },
  { subject: 'Database', A: 80 },
  { subject: 'DevOps', A: 65 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0d1117] border border-teal-500/30 p-3 rounded-xl shadow-xl shadow-teal-500/10">
        <p className="font-bold text-gray-200">{label}</p>
        <p className="text-sm text-teal-400">Proficiency: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function SkillsMatrix() {
  const [viewMode, setViewMode] = useState<'bar' | 'radar'>('bar');

  return (
    <section className="py-12" id="stats">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Skill <span className="text-teal-400">Proficiency</span>
            </h2>
            <p className="text-gray-400 mt-2 max-w-xl">Visualisasi tingkat keahlian berdasarkan pengalaman proyek dan sertifikasi yang telah diselesaikan.</p>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('bar')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all ${
                viewMode === 'bar' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:text-gray-200'
              }`}
            >
              Bar Chart
            </button>
            <button
              onClick={() => setViewMode('radar')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all ${
                viewMode === 'radar' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'bg-gray-800/50 text-gray-400 border border-gray-700/50 hover:text-gray-200'
              }`}
            >
              Radar Chart
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-teal-500/10 to-transparent border border-teal-500/20">
            <div className="text-2xl font-bold text-teal-400">3+</div>
            <div className="text-xs text-gray-500 mt-1">Years Coding</div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20">
            <div className="text-2xl font-bold text-cyan-400">15+</div>
            <div className="text-xs text-gray-500 mt-1">Projects</div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-400">8+</div>
            <div className="text-xs text-gray-500 mt-1">ML Models</div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">5+</div>
            <div className="text-xs text-gray-500 mt-1">Certificates</div>
          </div>
        </div>

        {/* Chart Area */}
        <div className="bg-[#0a0c10] border border-gray-800/50 rounded-2xl p-6 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl"></div>

          {viewMode === 'bar' ? (
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillsData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis type="number" hide domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }} width={100} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: 'rgba(20, 184, 166, 0.05)' }} content={<CustomTooltip />} />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24}>
                    {skillsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#1f2937" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 10 }} />
                  <Radar name="Skills" dataKey="A" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.3} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Skills List with Icons */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {skillsData.map((skill, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-[#0a0c10] border border-gray-800/50 rounded-xl hover:border-teal-500/30 transition-all group">
              <img src={skill.icon} alt={skill.name} className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <div>
                <div className="text-xs font-medium text-gray-300 group-hover:text-teal-300 transition-colors">{skill.name}</div>
                <div className="text-[10px] text-gray-600">{skill.value}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
