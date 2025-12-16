import type { Metadata } from 'next';
import './globals.css';
import StarField from '@/components/StarField';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'AstroScope - Space Decoded',
  description: 'Explore space missions with AI-powered insights from NASA data',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-space-dark text-white">
        <StarField />
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
