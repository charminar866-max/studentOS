'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';

const JOB_DETAILS_MAP: Record<
  string,
  {
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    category: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
  }
> = {
  'job-1': {
    title: 'Junior Frontend Developer (React / Next.js)',
    company: 'TechPulse Solutions',
    location: 'Remote / Bengaluru, India',
    type: 'Full-time',
    salary: '₹6,00,000 - ₹9,00,000 / year',
    category: 'Engineering',
    description:
      'TechPulse Solutions is seeking a passionate Junior Frontend Developer to build high-performance web applications using React, Next.js, and TypeScript.',
    requirements: [
      'Proficiency in JavaScript (ES6+), React 18+, and CSS / Tailwind CSS.',
      'Understanding of Next.js App Router and server/client component boundaries.',
      'Familiarity with Git, REST APIs, and modern web accessibility standards.',
      'Strong problem-solving skills and eagerness to learn.',
    ],
    responsibilities: [
      'Develop clean, responsive user interface components.',
      'Collaborate with product designers and backend engineers.',
      'Ensure cross-browser compatibility and optimal mobile experience.',
    ],
  },
  'job-2': {
    title: 'UI/UX Product Design Intern',
    company: 'Canvas Design Lab',
    location: 'Remote',
    type: 'Internship',
    salary: '₹25,000 / month',
    category: 'Design',
    description:
      'Canvas Design Lab is offering a hands-on UI/UX Design internship for creative students passionate about interface design.',
    requirements: [
      'Figma or Adobe XD experience with a strong design portfolio.',
      'Basic understanding of wireframing, prototyping, and usability testing.',
    ],
    responsibilities: [
      'Design wireframes and interactive prototypes for web and mobile platforms.',
      'Assist senior designers in user feedback research.',
    ],
  },
};

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const jobId = resolvedParams.id;
  const { user } = useAuth();

  const [applied, setApplied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const job = JOB_DETAILS_MAP[jobId] || {
    title: 'Curated Opportunity',
    company: 'Partner Enterprise',
    location: 'Remote / India',
    type: 'Full-time',
    salary: 'Competitive Salary',
    category: 'General',
    description: 'Detailed opportunity description and candidate requirements.',
    requirements: ['Relevant educational background or experience.', 'Strong communication skills.'],
    responsibilities: ['Execute assigned deliverables with high quality.'],
  };

  const handleApply = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setApplied(true);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <Link href="/jobs" className="text-xs font-semibold text-indigo-600 hover:underline">
        ← Back to Job Listings
      </Link>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-5 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">
              {job.category}
            </span>
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">
              {job.type}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{job.title}</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            {job.company} • 📍 {job.location} • 💰 {job.salary}
          </p>
        </div>

        <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700">
          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">About the Role</h3>
            <p>{job.description}</p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Key Responsibilities</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              {job.responsibilities.map((res, i) => (
                <li key={i}>{res}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">Requirements & Qualifications</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              {job.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          {applied ? (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-bold flex items-center gap-2">
              <span>✅</span> Application Submitted Successfully!
            </div>
          ) : (
            <button
              onClick={handleApply}
              disabled={submitting}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors cursor-pointer disabled:opacity-50"
            >
              {submitting ? 'Submitting Application...' : `Apply for ${job.title}`}
            </button>
          )}

          {!user && (
            <span className="text-xs text-slate-500">
              Tip: Log in to attach your StudentOS ATS Resume.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
