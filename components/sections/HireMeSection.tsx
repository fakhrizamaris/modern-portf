'use client';

import { Briefcase, MapPin, Mail, Send, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function HireMeSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate form submission (replace with actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For demo, always succeed. In production, integrate with email service
    setStatus('success');
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => setStatus('idle'), 3000);
  };

  const availabilityOptions = [
    { label: 'Full-time', available: true },
    { label: 'Internship', available: true },
    { label: 'Freelance', available: true },
    { label: 'Contract', available: false },
  ];

  const preferredRoles = ['Machine Learning Engineer', 'Data Scientist', 'AI Engineer', 'Fullstack Developer', 'Backend Developer'];

  return (
    <section className="py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Info */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Briefcase className="w-6 h-6 text-teal-400" />
              Let's Work Together
            </h2>
            <p className="text-gray-400 text-sm mt-2">I'm actively looking for opportunities to grow and contribute to impactful projects.</p>
          </div>

          {/* Availability Status */}
          <div className="bg-[#0a0c10] border border-gray-800/50 rounded-xl p-5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-teal-400" />
              Availability
            </h3>
            <div className="flex flex-wrap gap-2">
              {availabilityOptions.map((opt, idx) => (
                <span key={idx} className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${opt.available ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'bg-gray-800/50 text-gray-500 border-gray-700/50'}`}>
                  {opt.available && <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full mr-2"></span>}
                  {opt.label}
                </span>
              ))}
            </div>
          </div>

          {/* Preferred Roles */}
          <div className="bg-[#0a0c10] border border-gray-800/50 rounded-xl p-5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
              <Briefcase className="w-4 h-4 text-purple-400" />
              Preferred Roles
            </h3>
            <div className="flex flex-wrap gap-2">
              {preferredRoles.map((role, idx) => (
                <span key={idx} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Location & Contact */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <MapPin className="w-4 h-4 text-teal-400" />
              <span>Based in Medan, Indonesia (Open to Remote)</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Mail className="w-4 h-4 text-teal-400" />
              <a href="mailto:djamarisfakhri@gmail.com" className="hover:text-teal-400 transition-colors">
                djamarisfakhri@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="bg-[#0a0c10] border border-gray-800/50 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Quick Message</h3>

          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle className="w-12 h-12 text-green-400 mb-4" />
              <h4 className="text-lg font-bold text-white">Message Sent!</h4>
              <p className="text-sm text-gray-400 mt-2">I'll get back to you as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 bg-[#161b22] border border-gray-700/50 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 bg-[#161b22] border border-gray-700/50 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-2.5 bg-[#161b22] border border-gray-700/50 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 transition-colors resize-none"
                  placeholder="Hi Fakhri, I'd like to discuss..."
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/30 hover:border-teal-400/50 rounded-lg text-teal-300 text-sm font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
