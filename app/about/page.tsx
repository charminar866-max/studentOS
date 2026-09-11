import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 text-slate-800 text-xs sm:text-sm leading-relaxed">
      <div className="border-b border-slate-200 pb-4 space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">About StudentOS</h1>
        <p className="text-slate-600 text-sm">
          Empowering students, recent graduates, and educators with modern career tools.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Our Mission</h2>
        <p>
          StudentOS was built to solve the fragmentation students face when preparing for their careers. By unifying ATS resume creation, job discovery, and academic organization in one fast and secure workspace, we empower candidates to stand out.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <h3 className="font-bold text-slate-900 text-base">Privacy & Security First</h3>
          <p className="text-slate-600">
            Engineered with Supabase Row Level Security to guarantee complete data isolation between users.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <h3 className="font-bold text-slate-900 text-base">Speed & Accessibility</h3>
          <p className="text-slate-600">
            Optimized for fast rendering across desktop, laptop, tablet, and mobile devices.
          </p>
        </div>
      </div>

      <div className="pt-4 text-center">
        <Link
          href="/register"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-colors"
        >
          Join StudentOS Today →
        </Link>
      </div>
    </div>
  );
}
