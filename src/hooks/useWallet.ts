import { useState, useEffect } from 'react';

export interface WalletData {
  balance: number;
  currency: string;
  trendPercentage: number;
}

export const useWallet = () => {
  const [data, setData] = useState<WalletData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800));
        setData({
          balance: 12450.00,
          currency: 'USDC',
          trendPercentage: 2.4,
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch wallet data'));
      } finally {
        setIsLoading(false);
      }
    };
    fetchWallet();
  }, []);

  return { data, isLoading, error };
};
