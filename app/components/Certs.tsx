import styles from '../page.module.css';
import { certsData, type Lang, type SiteContent } from '../content';

export default function Certs({ t, lang }: { t: SiteContent; lang: Lang }) {
  return (
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
  );
}
