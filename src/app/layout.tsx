import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "../context/cartContext";
import { WishlistProvider } from "../context/wishlistContext";

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
        <CartProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}