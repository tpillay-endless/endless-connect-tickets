import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Attendees',
};

export default function AttendeesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
