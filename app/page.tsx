'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { content, skills, worksData, timelineData, certsData, ZENN_USERNAME, ZENN_SCRAP_URL, type Lang, type WorkItem } from './content';

const STATS = { projects: 3, internship: 6, commits: 120 };

function useCountUp(target: number, triggered: boolean, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    let current = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [triggered, target, duration]);
  return count;
}

export default function Home() {
  const [lang, setLang] = useState<Lang>('ja');
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [showBackTop, setShowBackTop] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [modalWork, setModalWork] = useState<WorkItem | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);
  const [statsTriggered, setStatsTriggered] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const t = content[lang];

  const projectsCount = useCountUp(STATS.projects, statsTriggered);
  const internshipCount = useCountUp(STATS.internship, statsTriggered);
  const commitsCount = useCountUp(STATS.commits, statsTriggered);

  // Initial dark mode sync
  useEffect(() => {
    setDarkMode(document.documentElement.getAttribute('data-theme') === 'dark');
  }, []);

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

  // Stats countup trigger
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsTriggered(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = modalWork ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalWork]);

  const toggleLang = () => setLang(l => l === 'ja' ? 'en' : 'ja');
  const closeMenu = () => setMenuOpen(false);
  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    const theme = next ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  const allTags = ['all', ...Array.from(new Set(worksData.flatMap(w => w.tags)))];
  const filteredWorks = activeFilter === 'all'
    ? worksData
    : worksData.filter(w => w.tags.includes(activeFilter));

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Portfolio] ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
    setFormSent(true);
  };

  const levelToWidth = (level: 1 | 2 | 3) =>
    level === 3 ? '95%' : level === 2 ? '65%' : '30%';

  const navSections = ['about', 'skills', 'works', 'timeline', 'writing', 'contact'] as const;

  return (
    <>
      {/* ── Progress Bar ── */}
      <div
        className={styles.progressBar}
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <main className={styles.main}>

        {/* ── Navbar ── */}
        <nav className={styles.navbar}>
          <div className={`container ${styles.navContainer}`}>
            <div className={styles.logo}>portfolio.</div>
            <div className={styles.navLinks}>
              {navSections.map(sec => (
                <a
                  key={sec}
                  href={`#${sec}`}
                  className={activeSection === sec ? styles.navLinkActive : undefined}
                >
                  {t.nav[sec]}
                </a>
              ))}
            </div>
            <div className={styles.navRight}>
              <button className={styles.darkToggle} onClick={toggleDark} aria-label="Toggle dark mode">
                <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`} aria-hidden="true" />
              </button>
              <button className={styles.langToggle} onClick={toggleLang} aria-label="Toggle language">
                {lang === 'ja' ? 'EN' : 'JA'}
              </button>
              <button
                className={styles.hamburger}
                onClick={() => setMenuOpen(o => !o)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                <span className={`${styles.hLine} ${menuOpen ? styles.hLineTop : ''}`} />
                <span className={`${styles.hLine} ${menuOpen ? styles.hLineMid : ''}`} />
                <span className={`${styles.hLine} ${menuOpen ? styles.hLineBot : ''}`} />
              </button>
            </div>
          </div>
        </nav>

        {/* ── Mobile Menu ── */}
        {menuOpen && (
          <div className={styles.mobileMenu}>
            <div className="container">
              <div className={styles.mobileNavLinks}>
                {navSections.map(sec => (
                  <a key={sec} href={`#${sec}`} className={styles.mobileNavLink} onClick={closeMenu}>
                    {t.nav[sec]}
                  </a>
                ))}
              </div>
              <button
                className={styles.mobileLangToggle}
                onClick={() => { toggleLang(); closeMenu(); }}
              >
                {lang === 'ja' ? '→ Switch to English' : '→ 日本語に切り替え'}
              </button>
            </div>
          </div>
        )}

        {/* ── Hero ── */}
        <section className={styles.hero} id="home">
          <div className={styles.heroParticles} aria-hidden="true">
            {Array.from({ length: 12 }, (_, i) => (
              <span
                key={i}
                className={styles.particle}
                style={{
                  '--p-x': `${(i * 37 + 11) % 100}%`,
                  '--p-y': `${(i * 53 + 7) % 100}%`,
                  '--p-delay': `${(i * 0.7) % 5}s`,
                  '--p-dur': `${6 + (i % 4)}s`,
                  '--p-size': `${3 + (i % 3) * 2}px`,
                } as React.CSSProperties}
              />
            ))}
          </div>
          <div className="container">
            <div className={`animate-fade-in-up ${styles.heroContent}`}>
              <span className={styles.heroLabel}>{t.hero.greeting}</span>
              <h1 className={styles.heroTitle}>{t.hero.name}</h1>
              <p className={styles.heroSubtitle}>{t.hero.tagline}</p>
              <div className={styles.heroCtas}>
                <a href="#works" className={styles.ctaPrimary}>{t.hero.cta_works}</a>
                <a href="#contact" className={styles.ctaSecondary}>{t.hero.cta_contact}</a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <div ref={statsRef} className={`reveal ${styles.statsRow}`}>
          <div className="container">
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>
                  {projectsCount}<span className={styles.statSuffix}>+</span>
                </span>
                <span className={styles.statLabel}>{t.stats.projects}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>
                  {internshipCount}<span className={styles.statSuffix}>+</span>
                </span>
                <span className={styles.statLabel}>{t.stats.internship}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>
                  {commitsCount}<span className={styles.statSuffix}>+</span>
                </span>
                <span className={styles.statLabel}>{t.stats.commits}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── About ── */}
        <section id="about" className={styles.aboutSection}>
          <div className="container">
            <h2 className="section-title">{t.about.title}</h2>
            <div className={`reveal ${styles.aboutGrid}`}>
              <div className={styles.aboutLeft}>
                <div className={styles.avatar}>
                  <span className={styles.avatarInitials}>HT</span>
                </div>
                <p className={styles.metaName}>{t.about.name}</p>
                <p className={styles.metaRole}>{t.about.role}</p>
                <p className={styles.metaItem}>{t.about.university}</p>
                <p className={styles.metaItem}>{t.about.location}</p>
              </div>
              <div className={styles.aboutRight}>
                <p className={styles.leadText}>{t.about.bio}</p>
                <p className={styles.aboutBody}>{t.about.motivation}</p>
                <p className={styles.hobbiesLabel}>{t.about.hobbies_label}</p>
                <div className={styles.hobbiesList}>
                  {t.about.hobbies.map(h => (
                    <span key={h} className={styles.hobbyTag}>{h}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Skills ── */}
        <section id="skills" className={styles.skillsSection}>
          <div className="container">
            <h2 className="section-title">{t.skills.title}</h2>
            <div className={`reveal ${styles.skillsGrid}`}>
              {(['frontend', 'backend', 'infra'] as const).map(cat => (
                <div key={cat} className={styles.skillCategory}>
                  <h3 className={styles.categoryTitle}>{t.skills[cat]}</h3>
                  {skills[cat].map((s, idx) => (
                    <div
                      key={s.name}
                      className={styles.skillItem}
                      style={{ '--bar-delay': `${idx * 0.1}s` } as React.CSSProperties}
                    >
                      <div className={styles.skillItemTop}>
                        <span className={styles.skillName}>{s.name}</span>
                        <span className={styles.skillPct}>
                          {t.skills.levels[s.level === 3 ? 'high' : s.level === 2 ? 'mid' : 'low']}
                        </span>
                      </div>
                      <div className={styles.skillBarTrack}>
                        <div
                          className={styles.skillBar}
                          style={{ '--bar-w': levelToWidth(s.level) } as React.CSSProperties}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Certifications ── */}
        <div className={`reveal ${styles.certsWrapper}`}>
          <div className="container">
            <p className={styles.certsTitle}>{t.certs.title}</p>
            <div className={styles.certsGrid}>
              {certsData.map((cert, i) => (
                <div key={i} className={styles.certCard}>
                  <div className={styles.certMain}>
                    <span className={styles.certName}>{cert.name[lang]}</span>
                    {cert.score && (
                      <span className={styles.certScore}>
                        {t.certs.score_label} {cert.score}
                      </span>
                    )}
                  </div>
                  <div className={styles.certMeta}>
                    <span>{cert.issuer}</span>
                    <span>{cert.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Works ── */}
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
                          <i className="fab fa-github" aria-hidden="true" />
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
                        onClick={() => setModalWork(work)}
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

        {/* ── Timeline ── */}
        <section id="timeline" className={styles.timelineSection}>
          <div className="container">
            <h2 className="section-title">{t.timeline.title}</h2>
            <div className={`reveal ${styles.timelineList}`}>
              {timelineData.map((item, i) => (
                <div key={i} className={styles.timelineItem}>
                  <div className={styles.timelineLeft}>
                    <span className={styles.timelineYear}>{item.year}</span>
                  </div>
                  <div className={styles.timelineDot} />
                  <div className={styles.timelineRight}>
                    <p className={styles.timelineEvent}>{item.event[lang]}</p>
                    {item.detail[lang] && (
                      <p className={styles.timelineDetail}>{item.detail[lang]}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Writing ── */}
        <section id="writing" className={styles.writingSection}>
          <div className="container">
            <h2 className="section-title">{t.writing.title}</h2>
            <div className={`reveal ${styles.writingGrid}`}>
              {/* Active scrap */}
              <a
                href={ZENN_SCRAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.writingCard}
              >
                <div className={styles.writingCardHeader}>
                  <span className={styles.writingPlatform}>Zenn</span>
                  <span className={styles.writingBadge}>{t.writing.scrap_label}</span>
                </div>
                <h3 className={styles.writingCardTitle}>{t.writing.scrap_title}</h3>
                <p className={styles.writingCardDesc}>{t.writing.scrap_desc}</p>
                <span className={styles.writingCardLink}>
                  {t.writing.view_profile} ↗
                </span>
              </a>
              {/* Planned article */}
              <div className={`${styles.writingCard} ${styles.writingCardPlanned}`}>
                <div className={styles.writingCardHeader}>
                  <span className={styles.writingPlatform}>Zenn</span>
                  <span className={styles.writingBadge}>{t.writing.planned_label}</span>
                </div>
                <h3 className={styles.writingCardTitle}>{t.writing.scrap_title}</h3>
                <p className={styles.writingCardDesc}>{t.writing.planned_note}</p>
              </div>
              {/* Profile link */}
              <a
                href={`https://zenn.dev/${ZENN_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.writingCard} ${styles.writingCardProfile}`}
              >
                <span className={styles.writingProfileLabel}>@{ZENN_USERNAME}</span>
                <span className={styles.writingProfileSub}>Zenn Profile ↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className={styles.contactSection}>
          <div className="container">
            <h2 className="section-title">{t.contact.title}</h2>
            <div className={`reveal ${styles.contactLayout}`}>
              <div className={styles.contactInfo}>
                <p className={styles.leadText}>{t.contact.lead}</p>
                <p className={styles.contactBody}>{t.contact.body}</p>
                <div className={styles.contactLinks}>
                  <a href="mailto:hello@example.com" className={styles.contactLinkItem}>
                    <i className="far fa-envelope" aria-hidden="true" />
                    hello@example.com
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.contactLinkItem}>
                    <i className="fab fa-github" aria-hidden="true" />
                    GitHub
                  </a>
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer" className={styles.contactLinkItem}>
                    <i className="fab fa-x-twitter" aria-hidden="true" />
                    X (Twitter)
                  </a>
                </div>
              </div>
              <form className={styles.contactForm} onSubmit={handleFormSubmit}>
                {formSent ? (
                  <p className={styles.formSentMsg}>{t.contact.form.sent}</p>
                ) : (
                  <>
                    <div className={styles.formGroup}>
                      <label htmlFor="cf-name" className={styles.formLabel}>
                        {t.contact.form.name_label}
                      </label>
                      <input
                        id="cf-name"
                        type="text"
                        required
                        className={styles.formInput}
                        value={formData.name}
                        onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="cf-email" className={styles.formLabel}>
                        {t.contact.form.email_label}
                      </label>
                      <input
                        id="cf-email"
                        type="email"
                        required
                        className={styles.formInput}
                        value={formData.email}
                        onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="cf-message" className={styles.formLabel}>
                        {t.contact.form.message_label}
                      </label>
                      <textarea
                        id="cf-message"
                        required
                        rows={5}
                        className={styles.formTextarea}
                        value={formData.message}
                        onChange={e => setFormData(f => ({ ...f, message: e.target.value }))}
                      />
                    </div>
                    <button type="submit" className={styles.formSubmit}>
                      {t.contact.form.send}
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className={styles.footer}>
          <div className="container">
            <div className={styles.footerContent}>
              <p>© {new Date().getFullYear()} Haruto Tanaka.</p>
              <div className={styles.socialLinks}>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer">X</a>
              </div>
            </div>
          </div>
        </footer>

        {/* ── Back to Top ── */}
        <button
          className={`${styles.backToTop} ${showBackTop ? styles.backToTopVisible : ''}`}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          ↑
        </button>

      </main>

      {/* ── Works Modal ── */}
      {modalWork && (
        <div
          className={styles.modalOverlay}
          onClick={() => setModalWork(null)}
          role="dialog"
          aria-modal="true"
          aria-label={modalWork.title[lang]}
        >
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={() => setModalWork(null)}
              aria-label="Close"
            >
              ✕
            </button>
            <div className={styles.modalImageWrapper}>
              <Image
                src={modalWork.image}
                alt={modalWork.title[lang]}
                fill
                className={styles.modalImage}
              />
            </div>
            <div className={styles.modalBody}>
              <div className={styles.cardTags}>
                {modalWork.tags.map(tag => (
                  <span key={tag} className={styles.cardTag}>{tag}</span>
                ))}
              </div>
              <h3 className={styles.modalTitle}>{modalWork.title[lang]}</h3>
              <p className={styles.modalDesc}>{modalWork.desc[lang]}</p>
              <div className={styles.modalDetails}>
                <div className={styles.detailSection}>
                  <h4>{t.works.background_label}</h4>
                  <p>{modalWork.background[lang]}</p>
                </div>
                <div className={styles.detailSection}>
                  <h4>{t.works.challenge_label}</h4>
                  <p>{modalWork.challenge[lang]}</p>
                </div>
                <div className={styles.detailSection}>
                  <h4>{t.works.tech_label}</h4>
                  <p>{modalWork.tech_reason[lang]}</p>
                </div>
              </div>
              <div className={styles.modalLinks}>
                <a
                  href={modalWork.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.modalLinkBtn}
                >
                  <i className="fab fa-github" aria-hidden="true" /> {t.works.github}
                </a>
                {modalWork.demo && (
                  <a
                    href={modalWork.demo}
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
      )}
    </>
  );
}
