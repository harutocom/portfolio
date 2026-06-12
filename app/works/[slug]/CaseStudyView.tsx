'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './caseStudy.module.css';
import { content } from '../../content';
import { type CaseStudy } from '../../caseStudies';
import { useLang, langQuery } from '../../lib/useLang';
import { useTheme } from '../../lib/useTheme';
import { SunIcon, MoonIcon, GitHubIcon } from '../../components/Icons';

export default function CaseStudyView({ caseStudy: cs }: { caseStudy: CaseStudy }) {
  const { lang, toggleLang } = useLang();
  const { darkMode, toggleDark } = useTheme();
  const t = content[lang];
  const labels = t.case_study;

  return (
    <main>
      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <Link href={`/${langQuery(lang)}#works`} className={styles.backLink}>
            ← {labels.back}
          </Link>
          <div className={styles.headerRight}>
            <button className={styles.iconBtn} onClick={toggleDark} aria-label="Toggle dark mode">
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>
            <button className={styles.iconBtn} onClick={toggleLang} aria-label="Toggle language">
              {lang === 'ja' ? 'EN' : 'JA'}
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <div className={styles.hero}>
        <div className="container">
          <span className={styles.label}>{labels.label}</span>
          <h1 className={styles.title}>{cs.title[lang]}</h1>
          <p className={styles.tagline}>{cs.tagline[lang]}</p>

          <div className={styles.metaGrid}>
            <div className={styles.metaCell}>
              <span className={styles.metaLabel}>{labels.period}</span>
              <span className={styles.metaValue}>{cs.meta.period[lang]}</span>
            </div>
            <div className={styles.metaCell}>
              <span className={styles.metaLabel}>{labels.team}</span>
              <span className={styles.metaValue}>{cs.meta.team[lang]}</span>
            </div>
            <div className={styles.metaCell}>
              <span className={styles.metaLabel}>{labels.role}</span>
              <span className={styles.metaValue}>{cs.meta.role[lang]}</span>
            </div>
            <div className={styles.metaCell}>
              <span className={styles.metaLabel}>{t.works.github}</span>
              <a
                href={cs.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.metaValue} ${styles.metaLink}`}
              >
                <GitHubIcon /> Repository ↗
              </a>
            </div>
          </div>

          <div className={styles.stackTags}>
            {cs.stack.map(tech => (
              <span key={tech} className={styles.stackTag}>{tech}</span>
            ))}
          </div>

          <div className={styles.heroImageWrapper}>
            <Image
              src={cs.image}
              alt={cs.title[lang]}
              fill
              priority
              className={styles.heroImage}
            />
          </div>
        </div>
      </div>

      {/* ── Problem ── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <h2 className="section-title">{labels.problem_title}</h2>
          <div className={styles.paragraphs}>
            {cs.problem.map((p, i) => (
              <p key={i}>{p[lang]}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className={styles.section}>
        <div className="container">
          <h2 className="section-title">{labels.features_title}</h2>
          <div className={styles.featureGrid}>
            {cs.features.map(f => (
              <div key={f.name.en} className={styles.featureCard}>
                <h3 className={styles.featureName}>{f.name[lang]}</h3>
                <p className={styles.featureDesc}>{f.desc[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Flow ── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <h2 className="section-title">{labels.flow_title}</h2>
          <pre className={styles.flowPre}>{cs.flow[lang]}</pre>
        </div>
      </section>

      {/* ── Deep dives ── */}
      <section className={styles.section}>
        <div className="container">
          <h2 className="section-title">{labels.deepdive_title}</h2>
          <div className={styles.deepDiveList}>
            {cs.deepDives.map(d => (
              <div key={d.title.en} className={styles.deepDiveItem}>
                <h3 className={styles.deepDiveTitle}>{d.title[lang]}</h3>
                <p className={styles.deepDiveBody}>{d.body[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Outcome ── */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <h2 className="section-title">{labels.outcome_title}</h2>
          <div className={styles.paragraphs}>
            {cs.outcome.map((p, i) => (
              <p key={i}>{p[lang]}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <div className="container">
        <div className={styles.footerCta}>
          <a
            href={cs.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaBtn}
          >
            <GitHubIcon /> {t.works.github}
          </a>
          {cs.demo && (
            <a
              href={cs.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.ctaBtn} ${styles.ctaBtnGhost}`}
            >
              ↗ {t.works.demo}
            </a>
          )}
          <Link href={`/${langQuery(lang)}#works`} className={`${styles.ctaBtn} ${styles.ctaBtnGhost}`}>
            ← {labels.back}
          </Link>
        </div>
      </div>
    </main>
  );
}
