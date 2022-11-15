import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return <div className="max-w-2xl mx-auto px-6">{children}</div>;
}
