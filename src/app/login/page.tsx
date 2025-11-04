'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/ticket-pages.module.css';
import { EndlessLogo } from '@/components/EndlessLogo';
import { TypographyHeading, TypographyParagraph } from '@/components/WebflowTypography';
import { useStaffSession } from '@/hooks/useStaffSession';

const EYEBROW_TEXT_CLASSES = 'eyebrow_text u-text-style-tiny u-text-transform-uppercase u-weight-medium';

export default function AdminLoginPage() {
  const { session, loading, error, login, logout, role } = useStaffSession({ autoRefresh: true });
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<string>('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Logging in…');
    const result = await login(name, password);
    if (!result.ok) {
      setStatus(result.error || 'Login failed');
      return;
    }
    setStatus(`Welcome back, ${result.user?.name ?? name}!`);
    setPassword('');
  }

  async function handleLogout() {
    setStatus('Signing out…');
    await logout();
    setStatus('Signed out');
  }

  const statusMessage = status || (loading ? 'Checking session…' : error || 'Ready');
  const isErrored = statusMessage.toLowerCase().includes('fail') || statusMessage.toLowerCase().includes('error');
  const statusClass = isErrored ? styles.statusError : loading ? styles.statusReady : styles.statusOk;

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
            <span aria-hidden="true" className={`${styles.statusDot} ${statusClass}`} />
            <span
              className={`${styles.statusText} ${styles.statusValue} ${EYEBROW_TEXT_CLASSES} ${statusClass}`}
            >
              {statusMessage}
            </span>
          </div>
        </div>
        <TypographyHeading fontStyle="H1" text="Admin Login" />
        <TypographyParagraph
          fontStyle="Text Main"
          classes={styles.lead}
          text="Sign in to manage attendees, manual registrations, and admin tools."
        />
      </header>

      {session ? (
        <section className={styles.formCard}>
          <div className={styles.cardHeader}>
            <TypographyParagraph
              fontStyle="Text Main"
              text={
                <>
                  Logged in as <strong>{session.name}</strong> ({role})
                </>
              }
            />
            <button
              onClick={handleLogout}
              className={`${styles.submit} ${styles.buttonSecondary} ${styles.buttonSmall}`}
            >
              <span className={`${styles.buttonLabel} button_main_text u-text-style-main`}>Sign out</span>
            </button>
          </div>
          <TypographyParagraph
            fontStyle="Text Small"
            text={
              <>
                You can now visit the{' '}
                <Link href="/manual-registration">
                  manual registration page
                </Link>{' '}
                or access other admin tools.
              </>
            }
          />
        </section>
      ) : (
        <section className={`${styles.formCard} form_main_wrap`}>
          <form onSubmit={handleLogin} className="form_main_layout">
            <label className="form_main_label_wrap">
              <span className="form_main_label_text eyebrow_text u-text-style-tiny u-text-transform-uppercase">
                Name
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form_main_field"
                placeholder="e.g. Goran"
                autoComplete="username"
                required
              />
            </label>

            <label className="form_main_label_wrap">
              <span className="form_main_label_text eyebrow_text u-text-style-tiny u-text-transform-uppercase">
                Password
              </span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form_main_field"
                placeholder="Enter password"
                autoComplete="current-password"
                required
              />
            </label>

            <button
              type="submit"
              className={styles.submit}
              disabled={!name || !password || loading}
            >
              <span className={`${styles.buttonLabel} button_main_text u-text-style-main`}>
                {loading ? 'Please wait…' : 'Log In'}
              </span>
            </button>
          </form>
        </section>
      )}
    </main>
  );
}
