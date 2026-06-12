import styles from '../page.module.css';
import { timelineData, type Lang, type SiteContent } from '../content';

export default function Timeline({ t, lang }: { t: SiteContent; lang: Lang }) {
  return (
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
  );
}
