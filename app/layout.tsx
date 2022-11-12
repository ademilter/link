import "@/styles/globals.css";

import AnalyticsWrapper from "./analytics";
import { Inter } from "@next/font/google";

const inter = Inter({
  variable: "--font-inter",
  display: "swap",
  style: "normal",
  subsets: ["latin-ext"],
});

export default function Layout({ children }) {
  return (
    <html lang="tr" className={`"scroll-smooth" ${inter.variable}`}>
      <body className="antialiased bg-white text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
        <div className="p-10">{children}</div>

        <AnalyticsWrapper />
      </body>
    </html>
  );
}
