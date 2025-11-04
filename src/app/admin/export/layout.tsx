import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Admin Export',
};

export default function AdminExportLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

