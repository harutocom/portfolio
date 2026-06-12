import styles from '../page.module.css';
import { skills, type SiteContent } from '../content';

const levelToWidth = (level: 1 | 2 | 3) =>
  level === 3 ? '95%' : level === 2 ? '65%' : '30%';

export default function Skills({ t }: { t: SiteContent }) {
  return (
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
  );
}
