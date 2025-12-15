import { useEffect, useState } from "react";
import { API_URLS } from "../../config/api";
import { ERROR_MESSAGES } from "../../constants/index";

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

        const res = await fetch(API_URLS.PRODUCTS);
        const json = await res.json();

        if (isMounted) {
          setProducts(json.products ?? []);
        }
      } catch {
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

    return () => {
      isMounted = false;
    };
  }, []);

  return { products, loading, error };
}
