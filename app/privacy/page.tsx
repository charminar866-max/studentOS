import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-slate-800 text-xs sm:text-sm leading-relaxed">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
        <p className="text-slate-500 text-xs mt-1">Last Updated: March 2025</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
        <p>
          We collect personal details voluntarily provided during registration, such as your full name, email address, mobile number, country, and state. When submitting visitor feedback, we record ratings, category choices, and page context.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-slate-900">2. How We Use Your Data</h2>
        <p>
          Your information is used strictly to provide workspace features, job recommendations, resume building, and user authentication. We do not sell your personal information to third parties.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-slate-900">3. Advertising & Cookies Disclosure</h2>
        <p>
          StudentOS may display compliant advertisements provided by vetted ad networks in designated non-intrusive ad slots. Cookies and device identifiers may be used to deliver relevant sponsorship information in compliance with privacy regulations.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-slate-900">4. Your Data Rights (GDPR / Data Export)</h2>
        <p>
          You have the right to inspect, update, export, or request deletion of your personal data at any time via your account settings.
        </p>
      </section>
    </div>
  );
}
