'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import styles from '../page.module.css';
import { content, type Lang, type WorkItem } from '../content';
import { type ZennArticle } from '../lib/zenn';
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

const subscribeTheme = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
};

// The ?lang= query param is the source of truth so the EN version is shareable by URL
const subscribeLang = (onChange: () => void) => {
  window.addEventListener('popstate', onChange);
  window.addEventListener('langchange', onChange);
  return () => {
    window.removeEventListener('popstate', onChange);
    window.removeEventListener('langchange', onChange);
  };
};
const getLangSnapshot = (): Lang =>
  new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'ja';

export default function Home({ articles }: { articles: ZennArticle[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [showBackTop, setShowBackTop] = useState(false);
  const [modalWork, setModalWork] = useState<WorkItem | null>(null);

  const lang = useSyncExternalStore(subscribeLang, getLangSnapshot, (): Lang => 'ja');
  const t = content[lang];

  // data-theme attribute (set before paint by the inline script) is the source of truth
  const darkMode = useSyncExternalStore(
    subscribeTheme,
    () => document.documentElement.getAttribute('data-theme') === 'dark',
    () => false
  );

  // Keep <html lang> in sync for assistive tech
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

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

  const toggleLang = () => {
    const url = new URL(window.location.href);
    if (lang === 'ja') url.searchParams.set('lang', 'en');
    else url.searchParams.delete('lang');
    window.history.replaceState(null, '', url);
    window.dispatchEvent(new Event('langchange'));
  };
  const toggleDark = () => {
    const theme = darkMode ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

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
