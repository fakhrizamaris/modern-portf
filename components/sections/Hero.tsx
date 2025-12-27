import Link from 'next/link';

export default function Hero() {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center items-center text-center pt-20">
      <div className="space-y-8 max-w-5xl px-4">
        {/* Badge Status */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium animate-fade-in-up">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
          </span>
          Open to Work & Collaboration
        </div>

        {/* Headline */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-[1.05]">FAKHRI DJAMARIS</h1>
          <h2 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400">Data Scientist & Web Engineer</h2>
        </div>

        {/* Bio */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Menggabungkan keahlian <span className="text-white font-semibold">Machine Learning</span> dengan <span className="text-white font-semibold">Modern Web Tech</span> untuk membangun aplikasi cerdas yang berdampak.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="#stats"
            className="px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-gray-200 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            Explore Dashboard
          </Link>
          <a
            href="/resume.pdf"
            target="_blank"
            className="px-8 py-4 bg-[#111] border border-gray-700 text-white font-bold text-lg rounded-full hover:border-blue-500 hover:text-blue-400 transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            Download CV / Resume
          </a>
        </div>
      </div>
    </section>
  );
}
