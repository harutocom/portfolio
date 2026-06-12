import styles from '../page.module.css';
import { type SiteContent } from '../content';

export default function Hero({ t }: { t: SiteContent }) {
  return (
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
  );
}
