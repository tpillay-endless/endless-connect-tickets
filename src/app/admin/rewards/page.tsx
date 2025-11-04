'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEventHandler,
} from 'react';
import Link from 'next/link';
import styles from '@/styles/admin-rewards.module.css';
import { EndlessLogo } from '@/components/EndlessLogo';
import { TypographyHeading, TypographyParagraph } from '@/components/WebflowTypography';
import { useStaffSession } from '@/hooks/useStaffSession';
import type { TicketRecord } from '@/lib/ticketsDb';
import ticketButtonStyles from '@/styles/ticket-pages.module.css';

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

type WinnerDisplay = {
  token: string;
  name: string;
  email: string;
  company?: string;
};

type Banner =
  | { tone: 'info' | 'success' | 'error'; text: string }
  | null;

type TicketsResponse = {
  ok: boolean;
  tickets?: TicketRecord[];
  error?: string;
};

const SPINNER_POSITIONS = [-3, -2, -1, 0, 1, 2, 3];
const OPACITY_SEQUENCE = [0.8, 0.6, 0.4, 0.2];
const BLUR_SEQUENCE = ['blur(1px)', 'blur(2px)', 'blur(3px)', 'blur(4px)'];

function blurForSpeed(base: number, progress: number, depthIndex: number, isResting: boolean) {
  if (isResting) return base;
  const normalized = Math.max(0, Math.min(1, progress));
  const acceleration = normalized < 0.5 ? normalized * 10 : (1 - normalized) * 4;
  const depthBoost = depthIndex * 0.25;
  return Math.max(0, base + acceleration + depthBoost);
}

function randomInRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function reverseEase(t: number) {
  return 1 - Math.pow(1 - t, 2);
}

function wheelSpinEase(t: number) {
  if (t <= 0.15) {
    const seg = t / 0.15;
    return 0.12 * seg * seg;
  }
  if (t >= 0.65) {
    const seg = (t - 0.65) / 0.35;
    return 0.7 + 0.3 * (1 - Math.pow(1 - seg, 2.4));
  }
  const mid = (t - 0.15) / 0.5;
  return 0.12 + 0.58 * Math.pow(mid, 1.1);
}

function warmupEase(t: number) {
  return Math.pow(t, 2.2);
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    const handle = setTimeout(() => {
      clearTimeout(handle);
      resolve();
    }, ms);
  });
}

function toDisplay(ticket: TicketRecord | WinnerDisplay): WinnerDisplay {
  return {
    token: ticket.token,
    name: ticket.name,
    email: ticket.email,
    company: ticket.company,
  };
}

