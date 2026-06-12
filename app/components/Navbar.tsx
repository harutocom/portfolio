import styles from '../page.module.css';
import { type Lang, type SiteContent } from '../content';
import { SunIcon, MoonIcon } from './Icons';

export const navSections = ['about', 'skills', 'works', 'timeline', 'writing', 'contact'] as const;

interface NavbarProps {
  t: SiteContent;
  lang: Lang;
  darkMode: boolean;
  menuOpen: boolean;
  activeSection: string;
  onToggleDark: () => void;
  onToggleLang: () => void;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
}

export default function Navbar({
  t, lang, darkMode, menuOpen, activeSection,
  onToggleDark, onToggleLang, onToggleMenu, onCloseMenu,
}: NavbarProps) {
  return (
    <>
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
            <button className={styles.darkToggle} onClick={onToggleDark} aria-label="Toggle dark mode">
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>
            <button className={styles.langToggle} onClick={onToggleLang} aria-label="Toggle language">
              {lang === 'ja' ? 'EN' : 'JA'}
            </button>
            <button
              className={styles.hamburger}
              onClick={onToggleMenu}
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

      {menuOpen && (
        <div className={styles.mobileMenu}>
          <div className="container">
            <div className={styles.mobileNavLinks}>
              {navSections.map(sec => (
                <a key={sec} href={`#${sec}`} className={styles.mobileNavLink} onClick={onCloseMenu}>
                  {t.nav[sec]}
                </a>
              ))}
            </div>
            <button
              className={styles.mobileLangToggle}
              onClick={() => { onToggleLang(); onCloseMenu(); }}
            >
              {lang === 'ja' ? '→ Switch to English' : '→ 日本語に切り替え'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
