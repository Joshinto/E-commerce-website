"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function AppShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideFooter = pathname === "/login" || pathname === "/signup";

  return (
    <>
      {children}
      {!hideFooter && <Footer />}
    </>
  );
}
