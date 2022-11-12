import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: AuthLayoutProps) {
  return <div className="p-5">{children}</div>;
}
