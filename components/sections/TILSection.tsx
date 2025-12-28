'use client';

import { BookOpen, Calendar, Tag, ChevronRight } from 'lucide-react';

interface TILPost {
  id: string;
  date: string;
  title: string;
  content: string;
  tags: string[];
}

const tilPosts: TILPost[] = [
  {
    id: '1',
    date: '2024-12-28',
    title: 'TensorFlow SavedModel vs H5 Format',
    content: 'Learned that SavedModel format is preferred over H5 for production. SavedModel includes the computation graph, making it portable across different TensorFlow versions and platforms.',
    tags: ['TensorFlow', 'ML'],
  },
  {
    id: '2',
    date: '2024-12-25',
    title: 'SWR for Real-time Data Fetching',
    content: 'Discovered how SWR handles caching and revalidation automatically. The stale-while-revalidate pattern makes UX much smoother than traditional fetching.',
    tags: ['React', 'SWR'],
  },
  {
    id: '3',
    date: '2024-12-20',
    title: 'Docker Multi-stage Builds',
    content: 'Multi-stage builds can reduce Docker image size significantly. First stage compiles/builds, second stage only copies the necessary artifacts.',
    tags: ['Docker', 'DevOps'],
  },
  {
    id: '4',
    date: '2024-12-15',
    title: 'Supabase Row Level Security',
    content: 'RLS policies in Supabase are powerful for securing data. You can define policies that check user authentication and only return rows that belong to them.',
    tags: ['Supabase', 'Database'],
  },
  {
    id: '5',
    date: '2024-12-10',
    title: 'Next.js Server Actions',
    content: 'Server Actions in Next.js 14+ allow you to run server-side code directly from client components. No need for separate API routes for simple mutations.',
    tags: ['Next.js', 'React'],
  },
];

export default function TILSection() {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <section className="py-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-teal-400" />
          Today I Learned
        </h2>
        <p className="text-gray-400 text-sm mt-2">Quick notes on things I discover while building</p>
      </div>

      <div className="space-y-3">
        {tilPosts.map((post) => (
          <div key={post.id} className="bg-[#0a0c10] border border-gray-800/50 rounded-xl p-4 hover:border-teal-500/30 transition-all group">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-[10px] text-gray-500">{formatDate(post.date)}</span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">{post.title}</h4>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">{post.content}</p>
                <div className="flex items-center gap-2 mt-3">
                  <Tag className="w-3 h-3 text-gray-600" />
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 bg-gray-800/50 text-gray-400 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-teal-400 transition-colors shrink-0 mt-1" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button className="text-xs text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1 mx-auto">
          View all notes
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
