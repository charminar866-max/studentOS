import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FeedbackWidget } from '@/components/feedback/FeedbackWidget';

export const metadata: Metadata = {
  title: 'StudentOS — Pre-Launch All-in-One Career & Student Platform',
  description:
    'StudentOS connects students and job seekers with opportunities, ATS resume building, and career guidance.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'StudentOS — Career & Academic Workspace',
    description: 'Empowering students and job seekers with ATS resume tools and job matching.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StudentOS',
    description: 'Empowering students and job seekers with ATS resume tools and job matching.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <FeedbackWidget />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
