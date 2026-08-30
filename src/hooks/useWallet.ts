import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

export interface WalletData {
  balance: number;
  currency: string;
  trendPercentage: number;
}

export const useWallet = () => {
  const [data, setData] = useState<WalletData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => setIsLoading(false), 0);
      return () => clearTimeout(timer);
    }

    const fetchWallet = async () => {
      try {
        setIsLoading(true);
        // Simulate API call scoped to user
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mocked response for user ${user.id}
        setData({
          balance: 12450.0,
          currency: "USDC",
          trendPercentage: 2.4,
        });
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch wallet data"),
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchWallet();
  }, [user]);

  return { data, isLoading, error };
};
