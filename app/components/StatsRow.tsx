'use client';

import { useState, useEffect, useRef } from 'react';
import styles from '../page.module.css';
import { type SiteContent } from '../content';

const STATS = { projects: 3, internship: 6, commits: 120 };

function useCountUp(target: number, triggered: boolean, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    let rafId: number;
    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) start = now;
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(target * progress));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [triggered, target, duration]);
  return count;
}

export default function StatsRow({ t }: { t: SiteContent }) {
  const [triggered, setTriggered] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const projectsCount = useCountUp(STATS.projects, triggered);
  const internshipCount = useCountUp(STATS.internship, triggered);
  const commitsCount = useCountUp(STATS.commits, triggered);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const items = [
    { value: projectsCount, label: t.stats.projects },
    { value: internshipCount, label: t.stats.internship },
    { value: commitsCount, label: t.stats.commits },
  ];

  return (
    <div ref={statsRef} className={`reveal ${styles.statsRow}`}>
      <div className="container">
        <div className={styles.statsGrid}>
          {items.map(item => (
            <div key={item.label} className={styles.statItem}>
              <span className={styles.statNumber}>
                {item.value}<span className={styles.statSuffix}>+</span>
              </span>
              <span className={styles.statLabel}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
