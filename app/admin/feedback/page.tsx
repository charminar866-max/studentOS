'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { FeedbackItem } from '@/lib/types/database';

export default function AdminFeedbackPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    let mounted = true;

    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/dashboard');
      return;
    }

    async function loadFeedback() {
      try {
        const res = await fetch('/api/feedback');
        const data = await res.json();
        if (mounted && data.success && data.feedback) {
          setFeedbackList(data.feedback);
        }
      } catch (err) {
        console.error('Failed to fetch admin feedback:', err);
      } finally {
        if (mounted) setLoadingData(false);
      }
    }

    if (user && user.role === 'admin') {
      loadFeedback();
    }

    return () => {
      mounted = false;
    };
  }, [user, loading, router]);

  const handleRefresh = async () => {
    setLoadingData(true);
    try {
      const res = await fetch('/api/feedback');
      const data = await res.json();
      if (data.success && data.feedback) {
        setFeedbackList(data.feedback);
      }
    } catch (err) {
      console.error('Failed to refresh feedback:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const updateStatus = (id: string, newStatus: 'reviewed' | 'resolved') => {
    setFeedbackList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  if (loading || !user) {
    return <div className="min-h-[70vh] flex items-center justify-center text-xs">Loading...</div>;
  }

  const filtered = feedbackList.filter((item) => {
    const matchCat = filterCategory === 'All' || item.category === filterCategory;
    const matchStatus = filterStatus === 'All' || item.status === filterStatus;
    return matchCat && matchStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Visitor Feedback Management</h1>
          <p className="text-xs text-slate-500">
            Review and resolve submitted feedback from site visitors and users.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-indigo-600 text-white font-semibold text-xs rounded-xl hover:bg-indigo-700 cursor-pointer"
        >
          Refresh Feed
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 flex flex-wrap gap-3 text-xs">
        <div>
          <label className="block text-slate-500 font-medium mb-1">Category Filter</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5"
          >
            <option value="All">All Categories</option>
            <option value="General feedback">General feedback</option>
            <option value="Bug/problem">Bug/problem</option>
            <option value="Design/UI issue">Design/UI issue</option>
            <option value="Performance/slow loading">Performance/slow loading</option>
            <option value="Feature request">Feature request</option>
            <option value="Content issue">Content issue</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-500 font-medium mb-1">Status Filter</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5"
          >
            <option value="All">All Statuses</option>
            <option value="new">New</option>
            <option value="reviewed">Reviewed</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* List */}
      {loadingData ? (
        <div className="p-8 text-center text-xs text-slate-500">Loading feedback submissions...</div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
          No feedback entries match your filters.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-500">{'★'.repeat(item.rating)}</span>
                  <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                    {item.category}
                  </span>
                  <span
                    className={`font-semibold px-2 py-0.5 rounded-md ${
                      item.status === 'new'
                        ? 'bg-blue-50 text-blue-700'
                        : item.status === 'reviewed'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    Status: {item.status.toUpperCase()}
                  </span>
                </div>
                <span className="text-slate-400">
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
              </div>

              <p className="text-slate-800 text-sm font-medium">{item.message}</p>

              <div className="flex flex-wrap items-center justify-between text-slate-500 pt-2 border-t border-slate-100 gap-2">
                <div>
                  <span>Page: {item.page_url}</span>
                  {item.email && <span className="ml-3">Contact: {item.email}</span>}
                </div>

                <div className="flex items-center gap-2">
                  {item.status !== 'reviewed' && (
                    <button
                      onClick={() => updateStatus(item.id, 'reviewed')}
                      className="px-3 py-1 bg-amber-50 text-amber-700 hover:bg-amber-100 font-semibold rounded-md cursor-pointer"
                    >
                      Mark Reviewed
                    </button>
                  )}
                  {item.status !== 'resolved' && (
                    <button
                      onClick={() => updateStatus(item.id, 'resolved')}
                      className="px-3 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold rounded-md cursor-pointer"
                    >
                      Mark Resolved
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
