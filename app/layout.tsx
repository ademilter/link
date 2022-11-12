import "@/styles/globals.css";

import AnalyticsWrapper from "./analytics";
import { Inter } from "@next/font/google";
import { getCurrentUser } from "@/lib/session";
import UserInfo from "@/components/user-info";

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
        <header className="p-6 border-b border-solid border-gray-100">
          <UserInfo user={user} />
        </header>

        <div className="p-6">{children}</div>

        <AnalyticsWrapper />
      </body>
    </html>
  );
}
