import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/700.css";
import "@fontsource/source-sans-3/400.css";
import "@fontsource/source-sans-3/500.css";
import "@fontsource/source-sans-3/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/noto-nastaliq-urdu/400.css";
import "@fontsource/noto-nastaliq-urdu/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ghazal Nama — A Home for Timeless Ghazals",
    template: "%s · Ghazal Nama",
  },
  description:
    "A digital archive of South Asian ghazal — legendary voices, poets, and recordings. Where poetry finds a voice.",
  openGraph: {
    title: "Ghazal Nama",
    description: "A Home for Timeless Ghazals",
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
