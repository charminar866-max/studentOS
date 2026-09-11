'use client';

import React from 'react';
import Link from 'next/link';
import { AdSlot } from '@/components/ads/AdSlot';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-black text-lg text-white">
              <span className="bg-indigo-600 text-white p-1 rounded-md text-xs font-bold">OS</span>
              <span>StudentOS</span>
            </Link>
            <p className="text-slate-400 leading-relaxed text-xs">
              The modern career and academic workspace for students, job seekers, and educators.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">Platform</h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="hover:text-white transition-colors">
                  Job Search
                </Link>
              </li>
              <li>
                <Link href="/resume" className="hover:text-white transition-colors">
                  ATS Resume Builder
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Student Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">Company</h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">Legal & Trust</h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Reserved Ad Placement in Footer */}
        <div className="pt-4 border-t border-slate-800/80">
          <AdSlot placement="footer-banner" />
        </div>

        {/* Bottom copyright */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} StudentOS. All rights reserved.</p>
          <p>Built for production launch with privacy and security first.</p>
        </div>
      </div>
    </footer>
  );
}
