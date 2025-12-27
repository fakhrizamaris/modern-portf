'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Python', value: 90, color: '#3b82f6' }, // Blue
  { name: 'SQL', value: 75, color: '#10b981' }, // Emerald
  { name: 'PHP/Laravel', value: 85, color: '#8b5cf6' }, // Violet
  { name: 'JavaScript', value: 80, color: '#f59e0b' }, // Amber
  { name: 'TensorFlow', value: 70, color: '#ef4444' }, // Red
  { name: 'Cloud (GCP)', value: 65, color: '#0ea5e9' }, // Sky
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1a] border border-gray-800 p-3 rounded-xl shadow-xl">
        <p className="font-bold text-gray-200">{label}</p>
        <p className="text-sm text-blue-400">Proficiency: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function SkillsMatrix() {
  return (
    <section className="py-20" id="stats">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        {/* Description Side */}
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl font-bold text-white">
            Skill <span className="text-blue-500">Matrix</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Sebagai "Data-Driven Developer", saya tidak hanya menulis kode, tapi juga menganalisis performa dan skalabilitas. Grafik ini merepresentasikan distribusi keahlian teknis saya berdasarkan pengalaman projek nyata.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-[#111] border border-gray-800">
              <div className="text-3xl font-bold text-white">4+</div>
              <div className="text-xs uppercase text-gray-500 font-semibold mt-1">Years Coding</div>
            </div>
            <div className="p-4 rounded-xl bg-[#111] border border-gray-800">
              <div className="text-3xl font-bold text-white">15+</div>
              <div className="text-xs uppercase text-gray-500 font-semibold mt-1">Projek Selesai</div>
            </div>
          </div>
        </div>

        {/* Chart Side */}
        <div className="flex-1 w-full h-[400px] bg-[#0a0a0a] border border-gray-800 rounded-3xl p-6 relative">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest absolute top-6 left-8">Technical Proficiency Score</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 50, right: 30, left: 40, bottom: 5 }}>
              <XAxis type="number" hide domain={[0, 100]} />
              <YAxis dataKey="name" type="category" tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 500 }} width={100} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
