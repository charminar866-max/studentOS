import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-slate-800 text-xs sm:text-sm leading-relaxed">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-900">Terms of Service</h1>
        <p className="text-slate-500 text-xs mt-1">Last Updated: March 2025</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-slate-900">1. Agreement to Terms</h2>
        <p>
          By accessing or using StudentOS, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-slate-900">2. Account Registration & User Security</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials. You agree that all registration information provided is accurate and true. Account sharing or unauthorized access is strictly prohibited.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-slate-900">3. User Data Isolation & Ownership</h2>
        <p>
          All resumes, application materials, and profile details created on StudentOS remain your sole property. We protect user data through isolated Row Level Security policies.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-bold text-slate-900">4. Acceptable Use Policy</h2>
        <p>
          You agree not to use StudentOS for illegal activities, spam, automated scraping, or uploading malicious content. Violations may result in account termination.
        </p>
      </section>
    </div>
  );
}
