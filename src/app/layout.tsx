import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "../context/cartContext";
import { WishlistProvider } from "../context/wishlistContext";
import AuthProvider from "../components/Authprovider";
import AppShell from "../components/AppShell";

export const metadata: Metadata = {
  title: "JoshintoStore",
  description: "A modern ecommerce website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <AppShell>{children}</AppShell>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}