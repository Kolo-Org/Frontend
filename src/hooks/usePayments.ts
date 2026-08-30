import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

export interface Transaction {
  id: string;
  type: "deposit" | "contribution" | "send";
  title: string;
  date: string;
  time: string;
  amount: number;
  currency: string;
  status: string;
}

export const usePayments = () => {
  const [data, setData] = useState<Transaction[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => setIsLoading(false), 0);
      return () => clearTimeout(timer);
    }

    const fetchPayments = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        setData([
          {
            id: "1",
            type: "deposit",
            title: "Deposit from WhatsApp Pay",
            date: "Oct 21, 2023",
            time: "2:30 PM",
            amount: 250.0,
            currency: "USDC",
            status: "Completed",
          },
          {
            id: "2",
            type: "contribution",
            title: "Home Fund Contribution",
            date: "Oct 19, 2023",
            time: "9:15 AM",
            amount: -100.0,
            currency: "USDC",
            status: "Completed",
          },
          {
            id: "3",
            type: "send",
            title: "Sent to Sarah K.",
            date: "Oct 18, 2023",
            time: "11:45 PM",
            amount: -55.2,
            currency: "USDC",
            status: "Completed",
          },
        ]);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to fetch payments data"),
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchPayments();
  }, [user]);

  return { data, isLoading, error };
};
