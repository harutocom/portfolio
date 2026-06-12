'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../page.module.css';
import { type Lang, type SiteContent, type WorkItem } from '../content';
import { langQuery } from '../lib/useLang';
import { GitHubIcon } from './Icons';

interface WorkModalProps {
  work: WorkItem;
  t: SiteContent;
  lang: Lang;
  onClose: () => void;
}

export default function WorkModal({ work, t, lang, onClose }: WorkModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Escape to close + trap Tab focus inside the dialog; restore focus on close
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !contentRef.current) return;
      const focusables = contentRef.current.querySelectorAll<HTMLElement>(
        'button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={work.title[lang]}
    >
      <div ref={contentRef} className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button
          ref={closeBtnRef}
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
        <div className={styles.modalImageWrapper}>
          <Image
            src={work.image}
            alt={work.title[lang]}
            fill
            className={styles.modalImage}
          />
        </div>
        <div className={styles.modalBody}>
          <div className={styles.cardTags}>
            {work.tags.map(tag => (
              <span key={tag} className={styles.cardTag}>{tag}</span>
            ))}
          </div>
          <h3 className={styles.modalTitle}>{work.title[lang]}</h3>
          <p className={styles.modalDesc}>{work.desc[lang]}</p>
          <div className={styles.modalDetails}>
            <div className={styles.detailSection}>
              <h4>{t.works.background_label}</h4>
              <p>{work.background[lang]}</p>
            </div>
            <div className={styles.detailSection}>
              <h4>{t.works.challenge_label}</h4>
              <p>{work.challenge[lang]}</p>
            </div>
            <div className={styles.detailSection}>
              <h4>{t.works.tech_label}</h4>
              <p>{work.tech_reason[lang]}</p>
            </div>
          </div>
          <div className={styles.modalLinks}>
            {work.slug && (
              <Link
                href={`/works/${work.slug}${langQuery(lang)}`}
                className={`${styles.modalLinkBtn} ${styles.modalLinkBtnPrimary}`}
              >
                {t.works.case_study_btn} →
              </Link>
            )}
            <a
              href={work.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.modalLinkBtn}
            >
              <GitHubIcon /> {t.works.github}
            </a>
            {work.demo && (
              <a
                href={work.demo}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.modalLinkBtn}
              >
                ↗ {t.works.demo}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
