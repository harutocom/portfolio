'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '../page.module.css';
import { worksData, type Lang, type SiteContent, type WorkItem } from '../content';
import { GitHubIcon } from './Icons';

interface WorksProps {
  t: SiteContent;
  lang: Lang;
  onSelectWork: (work: WorkItem) => void;
}

export default function Works({ t, lang, onSelectWork }: WorksProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const allTags = ['all', ...Array.from(new Set(worksData.flatMap(w => w.tags)))];
  const filteredWorks = activeFilter === 'all'
    ? worksData
    : worksData.filter(w => w.tags.includes(activeFilter));

  return (
    <section id="works" className={styles.worksSection}>
      <div className="container">
        <h2 className="section-title">{t.works.title}</h2>
        <div className={styles.worksFilter}>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`${styles.filterBtn} ${activeFilter === tag ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter(tag)}
            >
              {tag === 'all' ? t.works.filter_all : tag}
            </button>
          ))}
        </div>
        <div className={`reveal ${styles.worksGrid}`}>
          {filteredWorks.map(work => (
            <article key={work.id} className={styles.projectCard}>
              <div className={styles.cardImageWrapper}>
                <Image
                  src={work.image}
                  alt={work.title[lang]}
                  fill
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{work.title[lang]}</h3>
                <p className={styles.cardDesc}>{work.desc[lang]}</p>
                <div className={styles.cardTags}>
                  {work.tags.map(tag => (
                    <span key={tag} className={styles.cardTag}>{tag}</span>
                  ))}
                </div>
                <div className={styles.cardFooter}>
                  <div className={styles.cardLinks}>
                    <a
                      href={work.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.cardLink}
                    >
                      <GitHubIcon />
                      {' '}{t.works.github}
                    </a>
                    {work.demo && (
                      <a
                        href={work.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.cardLink}
                      >
                        ↗ {t.works.demo}
                      </a>
                    )}
                  </div>
                  <button
                    className={styles.detailToggle}
                    onClick={() => onSelectWork(work)}
                    aria-label={`${work.title[lang]} の詳細`}
                  >
                    {t.works.detail_btn}
                    <span className={styles.toggleIcon}>↗</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
