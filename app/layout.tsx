import type { Metadata } from "next";
import { Noto_Sans_JP, Space_Grotesk } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Haruto Kobayashi | Portfolio",
  description: "フロントからバックエンドまで触れるWeb系学生エンジニア、小林陽翔のポートフォリオ。",
  openGraph: {
    title: "Haruto Kobayashi | Portfolio",
    description: "Full-stack web engineer — from UI to infrastructure.",
    type: "website",
    locale: "ja_JP",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Haruto Kobayashi | Portfolio",
    description: "Full-stack web engineer — from UI to infrastructure.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme by resolving before first paint */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('theme')||(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);})();` }} />
      </head>
      <body className={`${notoSansJP.variable} ${spaceGrotesk.variable}`}>
        {children}
      </body>
    </html>
  );
}
