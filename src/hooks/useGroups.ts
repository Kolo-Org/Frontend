import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export interface SavingsGroup {
  id: string;
  name: string;
  tag: string;
  saved: number;
  target: number;
  nextDate: string;
  avatars: string[];
}

export const useGroups = () => {
  const [data, setData] = useState<SavingsGroup[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => setIsLoading(false), 0);
      return () => clearTimeout(timer);
    }

    const fetchGroups = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        setData([
          {
            id: '1',
            name: 'Home Fund',
            tag: 'FAMILY HOME',
            saved: 8200,
            target: 10000,
            nextDate: 'Oct 24',
            avatars: ['https://i.pravatar.cc/150?u=1', 'https://i.pravatar.cc/150?u=2', '+3'],
          },
          {
            id: '2',
            name: 'Bali Retreat',
            tag: 'TRAVEL',
            saved: 1450,
            target: 3222, // 1450 / 0.45 = ~3222 to get 45%
            nextDate: 'Nov 02',
            avatars: ['https://i.pravatar.cc/150?u=3', 'https://i.pravatar.cc/150?u=4'],
          },
        ]);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch groups data'));
      } finally {
        setIsLoading(false);
      }
    };
    fetchGroups();
  }, [user]);

  return { data, isLoading, error };
};
