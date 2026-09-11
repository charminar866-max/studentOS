'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AdSlot } from '@/components/ads/AdSlot';

const INITIAL_JOBS = [
  {
    id: 'job-1',
    title: 'Junior Frontend Developer (React / Next.js)',
    company: 'TechPulse Solutions',
    location: 'Remote / Bengaluru, India',
    type: 'Full-time',
    salary: '₹6,00,000 - ₹9,00,000 / year',
    category: 'Engineering',
    description:
      'We are looking for a motivated Junior Frontend Developer proficient in React, Next.js, and Tailwind CSS to help build responsive student tools.',
  },
  {
    id: 'job-2',
    title: 'UI/UX Product Design Intern',
    company: 'Canvas Design Lab',
    location: 'Remote',
    type: 'Internship',
    salary: '₹25,000 / month',
    category: 'Design',
    description:
      'Join our creative design lab to craft intuitive user experiences for modern web applications and mobile interfaces.',
  },
  {
    id: 'job-3',
    title: 'Associate Data Analyst',
    company: 'Metrics & Co.',
    location: 'Mumbai, India',
    type: 'Full-time',
    salary: '₹7,50,000 / year',
    category: 'Analytics',
    description:
      'Analyze student engagement trends, generate executive performance dashboards, and optimize core business metrics.',
  },
  {
    id: 'job-4',
    title: 'Computer Science Teaching Assistant',
    company: 'EduLearn Academy',
    location: 'Hybrid / Delhi NCR',
    type: 'Part-time',
    salary: '₹20,000 / month',
    category: 'Education',
    description:
      'Assist senior instructors in conducting coding bootcamps, reviewing student projects, and providing 1-on-1 mentorship.',
  },
  {
    id: 'job-5',
    title: 'Graduate Technical Recruiter',
    company: 'TalentSphere',
    location: 'Hyderabad, India',
    type: 'Full-time',
    salary: '₹5,50,000 / year',
    category: 'HR / Recruiting',
    description:
      'Connect emerging tech talent and recent graduates with high-growth technology companies.',
  },
];

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const categories = ['All', 'Engineering', 'Design', 'Analytics', 'Education', 'HR / Recruiting'];
  const types = ['All', 'Full-time', 'Internship', 'Part-time'];

  const filteredJobs = INITIAL_JOBS.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || job.category === selectedCategory;
    const matchesType = selectedType === 'All' || job.type === selectedType;
    return matchesSearch && matchesCat && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Curated Career Opportunities
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Search full-time roles, internships, and entry-level positions matched for students and graduates.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Search by title, company, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                Category: {cat}
              </option>
            ))}
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {types.map((t) => (
              <option key={t} value={t}>
                Job Type: {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
            No matching jobs found. Try clearing your search filters.
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                    {job.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">
                    {job.type}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">{job.title}</h2>
                <p className="text-xs text-slate-500 font-medium">
                  {job.company} • 📍 {job.location} • 💰 {job.salary}
                </p>
                <p className="text-xs text-slate-600 line-clamp-2 pt-1">{job.description}</p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <Link
                  href={`/jobs/${job.id}`}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  View Details & Apply →
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      <AdSlot placement="in-content" />
    </div>
  );
}
