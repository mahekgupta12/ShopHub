import { useEffect, useState } from "react";

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

        const res = await fetch("https://dummyjson.com/products");
        const json = await res.json();

        if (isMounted) {
          setProducts(json.products ?? []);
        }
      } catch {
        if (isMounted) {
          setError("Failed to load products");
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
