import styles from '../page.module.css';

export default function Footer() {
  return (
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
  );
}
