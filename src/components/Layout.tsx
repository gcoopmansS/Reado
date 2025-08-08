// src/components/Layout.tsx
import type { ReactNode } from "react";
import Navbar from "./Navbar"; // Placeholder for now

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 w-full px-4 py-6">{children}</main>
    </div>
  );
}