export default function RewardsPage() {
  const { session, loading: authLoading, error: authError, role } = useStaffSession({
    requiredRole: 'admin',
  });
  const [attendees, setAttendees] = useState<TicketRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [banner, setBanner] = useState<Banner>(null);
  const [prizeCount, setPrizeCount] = useState(5);
  const [wheelBase, setWheelBase] = useState<WinnerDisplay[]>([]);
  const [wheelOffset, setWheelOffset] = useState(0);
  const [upcomingWinner, setUpcomingWinner] = useState<string | null>(null);
  const [phase, setPhase] = useState<'setup' | 'spin'>('setup');
  const [winners, setWinners] = useState<WinnerDisplay[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [spinBlurred, setSpinBlurred] = useState(false);
  const rafRef = useRef<number | null>(null);
  const [excludedCompanies, setExcludedCompanies] = useState<string[]>([
    'Endless Biotech',
    'Grodan',
  ]);
  const runButtonRef = useRef<HTMLButtonElement | null>(null);
  const backButtonRef = useRef<HTMLButtonElement | null>(null);
  const spinProgressRef = useRef(0);

  const canManage = !!session && role === 'admin';

  const normalizedExcluded = useMemo(
    () => new Set(excludedCompanies.map((c) => c.trim().toLowerCase()).filter(Boolean)),
    [excludedCompanies]
  );

  const checkedIn = useMemo(() => attendees.filter((t) => t.checkedIn), [attendees]);

  const eligibleAttendees = useMemo(() => {
    return checkedIn.filter((t) => {
      const company = (t.company || '').trim().toLowerCase();
      return company ? !normalizedExcluded.has(company) : true;
    });
  }, [checkedIn, normalizedExcluded]);

  const availableCompanies = useMemo(() => {
    const uniq = new Set<string>();
    attendees.forEach((t) => {
      const company = (t.company || '').trim();
      if (company) uniq.add(company);
    });
    return Array.from(uniq).sort((a, b) => a.localeCompare(b));
  }, [attendees]);

  const targetWinners = useMemo(
    () => Math.min(prizeCount, eligibleAttendees.length || 0),
    [prizeCount, eligibleAttendees.length]
  );

  const winnerTokens = useMemo(() => new Set(winners.map((winner) => winner.token)), [winners]);

  const availableForDraw = useMemo(
    () => eligibleAttendees.filter((attendee) => !winnerTokens.has(attendee.token)),
    [eligibleAttendees, winnerTokens]
  );

  const drawsRemaining = Math.max(0, targetWinners - winners.length);
  const runDisabled =
    isRunning || isResting || drawsRemaining <= 0 || availableForDraw.length === 0;

  const fetchAttendees = useCallback(
    async (opts?: { silent?: boolean }) => {
      if (!canManage) return;
      if (opts?.silent) setRefreshing(true);
      else setLoading(true);
      try {
        const res = await fetch('/tickets/api/admin/tickets', { cache: 'no-store' });
        const data = (await res.json().catch(() => null)) as TicketsResponse | null;
        if (!res.ok || !data?.ok || !Array.isArray(data.tickets)) {
          throw new Error(data?.error || 'Failed to load attendees.');
        }
        setAttendees(data.tickets);
        if (!opts?.silent) setBanner(null);
      } catch (err) {
        console.error('[rewards] load failed', err);
        setBanner({
          tone: 'error',
          text: err instanceof Error ? err.message : 'Failed to load attendees.',
        });
      } finally {
        if (opts?.silent) setRefreshing(false);
        else setLoading(false);
      }
    },
    [canManage]
  );

  const clearTimers = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (canManage) fetchAttendees();
  }, [canManage, fetchAttendees]);

  useEffect(
    () => () => {
      clearTimers();
    },
    [clearTimers]
  );

  const allWinnersSelected =
    phase === 'spin' && targetWinners > 0 && winners.length >= targetWinners;

  useEffect(() => {
    if (isRunning || allWinnersSelected) return;
    const nextBase = eligibleAttendees
      .map(toDisplay)
      .sort(() => Math.random() - 0.5);
    setWheelBase(nextBase);
    if (nextBase.length === 0) {
      setWheelOffset(0);
    } else {
      setWheelOffset((prev) => {
        const normalized = ((prev % nextBase.length) + nextBase.length) % nextBase.length;
        return Number.isFinite(normalized) ? normalized : 0;
      });
    }
  }, [eligibleAttendees, isRunning, allWinnersSelected]);

  const { slotItems, spinnerReady } = useMemo(() => {
    const length = wheelBase.length;
    if (!length) {
      return {
        spinnerReady: false,
        slotItems: SPINNER_POSITIONS.map((pos) => ({
          display: null as WinnerDisplay | null,
          relative: pos,
        })),
      };
    }
    const normalized = ((wheelOffset % length) + length) % length;
    const baseIndex = Math.floor(normalized);
    const progress = normalized - baseIndex;
    const items = SPINNER_POSITIONS.map((pos) => {
      const idx = (baseIndex + pos + length) % length;
      return {
        display: wheelBase[idx] ?? null,
        relative: pos - progress,
      };
    });
    return {
      spinnerReady: items.some((item) => item.display),
      slotItems: items,
    };
  }, [wheelBase, wheelOffset]);

  const handleRefresh = () => {
    if (isRunning) return;
    fetchAttendees({ silent: true });
  };

  const handlePrizeChange = (delta: number) => {
    setPrizeCount((prev) => Math.max(1, prev + delta));
  };

  const handlePrizeInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    const next = Number.parseInt(event.target.value, 10);
    if (Number.isNaN(next)) {
      event.target.value = String(prizeCount);
      return;
    }
    setPrizeCount(Math.max(1, next));
  };

  const handleExcludeCompany: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const company = event.target.value;
    if (!company) return;
    setExcludedCompanies((prev) => {
      if (prev.includes(company)) return prev;
      return [...prev, company];
    });
    event.target.value = '';
  };

  const removeExcludedCompany = (company: string) => {
    setExcludedCompanies((prev) => prev.filter((c) => c !== company));
  };

  const handleStart = () => {
    if (!eligibleAttendees.length) {
      setBanner({
        tone: 'error',
        text: 'No attendees available for the draw.',
      });
      return;
    }
    clearTimers();
    setPhase('spin');
    setSpinBlurred(true);
    setUpcomingWinner(null);
    setWinners([]);
    setWheelOffset(0);
    setIsRunning(false);
    setIsResting(false);
  };

  const handleBackToSetup = useCallback(() => {
    if (isRunning) return;
    clearTimers();
    setPhase('setup');
    setSpinBlurred(false);
    setUpcomingWinner(null);
    setIsResting(false);
  }, [isRunning, clearTimers]);

  const handleRun = useCallback(() => {
    if (phase !== 'spin' || isRunning || isResting) return;
    if (!wheelBase.length) {
      setBanner({
        tone: 'error',
        text: 'No eligible attendees available. Adjust exclusions or refresh the pool.',
      });
      return;
    }
    if (drawsRemaining <= 0 || availableForDraw.length === 0) {
      setSpinBlurred(true);
      return;
    }

    clearTimers();
    setBanner(null);
    setSpinBlurred(false);
    setUpcomingWinner(null);
    spinProgressRef.current = 0;

    const pool = [...wheelBase];
    const alreadyWonTokens = new Set(winners.map((winner) => winner.token));
    const localWinnerTokens = new Set<string>();
    let offsetCursor = wheelOffset;
    const poolLength = pool.length || 1;

    const animateOffset = (
      from: number,
      to: number,
      duration: number,
      ease: (value: number) => number,
      onProgress?: (progress: number) => void
    ) =>
      new Promise<void>((resolve) => {
        const start = performance.now();
        const step = (now: number) => {
          const elapsed = now - start;
          const rawProgress = duration <= 0 ? 1 : Math.min(1, elapsed / duration);
          const eased = ease(rawProgress);
          setWheelOffset(from + (to - from) * eased);
          spinProgressRef.current = rawProgress;
          if (onProgress) onProgress(eased);
          if (rawProgress < 1) {
            rafRef.current = requestAnimationFrame(step);
          } else {
            rafRef.current = null;
            resolve();
          }
        };
        if (rafRef.current != null) {
          cancelAnimationFrame(rafRef.current);
        }
        rafRef.current = requestAnimationFrame(step);
      });

    const spinOnce = async (isFinalSpin: boolean, isFirstSpin: boolean): Promise<boolean> => {
      const candidates = pool.filter(
        (candidate) =>
          !alreadyWonTokens.has(candidate.token) && !localWinnerTokens.has(candidate.token)
      );
      if (!candidates.length) return false;

      const winner = candidates[Math.floor(Math.random() * candidates.length)];
      const winnerIndex = pool.findIndex((candidate) => candidate.token === winner.token);
      if (winnerIndex < 0) return false;

      if (isFirstSpin) {
        const warmupDistance = randomInRange(0.2, 0.5);
        const warmupDuration = Math.round(randomInRange(500, 750));
        await animateOffset(offsetCursor, offsetCursor + warmupDistance, warmupDuration, warmupEase);
        offsetCursor += warmupDistance;
      }

      const reverseDistance = randomInRange(1.3, 2);
      const reverseDuration = Math.round(randomInRange(420, 520));
      await animateOffset(offsetCursor, offsetCursor - reverseDistance, reverseDuration, reverseEase);
      offsetCursor -= reverseDistance;

      const loops = Math.max(3, Math.floor(randomInRange(3, 5)));
      const duration = Math.round(randomInRange(3600, 5600));
      const currentNormalized = ((offsetCursor % poolLength) + poolLength) % poolLength;
      const directDelta = ((winnerIndex - currentNormalized + poolLength) % poolLength);
      const endOffset = offsetCursor + loops * poolLength + directDelta;

      let armed = false;
      await animateOffset(offsetCursor, endOffset, duration, wheelSpinEase, (progress) => {
        if (!armed && progress >= 0.75) {
          armed = true;
          setUpcomingWinner(winner.token);
        }
        spinProgressRef.current = progress;
      });

      offsetCursor = ((endOffset % poolLength) + poolLength) % poolLength;
      setWheelOffset(offsetCursor);
      setUpcomingWinner(winner.token);
      setIsResting(true);

      if (isFinalSpin) {
        await wait(500);
      } else {
        await wait(2000);
      }

      localWinnerTokens.add(winner.token);
      alreadyWonTokens.add(winner.token);
      setWinners((prev) => [...prev, winner]);
      setIsResting(false);
      setUpcomingWinner(null);

      return true;
    };

    setIsRunning(true);

    (async () => {
      const spinLimit = Math.min(drawsRemaining, availableForDraw.length);
      for (let i = 0; i < spinLimit; i += 1) {
        const completed = await spinOnce(i === spinLimit - 1, i === 0);
        if (!completed) break;
      }

      setIsRunning(false);
      setIsResting(false);
      setUpcomingWinner(null);
      spinProgressRef.current = 0;

      const finalWinnerCount = winners.length + localWinnerTokens.size;
      if (finalWinnerCount >= targetWinners || availableForDraw.length <= localWinnerTokens.size) {
        setTimeout(() => {
          setSpinBlurred(true);
        }, 500);
      }
    })().catch((err) => {
      console.error('[rewards] run failed', err);
      setIsRunning(false);
      setIsResting(false);
      setUpcomingWinner(null);
      setBanner({
        tone: 'error',
        text: 'Failed to complete the draw.',
      });
    });
  }, [
    phase,
    isRunning,
    isResting,
    wheelBase,
    drawsRemaining,
    availableForDraw.length,
    clearTimers,
    setBanner,
    winners,
    wheelOffset,
    targetWinners,
  ]);

  useEffect(() => {
    if (phase !== 'spin') return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'r' && !runDisabled) {
        event.preventDefault();
        handleRun();
      }
      if (event.key.toLowerCase() === 'b' && !isRunning) {
        event.preventDefault();
        handleBackToSetup();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [phase, runDisabled, isRunning, handleRun, handleBackToSetup]);

  if (authLoading) {
    return (
      <main className={styles.page}>
        <TypographyHeading fontStyle="H2" text="Loading rewards…" />
        <TypographyParagraph fontStyle="Text Main" text="Validating admin access." />
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
              {authError || 'Please sign in to use the rewards tool.'}{' '}
              <Link href="/login">Go to login</Link>.
            </>
          }
        />
      </main>
    );
  }

  const eligibleSummary = `${eligibleAttendees.length} attendee${
    eligibleAttendees.length === 1 ? '' : 's'
  } currently eligible${
    checkedIn.length !== eligibleAttendees.length
      ? ` • ${checkedIn.length - eligibleAttendees.length} excluded`
      : ''
  }`;

  const spinnerDimmed = spinBlurred || (!isRunning && !isResting && winners.length === 0);
  const finalState =
    spinBlurred && !isRunning && !isResting && winners.length >= targetWinners && targetWinners > 0;
  const slotClassName = cx(
    styles.slotColumn,
    spinnerDimmed && styles.slotBlurred,
    finalState && styles.slotBlurredFinal
  );
  const showWinnerOverlay = finalState && winners.length > 0;
  if (phase === 'spin') {
    return (
      <main className={styles.spinPage}>
        <div className={styles.spinLogo}>
          <EndlessLogo className={styles.spinLogoSvg} />
        </div>
        <div className={styles.spinViewport}>
          <div className={styles.spinStage}>
            <div className={slotClassName}>
              {slotItems.map(({ display, relative }, index) => {
                const safeRelative = Number.isFinite(relative) ? relative : 0;
                const token = display?.token ?? `placeholder-${index}`;
                const name = display?.name ?? '—';
                const depthIndex = Math.min(3, Math.round(Math.abs(safeRelative)));
                let opacity = OPACITY_SEQUENCE[depthIndex];
                let blur = BLUR_SEQUENCE[depthIndex] ?? 'blur(4px)';
                const isWinner = display ? winnerTokens.has(display.token) : false;
                const isUpcoming = !!upcomingWinner && display?.token === upcomingWinner;
                const isCenterish = Math.abs(safeRelative) < 0.2;

                if (isRunning && isUpcoming) {
                  const proximity = Math.max(0, 1 - Math.min(1, Math.abs(safeRelative)));
                  opacity = Math.max(opacity, 0.8 + proximity * 0.2);
                  blur = `blur(${Math.max(0, 4 - proximity * 4).toFixed(2)}px)`;
                }

                if (isResting && isUpcoming && isCenterish) {
                  opacity = 1;
                  blur = 'blur(0px)';
                }

                if (!isRunning && !isResting && !spinBlurred && isWinner && !isUpcoming) {
                  opacity = Math.min(opacity, 0.6);
                  blur = 'blur(1.5px)';
                }

                if (spinBlurred) {
                  opacity = Math.min(opacity, 0.5);
                  blur = 'blur(8px)';
                }

                opacity = Math.max(0.15, Math.min(1, opacity));
                if (!isRunning && !spinBlurred && isCenterish) {
                  blur = 'blur(0px)';
                }
                if (!Number.isFinite(opacity)) {
                  opacity = 0.5;
                }

                const perspective = Math.abs(safeRelative);
                const translateY = safeRelative * 110;
                const rotateX = safeRelative * -12;
                const translateZ = -100 - perspective * 12;
                const baseBlurValue = Number.parseFloat(blur.replace(/[^0-9.]/g, '')) || 0;
                const dynamicBlurValue = blurForSpeed(
                  baseBlurValue,
                  isRunning ? spinProgressRef.current : 0,
                  depthIndex,
                  !isRunning || (isResting && isCenterish)
                );
                const blurString = `blur(${dynamicBlurValue.toFixed(2)}px)`;

                return (
                  <div
                    key={`${token}-${index}`}
                    className={cx(styles.slotItem, isCenterish && styles.slotItemActive)}
                    style={{
                      transform: `translate(-50%, -50%) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg)`,
                      opacity,
                      filter: blurString,
                    }}
                  >
                    <TypographyHeading fontStyle="H1" text={name} classes={styles.slotText} />
                  </div>
                );
              })}
            </div>
          </div>
          {!spinnerReady && (
            <div className={styles.spinEmpty}>
              <TypographyParagraph
                fontStyle="Text Main"
                text={
                  eligibleAttendees.length === 0
                    ? 'No attendees match the current filters. Adjust exclusions or refresh the pool.'
                    : 'Choose how many rewards to give and press run to spin up the winners.'
                }
              />
            </div>
          )}
        </div>
        {showWinnerOverlay && (
          <div className={styles.winnerOverlay}>
            <TypographyParagraph
              fontStyle="Text Tiny"
              classes={styles.winnerLabel}
              text="Rewards awarded"
            />
            <ul className={styles.winnerOverlayList}>
              {winners.map((winner) => (
                <li key={winner.token} className={styles.winnerOverlayItem}>
                  <TypographyHeading
                    fontStyle="H1"
                    text={winner.name}
                    classes={styles.winnerName}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className={styles.spinRunDock}>
          <button
            type="button"
            ref={backButtonRef}
            className={`${ticketButtonStyles.submit} ${ticketButtonStyles.buttonSecondary} ${ticketButtonStyles.buttonSmall}`}
            onClick={handleBackToSetup}
            disabled={isRunning}
            aria-label="Back to setup (B)"
            title="Back to setup (B)"
          >
            <span className={`${ticketButtonStyles.buttonLabel} button_main_text u-text-style-main`}>
              ← B
            </span>
          </button>
          <button
            type="button"
            ref={runButtonRef}
            className={`${ticketButtonStyles.submit} ${ticketButtonStyles.buttonSecondary} ${ticketButtonStyles.buttonSmall}`}
            onClick={handleRun}
            disabled={runDisabled}
            aria-label="Run rewards (R)"
            title="Run rewards (R)"
          >
            <span className={`${ticketButtonStyles.buttonLabel} button_main_text u-text-style-main`}>
              R
            </span>
          </button>
        </div>
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
          <div className={styles.headerActions}>
            <button
              type="button"
              className={`${ticketButtonStyles.submit} ${ticketButtonStyles.buttonSecondary} ${ticketButtonStyles.buttonSmall}`}
              onClick={handleRefresh}
              disabled={refreshing || isRunning}
            >
              <span className={`${ticketButtonStyles.buttonLabel} button_main_text u-text-style-main`}>
                {refreshing ? 'Refreshing…' : 'Refresh pool'}
              </span>
            </button>
          </div>
        </div>
        <TypographyHeading fontStyle="H1" text="Rewards Picker" />
        <TypographyParagraph
          fontStyle="Text Main"
          text="Configure rewards and spin the wheel to select random winners from checked-in attendees."
        />
        <TypographyParagraph
          fontStyle="Text Small"
          classes={styles.helper}
          text={
            <>
              {(loading || refreshing) && <span className={styles.helperSpinner} aria-hidden="true" />}
              {loading ? 'Loading eligible attendees…' : eligibleSummary}
            </>
          }
        />
      </header>

      {banner && (
        <div
          className={cx(
            styles.banner,
            banner.tone === 'error' && styles.bannerError,
            banner.tone === 'success' && styles.bannerSuccess
          )}
        >
          {banner.text}
        </div>
      )}

      {phase === 'setup' ? (
        <section className={cx(ticketButtonStyles.formCard, styles.setupCard)}>
          <div className={styles.setupFields}>
            <div className={styles.countGroup}>
              <label className={styles.label} htmlFor="rewardCustom">
                Number of rewards
              </label>
              <div className={styles.countControls}>
                <button
                  type="button"
                  className={styles.stepperButton}
                  onClick={() => handlePrizeChange(-5)}
                  disabled={isRunning}
                >
                  −5
                </button>
                <button
                  type="button"
                  className={styles.stepperButton}
                  onClick={() => handlePrizeChange(-1)}
                  disabled={isRunning}
                >
                  −1
                </button>
                <input
                  id="rewardCustom"
                  type="number"
                  min={1}
                  className={cx(styles.controlField, styles.countInput)}
                  value={prizeCount}
                  onChange={handlePrizeInput}
                  disabled={isRunning}
                />
                <button
                  type="button"
                  className={styles.stepperButton}
                  onClick={() => handlePrizeChange(1)}
                  disabled={isRunning}
                >
                  +1
                </button>
                <button
                  type="button"
                  className={styles.stepperButton}
                  onClick={() => handlePrizeChange(5)}
                  disabled={isRunning}
                >
                  +5
                </button>
              </div>
            </div>

            <div className={styles.companyGroup}>
              <label className={styles.label} htmlFor="excludeCompany">
                Exclude companies
              </label>
              <select
                id="excludeCompany"
                className={cx(styles.controlField, styles.filterSelect)}
                onChange={handleExcludeCompany}
                disabled={isRunning}
                value=""
              >
                <option value="" disabled>
                  Select a company
                </option>
                {availableCompanies
                  .filter((company) => !excludedCompanies.includes(company))
                  .map((company) => (
                    <option key={company} value={company}>
                      {company}
                    </option>
                  ))}
              </select>
              <div className={styles.pillList}>
                {excludedCompanies.map((company) => (
                  <button
                    key={company}
                    type="button"
                    className={styles.pill}
                    onClick={() => removeExcludedCompany(company)}
                    disabled={isRunning}
                  >
                    <span>{company}</span>
                    <span aria-hidden="true">×</span>
                  </button>
                ))}
              </div>
              {/* TODO: replace manual exclusion list with automatic company sync once available */}
            </div>
          </div>

          <div className={styles.setupFooter}>
            <TypographyParagraph
              fontStyle="Text Small"
              classes={styles.helper}
              text={
                targetWinners
                  ? `Ready to award ${targetWinners} reward${
                      targetWinners === 1 ? '' : 's'
                    } from ${eligibleAttendees.length} attendee${
                      eligibleAttendees.length === 1 ? '' : 's'
                    }.`
                  : 'Select at least one eligible attendee to continue.'
              }
            />
            <div className={styles.setupActions}>
              <button
                type="button"
                className={ticketButtonStyles.submit}
                onClick={handleStart}
                disabled={loading || !eligibleAttendees.length}
              >
                <span className={`${ticketButtonStyles.buttonLabel} button_main_text u-text-style-main`}>
                  Next
                </span>
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className={styles.spinnerSection}>
          {loading ? (
            <div className={styles.info}>Loading checked-in attendees…</div>
          ) : eligibleAttendees.length === 0 ? (
            <div className={styles.info}>
              No attendees match the current filters. Adjust the exclusion list or refresh the pool.
            </div>
          ) : !spinnerReady ? (
            <div className={styles.info}>
              Choose how many rewards to give and press run to spin up the winners.
            </div>
          ) : (
            <div className={styles.spinnerStage}>
              <div
                className={cx(
                  styles.slotColumn,
                  spinBlurred && styles.slotBlurred,
                  finalState && styles.slotBlurredFinal
                )}
              >
                {slotItems.map(({ display, relative }, index) => {
                  const safeRelative = Number.isFinite(relative) ? relative : 0;
                  const token = display?.token ?? `placeholder-${index}`;
                  const name = display?.name ?? '—';
                  const depth = Math.abs(safeRelative);
                  const depthIndex = Math.min(3, Math.round(depth));
                  const translateY = safeRelative * 110;
                  const rotateX = safeRelative * -24;
                  const translateZ = -110 - depth * 14;
                  const isCenterish = Math.abs(safeRelative) < 0.2;
                  const isUpcoming = !!upcomingWinner && display?.token === upcomingWinner;
                  const isWinner = display ? winnerTokens.has(display.token) : false;

                  let opacity = isRunning ? 0.28 : 0.6;
                  opacity -= Math.min(0.3, depth * 0.08);
                  let blur = BLUR_SEQUENCE[depthIndex] ?? 'blur(4px)';

                  if (isWinner && !isRunning && !isResting && !isUpcoming) {
                    opacity = Math.min(opacity, 0.5);
                    blur = 'blur(1.5px)';
                  }
                  if (isRunning && isUpcoming) {
                    const emphasis = Math.max(0, 1 - Math.min(1, depth));
                    opacity = Math.max(opacity, 0.35 + emphasis * 0.55);
                    blur = `blur(${Math.max(0, 4 - emphasis * 4).toFixed(2)}px)`;
                  }
                  if (isResting && isUpcoming && isCenterish) {
                    opacity = 1;
                    blur = 'blur(0px)';
                  }
                  if (!isRunning && !spinBlurred && isCenterish) {
                    opacity = 1;
                    blur = 'blur(0px)';
                  }
                  if (spinBlurred) {
                    opacity = Math.min(opacity, 0.5);
                    blur = 'blur(8px)';
                  }
                  opacity = Math.max(0.12, Math.min(1, opacity));
                  if (!Number.isFinite(opacity)) {
                    opacity = 0.5;
                  }

                  return (
                    <div
                      key={`${token}-${index}`}
                      className={cx(styles.slotItem, isCenterish && styles.slotItemActive)}
                      style={{
                        transform: `translate(-50%, -50%) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg)`,
                        opacity,
                        filter: blur,
                      }}
                    >
                      <TypographyHeading fontStyle="H3" text={name} classes={styles.slotText} />
                    </div>
                  );
                })}
              </div>

              {winners.length > 0 && (
                <div className={styles.winnerColumn}>
                  <TypographyParagraph
                    fontStyle="Text Tiny"
                    classes={styles.winnerLabel}
                    text="Winners"
                  />
                  <ul className={styles.winnerList}>
                  {winners.map((winner) => (
                    <li key={winner.token} className={styles.winnerItem}>
                      <TypographyHeading
                        fontStyle="H2"
                        text={winner.name}
                        classes={styles.winnerName}
                      />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className={styles.runDock}>
            <button
              type="button"
              className={ticketButtonStyles.submit}
              onClick={handleRun}
              disabled={runDisabled}
            >
              <span className={`${ticketButtonStyles.buttonLabel} button_main_text u-text-style-main`}>
                {isRunning ? 'Running…' : drawsRemaining > 0 ? `Run • ${drawsRemaining}` : 'Run'}
              </span>
            </button>
            <button
              type="button"
              className={`${ticketButtonStyles.submit} ${ticketButtonStyles.buttonSecondary} ${ticketButtonStyles.buttonSmall}`}
              onClick={handleBackToSetup}
              disabled={isRunning}
            >
              <span className={`${ticketButtonStyles.buttonLabel} button_main_text u-text-style-main`}>
                Adjust setup
              </span>
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
