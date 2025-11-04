import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Manual Registration',
};

export default function ManualRegistrationLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

