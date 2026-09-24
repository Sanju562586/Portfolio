'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-[min(1280px,92%)] mx-auto mt-20 sm:mt-28 mb-10 sm:mb-12 pt-10 sm:pt-12 border-t border-white/10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 pb-8 sm:pb-10">
        <div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
            <span className="font-serif text-xl sm:text-2xl font-semibold text-white">Sanjay Kumar Dupati</span>
            <span className="glossy-chip text-[10px] font-mono px-2.5 py-0.5 rounded-full text-blue-300 font-bold">
              AI & Systems Engineer
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-md">
            Architecting dependable autonomous agent loops, multimodal vision pipelines, and distributed streaming systems.
          </p>
        </div>

        {/* Live Location & Local Time Badge */}
        <div className="flex flex-col items-start md:items-end gap-1.5 font-mono text-[11px] sm:text-xs">
          <div className="glossy-chip px-3 sm:px-3.5 py-1.5 rounded-full flex items-center gap-2 text-slate-200 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span>HYDERABAD, INDIA</span>
            <span className="text-slate-500">·</span>
            <span className="text-blue-400 font-semibold">{time || 'IST'}</span>
          </div>
          <span className="text-[10px] sm:text-[11px] text-slate-400">AVAILABLE FOR SELECT COLLABORATIONS</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 font-mono text-[10px] sm:text-[11px] text-slate-400 text-center sm:text-left">
        <span>© {new Date().getFullYear()} SANJAY KUMAR DUPATI. ALL RIGHTS RESERVED.</span>

        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
          <a
            href="https://github.com/Sanju562586"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors flex items-center gap-1.5 font-medium"
          >
            <Github size={13} />
            <span>GitHub</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors flex items-center gap-1.5 font-medium"
          >
            <Linkedin size={13} />
            <span>LinkedIn</span>
          </a>
          <a
            href="mailto:sanjaykumardupati6@gmail.com"
            className="hover:text-blue-400 transition-colors flex items-center gap-1.5 font-medium"
          >
            <Mail size={13} />
            <span>Email</span>
          </a>
          <button
            onClick={scrollToTop}
            aria-label="Back to Top"
            className="hover:text-blue-400 transition-colors flex items-center gap-1 font-bold cursor-pointer border-0 bg-transparent"
          >
            <span>TOP</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
