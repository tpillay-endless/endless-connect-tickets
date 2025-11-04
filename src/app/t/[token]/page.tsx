'use client';

import { FormEvent, use, useCallback, useEffect, useMemo, useState } from 'react';
import styles from '@/styles/ticket-pages.module.css';
import { EndlessLogo } from '@/components/EndlessLogo';
import { TypographyHeading, TypographyParagraph, TypographyEyebrow } from '@/components/WebflowTypography';
import type { TicketRecord } from '@/lib/ticketsDb';

const EYEBROW_TEXT_CLASSES = 'eyebrow_text u-text-style-tiny u-text-transform-uppercase u-weight-medium';
const STATUS_DISPLAY_OVERRIDES: Record<string, string> = {
  ready: 'Ready',
  ok: 'Ready',
};

function formatStatusLabel(value: string) {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function Spinner() {
  return (
    <div className={styles.spinnerWrap}>
      <div className={styles.spinnerBar} aria-hidden="true" />
      <TypographyParagraph fontStyle="Text Small" text="Checking access…" />
    </div>
  );
}

export default function TicketVerify({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);

  const [auth, setAuth] = useState<StaffAuthState>({ ok: false });
  const [loginName, setLoginName] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [status, setStatus] = useState<string>('ready');
  const [ticket, setTicket] = useState<VerifyResponse | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const refreshAuth = useCallback(async () => {
    setAuthLoading(true);
    try {
      const r = await fetch('/tickets/api/staff/me', { cache: 'no-store' });
      type StaffMeResponse = { ok: boolean; user?: { name: string; role: string }; error?: string };
      const j = (await r.json().catch(() => null)) as StaffMeResponse | null;
      if (j?.ok && j.user) setAuth({ ok: true, name: j.user.name, role: j.user.role });
      else setAuth({ ok: false });
    } catch {
      setAuth({ ok: false });
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const loadTicket = useCallback(async () => {
    try {
      const r = await fetch(`/tickets/api/verify?token=${encodeURIComponent(token)}&action=status`, { cache: 'no-store' });
      if (!r.ok) {
        setTicket({ ok: false, error: `HTTP ${r.status}` });
        return;
      }
      const text = await r.text();
      if (!text) {
        setTicket({ ok: false, error: 'Empty response from server' });
        return;
      }
      try {
        const parsed = JSON.parse(text) as VerifyResponse;
        setTicket(parsed);
      } catch {
        setTicket({ ok: false, error: 'Invalid JSON from server', raw: text });
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Fetch failed';
      setTicket({ ok: false, error: errorMessage });
    }
  }, [token]);

  useEffect(() => {
    (async () => {
      await refreshAuth();
      await loadTicket();
    })();
  }, [refreshAuth, loadTicket]);

  async function doLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('Logging in…');
    const r = await fetch('/tickets/api/staff/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: loginName, password: loginPass }),
    });
    type LoginResponse = { ok: boolean; error?: string };
    const j = (await r.json().catch(() => null)) as LoginResponse | null;
    if (!r.ok || !j?.ok) { setStatus(j?.error || 'Invalid login'); return; }
    setStatus('ok');
    setLoginPass('');
    await refreshAuth();
  }

  async function doLogout() {
    await fetch('/tickets/api/staff/logout', { method: 'POST' });
    setAuth({ ok: false });
  }

  async function toggleCheck() {
    const doingUndo = ticket?.ok && ticket.status === 'checked-in';
    setStatus(doingUndo ? 'Undoing…' : 'Checking in…');

    const action = doingUndo ? 'undo' : 'checkin';
    const r = await fetch('/tickets/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, action }),
    });
    type VerifyResponse = { ok: boolean; status?: string; error?: string };
    const j = (await r.json().catch(() => null)) as VerifyResponse | null;
    setStatus(j?.ok ? (doingUndo ? 'Reverted' : 'Checked in') : j?.error || 'Failed');
    await loadTicket();
  }

  const rec = ticket?.ok ? ticket.record : null;
  const statusIsChecked = ticket?.ok && ticket.status === 'checked-in';
  const statusText = statusIsChecked ? 'Checked in' : 'Not checked in';
  const statusVariant = useMemo(() => {
    const lowercase = status.toLowerCase();
    if (['', 'ready'].includes(lowercase)) return styles.statusReady;
    if (lowercase.includes('fail') || lowercase.includes('error') || lowercase.includes('invalid')) {
      return styles.statusError;
    }
    return styles.statusOk;
  }, [status]);
  const trimmedStatus = status.trim();
  const statusDisplay =
    STATUS_DISPLAY_OVERRIDES[trimmedStatus.toLowerCase()] ?? formatStatusLabel(trimmedStatus);

  if (authLoading) {
    return (
      <main className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <div className={styles.logo}>
              <EndlessLogo className={styles.logoSvg} />
            </div>
          </div>
        </header>
        <Spinner />
      </main>
    );
  }

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
              {statusDisplay}
            </span>
          </div>
        </div>
        <TypographyHeading fontStyle="H1" text="Ticket" />
      </header>

      {!auth.ok ? (
        <section className={styles.formCard}>
          <div className={styles.cardHeader}>
            <TypographyHeading fontStyle="H4" tag="h2" text="Staff Login" />
          </div>
          <form onSubmit={doLogin} className="form_main_layout">
            <label className="form_main_label_wrap">
              <span className="form_main_label_text eyebrow_text u-text-style-tiny u-text-transform-uppercase">
                Name
              </span>
              <input
                placeholder="Enter your name (e.g., Teddy)"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                className="form_main_field"
                autoComplete="username"
                required
              />
            </label>
            <label className="form_main_label_wrap">
              <span className="form_main_label_text eyebrow_text u-text-style-tiny u-text-transform-uppercase">
                Password
              </span>
              <input
                type="password"
                placeholder="Enter password"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                className="form_main_field"
                autoComplete="current-password"
                required
              />
            </label>
            <button
              type="submit"
              className={`${styles.submit} ${styles.buttonFullWidth}`}
              disabled={!loginName || !loginPass}
            >
              <span className={`${styles.buttonLabel} button_main_text u-text-style-main`}>
                {status === 'Logging in…' ? 'Logging in…' : 'Log In'}
              </span>
            </button>
            {status && status !== 'ready' && (
              <TypographyParagraph
                fontStyle="Text Small"
                classes={`${styles.feedback} ${
                  statusVariant === styles.statusError ? styles.feedbackError : styles.feedbackSuccess
                }`}
                text={status}
              />
            )}
          </form>
        </section>
      ) : (
        <section className={styles.formCard}>
          <div className={styles.cardHeader}>
            <TypographyParagraph
              fontStyle="Text Tiny"
              text={
                <>
                  Logged in as <strong>{auth.name}</strong> ({auth.role})
                </>
              }
            />
            <button onClick={doLogout} className={`${styles.submit} ${styles.buttonSecondary} ${styles.buttonSmall}`}>
              <span className={`${styles.buttonLabel} button_main_text u-text-style-main`}>Logout</span>
            </button>
          </div>

          <div className={styles.cardContent}>
            {!rec ? (
              <TypographyParagraph fontStyle="Text Small" text="Loading ticket…" />
            ) : (
              <div className={`${styles.ticketDetails} ${styles.fieldList}`}>
                <div className={styles.fieldItem}>
                  <TypographyEyebrow text="Name" classes={styles.fieldLabel} />
                  <TypographyParagraph fontStyle="H5" text={rec.name} />
                </div>
                {rec.email && (
                  <div className={styles.fieldItem}>
                    <TypographyEyebrow text="Email" classes={styles.fieldLabel} />
                    <TypographyParagraph fontStyle="H5" text={rec.email} />
                  </div>
                )}
                {rec.phone && (
                  <div className={styles.fieldItem}>
                    <TypographyEyebrow text="Phone" classes={styles.fieldLabel} />
                    <TypographyParagraph fontStyle="H5" text={rec.phone} />
                  </div>
                )}
                {rec.company && (
                  <div className={styles.fieldItem}>
                    <TypographyEyebrow text="Company" classes={styles.fieldLabel} />
                    <TypographyParagraph fontStyle="H5" text={rec.company} />
                  </div>
                )}
                <div className={styles.fieldItem}>
                  <TypographyEyebrow text="Status" classes={styles.fieldLabel} />
                  <TypographyParagraph
                    fontStyle="H5"
                    text={
                      <span className={statusIsChecked ? styles.statusOk : styles.statusError}>{statusText}</span>
                    }
                  />
                </div>
              </div>
            )}
          </div>

          {rec && (
            <div className={styles.cardActions}>
              {statusIsChecked ? (
                <button
                  onClick={toggleCheck}
                  className={`${styles.submit} ${styles.buttonSecondary} ${styles.buttonFullWidth}`}
                >
                  <span className={`${styles.buttonLabel} button_main_text u-text-style-main`}>Undo</span>
                </button>
              ) : (
                <button onClick={toggleCheck} className={`${styles.submit} ${styles.buttonFullWidth}`}>
                  <span className={`${styles.buttonLabel} button_main_text u-text-style-main`}>Check-in</span>
                </button>
              )}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
type StaffAuthState = { ok: boolean; name?: string; role?: string };

type VerifyResponse =
  | { ok: true; status: string; record: TicketRecord }
  | { ok: false; error: string; status?: string; record?: TicketRecord; raw?: string };
