import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/fraunces/opsz-italic.css";
import "@fontsource-variable/inter";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/noto-nastaliq-urdu/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ghazal Nama — where poetry finds a voice",
    template: "%s · Ghazal Nama",
  },
  description:
    "A living archive of South Asian ghazal: two hundred recordings catalogued across ten voices, with a listening room that actually plays.",
  openGraph: {
    title: "Ghazal Nama",
    description: "A living archive of South Asian ghazal — catalogue, poets, eras, and a room that plays.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
