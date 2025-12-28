'use client';

import { GraduationCap, Briefcase, Award, Code, Rocket, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  type: 'education' | 'work' | 'certification' | 'project' | 'milestone';
  highlight?: boolean;
}

const timelineData: TimelineEvent[] = [
  {
    date: 'May 2025',
    title: 'Dev Certification ML with TensorFlow',
    description: 'Passed comprehensive ML assessment including exam, project, and interview',
    type: 'certification',
    highlight: true,
  },
  {
    date: 'Dec 2024',
    title: 'Bangkit Academy 2024 - Machine Learning Cohort',
    description: 'Completed Machine Learning path in MSIB Batch 7',
    type: 'certification',
    highlight: true,
  },
  {
    date: 'Jun 2024',
    title: 'Celerates Data Science Program',
    description: 'Completed Data Science basics including SQL, Python, ML, and Deep Learning',
    type: 'certification',
    highlight: true,
  },
  {
    date: 'Apr 2025',
    title: 'Google Cloud Roadshow Facilitator',
    description: 'Facilitated hands-on workshop sessions on GCP and Langflow',
    type: 'work',
  },
  {
    date: 'Aug 2024',
    title: 'PKL at LLDIKTI Wilayah 1',
    description: 'Internship experience in document digitization and data management',
    type: 'work',
  },
  {
    date: '2022',
    title: 'Started at USU',
    description: 'Enrolled in D3 Informatics Engineering at Universitas Sumatera Utara',
    type: 'education',
  },
  {
    date: '2021',
    title: 'First Line of Code',
    description: 'Started learning programming with Python and web development basics',
    type: 'milestone',
  },
];

export default function LearningTimeline() {
  const [expanded, setExpanded] = useState(false);
  const { t } = useLanguage();
  const displayedEvents = expanded ? timelineData : timelineData.slice(0, 4);

  const getIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'education':
        return <GraduationCap className="w-4 h-4" />;
      case 'work':
        return <Briefcase className="w-4 h-4" />;
      case 'certification':
        return <Award className="w-4 h-4" />;
      case 'project':
        return <Code className="w-4 h-4" />;
      case 'milestone':
        return <Rocket className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  const getColor = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'education':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'work':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'certification':
        return 'bg-teal-500/20 text-teal-400 border-teal-500/30';
      case 'project':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'milestone':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <section className="py-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Rocket className="w-6 h-6 text-teal-400" />
          {t('section.learningJourney')}
        </h2>
        <p className="text-gray-400 text-sm mt-2">{t('section.learningJourneyDesc')}</p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500/50 via-blue-500/50 to-purple-500/50"></div>

        <div className="space-y-4">
          {displayedEvents.map((event, idx) => (
            <div key={idx} className="relative pl-12 group">
              {/* Timeline dot */}
              <div
                className={`absolute left-0 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all group-hover:scale-110 ${getColor(event.type)} ${
                  event.highlight ? 'ring-2 ring-teal-500/30 ring-offset-2 ring-offset-[#0d1117]' : ''
                }`}
              >
                {getIcon(event.type)}
              </div>

              {/* Content card */}
              <div className={`bg-[#0a0c10] border rounded-xl p-4 hover:border-gray-700 transition-all ${event.highlight ? 'border-teal-500/30 bg-teal-500/5' : 'border-gray-800/50'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-white">{event.title}</h4>
                    <p className="text-xs text-gray-400 mt-1">{event.description}</p>
                  </div>
                  <span className="text-[10px] text-gray-500 whitespace-nowrap bg-gray-800/50 px-2 py-1 rounded-md">{event.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show more/less button */}
        {timelineData.length > 4 && (
          <button onClick={() => setExpanded(!expanded)} className="mt-4 ml-12 flex items-center gap-2 text-xs text-teal-400 hover:text-teal-300 transition-colors">
            {expanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                {t('common.showLess')}
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                {t('common.showMore')} ({timelineData.length - 4})
              </>
            )}
          </button>
        )}
      </div>
    </section>
  );
}
