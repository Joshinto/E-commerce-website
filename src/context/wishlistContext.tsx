"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
};

type WishlistContextType = {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  wishlistCount: number;
};

const WishlistContext = createContext<
  WishlistContextType | undefined
>(undefined);

export function WishlistProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [wishlistLoaded, setWishlistLoaded] = useState(false);

  // Load wishlist
  useEffect(() => {
    try {
      const savedWishlist =
        localStorage.getItem("joshinto-wishlist");

      if (savedWishlist) {
        setWishlistItems(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    } finally {
      setWishlistLoaded(true);
    }
  }, []);

  // Save wishlist
  useEffect(() => {
    if (!wishlistLoaded) return;

    try {
      localStorage.setItem(
        "joshinto-wishlist",
        JSON.stringify(wishlistItems)
      );
    } catch (error) {
      console.error("Failed to save wishlist:", error);
    }
  }, [wishlistItems, wishlistLoaded]);

  // Add to wishlist
  const addToWishlist = (product: Product) => {
    setWishlistItems((currentItems) => {
      const alreadyExists = currentItems.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) {
        return currentItems;
      }

      return [...currentItems, product];
    });
  };

  // Remove from wishlist
  const removeFromWishlist = (productId: number) => {
    setWishlistItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  };

  // Check if product is in wishlist
  const isInWishlist = (productId: number) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  // Wishlist count
  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return context;
}