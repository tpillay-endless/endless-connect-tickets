'use client';

import { useEffect, useMemo, useState } from 'react';
import { use } from 'react';
import styles from '@/styles/ticket-pages.module.css';
import { EndlessLogo } from '@/components/EndlessLogo';

function Spinner() {
  return (
    <div className={styles.spinnerWrap}>
      <svg
        className={styles.spinnerIcon}
        viewBox="0 0 24 24"
        fill="none"
        aria-label="Loading"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.2" />
        <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="2" />
      </svg>
      <p>Checking access…</p>
    </div>
  );
}

export default function TicketVerify({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);

  const [auth, setAuth] = useState<{ ok: boolean; name?: string; role?: string }>({ ok: false });
  const [loginName, setLoginName] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [status, setStatus] = useState<string>('ready');
  const [ticket, setTicket] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  async function refreshAuth() {
    setAuthLoading(true);
    try {
      const r = await fetch('/tickets/api/staff/me', { cache: 'no-store' });
      const j = await r.json();
      if (j.ok) setAuth({ ok: true, name: j.user.name, role: j.user.role });
      else setAuth({ ok: false });
    } catch {
      setAuth({ ok: false });
    } finally {
      setAuthLoading(false);
    }
  }

  async function loadTicket() {
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
        const j = JSON.parse(text);
        setTicket(j);
      } catch {
        setTicket({ ok: false, error: 'Invalid JSON from server', raw: text });
      }
    } catch (e: any) {
      setTicket({ ok: false, error: e.message || 'Fetch failed' });
    }
  }

  useEffect(() => {
    (async () => {
      await refreshAuth();
      await loadTicket();
    })();
  }, [token]);

  async function doLogin(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Logging in…');
    const r = await fetch('/tickets/api/staff/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: loginName, password: loginPass }),
    });
    const j = await r.json();
    if (!j.ok) { setStatus(j.error || 'Invalid login'); return; }
    setStatus('ok');
    setLoginPass('');
    await refreshAuth();
  }

  async function doLogout() {
    await fetch('/tickets/api/staff/logout', { method: 'POST' });
    setAuth({ ok: false });
  }

  async function toggleCheck() {
    const doingUndo = !!(ticket && ticket.status === 'checked-in');
    setStatus(doingUndo ? 'Undoing…' : 'Checking in…');

    const action = doingUndo ? 'undo' : 'checkin';
    const r = await fetch('/tickets/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, action }),
    });
    const j = await r.json();
    setStatus(j.ok ? (doingUndo ? 'Reverted' : 'Checked in') : j.error || 'Failed');
    await loadTicket();
  }

  const rec = ticket && ticket.ok ? ticket.record : null;
  const statusIsChecked = ticket && ticket.status === 'checked-in';
  const statusText = statusIsChecked ? 'Checked in' : 'Not checked in';
  const statusVariant = useMemo(() => {
    const lowercase = status.toLowerCase();
    if (['', 'ready'].includes(lowercase)) return styles.statusReady;
    if (lowercase.includes('fail') || lowercase.includes('error') || lowercase.includes('invalid')) {
      return styles.statusError;
    }
    return styles.statusOk;
  }, [status]);

  if (authLoading) {
    return (
      <main className={styles.page}>
        <div className={styles.logo}>
          <EndlessLogo className={styles.logoSvg} />
        </div>
        <Spinner />
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.logo}>
        <EndlessLogo className={styles.logoSvg} />
      </div>
      <header className={styles.header}>
        <h1 className="c-heading w-variant-792802b6-ccdb-f982-5023-5fa970cf03d0">Ticket</h1>
        <p className={`c-paragraph w-variant-4099173f-f581-635c-a5fe-cf4a89c62029 ${styles.status}`}>
          <span className={styles.statusLabel}>Status:</span>{' '}
          <span className={`${styles.statusValue} ${statusVariant}`}>{status}</span>
          <span aria-hidden="true" className={styles.statusDot} />
        </p>
      </header>

      {!auth.ok ? (
        <section className={styles.formCard}>
          <div className={styles.cardHeader}>
            <h2 className="c-heading w-variant-7c7eb163-b37d-338d-2369-5eae7e6d458a">Staff Login</h2>
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
              <p
                className={`${styles.feedback} ${
                  statusVariant === styles.statusError ? styles.feedbackError : styles.feedbackSuccess
                }`}
              >
                {status}
              </p>
            )}
          </form>
        </section>
      ) : (
        <section className={styles.formCard}>
          <div className={styles.cardHeader}>
            <div className="c-paragraph w-variant-61d538b2-709c-eb7a-4258-8c0890dc07fc">
              Logged in as <strong>{auth.name}</strong> ({auth.role})
            </div>
            <button onClick={doLogout} className={`${styles.submit} ${styles.buttonSecondary} ${styles.buttonSmall}`}>
              <span className={`${styles.buttonLabel} button_main_text u-text-style-main`}>Logout</span>
            </button>
          </div>

          <div className={styles.cardContent}>
            {!rec ? (
              <p className="c-paragraph w-variant-4099173f-f581-635c-a5fe-cf4a89c62029">Loading ticket…</p>
            ) : (
              <div className={`${styles.ticketDetails} ${styles.fieldList}`}>
                <div className={styles.fieldItem}>
                  <span
                    className={`${styles.fieldLabel} eyebrow_text u-text-style-tiny u-text-transform-uppercase`}
                  >
                    Name
                  </span>
                  <p className={styles.fieldValue}>{rec.name}</p>
                </div>
                {rec.email && (
                  <div className={styles.fieldItem}>
                    <span
                      className={`${styles.fieldLabel} eyebrow_text u-text-style-tiny u-text-transform-uppercase`}
                    >
                      Email
                    </span>
                    <p className={styles.fieldValue}>{rec.email}</p>
                  </div>
                )}
                {rec.phone && (
                  <div className={styles.fieldItem}>
                    <span
                      className={`${styles.fieldLabel} eyebrow_text u-text-style-tiny u-text-transform-uppercase`}
                    >
                      Phone
                    </span>
                    <p className={styles.fieldValue}>{rec.phone}</p>
                  </div>
                )}
                {rec.company && (
                  <div className={styles.fieldItem}>
                    <span
                      className={`${styles.fieldLabel} eyebrow_text u-text-style-tiny u-text-transform-uppercase`}
                    >
                      Company
                    </span>
                    <p className={styles.fieldValue}>{rec.company}</p>
                  </div>
                )}
                <div className={styles.fieldItem}>
                  <span
                    className={`${styles.fieldLabel} eyebrow_text u-text-style-tiny u-text-transform-uppercase`}
                  >
                    Status
                  </span>
                  <p
                    className={`${styles.fieldValue} ${
                      statusIsChecked ? styles.statusOk : styles.statusError
                    }`}
                  >
                    {statusText}
                  </p>
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
