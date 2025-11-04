import type { Metadata } from "next";
import '../../public/styles/brand.css';
import '../../public/styles/globals.css';
import { DevLinkProvider } from "@/devlink/DevLinkProvider";
import { ThemeInitializer } from "@/components/ThemeInitializer";

export const metadata: Metadata = {
  title: {
    default: "Endless Connect",
    template: "%s | Endless Connect",
  },
  description: "Endless Connect admin tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="u-theme-dark" suppressHydrationWarning>
        <ThemeInitializer />
        <DevLinkProvider>
          {/* Add here any Navbar or Header you want to be present on all pages */}
          {children}
          {/* Add here any Footer you want to be present on all pages */}
        </DevLinkProvider>
      </body>
    </html>
  );
}
