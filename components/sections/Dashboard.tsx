'use client';

import { useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Code, Brain, Cloud, Layers, Activity } from 'lucide-react';

// Skills Proficiency Data for Radar Chart
const skillsData = [
  { skill: 'Machine Learning', level: 85, fullMark: 100 },
  { skill: 'Deep Learning', level: 80, fullMark: 100 },
  { skill: 'Web Development', level: 90, fullMark: 100 },
  { skill: 'Data Analysis', level: 85, fullMark: 100 },
  { skill: 'Cloud (GCP)', level: 75, fullMark: 100 },
  { skill: 'Backend', level: 70, fullMark: 100 },
];

// Weekly Learning Hours Data
const learningHoursData = [
  { week: 'Week 1', hours: 25, projects: 2 },
  { week: 'Week 2', hours: 30, projects: 1 },
  { week: 'Week 3', hours: 22, projects: 3 },
  { week: 'Week 4', hours: 35, projects: 2 },
  { week: 'Week 5', hours: 28, projects: 4 },
  { week: 'Week 6', hours: 40, projects: 3 },
  { week: 'Week 7', hours: 32, projects: 2 },
  { week: 'Week 8', hours: 38, projects: 5 },
];

// Technology Distribution Data for Pie Chart
const techDistribution = [
  { name: 'Python', value: 35, color: '#3776AB' },
  { name: 'JavaScript/TS', value: 30, color: '#F7DF1E' },
  { name: 'SQL', value: 15, color: '#336791' },
  { name: 'PHP', value: 10, color: '#777BB4' },
  { name: 'Others', value: 10, color: '#6B7280' },
];

// Project Categories Data
const projectCategories = [
  { category: 'ML/AI', count: 5, color: '#10B981' },
  { category: 'Web Apps', count: 4, color: '#3B82F6' },
  { category: 'Data Science', count: 3, color: '#8B5CF6' },
  { category: 'Mobile', count: 2, color: '#F59E0B' },
];

// Contribution Heatmap Data (simulated)
const generateContributionData = () => {
  const data = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 5), // 0-4 contributions
    });
  }
  return data;
};

const contributionData = generateContributionData();

// Stats Cards Data
const statsCards = [
  { title: 'Total Projects', value: '14+', icon: Layers, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { title: 'Technologies', value: '20+', icon: Code, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { title: 'ML Models Built', value: '8+', icon: Brain, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { title: 'Cloud Deployments', value: '5+', icon: Cloud, color: 'text-orange-400', bg: 'bg-orange-500/10' },
];

export default function Dashboard() {
  const [activeChart, setActiveChart] = useState<'radar' | 'bar'>('radar');

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <Activity className="text-blue-400" />
          Analytics Dashboard
        </h2>
        <p className="text-gray-400 mt-2">Visualisasi data aktivitas, skill proficiency, dan statistik portofolio saya.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`${stat.bg} border border-gray-800 rounded-xl p-4 hover:border-gray-600 transition-all group`}>
              <div className="flex items-center justify-between">
                <Icon className={`${stat.color} w-8 h-8`} />
                <TrendingUp className="w-4 h-4 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-2xl font-bold text-white mt-3">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Skills Radar Chart */}
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Skills Proficiency</h3>
            <div className="flex gap-2">
              <button onClick={() => setActiveChart('radar')} className={`px-3 py-1 text-xs rounded-lg transition-all ${activeChart === 'radar' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
                Radar
              </button>
              <button onClick={() => setActiveChart('bar')} className={`px-3 py-1 text-xs rounded-lg transition-all ${activeChart === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
                Bar
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            {activeChart === 'radar' ? (
              <RadarChart data={skillsData}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#6B7280' }} />
                <Radar name="Proficiency" dataKey="level" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.4} />
              </RadarChart>
            ) : (
              <BarChart data={skillsData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis type="number" domain={[0, 100]} tick={{ fill: '#9CA3AF' }} />
                <YAxis dataKey="skill" type="category" tick={{ fill: '#9CA3AF', fontSize: 11 }} width={100} />
                <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
                <Bar dataKey="level" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Technology Distribution Pie Chart */}
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Technology Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={techDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name}: ${value}%`} labelLine={{ stroke: '#555' }}>
                {techDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Learning Hours Line Chart */}
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 xl:col-span-2">
          <h3 className="text-xl font-bold text-white mb-6">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={learningHoursData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="week" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
              <YAxis tick={{ fill: '#9CA3AF' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
              <Legend />
              <Line type="monotone" dataKey="hours" name="Learning Hours" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6', r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="projects" name="Projects Touched" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Project Categories Bar Chart */}
      <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Projects by Category</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={projectCategories}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="category" tick={{ fill: '#9CA3AF' }} />
            <YAxis tick={{ fill: '#9CA3AF' }} />
            <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }} labelStyle={{ color: '#fff' }} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {projectCategories.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Contribution Heatmap Placeholder */}
      <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Contribution Activity</h3>
        <p className="text-sm text-gray-500 mb-4">365 days of coding activity</p>
        <div className="flex flex-wrap gap-[3px]">
          {contributionData.slice(-120).map((day, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-sm transition-all hover:scale-125 ${day.count === 0 ? 'bg-gray-800' : day.count === 1 ? 'bg-green-900' : day.count === 2 ? 'bg-green-700' : day.count === 3 ? 'bg-green-500' : 'bg-green-400'}`}
              title={`${day.date}: ${day.count} contributions`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
          <span>Less</span>
          <div className="w-3 h-3 rounded-sm bg-gray-800" />
          <div className="w-3 h-3 rounded-sm bg-green-900" />
          <div className="w-3 h-3 rounded-sm bg-green-700" />
          <div className="w-3 h-3 rounded-sm bg-green-500" />
          <div className="w-3 h-3 rounded-sm bg-green-400" />
          <span>More</span>
        </div>
      </div>
    </section>
  );
}
