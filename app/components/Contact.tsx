'use client';

import { useState } from 'react';
import styles from '../page.module.css';
import { type SiteContent } from '../content';
import { EnvelopeIcon, GitHubIcon, XIcon } from './Icons';

export default function Contact({ t }: { t: SiteContent }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Portfolio] ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`);
    window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;
    setFormSent(true);
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className="container">
        <h2 className="section-title">{t.contact.title}</h2>
        <div className={`reveal ${styles.contactLayout}`}>
          <div className={styles.contactInfo}>
            <p className={styles.leadText}>{t.contact.lead}</p>
            <p className={styles.contactBody}>{t.contact.body}</p>
            <div className={styles.contactLinks}>
              <a href="mailto:hello@example.com" className={styles.contactLinkItem}>
                <EnvelopeIcon />
                hello@example.com
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.contactLinkItem}>
                <GitHubIcon />
                GitHub
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className={styles.contactLinkItem}>
                <XIcon />
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
  );
}
