import Link from 'next/link';
import { AdSlot } from '@/components/ads/AdSlot';

export default function Home() {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 pt-16 pb-20 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            <span>✨</span> StudentOS Pre-Launch Edition
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
            Your Ultimate Career & Academic <span className="text-indigo-600">Operating System</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Build ATS-optimized resumes, search curated career opportunities, and manage your academic progress with speed, privacy, and confidence.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/register"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all hover:shadow-lg cursor-pointer"
            >
              Get Started for Free →
            </Link>
            <Link
              href="/jobs"
              className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-sm rounded-xl transition-all cursor-pointer shadow-xs"
            >
              Explore Job Listings
            </Link>
            <Link
              href="/resume"
              className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm rounded-xl transition-all cursor-pointer"
            >
              Build Resume
            </Link>
          </div>
        </div>
      </section>

      {/* Reserved Header/Banner Ad Placement */}
      <div className="max-w-7xl mx-auto px-4">
        <AdSlot placement="header-banner" />
      </div>

      {/* Key Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Designed for Students, Job Seekers & Educators
          </h2>
          <p className="text-sm text-slate-600">
            Everything you need to accelerate your career and academic growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-lg">
              📄
            </div>
            <h3 className="text-lg font-bold text-slate-900">ATS Resume Builder</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Create clean, ATS-compliant resumes in minutes. Export formatted documents and track your application readiness.
            </p>
            <Link
              href="/resume"
              className="inline-block text-xs font-semibold text-indigo-600 hover:text-indigo-700 pt-2"
            >
              Start Resume →
            </Link>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-bold text-lg">
              💼
            </div>
            <h3 className="text-lg font-bold text-slate-900">Curated Job Opportunities</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Discover verified full-time, internship, and entry-level positions suited for your career role.
            </p>
            <Link
              href="/jobs"
              className="inline-block text-xs font-semibold text-emerald-600 hover:text-emerald-700 pt-2"
            >
              Search Jobs →
            </Link>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center font-bold text-lg">
              🔒
            </div>
            <h3 className="text-lg font-bold text-slate-900">Isolated & Secure Workspace</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Strict multi-user data isolation powered by Supabase row-level security ensuring your profile remains private.
            </p>
            <Link
              href="/register"
              className="inline-block text-xs font-semibold text-amber-600 hover:text-amber-700 pt-2"
            >
              Create Account →
            </Link>
          </div>
        </div>
      </section>

      {/* In-Content Ad Placement */}
      <div className="max-w-7xl mx-auto px-4">
        <AdSlot placement="in-content" />
      </div>
    </div>
  );
}
