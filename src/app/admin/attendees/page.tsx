'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEventHandler,
  type SVGProps,
} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/admin-attendees.module.css';
import { EndlessLogo } from '@/components/EndlessLogo';
import { TypographyHeading, TypographyParagraph } from '@/components/WebflowTypography';
import { useStaffSession } from '@/hooks/useStaffSession';

type TicketRecord = {
  token: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  ticketUrl: string;
  ticketPngUrl?: string;
  vcardSvgUrl?: string;
  createdAt: string;
  updatedAt?: string;
  event: string;
  checkedIn?: boolean;
  checkedInAt?: string | null;
  checkIns?: number;
};

type Message = { tone: 'info' | 'success' | 'error'; text: string };

type DraftTicket = {
  name: string;
  email: string;
  phone: string;
  company: string;
};

type TicketsResponse = {
  ok: boolean;
  tickets?: TicketRecord[];
  error?: string;
};

type TicketUpdateResponse = {
  ok: boolean;
  ticket?: TicketRecord;
  error?: string;
};

type TicketActionResponse = {
  ok: boolean;
  error?: string;
};

type SendTicketResponse = {
  ok: boolean;
  sent?: number;
  errors?: number;
  error?: string;
  message?: string;
  failures?: Array<{ token: string; error: string }>;
};

type RebuildTicketsResponse = {
  ok: boolean;
  updated?: number;
  errors?: number;
  error?: string;
  message?: string;
  tickets?: TicketRecord[];
  failures?: Array<{ token: string; error: string }>;
};

type BulkDeleteResponse = {
  ok: boolean;
  removed?: number;
  error?: string;
};

type ImportResponse = {
  ok: boolean;
  imported?: number;
  errors?: Array<{ row: number; error: string }>;
  tickets?: TicketRecord[];
  error?: string;
};

type VerifyResponse = {
  ok: boolean;
  error?: string;
  record?: TicketRecord;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function EllipsisVerticalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 4 16"
      width={12}
      height={20}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <circle cx={2} cy={2} r={1.6} fill="currentColor" />
      <circle cx={2} cy={8} r={1.6} fill="currentColor" />
      <circle cx={2} cy={14} r={1.6} fill="currentColor" />
    </svg>
  );
}

function TrashIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={16}
      height={16}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        fill="currentColor"
        d="M9 3a1 1 0 0 0-1 1v1H5.5a1 1 0 1 0 0 2H6v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7h.5a1 1 0 1 0 0-2H16V4a1 1 0 0 0-1-1H9zm1 3h4V5h-4v1zm-1 2v12h8V8H9zm2 2a1 1 0 0 1 2 0v7a1 1 0 1 1-2 0v-7z"
      />
    </svg>
  );
}

function RefreshIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={18}
      height={18}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        fill="currentColor"
        d="M4.93 4.93A10 10 0 0 1 19.07 4l1.4 1.4a1 1 0 0 1-1.42 1.42l-1.13-1.13a8 8 0 1 0 2.18 7.24 1 1 0 1 1 1.94.5A10 10 0 1 1 4.93 4.93Z"
      />
    </svg>
  );
}

const ALL_COMPANIES = '__ALL_COMPANIES__';
const NO_COMPANY = '__NO_COMPANY__';

