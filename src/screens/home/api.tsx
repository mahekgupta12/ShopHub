import { useEffect, useState } from "react";
import { API_URLS } from "../../config/api";
import { ERROR_MESSAGES } from "../../constants/index";
import { safeFetch } from "../../utils/safeFetch";
import { subscribeNetworkStatus } from "../../utils/networkStatus";

export type Product = {
  category: any;
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
};

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await safeFetch(API_URLS.PRODUCTS);

        if (result.networkError) {
          // Use warn and log only the message to avoid surfacing the Error object
          // which on RN can show a redbox. Keep the UI-friendly error state.
          console.warn("Network request failed while loading products:",
            result.error?.message ?? String(result.error)
          );
          if (isMounted) setError(ERROR_MESSAGES.FAILED_TO_LOAD_PRODUCTS);
          return;
        }

        const res = result.response!;
        if (!res.ok) {
          console.error("Failed to load products, HTTP status:", res.status);
          if (isMounted) setError(ERROR_MESSAGES.FAILED_TO_LOAD_PRODUCTS);
          return;
        }

        const json = await res.json();

        if (isMounted) {
          setProducts(json.products ?? []);
        }
      } catch (err) {
        console.error("Unexpected error loading products:", err);
        if (isMounted) {
          setError(ERROR_MESSAGES.FAILED_TO_LOAD_PRODUCTS);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    // Subscribe to network status changes so we reload products immediately when online
    const unsub = subscribeNetworkStatus((isOnline) => {
      if (isMounted) {
        if (isOnline) {
          // when back online, reload products
          loadProducts();
        } else {
          // when offline, clear products and show offline error
          setProducts([]);
          setError(ERROR_MESSAGES.FAILED_TO_LOAD_PRODUCTS);
          setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
      unsub();
    };
  }, []);

  return { products, loading, error };
}
