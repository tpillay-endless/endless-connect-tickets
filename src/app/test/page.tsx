'use client';

import { useState } from 'react';
import styles from '@/styles/ticket-pages.module.css';
import { EndlessLogo } from '@/components/EndlessLogo';

/**
 * Gate this page so it only renders locally when you set:
 *   NEXT_PUBLIC_ENABLE_TEST=1
 * in your `.env.local`. On staging/prod where the var is unset,
 * this page will render a lightweight 404-like message.
 */
const TEST_ENABLED = process.env.NEXT_PUBLIC_ENABLE_TEST === '1';

type RegisterResp = {
  ok: boolean;
  total: number;
  sold: number;
  left: number;
  token: string;
  ticketUrl: string;

  // NOTE: match the API field names used by /tickets/api/register
  ticketPngUrl: string;   // was ticketQrPngUrl
  vcardSvgUrl: string;    // was vcardQrSvgUrl
};

export default function TestQR() {
  if (!TEST_ENABLED) {
    return (
      <main className={styles.page}>
        <div className={styles.logo}>
          <EndlessLogo className={styles.logoSvg} />
        </div>
        <header className={styles.header}>
          <h1 className="c-heading w-variant-792802b6-ccdb-f982-5023-5fa970cf03d0">Not Found</h1>
          <p className={`c-paragraph w-variant-61d538b2-709c-eb7a-4258-8c0890dc07fc ${styles.lead}`}>
            This test page is disabled in this environment. Set{' '}
            <code className={styles.inlineCode}>NEXT_PUBLIC_ENABLE_TEST=1</code> in your{' '}
            <code className={styles.inlineCode}>.env.local</code> to enable it locally.
          </p>
        </header>
      </main>
    );
  }

  const [status, setStatus] = useState<string>('ready');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [resp, setResp] = useState<RegisterResp | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('registering…');
    setResp(null);
    try {
      const r = await fetch('/tickets/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, phone }),
      });
      if (!r.ok) throw new Error('register failed');
      const data = (await r.json()) as RegisterResp;
      setResp(data);
      setStatus('ok');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  const isSubmitting = status === 'registering…';

  return (
    <main className={styles.page}>
      <div className={styles.logo}>
        <EndlessLogo className={styles.logoSvg} />
      </div>
      <header className={styles.header}>
        <h1 className="c-heading w-variant-792802b6-ccdb-f982-5023-5fa970cf03d0">QR Ticket – Test</h1>
        <p className={`c-paragraph w-variant-61d538b2-709c-eb7a-4258-8c0890dc07fc ${styles.lead}`}>
          Submit to create a ticket + branded QR assets (ticket PNG + vCard SVG).
        </p>
      </header>

      <form onSubmit={submit} className={`${styles.formCard} form_main_wrap`}>
        <div className="form_main_layout">
          <label className="form_main_label_wrap">
            <span className="form_main_label_text eyebrow_text u-text-style-tiny u-text-transform-uppercase">Full Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form_main_field"
              placeholder="e.g. John Smith"
              autoComplete="name"
              required
            />
          </label>

          <label className="form_main_label_wrap">
            <span className="form_main_label_text eyebrow_text u-text-style-tiny u-text-transform-uppercase">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form_main_field"
              placeholder="e.g. jane@company.com"
              autoComplete="email"
              required
            />
          </label>

          <label className="form_main_label_wrap">
            <span className="form_main_label_text eyebrow_text u-text-style-tiny u-text-transform-uppercase">
              Company (Optional)
            </span>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="form_main_field"
              placeholder="e.g. Endless Connect"
              autoComplete="organization"
            />
          </label>

          <label className="form_main_label_wrap">
            <span className="form_main_label_text eyebrow_text u-text-style-tiny u-text-transform-uppercase">Phone</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              className="form_main_field"
              placeholder="e.g. +1 555 123 4567"
              autoComplete="tel"
              required
            />
          </label>
        </div>

        <button type="submit" className={styles.submit} disabled={isSubmitting}>
          <span className={`${styles.buttonLabel} button_main_text u-text-style-main`}>
            {isSubmitting ? 'Creating…' : 'Create ticket'}
          </span>
        </button>
      </form>

      <p className={`c-paragraph w-variant-4099173f-f581-635c-a5fe-cf4a89c62029 ${styles.status}`}>
        Status: <span className={`${styles.statusValue} ${styles[`status${status.charAt(0).toUpperCase() + status.slice(1)}`]}`}>{status}</span>
        <span aria-hidden="true" className={styles.statusDot} />
      </p>

      {resp && (
        <section className={styles.resultCard} aria-live="polite">
          <h2 className="c-heading w-variant-433d40c6-c261-f13f-c899-61d2cadf150f">Result</h2>
          <div className="c-paragraph w-variant-61d538b2-709c-eb7a-4258-8c0890dc07fc">
            <strong>Token:</strong> <code className={styles.inlineCode}>{resp.token}</code>
          </div>
          <div className="c-paragraph w-variant-61d538b2-709c-eb7a-4258-8c0890dc07fc">
            <strong>Ticket URL:</strong>{' '}
            <a href={resp.ticketUrl} target="_blank" rel="noreferrer">
              {resp.ticketUrl}
            </a>
          </div>

          <div className={styles.resultGrid}>
            <article className={styles.asset}>
              <div className={styles.assetHeading}>
                <h3 className="c-heading w-variant-7c7eb163-b37d-338d-2369-5eae7e6d458a">Ticket QR</h3>
                <p className="c-paragraph w-variant-4099173f-f581-635c-a5fe-cf4a89c62029">PNG, with logo</p>
              </div>
              <div className={styles.assetPreview}>
                <div className={styles.assetImage}>
                  <img src={resp.ticketPngUrl} alt="Ticket QR" width={256} height={256} />
                </div>
                <a
                  className="c-paragraph w-variant-4099173f-f581-635c-a5fe-cf4a89c62029"
                  href={resp.ticketPngUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open full size
                </a>
              </div>
            </article>

            <article className={styles.asset}>
              <div className={styles.assetHeading}>
                <h3 className="c-heading w-variant-7c7eb163-b37d-338d-2369-5eae7e6d458a">vCard QR</h3>
                <p className="c-paragraph w-variant-4099173f-f581-635c-a5fe-cf4a89c62029">SVG, print-quality</p>
              </div>
              <div className={styles.assetPreview}>
                <div className={styles.assetImage}>
                  <img src={resp.vcardSvgUrl} alt="vCard QR" width={256} height={256} />
                </div>
                <a
                  className="c-paragraph w-variant-4099173f-f581-635c-a5fe-cf4a89c62029"
                  href={resp.vcardSvgUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open SVG
                </a>
              </div>
            </article>
          </div>
        </section>
      )}
    </main>
  );
}