export default function AdminAttendeesPage() {
  const { session, loading: authLoading, error: authError, role } = useStaffSession({
    requiredRole: 'admin',
  });

  const [tickets, setTickets] = useState<TicketRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState<DraftTicket | null>(null);
  const [savingToken, setSavingToken] = useState<string | null>(null);
  const [checkingToken, setCheckingToken] = useState<string | null>(null);
  const [deletingToken, setDeletingToken] = useState<string | null>(null);
  const [sendingToken, setSendingToken] = useState<string | null>(null);
  const [bulkSending, setBulkSending] = useState(false);
  const [bulkRebuilding, setBulkRebuilding] = useState(false);
  const [importing, setImporting] = useState(false);
  const [companyFilter, setCompanyFilter] = useState<string>(ALL_COMPANIES);
  const canManage = !!session && role === 'admin';
  const importInputRef = useRef<HTMLInputElement | null>(null);

  const companyOptions = useMemo(() => {
    const companyNames = new Set<string>();
    let hasNoCompany = false;
    tickets.forEach((ticket) => {
      const trimmed = ticket.company?.trim();
      if (trimmed) {
        companyNames.add(trimmed);
      } else {
        hasNoCompany = true;
      }
    });
    const sorted = Array.from(companyNames).sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: 'base' })
    );
    const options = sorted.map((value) => ({ value, label: value }));
    if (hasNoCompany) {
      options.push({ value: NO_COMPANY, label: 'No company' });
    }
    return options;
  }, [tickets]);

  const filteredTickets = useMemo(() => {
    if (companyFilter === ALL_COMPANIES) return tickets;
    if (companyFilter === NO_COMPANY) {
      return tickets.filter((ticket) => !ticket.company?.trim());
    }
    return tickets.filter((ticket) => ticket.company?.trim() === companyFilter);
  }, [companyFilter, tickets]);

  useEffect(() => {
    if (companyFilter === ALL_COMPANIES) return;
    if (companyFilter === NO_COMPANY) {
      const hasNoCompany = tickets.some((ticket) => !ticket.company?.trim());
      if (!hasNoCompany) {
        setCompanyFilter(ALL_COMPANIES);
      }
      return;
    }
    const hasCompany = tickets.some((ticket) => ticket.company?.trim() === companyFilter);
    if (!hasCompany) {
      setCompanyFilter(ALL_COMPANIES);
    }
  }, [companyFilter, tickets]);

  useEffect(() => {
    setSelected((prev) => {
      if (prev.length === 0) return prev;
      const visibleTokens = new Set(filteredTickets.map((ticket) => ticket.token));
      const next = prev.filter((token) => visibleTokens.has(token));
      return next.length === prev.length ? prev : next;
    });
  }, [filteredTickets]);

  const stats = useMemo(() => {
    const total = tickets.length;
    const checkedIn = tickets.reduce((acc, ticket) => (ticket.checkedIn ? acc + 1 : acc), 0);
    return { total, checkedIn };
  }, [tickets]);

  const hasSelection = selected.length > 0;
  const allSelected = filteredTickets.length > 0 && selected.length === filteredTickets.length;

  const setStatusMessage = useCallback((tone: Message['tone'], text: string) => {
    setMessage({ tone, text });
  }, []);

  const fetchTickets = useCallback(
    async (opts?: { silent?: boolean }) => {
      if (!canManage) return;
      if (opts?.silent) setRefreshing(true);
      else setLoading(true);
      try {
        const res = await fetch('/tickets/api/admin/tickets', { cache: 'no-store' });
        const data = (await res.json().catch(() => null)) as TicketsResponse | null;
        if (!res.ok || !data?.ok || !Array.isArray(data.tickets)) {
          throw new Error(data?.error || 'Failed to load attendees');
        }
        setTickets(data.tickets);
        if (!opts?.silent) setMessage(null);
      } catch (err) {
        console.error('[admin attendees] load failed', err);
        setStatusMessage('error', err instanceof Error ? err.message : 'Failed to load attendees');
      } finally {
        if (opts?.silent) setRefreshing(false);
        else setLoading(false);
      }
    },
    [canManage, setStatusMessage]
  );

  useEffect(() => {
    if (canManage) {
      fetchTickets();
    }
  }, [canManage, fetchTickets]);

  useEffect(() => {
    if (!menuFor) return;
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.closest('[data-attendee-menu]')) return;
      setMenuFor(null);
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [menuFor]);

  useEffect(() => {
    setSelected((prev) => prev.filter((token) => tickets.some((t) => t.token === token)));
  }, [tickets]);

  const toggleSelect = (token: string) => {
    setSelected((prev) =>
      prev.includes(token) ? prev.filter((t) => t !== token) : [...prev, token]
    );
  };

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelected(filteredTickets.map((ticket) => ticket.token));
    } else {
      setSelected([]);
    }
  };

  const handleEdit = (ticket: TicketRecord) => {
    setMenuFor(null);
    setEditing(ticket.token);
    setDraft({
      name: ticket.name,
      email: ticket.email,
      phone: ticket.phone ?? '',
      company: ticket.company ?? '',
    });
  };

  const handleDraftChange = (field: keyof DraftTicket, value: string) => {
    setDraft((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleCancelEdit = () => {
    setEditing(null);
    setDraft(null);
  };

  const handleSaveEdit = async (token: string) => {
    if (!draft) return;
    const payload = {
      name: draft.name.trim(),
      email: draft.email.trim(),
      phone: draft.phone.trim(),
      company: draft.company.trim() || undefined,
    };
    if (!payload.name || !payload.email || !payload.phone) {
      setStatusMessage('error', 'Name, email, and phone are required.');
      return;
    }
    setSavingToken(token);
    try {
      const res = await fetch(`/tickets/api/admin/tickets/${encodeURIComponent(token)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => null)) as TicketUpdateResponse | null;
      if (!res.ok || !data?.ok || !data.ticket) {
        throw new Error(data?.error || 'Failed to update attendee');
      }
      setTickets((prev) => prev.map((t) => (t.token === token ? data.ticket! : t)));
      setStatusMessage('success', 'Attendee details updated.');
      setEditing(null);
      setDraft(null);
    } catch (err) {
      console.error('[admin attendees] save failed', err);
      setStatusMessage('error', err instanceof Error ? err.message : 'Update failed');
    } finally {
      setSavingToken(null);
    }
  };

  const handleDelete = async (token: string) => {
    if (typeof window !== 'undefined') {
      const confirmed = window.confirm(
        'Are you sure you want to delete this attendee? This action cannot be undone.'
      );
      if (!confirmed) {
        return;
      }
    }
    setMenuFor(null);
    setDeletingToken(token);
    try {
      const res = await fetch(`/tickets/api/admin/tickets/${encodeURIComponent(token)}`, {
        method: 'DELETE',
      });
      const data = (await res.json().catch(() => null)) as TicketActionResponse | null;
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || 'Failed to delete attendee');
      }
      setTickets((prev) => prev.filter((t) => t.token !== token));
      setSelected((prev) => prev.filter((t) => t !== token));
      setStatusMessage('success', 'Attendee deleted.');
    } catch (err) {
      console.error('[admin attendees] delete failed', err);
      setStatusMessage('error', err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setDeletingToken(null);
    }
  };

  const handleBulkDelete = async () => {
    if (!selected.length) return;
    if (typeof window !== 'undefined') {
      const confirmed = window.confirm(
        selected.length === 1
          ? 'Are you sure you want to delete this attendee? This action cannot be undone.'
          : `Are you sure you want to delete ${selected.length} attendees? This action cannot be undone.`
      );
      if (!confirmed) return;
    }
    try {
      const res = await fetch('/tickets/api/admin/tickets/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokens: selected }),
      });
      const data = (await res.json().catch(() => null)) as BulkDeleteResponse | null;
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || 'Failed to delete attendees');
      }
      setTickets((prev) => prev.filter((t) => !selected.includes(t.token)));
      setSelected([]);
      setStatusMessage(
        'success',
        selected.length === 1 ? '1 attendee deleted.' : `${selected.length} attendees deleted.`
      );
    } catch (err) {
      console.error('[admin attendees] bulk delete failed', err);
      setStatusMessage('error', err instanceof Error ? err.message : 'Bulk delete failed');
    }
  };

  const handleBulkSendTickets = async () => {
    if (!selected.length) return;
    setBulkSending(true);
    try {
      const res = await fetch('/tickets/api/admin/tickets/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokens: selected }),
      });
      const data = (await res.json().catch(() => null)) as SendTicketResponse | null;
      if (!data) {
        throw new Error('Failed to send tickets.');
      }
      const tone: Message['tone'] =
        data.ok ? 'success' : data.sent && data.sent > 0 ? 'info' : 'error';
      const fallback =
        data.sent && data.sent > 0
          ? `Sent ${data.sent} ticket${data.sent === 1 ? '' : 's'} with ${
              data.errors ?? 0
            } error${(data.errors ?? 0) === 1 ? '' : 's'}.`
          : 'Failed to send tickets.';
      const text = data.message || data.error || fallback;
      if (tone === 'error') {
        throw new Error(text);
      }
      setStatusMessage(tone, text);
    } catch (err) {
      console.error('[admin attendees] bulk send failed', err);
      setStatusMessage(
        'error',
        err instanceof Error ? err.message : 'Unable to send tickets.'
      );
    } finally {
      setBulkSending(false);
    }
  };

  const handleBulkRebuildTickets = async () => {
    if (!selected.length) return;
    setBulkRebuilding(true);
    try {
      const res = await fetch('/tickets/api/admin/tickets/rebuild', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokens: selected }),
      });
      const data = (await res.json().catch(() => null)) as RebuildTicketsResponse | null;
      if (!data) {
        throw new Error('Failed to rebuild tickets.');
      }
      const tone: Message['tone'] =
        data.ok ? 'success' : data.updated && data.updated > 0 ? 'info' : 'error';
      const fallback =
        data.updated && data.updated > 0
          ? `Rebuilt ${data.updated} ticket${data.updated === 1 ? '' : 's'} with ${
              data.errors ?? 0
            } error${(data.errors ?? 0) === 1 ? '' : 's'}.`
          : 'Failed to rebuild tickets.';
      const text = data.message || data.error || fallback;
      if (Array.isArray(data.tickets) && data.tickets.length) {
        setTickets((prev) =>
          prev.map((ticket) => {
            const updated = data.tickets!.find((t) => t.token === ticket.token);
            return updated ? { ...ticket, ...updated } : ticket;
          })
        );
      }
      if (tone === 'error') {
        throw new Error(text);
      }
      setStatusMessage(tone, text);
    } catch (err) {
      console.error('[admin attendees] bulk rebuild failed', err);
      setStatusMessage(
        'error',
        err instanceof Error ? err.message : 'Unable to rebuild tickets.'
      );
    } finally {
      setBulkRebuilding(false);
    }
  };

  const handleSendTicket = async (token: string) => {
    setMenuFor(null);
    setSendingToken(token);
    try {
      const res = await fetch('/tickets/api/admin/tickets/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokens: [token] }),
      });
      const data = (await res.json().catch(() => null)) as SendTicketResponse | null;
      if (!data) {
        throw new Error('Failed to send ticket.');
      }
      const tone: Message['tone'] =
        data.ok ? 'success' : data.sent && data.sent > 0 ? 'info' : 'error';
      const fallback =
        data.sent && data.sent > 0
          ? 'Ticket email sent.'
          : 'Failed to send ticket.';
      const text = data.message || data.error || fallback;
      if (tone === 'error') {
        throw new Error(text);
      }
      setStatusMessage(tone, text);
    } catch (err) {
      console.error('[admin attendees] send ticket failed', err);
      setStatusMessage('error', err instanceof Error ? err.message : 'Unable to send ticket.');
    } finally {
      setSendingToken(null);
    }
  };

  const handleBulkCheck = async (action: 'checkin' | 'undo') => {
    if (!selected.length) return;
    try {
      const requests = selected.map((token) =>
        fetch('/tickets/api/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token, action }),
        }).then(async (res) => {
          const data = (await res.json().catch(() => null)) as VerifyResponse | null;
          if (!res.ok || !data?.ok || !data.record) throw new Error(data?.error || 'Failed');
          return data.record;
        })
      );
      const updatedRecords = await Promise.all(requests);
      setTickets((prev) =>
        prev.map((ticket) => {
          const updated = updatedRecords.find((rec) => rec.token === ticket.token);
          return updated ? { ...ticket, ...updated } : ticket;
        })
      );
      setStatusMessage(
        'success',
        action === 'checkin'
          ? `${updatedRecords.length} attendee${updatedRecords.length === 1 ? '' : 's'} checked in.`
          : `${updatedRecords.length} attendee${updatedRecords.length === 1 ? '' : 's'} checked out.`
      );
    } catch (err) {
      console.error('[admin attendees] bulk check failed', err);
      setStatusMessage('error', err instanceof Error ? err.message : 'Bulk update failed');
    }
  };

  const handleToggleCheckIn = async (ticket: TicketRecord) => {
    setMenuFor(null);
    setCheckingToken(ticket.token);
    const action = ticket.checkedIn ? 'undo' : 'checkin';
    try {
      const res = await fetch('/tickets/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: ticket.token, action }),
      });
      const data = (await res.json().catch(() => null)) as VerifyResponse | null;
      if (!res.ok || !data?.ok || !data.record) {
        throw new Error(data?.error || 'Failed to update check-in status');
      }
      const updatedRecord = data.record;
      setTickets((prev) => prev.map((t) => (t.token === ticket.token ? { ...t, ...updatedRecord } : t)));
      setStatusMessage(
        'success',
        action === 'checkin' ? `${ticket.name} checked in.` : `${ticket.name} checked out.`
      );
    } catch (err) {
      console.error('[admin attendees] check-in toggle failed', err);
      setStatusMessage('error', err instanceof Error ? err.message : 'Unable to update check-in status');
    } finally {
      setCheckingToken(null);
    }
  };

  const handleImport: ChangeEventHandler<HTMLInputElement> = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImporting(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/tickets/api/admin/tickets/import', {
        method: 'POST',
        body: form,
      });
      const data = (await res.json().catch(() => null)) as ImportResponse | null;
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || 'Failed to import attendees');
      }
      const importedCount = Number(data.imported || 0);
      const errorCount = Array.isArray(data.errors) ? data.errors.length : 0;
      await fetchTickets({ silent: true });
      setStatusMessage(
        errorCount
          ? 'info'
          : 'success',
        errorCount
          ? `Imported ${importedCount} attendees with ${errorCount} warnings.`
          : `Imported ${importedCount} attendees.`
      );
    } catch (err) {
      console.error('[admin attendees] import failed', err);
      setStatusMessage('error', err instanceof Error ? err.message : 'Import failed');
    } finally {
      setImporting(false);
      event.target.value = '';
    }
  };

  const handleRefresh = () => {
    fetchTickets({ silent: true });
  };

  if (authLoading) {
    return (
      <main className={styles.page}>
        <TypographyHeading fontStyle="H2" text="Loading admin tools…" />
        <TypographyParagraph
          fontStyle="Text Main"
          text="Checking your permissions, please wait."
        />
      </main>
    );
  }

  if (!canManage) {
    return (
      <main className={styles.page}>
        <TypographyHeading fontStyle="H2" text="Admin Access Required" />
        <TypographyParagraph
          fontStyle="Text Main"
          text={
            <>
              {authError === 'Unauthorized'
                ? 'Only administrators can manage attendees.'
                : authError || 'Please sign in to continue.'}{' '}
              <Link href="/login">Go to the admin login page.</Link>
            </>
          }
        />
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
          <div className={styles.headerMeta}>
            <button
              type="button"
              className={styles.refreshButton}
              onClick={handleRefresh}
              disabled={refreshing}
              aria-label="Refresh attendees"
            >
              <RefreshIcon
                className={cx(styles.refreshIcon, refreshing && styles.refreshIconSpinning)}
              />
            </button>
            <span className={styles.statusSummary}>
              {stats.checkedIn} checked in · {stats.total} total
            </span>
            <button
              type="button"
              className={styles.importLink}
              onClick={() => importInputRef.current?.click()}
              disabled={importing}
            >
              {importing ? 'Importing…' : 'Import CSV'}
            </button>
            <input
              ref={importInputRef}
              type="file"
              accept=".csv,text/csv"
              onChange={handleImport}
              className={styles.csvInput}
              hidden
              disabled={importing}
            />
          </div>
        </div>
        <TypographyHeading fontStyle="H1" text="Attendees" />
        <TypographyParagraph
          fontStyle="Text Main"
          text="Review attendee info, update contact details, refresh QR codes, or perform bulk actions."
        />
      </header>

      <div className={styles.actionsBar}>
        <div className={styles.actionsLeft}>
          <select
            className={styles.filterSelect}
            value={companyFilter}
            onChange={(event) => setCompanyFilter(event.target.value)}
            aria-label="Filter by company"
          >
            <option value={ALL_COMPANIES}>All companies</option>
            {companyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {hasSelection && (
            <div className={styles.bulkActions}>
              <TypographyParagraph
                fontStyle="Text Small"
                text={`${selected.length} selected`}
              />
              <button
                type="button"
                className={cx(styles.controlButton, styles.controlButtonDangerFilled)}
                onClick={handleBulkDelete}
                aria-label="Delete selected attendees"
              >
                <TrashIcon className={styles.actionIcon} />
                <span className={styles.srOnly}>Delete selected</span>
              </button>
              <button
                type="button"
                className={cx(styles.controlButton, styles.controlButtonSecondary)}
                onClick={handleBulkRebuildTickets}
                disabled={bulkRebuilding}
              >
                {bulkRebuilding ? 'Rebuilding…' : 'Rebuild tickets'}
              </button>
              <button
                type="button"
                className={cx(styles.controlButton, styles.controlButtonSecondary)}
                onClick={handleBulkSendTickets}
                disabled={bulkSending}
              >
                {bulkSending ? 'Sending…' : 'Send ticket'}
              </button>
              <button
                type="button"
                className={cx(styles.controlButton, styles.controlButtonPrimary)}
                onClick={() => handleBulkCheck('checkin')}
              >
                Check-in all
              </button>
              <button
                type="button"
                className={cx(styles.controlButton, styles.controlButtonSecondary)}
                onClick={() => handleBulkCheck('undo')}
              >
                Check-out all
              </button>
            </div>
          )}
        </div>
      </div>

      {message && (
        <div
          className={cx(
            styles.message,
            message.tone === 'success' && styles.messageSuccess,
            message.tone === 'error' && styles.messageError
          )}
        >
          {message.text}
        </div>
      )}

      <div className={styles.tableWrap}>
        {loading ? (
          <div className={styles.emptyState}>Loading attendees…</div>
        ) : tickets.length === 0 ? (
          <div className={styles.emptyState}>
            No attendees found yet. Import a CSV to get started.
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className={styles.emptyState}>No attendees match the selected company.</div>
        ) : (
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.selectionCell}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={allSelected}
                      onChange={(event) => toggleSelectAll(event.target.checked)}
                    />
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Company</th>
                  <th>QR Codes</th>
                  <th>Status</th>
                  <th className={styles.menuCell} />
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => {
                  const isEditing = editing === ticket.token;
                  const isSaving = savingToken === ticket.token;
                  const isDeleting = deletingToken === ticket.token;
                  const isSending = sendingToken === ticket.token;
                  const draftValues = draft ?? {
                    name: '',
                    email: '',
                    phone: '',
                    company: '',
                  };
                  return (
                    <tr key={ticket.token}>
                      <td className={styles.selectionCell}>
                        <input
                          type="checkbox"
                          className={styles.checkbox}
                          checked={selected.includes(ticket.token)}
                          onChange={() => toggleSelect(ticket.token)}
                        />
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            className={styles.inlineInput}
                            value={draftValues.name}
                            onChange={(event) => handleDraftChange('name', event.target.value)}
                          />
                        ) : (
                          ticket.name
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            className={styles.inlineInput}
                            value={draftValues.email}
                            onChange={(event) => handleDraftChange('email', event.target.value)}
                          />
                        ) : (
                          <a href={`mailto:${ticket.email}`}>{ticket.email}</a>
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            className={styles.inlineInput}
                            value={draftValues.phone}
                            onChange={(event) => handleDraftChange('phone', event.target.value)}
                          />
                        ) : ticket.phone ? (
                          <a href={`tel:${ticket.phone}`}>{ticket.phone}</a>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            className={styles.inlineInput}
                            value={draftValues.company}
                            onChange={(event) => handleDraftChange('company', event.target.value)}
                          />
                        ) : (
                          ticket.company || '—'
                        )}
                      </td>
                      <td>
                        <div className={styles.qrGrid}>
                          {ticket.ticketPngUrl ? (
                            <div className={styles.qrPreview}>
                              <Image
                                src={ticket.ticketPngUrl}
                                alt={`Ticket QR for ${ticket.name}`}
                                className={styles.qrImage}
                                width={72}
                                height={72}
                                unoptimized
                              />
                              <a href={ticket.ticketPngUrl} target="_blank" rel="noreferrer">
                                Ticket QR
                              </a>
                            </div>
                          ) : (
                            <span>—</span>
                          )}
                          {ticket.vcardSvgUrl ? (
                            <div className={styles.qrPreview}>
                              <Image
                                src={ticket.vcardSvgUrl}
                                alt={`vCard QR for ${ticket.name}`}
                                className={styles.qrImage}
                                width={72}
                                height={72}
                                unoptimized
                              />
                              <a href={ticket.vcardSvgUrl} target="_blank" rel="noreferrer">
                                vCard QR
                              </a>
                            </div>
                          ) : (
                            <span>—</span>
                          )}
                        </div>
                      </td>
                      <td className={styles.statusCell}>
                        <button
                          type="button"
                          className={cx(
                            styles.statusToggle,
                            ticket.checkedIn ? styles.statusToggleChecked : styles.statusToggleUnchecked,
                            checkingToken === ticket.token && styles.statusToggleBusy
                          )}
                          onClick={() => handleToggleCheckIn(ticket)}
                          disabled={checkingToken === ticket.token}
                          title={
                            ticket.checkedIn
                              ? `Mark ${ticket.name} as not checked in`
                              : `Mark ${ticket.name} as checked in`
                          }
                        >
                          <span className={styles.statusToggleIcon} aria-hidden="true">
                            {checkingToken === ticket.token ? '…' : ticket.checkedIn ? '✓' : '×'}
                          </span>
                          <span className={styles.srOnly}>
                            {ticket.checkedIn ? 'Mark as not checked in' : 'Mark as checked in'}
                          </span>
                        </button>
                      </td>
                      <td className={styles.menuCell}>
                        {isEditing ? (
                          <div className={styles.rowActions}>
                            <button
                              type="button"
                              className={cx(styles.rowActionButton, styles.rowActionPrimary)}
                              onClick={() => handleSaveEdit(ticket.token)}
                              disabled={isSaving}
                            >
                              {isSaving ? 'Saving…' : 'Save'}
                            </button>
                            <button
                              type="button"
                              className={styles.rowActionButton}
                              onClick={handleCancelEdit}
                              disabled={isSaving}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className={styles.menuCellContent} data-attendee-menu="true">
                            <button
                              type="button"
                              className={styles.menuButton}
                              onClick={() =>
                                setMenuFor((prev) => (prev === ticket.token ? null : ticket.token))
                              }
                              data-attendee-menu="true"
                              aria-haspopup="menu"
                              aria-expanded={menuFor === ticket.token}
                              aria-label={`Open actions for ${ticket.name}`}
                            >
                              <EllipsisVerticalIcon />
                            </button>
                            {menuFor === ticket.token && (
                              <div className={styles.menuPanel} data-attendee-menu="true" role="menu">
                                <ul className={styles.menuList}>
                                  <li>
                                    <button
                                      type="button"
                                      className={styles.menuItem}
                                      onClick={() => handleEdit(ticket)}
                                    >
                                      Edit details
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      type="button"
                                      className={styles.menuItem}
                                      onClick={() => handleSendTicket(ticket.token)}
                                      disabled={isSending}
                                    >
                                      {isSending ? 'Sending…' : 'Send ticket'}
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      type="button"
                                      className={styles.menuItem}
                                      onClick={() => handleDelete(ticket.token)}
                                      disabled={isDeleting}
                                    >
                                      {isDeleting ? 'Deleting…' : 'Delete'}
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
