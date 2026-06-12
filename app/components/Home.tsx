'use client';

import { useState, useEffect } from 'react';
import styles from '../page.module.css';
import { content, type WorkItem } from '../content';
import { type ZennArticle } from '../lib/zenn';
import { useLang } from '../lib/useLang';
import { useTheme } from '../lib/useTheme';
import Navbar from './Navbar';
import Hero from './Hero';
import StatsRow from './StatsRow';
import About from './About';
import Skills from './Skills';
import Certs from './Certs';
import Works from './Works';
import Timeline from './Timeline';
import Writing from './Writing';
import Contact from './Contact';
import Footer from './Footer';
import WorkModal from './WorkModal';

export default function Home({ articles }: { articles: ZennArticle[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [showBackTop, setShowBackTop] = useState(false);
  const [modalWork, setModalWork] = useState<WorkItem | null>(null);

  const { lang, toggleLang } = useLang();
  const { darkMode, toggleDark } = useTheme();
  const t = content[lang];

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Scroll progress + back-to-top
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (scrolled / total) * 100 : 0);
      setShowBackTop(scrolled > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'works', 'timeline', 'writing', 'contact'];
    const observers = sectionIds.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(obs => obs?.disconnect());
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = modalWork ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalWork]);

  return (
    <>
      {/* ── Progress Bar ── */}
      <div
        className={styles.progressBar}
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <main className={styles.main}>
        <Navbar
          t={t}
          lang={lang}
          darkMode={darkMode}
          menuOpen={menuOpen}
          activeSection={activeSection}
          onToggleDark={toggleDark}
          onToggleLang={toggleLang}
          onToggleMenu={() => setMenuOpen(o => !o)}
          onCloseMenu={() => setMenuOpen(false)}
        />
        <Hero t={t} />
        <StatsRow t={t} />
        <About t={t} />
        <Skills t={t} />
        <Certs t={t} lang={lang} />
        <Works t={t} lang={lang} onSelectWork={setModalWork} />
        <Timeline t={t} lang={lang} />
        <Writing t={t} articles={articles} />
        <Contact t={t} />
        <Footer />

        {/* ── Back to Top ── */}
        <button
          className={`${styles.backToTop} ${showBackTop ? styles.backToTopVisible : ''}`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          ↑
        </button>
      </main>

      {modalWork && (
        <WorkModal
          work={modalWork}
          t={t}
          lang={lang}
          onClose={() => setModalWork(null)}
        />
      )}
    </>
  );
}
