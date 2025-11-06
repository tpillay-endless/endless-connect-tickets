'use client';

import { useEffect, useState } from 'react';
import styles from '@/styles/ticket-pages.module.css';
import { EndlessLogo } from '@/components/EndlessLogo';
import { TypographyHeading, TypographyParagraph } from '@/components/WebflowTypography';
import { roleHasPermission, STAFF_ROLE_LABELS } from '@/lib/staff/permissions';
import type { StaffRole } from '@/lib/staff/permissions';

const EYEBROW_TEXT_CLASSES = 'eyebrow_text u-text-style-tiny u-text-transform-uppercase u-weight-medium';

function formatStatusLabel(value: string) {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function AdminExport() {
  const [auth, setAuth] = useState<{ ok: boolean; name?: string; role?: string }>({ ok: false });
  const [err, setErr] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('/tickets/api/staff/me', { cache: 'no-store' });
        type StaffMeResponse = {
          ok: boolean;
          user?: { name: string; role: string };
          error?: string;
        };
        const j = (await r.json().catch(() => null)) as StaffMeResponse | null;
        if (j?.ok && j.user?.role && roleHasPermission(j.user.role as StaffRole, 'importExportTickets')) {
          setAuth({ ok: true, name: j.user.name, role: j.user.role });
        } else {
          setErr('Admins or super admins only.');
        }
      } catch {
        setErr('Auth check failed.');
      }
    })();
  }, []);

  const statusIsError = err && !auth.ok;
  const statusVariant = statusIsError ? styles.statusError : styles.statusOk;
  const statusMessage = formatStatusLabel(auth.ok ? 'Ready' : err || 'Checking permissions…');
  const displayRole = auth.role ? STAFF_ROLE_LABELS[auth.role as StaffRole] ?? auth.role : undefined;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.logo}>
            <EndlessLogo className={styles.logoSvg} />
          </div>
          <div className={`${styles.status} ${styles.headerStatus}`} role="status" aria-live="polite">
            <span className={`${styles.statusText} ${styles.statusLabel} ${EYEBROW_TEXT_CLASSES}`}>
              Status
            </span>
            <span aria-hidden="true" className={`${styles.statusDot} ${statusVariant}`} />
            <span
              className={`${styles.statusText} ${styles.statusValue} ${EYEBROW_TEXT_CLASSES} ${statusVariant}`}
            >
              {statusMessage}
            </span>
          </div>
        </div>
        <TypographyHeading fontStyle="H1" text="Admin Export" />
      </header>

      {!auth.ok ? (
        <section className={styles.formCard}>
          <TypographyParagraph
            fontStyle="Text Small"
            classes={`${styles.feedback} ${styles.feedbackError}`}
            text={err || 'Checking permissions…'}
          />
        </section>
      ) : (
        <section className={styles.formCard}>
          <div className={styles.cardHeader}>
            <TypographyParagraph
              fontStyle="Text Main"
              text={
                <>
                  Logged in as <strong>{auth.name}</strong>{' '}
                  {displayRole ? `(${displayRole})` : null}
                </>
              }
            />
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
