'use client';

import { useEffect, useState } from 'react';
import styles from '@/styles/ticket-pages.module.css';
import { EndlessLogo } from '@/components/EndlessLogo';

export default function AdminExport() {
  const [auth, setAuth] = useState<{ ok: boolean; name?: string; role?: string }>({ ok: false });
  const [err, setErr] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('/tickets/api/staff/me', { cache: 'no-store' });
        const j = await r.json();
        if (j.ok && j.user?.role === 'admin') setAuth({ ok: true, name: j.user.name, role: j.user.role });
        else setErr('Admins only.');
      } catch {
        setErr('Auth check failed.');
      }
    })();
  }, []);

  const statusIsError = err && !auth.ok;

  return (
    <main className={styles.page}>
      <div className={styles.logo}>
        <EndlessLogo className={styles.logoSvg} />
      </div>
      <header className={styles.header}>
        <h1 className="c-heading w-variant-792802b6-ccdb-f982-5023-5fa970cf03d0">Admin Export</h1>
        <p className={`c-paragraph w-variant-4099173f-f581-635c-a5fe-cf4a89c62029 ${styles.status}`}>
          <span className={styles.statusLabel}>Status:</span>{' '}
          <span
            className={`${styles.statusValue} ${statusIsError ? styles.statusError : styles.statusOk}`}
          >
            {auth.ok ? 'Ready' : err || 'Checking permissions…'}
          </span>
          <span aria-hidden="true" className={styles.statusDot} />
        </p>
      </header>

      {!auth.ok ? (
        <section className={styles.formCard}>
          <p className={`c-paragraph w-variant-4099173f-f581-635c-a5fe-cf4a89c62029 ${styles.feedback} ${styles.feedbackError}`}>
            {err || 'Checking permissions…'}
          </p>
        </section>
      ) : (
        <section className={styles.formCard}>
          <div className={styles.cardHeader}>
            <div className="c-paragraph w-variant-61d538b2-709c-eb7a-4258-8c0890dc07fc">
              Logged in as <strong>{auth.name}</strong> (admin)
            </div>
          </div>
          <div className={styles.cardActions}>
            <a href="/tickets/api/admin/export" className={`${styles.submit} ${styles.buttonFullWidth}`}>
              <span className={`${styles.buttonLabel} button_main_text u-text-style-main`}>
                Download data (CSV)
              </span>
            </a>
          </div>
        </section>
      )}
    </main>
  );
}
