'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';

const CATEGORIES = [
  'General feedback',
  'Bug/problem',
  'Design/UI issue',
  'Performance/slow loading',
  'Feature request',
  'Content issue',
  'Other',
];

export function FeedbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [category, setCategory] = useState<string>('General feedback');
  const [message, setMessage] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  // Sync state if user loads
  const [syncedUserId, setSyncedUserId] = useState<string | null>(null);
  if (user && user.id !== syncedUserId) {
    setSyncedUserId(user.id);
    if (user.email) setEmail(user.email);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setError('Please describe your feedback.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const pageUrl = typeof window !== 'undefined' ? window.location.href : '/';
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating,
          category,
          message,
          email,
          pageUrl,
          userId: user?.id || null,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setIsOpen(false);
          setMessage('');
        }, 2000);
      } else {
        setError(data.error || 'Failed to submit feedback.');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Side Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-2 rounded-l-md shadow-lg transition-all duration-200 flex items-center gap-1.5 cursor-pointer border border-r-0 border-indigo-400/30 tracking-wide"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        aria-label="Open feedback form"
      >
        <span className="text-sm rotate-90 inline-block">💬</span>
        <span>Feedback</span>
      </button>

      {/* Modal Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-xs p-4 sm:p-6 transition-all">
          <div
            className="w-full max-w-md bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in slide-in-from-right duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-title"
          >
            {/* Header */}
            <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between">
              <div>
                <h3 id="feedback-title" className="text-lg font-bold flex items-center gap-2">
                  <span>💬</span> Share Your Feedback
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Help us improve your StudentOS experience
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white text-xl p-1 rounded-lg transition-colors cursor-pointer"
                aria-label="Close feedback modal"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-5 overflow-y-auto space-y-4 text-sm">
              {submitted ? (
                <div className="py-8 text-center space-y-2">
                  <div className="text-4xl">🎉</div>
                  <h4 className="text-base font-bold text-slate-900">Thank You!</h4>
                  <p className="text-xs text-slate-600">
                    Your feedback has been received and will help us make StudentOS better.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                      {error}
                    </div>
                  )}

                  {/* Rating */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      How would you rate your experience?
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`text-2xl transition-transform hover:scale-110 cursor-pointer ${
                            star <= rating ? 'text-amber-400' : 'text-slate-200'
                          }`}
                          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                        >
                          ★
                        </button>
                      ))}
                      <span className="text-xs text-slate-500 font-medium ml-1">
                        ({rating} / 5)
                      </span>
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label
                      htmlFor="feedback-category"
                      className="block text-xs font-semibold text-slate-700 mb-1"
                    >
                      Feedback Category
                    </label>
                    <select
                      id="feedback-category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="feedback-message"
                      className="block text-xs font-semibold text-slate-700 mb-1"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="feedback-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what happened or how we can improve..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="feedback-email"
                      className="block text-xs font-semibold text-slate-700 mb-1"
                    >
                      Email Address (optional)
                    </label>
                    <input
                      id="feedback-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-5 py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
                    >
                      {submitting ? 'Submitting...' : 'Submit Feedback'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
