import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import ArcadeStats from '@/components/features/ArcadeStats';
import GithubStats from '@/components/features/GithubStats';
import Skills from '@/components/sections/Skills';
import SkillsMatrix from '@/components/sections/SkillsMatrix';
import Certificates from '@/components/sections/Certificates';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Hero />

      <div className="container mx-auto px-4 py-8 space-y-24">
        {/* Stats Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* GitHub Stats sekarang mengambil 2 kolom di layar besar */}
          <GithubStats />
          {/* Arcade Stats di sebelah kanan */}
          <ArcadeStats />
        </section>

        <SkillsMatrix />
        <Projects />
        <Certificates />
      </div>

      {/* Footer Simple */}
      <footer className="py-10 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Fakhri Djamaris. Built with Next.js & Tailwind.</p>
      </footer>
    </main>
  );
}
