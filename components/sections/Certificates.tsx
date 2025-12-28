'use client';
import Image from 'next/image';
import certificates from '@/data/certificates.json';

export default function Certificates() {
  return (
    <section className="py-20 border-t border-dashed border-gray-800">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Verified Certificates</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">Validasi kompetensi profesional melalui sertifikasi industri yang diakui secara global.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certificates.map((cert, idx) => (
          <a key={idx} href={cert.link} target="_blank" className="flex items-center gap-4 bg-[#0a0a0a] border border-gray-800 p-4 rounded-2xl hover:bg-[#111] hover:border-blue-500/30 transition-all group">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-2 shrink-0 overflow-hidden relative">
              <Image src={cert.image} alt={cert.issuer} fill className="object-contain p-2" />
            </div>

            <div>
              <h3 className="text-white font-bold leading-tight group-hover:text-blue-400 transition-colors">{cert.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {cert.issuer} • {cert.date}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
