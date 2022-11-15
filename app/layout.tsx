import "@/styles/globals.css";

import AnalyticsWrapper from "./analytics";
import { Inter } from "@next/font/google";
import { getCurrentUser } from "@/lib/session";
import Header from "@/components/header";
import Container from "@/components/container";

const inter = Inter({
  variable: "--font-inter",
  display: "swap",
  style: "normal",
  subsets: ["latin-ext"],
});

export default async function Layout({ children }) {
  const user = await getCurrentUser();

  return (
    <html lang="tr" className={`"scroll-smooth" ${inter.variable}`}>
      <body className="antialiased bg-white text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
        <Header user={user} />

        <main className="mt-10">
          <Container>{children}</Container>
        </main>

        <AnalyticsWrapper />
      </body>
    </html>
  );
}
