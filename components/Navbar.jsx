'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Track scroll for navbar frosted backdrop
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 15);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to smoothly highlight active section while scrolling
  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection(pathname.replace('/', '') || 'home');
      return;
    }

    const sections = ['hero', 'agent-terminal', 'work', 'capabilities', 'profile', 'contact'];
    const sectionElements = sections.map((id) => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === 'hero' || entry.target.id === 'agent-terminal') {
              setActiveSection('home');
            } else {
              setActiveSection(entry.target.id);
            }
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const navLinks = [
    { name: 'Home', id: 'home', href: '/' },
    { name: 'Work', id: 'work', href: '/#work' },
    { name: 'Projects', id: 'projects', href: '/projects' },
    { name: 'Capabilities', id: 'capabilities', href: '/#capabilities' },
    { name: 'Profile', id: 'profile', href: '/#profile' },
    { name: 'Contact', id: 'contact', href: '/#contact' },
  ];

  const handleNavClick = (e, link) => {
    if (link.href === '/projects') {
      return; // Standard Next.js route navigation
    }

    if (pathname === '/') {
      e.preventDefault();
      const targetId = link.id === 'home' ? 'hero' : link.id;
      const el = document.getElementById(targetId);
      if (el) {
        if (window.__lenis) {
          window.__lenis.scrollTo(el, { offset: -70, duration: 0.95 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveSection(link.id);
      }
    }
  };

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-3 left-0 right-0 z-50 w-[min(1320px,94%)] mx-auto h-[58px] sm:h-[62px] px-3.5 sm:px-6 flex items-center justify-between rounded-full border transition-all duration-300 will-change-transform ${
          scrolled
            ? 'bg-slate-950/85 backdrop-blur-2xl border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)]'
            : 'bg-slate-950/60 backdrop-blur-xl border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4),inset_0_1px_0.5px_rgba(255,255,255,0.15)]'
        }`}
      >
        {/* Wordmark Logo */}
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, { id: 'home', href: '/' })}
          className="group flex items-center gap-2 sm:gap-2.5 font-serif text-xl sm:text-2xl tracking-wide text-white font-semibold cursor-pointer select-none shrink-0"
        >
          <span>Sanjay Kumar</span>
          <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_12px_#3b82f6] group-hover:scale-125 transition-transform duration-300" />
        </Link>

        {/* Desktop Navigation with Smooth Gliding Active Pill */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-full">
          {navLinks.map((link) => {
            const isLinkActive =
              link.href === '/projects'
                ? pathname === '/projects'
                : pathname === '/' && activeSection === link.id;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`relative px-3.5 lg:px-4 py-1.5 rounded-full font-mono text-[11px] tracking-wider uppercase transition-colors duration-200 select-none ${
                  isLinkActive
                    ? 'text-white font-bold'
                    : 'text-slate-300 hover:text-white font-medium'
                }`}
              >
                {isLinkActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 bg-white/15 rounded-full border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]"
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Glossy Blue Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, { id: 'contact', href: '/#contact' })}
            className="glossy-pill-blue px-4 lg:px-5 py-2 rounded-full font-mono text-[11px] tracking-wider uppercase flex items-center gap-1.5 shadow-lg cursor-pointer shrink-0"
          >
            <span>Start a conversation</span>
            <span>↗</span>
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/10 font-mono text-[10px] sm:text-[11px] tracking-wider uppercase text-white font-semibold cursor-pointer shrink-0"
        >
          <span>{mobileMenuOpen ? 'CLOSE' : 'MENU'}</span>
          <span className="text-blue-400">{mobileMenuOpen ? '✕' : '+'}</span>
        </button>
      </header>

      {/* Mobile Drawer Menu & Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-[72px] sm:top-20 left-3 right-3 sm:left-4 sm:right-4 z-40 p-5 sm:p-6 rounded-[24px] sm:rounded-3xl bg-slate-950/95 border border-white/15 backdrop-blur-3xl flex flex-col gap-3 sm:gap-4 md:hidden shadow-2xl max-h-[calc(100vh-5.5rem)] overflow-y-auto"
            >
              <div className="flex flex-col gap-1.5">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleNavClick(e, link);
                    }}
                    className="px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-widest text-slate-200 hover:text-white hover:bg-white/10 font-semibold transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10">
                <a
                  href="#contact"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavClick(e, { id: 'contact', href: '/#contact' });
                  }}
                  className="w-full block py-3 text-center glossy-pill-blue rounded-full font-mono text-xs uppercase tracking-widest font-semibold shadow-md cursor-pointer"
                >
                  Start a conversation ↗
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
