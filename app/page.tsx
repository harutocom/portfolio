'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { content, skills, worksData, timelineData, type Lang } from './content';

export default function Home() {
  const [lang, setLang] = useState<Lang>('ja');
  const [expandedWork, setExpandedWork] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = content[lang];

  const toggleLang = () => setLang(l => l === 'ja' ? 'en' : 'ja');
  const toggleWork = (id: number) =>
    setExpandedWork(prev => prev === id ? null : id);
  const closeMenu = () => setMenuOpen(false);

  return (
    <main className={styles.main}>

      {/* ── Navbar ── */}
      <nav className={styles.navbar}>
        <div className={`container ${styles.navContainer}`}>
          <div className={styles.logo}>portfolio.</div>
          <div className={styles.navLinks}>
            <a href="#about">{t.nav.about}</a>
            <a href="#skills">{t.nav.skills}</a>
            <a href="#works">{t.nav.works}</a>
            <a href="#timeline">{t.nav.timeline}</a>
            <a href="#contact">{t.nav.contact}</a>
          </div>
          <div className={styles.navRight}>
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

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <div className="container">
            <div className={styles.mobileNavLinks}>
              <a href="#about" className={styles.mobileNavLink} onClick={closeMenu}>{t.nav.about}</a>
              <a href="#skills" className={styles.mobileNavLink} onClick={closeMenu}>{t.nav.skills}</a>
              <a href="#works" className={styles.mobileNavLink} onClick={closeMenu}>{t.nav.works}</a>
              <a href="#timeline" className={styles.mobileNavLink} onClick={closeMenu}>{t.nav.timeline}</a>
              <a href="#contact" className={styles.mobileNavLink} onClick={closeMenu}>{t.nav.contact}</a>
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

      {/* ── About ── */}
      <section id="about" className={styles.aboutSection}>
        <div className="container">
          <h2 className="section-title">{t.about.title}</h2>
          <div className={styles.aboutGrid}>
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
          <div className={styles.skillsGrid}>
            {(['frontend', 'backend', 'infra'] as const).map(cat => (
              <div key={cat} className={styles.skillCategory}>
                <h3 className={styles.categoryTitle}>{t.skills[cat]}</h3>
                {skills[cat].map(s => (
                  <div key={s.name} className={styles.skillItem}>
                    <span className={styles.skillName}>{s.name}</span>
                    <span className={styles.skillLevel}>
                      {([1, 2, 3] as const).map(n => (
                        <span
                          key={n}
                          className={`${styles.dot} ${n <= s.level ? styles.dotFilled : ''}`}
                        />
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className={styles.skillLegend}>
            <span>
              <span className={`${styles.dot} ${styles.dotFilled}`} />
              <span className={`${styles.dot} ${styles.dotFilled}`} />
              <span className={`${styles.dot} ${styles.dotFilled}`} />
              {' '}{t.skills.levels.high}
            </span>
            <span>
              <span className={`${styles.dot} ${styles.dotFilled}`} />
              <span className={`${styles.dot} ${styles.dotFilled}`} />
              <span className={styles.dot} />
              {' '}{t.skills.levels.mid}
            </span>
            <span>
              <span className={`${styles.dot} ${styles.dotFilled}`} />
              <span className={styles.dot} />
              <span className={styles.dot} />
              {' '}{t.skills.levels.low}
            </span>
          </div>
        </div>
      </section>

      {/* ── Works ── */}
      <section id="works" className={styles.worksSection}>
        <div className="container">
          <h2 className="section-title">{t.works.title}</h2>
          <div className={styles.worksGrid}>
            {worksData.map(work => (
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
                      onClick={() => toggleWork(work.id)}
                      aria-expanded={expandedWork === work.id}
                    >
                      {expandedWork === work.id ? t.works.close_btn : t.works.detail_btn}
                      <span className={`${styles.toggleIcon} ${expandedWork === work.id ? styles.toggleOpen : ''}`}>
                        ▾
                      </span>
                    </button>
                  </div>
                  {expandedWork === work.id && (
                    <div className={styles.cardDetail}>
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
                  )}
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
          <div className={styles.timelineList}>
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

      {/* ── Contact ── */}
      <section id="contact" className={styles.contactSection}>
        <div className="container">
          <h2 className="section-title">{t.contact.title}</h2>
          <div className={styles.textContent}>
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
    </main>
  );
}
