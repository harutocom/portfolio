import styles from '../page.module.css';
import { ZENN_USERNAME, ZENN_SCRAP_URL, type SiteContent } from '../content';
import { type ZennArticle } from '../lib/zenn';

interface WritingProps {
  t: SiteContent;
  articles: ZennArticle[];
}

export default function Writing({ t, articles }: WritingProps) {
  return (
    <section id="writing" className={styles.writingSection}>
      <div className="container">
        <h2 className="section-title">{t.writing.title}</h2>
        <div className={`reveal ${styles.writingGrid}`}>
          {articles.length > 0 ? (
            // Latest articles fetched from the Zenn RSS feed at build time
            articles.map(article => (
              <a
                key={article.link}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.writingCard}
              >
                <div className={styles.writingCardHeader}>
                  <span className={styles.writingPlatform}>Zenn</span>
                  <span className={styles.writingBadge}>{t.writing.article_label}</span>
                </div>
                <h3 className={styles.writingCardTitle}>{article.title}</h3>
                {article.pubDate && (
                  <p className={styles.writingCardDesc}>{article.pubDate}</p>
                )}
                <span className={styles.writingCardLink}>
                  {t.writing.view_profile} ↗
                </span>
              </a>
            ))
          ) : (
            // Fallback when the feed is empty or unreachable
            <>
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
              <div className={`${styles.writingCard} ${styles.writingCardPlanned}`}>
                <div className={styles.writingCardHeader}>
                  <span className={styles.writingPlatform}>Zenn</span>
                  <span className={styles.writingBadge}>{t.writing.planned_label}</span>
                </div>
                <h3 className={styles.writingCardTitle}>{t.writing.scrap_title}</h3>
                <p className={styles.writingCardDesc}>{t.writing.planned_note}</p>
              </div>
            </>
          )}
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
  );
}
