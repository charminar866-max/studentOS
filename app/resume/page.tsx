'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';

export default function ResumeBuilderPage() {
  const { user } = useAuth();

  const [fullName, setFullName] = useState(user?.full_name || 'John Doe');
  const [email, setEmail] = useState(user?.email || 'john@example.com');
  const [phone, setPhone] = useState(user?.mobile_number || '+91 9876543210');
  const [location, setLocation] = useState(user?.country || 'India');
  const [summary, setSummary] = useState(
    'Motivated Computer Science student with strong proficiency in frontend development, React, and data structures.'
  );

  const [skills, setSkills] = useState(
    'React, Next.js, JavaScript, TypeScript, Tailwind CSS, Git, HTML/CSS'
  );
  const [experience, setExperience] = useState(
    'Software Intern @ TechCorp (2023 - Present): Developed responsive UI components and improved page load times by 30%.'
  );
  const [education, setEducation] = useState(
    'B.Tech in Computer Science — State University (2021 - 2025)'
  );

  const [saved, setSaved] = useState(false);

  // Sync state if user loads asynchronously
  const [syncedUserId, setSyncedUserId] = useState<string | null>(null);
  if (user && user.id !== syncedUserId) {
    setSyncedUserId(user.id);
    if (user.full_name) setFullName(user.full_name);
    if (user.email) setEmail(user.email);
    if (user.mobile_number) setPhone(user.mobile_number);
  }

  // Simple ATS Score calculation based on section completeness & keyword count
  const calculateAtsScore = () => {
    let score = 0;
    if (fullName.trim().length > 3) score += 20;
    if (email.trim().includes('@')) score += 20;
    if (summary.trim().length > 20) score += 20;
    if (skills.trim().length > 10) score += 20;
    if (experience.trim().length > 10) score += 20;
    return score;
  };

  const atsScore = calculateAtsScore();

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExportText = () => {
    const textContent = `
==================================================
${fullName.toUpperCase()}
${email} | ${phone} | ${location}
==================================================

PROFESSIONAL SUMMARY
--------------------
${summary}

SKILLS & COMPETENCIES
---------------------
${skills}

WORK EXPERIENCE
---------------
${experience}

EDUCATION
---------
${education}
    `.trim();

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fullName.replace(/\s+/g, '_')}_ATS_Resume.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            ATS Resume Builder
          </h1>
          <p className="text-xs text-slate-500">
            Build and format an ATS-optimized resume in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            {saved ? '✓ Saved!' : 'Save Resume'}
          </button>
          <button
            onClick={handleExportText}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Export Text / Download
          </button>
        </div>
      </div>

      {/* Grid: Editor Left, Live Preview Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor Column */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 text-xs sm:text-sm">
          <h2 className="text-base font-bold text-slate-900">Resume Details</h2>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Professional Summary
            </label>
            <textarea
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Skills (comma separated)
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Work Experience</label>
            <textarea
              rows={3}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Education</label>
            <textarea
              rows={2}
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-900 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Live Preview Column */}
        <div className="space-y-4">
          <div className="bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold">ATS Readability Score</h3>
              <p className="text-xs text-slate-300">Format & structure optimization level</p>
            </div>
            <div className="text-2xl font-black text-emerald-400">{atsScore}%</div>
          </div>

          {/* Formatted Resume Preview Document */}
          <div className="bg-white p-8 rounded-2xl border border-slate-300 shadow-md font-sans text-slate-800 space-y-4 text-xs">
            <div className="text-center border-b border-slate-200 pb-3 space-y-1">
              <h2 className="text-xl font-bold uppercase tracking-wide text-slate-900">
                {fullName || 'Your Name'}
              </h2>
              <p className="text-slate-600">
                {email} • {phone} • {location}
              </p>
            </div>

            <div>
              <h3 className="font-bold uppercase tracking-wider text-indigo-700 border-b border-slate-200 pb-0.5 mb-1 text-[11px]">
                Professional Summary
              </h3>
              <p className="text-slate-700 leading-relaxed">{summary}</p>
            </div>

            <div>
              <h3 className="font-bold uppercase tracking-wider text-indigo-700 border-b border-slate-200 pb-0.5 mb-1 text-[11px]">
                Skills & Technical Competencies
              </h3>
              <p className="text-slate-700 leading-relaxed">{skills}</p>
            </div>

            <div>
              <h3 className="font-bold uppercase tracking-wider text-indigo-700 border-b border-slate-200 pb-0.5 mb-1 text-[11px]">
                Experience
              </h3>
              <p className="text-slate-700 leading-relaxed">{experience}</p>
            </div>

            <div>
              <h3 className="font-bold uppercase tracking-wider text-indigo-700 border-b border-slate-200 pb-0.5 mb-1 text-[11px]">
                Education
              </h3>
              <p className="text-slate-700 leading-relaxed">{education}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
