'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import styles from '@/styles/ticket-pages.module.css';
import { EndlessLogo } from '@/components/EndlessLogo';
import { TypographyHeading, TypographyParagraph } from '@/components/WebflowTypography';
import { useStaffSession } from '@/hooks/useStaffSession';
import { getRoleCapabilities, STAFF_PERMISSION_GROUPS, STAFF_ROLE_LABELS } from '@/lib/staff/permissions';

const EYEBROW_TEXT_CLASSES = 'eyebrow_text u-text-style-tiny u-text-transform-uppercase u-weight-medium';
const STATUS_DISPLAY_OVERRIDES: Record<string, string> = {
  ready: 'Ready',
  ok: 'Ready',
};

type RegisterResp = {
  ok: boolean;
  total: number;
  sold: number;
  left: number;
  token: string;
  ticketUrl: string;
  ticketPngUrl: string;
  vcardSvgUrl: string;
};

function formatStatusLabel(value: string) {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function ManualRegistrationPage() {
  const { session, loading, error, role } = useStaffSession({
    allowedRoles: STAFF_PERMISSION_GROUPS.manualRegistration,
  });
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
      if (!r.ok) throw new Error(`Register failed with status ${r.status}`);
      const data = (await r.json()) as RegisterResp;
      setResp(data);
      setStatus('Ticket created');
      setName('');
      setEmail('');
      setCompany('');
      setPhone('');
    } catch (err) {
      console.error(err);
      setStatus('Error creating ticket');
    }
  }

  const isSubmitting = status === 'registering…';
  const normalizedStatus = status.trim();
  const normalizedKey = normalizedStatus.toLowerCase();
  const statusDisplay =
    STATUS_DISPLAY_OVERRIDES[normalizedKey] ?? formatStatusLabel(normalizedStatus || 'Ready');
  const statusVariantKey = normalizedStatus
    ? normalizedStatus.charAt(0).toUpperCase() + normalizedStatus.slice(1)
    : 'Ready';
  const statusVariant =
    (styles as Record<string, string>)[`status${statusVariantKey}`] ??
    (normalizedKey === 'error' ? styles.statusError : styles.statusReady);

  const authStatusLabel = useMemo(() => {
    if (loading) return 'Checking permissions…';
    if (error) {
      if (error === 'Unauthorized') return 'Admins, super admins, or staff only.';
      if (error === 'No active session') return 'Please sign in with an authorized staff account.';
      return error;
    }
    return 'Ready';
  }, [loading, error]);

  const authStatusVariant = useMemo(() => {
    if (loading) return styles.statusReady;
    if (error) return styles.statusError;
    return styles.statusOk;
  }, [loading, error]);

  const permissions = useMemo(() => getRoleCapabilities(role), [role]);
  const canRegister = !!session && permissions.canUseManualRegistration;
  const roleLabel = role ? STAFF_ROLE_LABELS[role] ?? role : null;

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
            <span aria-hidden="true" className={`${styles.statusDot} ${authStatusVariant}`} />
            <span
              className={`${styles.statusText} ${styles.statusValue} ${EYEBROW_TEXT_CLASSES} ${authStatusVariant}`}
            >
              {authStatusLabel}
            </span>
          </div>
        </div>
        <TypographyHeading fontStyle="H1" text="Manual Registration" />
        <TypographyParagraph
          fontStyle="Text Main"
          classes={styles.lead}
          text="Create attendee tickets and QR codes directly from the admin dashboard."
        />
      </header>

      {!canRegister ? (
        <section className={styles.formCard}>
          <TypographyParagraph
            fontStyle="Text Main"
            text={
              <>
                {loading
                  ? 'Validating your session…'
                  : authStatusLabel || 'Only authorized staff can use manual registration.'}{' '}
                <Link href="/login">Go to the admin login page.</Link>
              </>
            }
          />
        </section>
      ) : (
        <>
          <section className={`${styles.formCard} form_main_wrap`}>
            <div className={styles.cardHeader}>
              <TypographyParagraph
                fontStyle="Text Main"
                text={
                  <>
                    Logged in as <strong>{session?.name}</strong> ({roleLabel ?? role})
                  </>
                }
              />
            </div>

            <form onSubmit={submit} className="form_main_layout">
              <label className="form_main_label_wrap">
                <span className="form_main_label_text eyebrow_text u-text-style-tiny u-text-transform-uppercase">
                  Full Name
                </span>
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
                <span className="form_main_label_text eyebrow_text u-text-style-tiny u-text-transform-uppercase">
                  Email
                </span>
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
                <span className="form_main_label_text eyebrow_text u-text-style-tiny u-text-transform-uppercase">
                  Phone
                </span>
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

              <button type="submit" className={styles.submit} disabled={isSubmitting}>
                <span className={`${styles.buttonLabel} button_main_text u-text-style-main`}>
                  {isSubmitting ? 'Creating…' : 'Create ticket'}
                </span>
              </button>
            </form>

            {status && status !== 'ready' && (
              <TypographyParagraph
                fontStyle="Text Small"
                classes={`${styles.feedback} ${
                  statusVariant === styles.statusError ? styles.feedbackError : styles.feedbackSuccess
                }`}
                text={statusDisplay}
              />
            )}
          </section>

          {resp && (
            <section className={styles.resultCard} aria-live="polite">
              <TypographyHeading fontStyle="H2" text="Result" />
              <TypographyParagraph
                fontStyle="Text Main"
                text={
                  <>
                    <strong>Token:</strong> <code className={styles.inlineCode}>{resp.token}</code>
                  </>
                }
              />
              <TypographyParagraph
                fontStyle="Text Main"
                text={
                  <>
                    <strong>Ticket URL:</strong>{' '}
                    <a href={resp.ticketUrl} target="_blank" rel="noreferrer">
                      {resp.ticketUrl}
                    </a>
                  </>
                }
              />

              <div className={styles.resultGrid}>
                <article className={styles.asset}>
                  <div className={styles.assetHeading}>
                    <TypographyHeading fontStyle="H4" tag="h3" text="Ticket QR" />
                    <TypographyParagraph fontStyle="Text Small" text="PNG, with logo" />
                  </div>
                  <div className={styles.assetPreview}>
                    <div className={styles.assetImage}>
                      <Image
                        src={resp.ticketPngUrl}
                        alt="Ticket QR"
                        width={256}
                        height={256}
                        unoptimized
                      />
                    </div>
                    <TypographyParagraph
                      fontStyle="Text Small"
                      text={
                        <a href={resp.ticketPngUrl} target="_blank" rel="noreferrer">
                          Open full size
                        </a>
                      }
                    />
                  </div>
                </article>

                <article className={styles.asset}>
                  <div className={styles.assetHeading}>
                    <TypographyHeading fontStyle="H4" tag="h3" text="vCard QR" />
                    <TypographyParagraph fontStyle="Text Small" text="SVG, print-quality" />
                  </div>
                  <div className={styles.assetPreview}>
                    <div className={styles.assetImage}>
                      <Image
                        src={resp.vcardSvgUrl}
                        alt="vCard QR"
                        width={256}
                        height={256}
                        unoptimized
                      />
                    </div>
                    <TypographyParagraph
                      fontStyle="Text Small"
                      text={
                        <a href={resp.vcardSvgUrl} target="_blank" rel="noreferrer">
                          Open SVG
                        </a>
                      }
                    />
                  </div>
                </article>
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
}
