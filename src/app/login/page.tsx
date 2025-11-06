'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/ticket-pages.module.css';
import { EndlessLogo } from '@/components/EndlessLogo';
import { TypographyHeading, TypographyParagraph } from '@/components/WebflowTypography';
import { useStaffSession } from '@/hooks/useStaffSession';
import { getRoleCapabilities, STAFF_ROLE_LABELS } from '@/lib/staff/permissions';

const EYEBROW_TEXT_CLASSES = 'eyebrow_text u-text-style-tiny u-text-transform-uppercase u-weight-medium';

export default function AdminLoginPage() {
  const { session, loading, error, login, logout, role } = useStaffSession({ autoRefresh: true });
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<string>('');
  const permissions = useMemo(() => getRoleCapabilities(role), [role]);
  const roleLabel = role ? STAFF_ROLE_LABELS[role] ?? role : null;
  const availableTools = useMemo(() => {
    if (!session) return [];
    const tools: Array<{ href: string; label: string; description: string }> = [];
    const canViewAttendees = permissions.canAccessAttendees || permissions.canViewAttendeeList;

    if (canViewAttendees) {
      tools.push({
        href: '/admin/attendees',
        label: 'Attendees',
        description: permissions.canAccessAttendees
          ? 'Manage attendee records, refresh QR codes, and run bulk updates.'
          : 'View attendees, monitor check-ins, and run bulk check-in/out.',
      });
    }

    if (permissions.canUseManualRegistration) {
      tools.push({
        href: '/manual-registration',
        label: 'Manual Registration',
        description: 'Create new tickets on-site, generating QR codes instantly.',
      });
    }

    if (permissions.canAccessRewards) {
      tools.push({
        href: '/admin/rewards',
        label: 'Rewards Picker',
        description: 'Run the live prize draw using eligible, checked-in attendees.',
      });
    }

    if (permissions.canImportExport) {
      tools.push({
        href: '/admin/export',
        label: 'Export CSV',
        description: 'Download the current attendee list for reporting or backup.',
      });
    }

    return tools;
  }, [permissions, session]);

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
                  Logged in as <strong>{session.name}</strong> ({roleLabel ?? role})
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
          {availableTools.length ? (
            <div className={styles.toolSection}>
              <span className={`${styles.toolEyebrow} ${EYEBROW_TEXT_CLASSES}`}>Available tools</span>
              <div className={styles.toolGrid}>
                {availableTools.map((tool) => (
                  <Link key={tool.href} href={tool.href} className={styles.toolCard}>
                    <span className={styles.toolCardLabel}>{tool.label}</span>
                    <span className={styles.toolCardDescription}>{tool.description}</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <TypographyParagraph
              fontStyle="Text Small"
              text="No additional admin tools are assigned to this role. Use your check-in link to manage entries."
            />
          )}
        </section>
      ) : (
        <section className={`${styles.formCard} form_main_wrap`}>
          <form onSubmit={handleLogin} className="form_main_layout">
            <label className="form_main_label_wrap">
              <span className="form_main_label_text eyebrow_text u-text-style-tiny u-text-transform-uppercase">
                First Name
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form_main_field"
                placeholder="e.g. Teddy"
                autoComplete="given-name"
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
