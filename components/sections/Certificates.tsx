'use client';
import Image from 'next/image';
import { Award, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import certificates from '@/data/certificates.json';

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  image?: string;
  link: string;
}

const CERTIFICATES: Certificate[] = certificates;

export default function Certificates() {
  const { t } = useLanguage();

  return (
    <section className="py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Award className="w-6 h-6 text-teal-400" />
          {t('certificates.title')}
        </h2>
        <p className="text-gray-400 text-sm mt-2">{t('certificates.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CERTIFICATES.map((cert) => (
          <a
            key={cert.title}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 bg-[#0a0c10] border border-gray-800/60 p-4 rounded-xl hover:border-gray-700 transition-colors"
          >
            <div className="w-14 h-14 rounded-lg shrink-0 overflow-hidden relative flex items-center justify-center bg-white">
              {cert.image ? (
                <Image src={cert.image} alt={cert.issuer} fill sizes="56px" className="object-contain p-1.5" />
              ) : (
                <Award className="w-6 h-6 text-[#0d1117]" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-gray-100 leading-snug group-hover:text-teal-400 transition-colors">{cert.title}</h3>
              <p className="text-xs text-gray-500 mt-1">
                {cert.issuer} · {cert.date}
              </p>
            </div>
            <ExternalLink className="w-4 h-4 shrink-0 text-gray-600 group-hover:text-gray-400 transition-colors" />
          </a>
        ))}
      </div>
    </section>
  );
}
