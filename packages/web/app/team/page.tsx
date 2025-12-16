import React from 'react';
import { Mail, ExternalLink } from 'lucide-react';
import Button from '@/components/Button';
import Image from 'next/image';

export default function TeamPage() {
  return (
    <div className="min-h-screen pt-20 overflow-y-auto">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-6xl font-bold text-gradient mb-6">The Team</h1>
          <p className="text-xl text-white/70">
            Meet the students behind AstroScope - building the future of space exploration technology
          </p>
        </div>

        {/* Team Members */}
        <div className="max-w-5xl mx-auto mb-24">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Seifeldin Mahmoud */}
            <div className="glass-effect p-8 rounded-2xl border border-white/10 hover:border-[#00D9FF]/50 transition-all group">
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#00D9FF]/30 shadow-2xl shadow-[#00D9FF]/30">
                  <Image
                    src="/team/saif.jpeg"
                    alt="Seifeldin Mahmoud"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Seifeldin Mahmoud</h2>
                <p className="text-[#00D9FF] font-semibold mb-2">Software Engineer</p>
                <p className="text-white/60 text-sm mb-4">Applied AI/ML & Operations</p>
              </div>
              <p className="text-white/70 leading-relaxed mb-6">
                Undergraduate AI Research Assistant at Al Ain University. 
                Lead Developer at Himaya71, specializing in Django, React, and ML operations. 
                Developed AstroScope's RAG system.
              </p>
              <div className="flex gap-3 justify-center">
                <a 
                  href="https://saifmb.com/en" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 glass-effect rounded-lg hover:bg-white/10 transition-all border border-white/10 hover:border-[#00D9FF]/50 text-sm"
                  title="Portfolio"
                >
                  <ExternalLink className="w-4 h-4 text-[#00D9FF]" />
                  <span className="text-white/90">Portfolio</span>
                </a>
              </div>
            </div>

            {/* Ahmad Al Masri */}
            <div className="glass-effect p-8 rounded-2xl border border-white/10 hover:border-[#9D4EDD]/50 transition-all group">
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#9D4EDD]/30 shadow-2xl shadow-[#9D4EDD]/30">
                  <Image
                    src="/team/ahmad.jpg"
                    alt="Ahmad Almasri"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Ahmad Almasri</h2>
                <p className="text-[#9D4EDD] font-semibold mb-2">Software Engineer</p>
                <p className="text-white/60 text-sm mb-4">AI/ML & Full-Stack Developer</p>
              </div>
              <p className="text-white/70 leading-relaxed mb-6">
                Undergraduate Research Assistant at Al Ain University
                Former Software Engineering Intern at Tabashir developing AI-powered solutions 
                Specialized in Django, and OpenAI API integration.
              </p>
              <div className="flex gap-3 justify-center">
                <a 
                  href="https://ahmad-almasri.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 glass-effect rounded-lg hover:bg-white/10 transition-all border border-white/10 hover:border-[#9D4EDD]/50 text-sm"
                  title="Portfolio"
                >
                  <ExternalLink className="w-4 h-4 text-[#9D4EDD]" />
                  <span className="text-white/90">Portfolio</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="glass-effect p-10 rounded-2xl border border-white/10 text-center bg-gradient-to-r from-[#00D9FF]/5 to-[#9D4EDD]/5">
            <h3 className="text-3xl font-bold text-white mb-4">Built for Dubai Air Show 2025</h3>
            <p className="text-lg text-white/70 mb-6 max-w-2xl mx-auto">
              AstroScope was created as a student project to showcase the power of combining NASA's open data 
              with cutting-edge AI technology. Our mission is to make space exploration insights accessible to everyone.
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <span className="text-white/60">Next.js 14</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <span className="text-white/60">React Native</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <span className="text-white/60">NASA LLIS API</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <span className="text-white/60">Google Gemini AI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gradient mb-4">Get In Touch</h2>
            <p className="text-xl text-white/70">
              Interested in collaborating or have questions about AstroScope?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Email Contact */}
            <a 
              href="mailto:contact@saifmb.com"
              className="glass-effect p-8 rounded-2xl border border-white/10 hover:border-[#00D9FF]/50 transition-all group flex items-center gap-6"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#00D9FF] to-[#9D4EDD] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-[#00D9FF]/30">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Email Us</h3>
                <p className="text-[#00D9FF] font-mono text-sm">contact@saifmb.com</p>
              </div>
            </a>

            {/* Portfolio Link */}
            <a 
              href="https://saifmb.com/en"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-effect p-8 rounded-2xl border border-white/10 hover:border-[#9D4EDD]/50 transition-all group flex items-center gap-6"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#9D4EDD] to-[#00D9FF] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-[#9D4EDD]/30">
                <ExternalLink className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Visit Website</h3>
                <p className="text-[#9D4EDD] font-mono text-sm">saifmb.com/en</p>
              </div>
            </a>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-white/60 mb-6">
              We're always looking to connect with fellow space enthusiasts, developers, and innovators
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/" variant="secondary" className="px-8 py-3">
                ← Back to Home
              </Button>
              <Button href="/mission-control" variant="primary" className="px-8 py-3">
                Try Mission Control →
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Spacer */}
        <div className="py-12"></div>
      </div>
    </div>
  );
}
