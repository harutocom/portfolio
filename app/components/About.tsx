import styles from '../page.module.css';
import { type SiteContent } from '../content';

export default function About({ t }: { t: SiteContent }) {
  return (
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
  );
}
