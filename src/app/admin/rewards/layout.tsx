import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Rewards Picker',
};

export default function RewardsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

