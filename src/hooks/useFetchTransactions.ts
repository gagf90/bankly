import { useCallback, useEffect, useState } from "react";
import { Transaction, FormattedTransaction } from "../../types";
import { formatCurrency, formatDate } from "../utils";

export const useFetchTransactions = () => {
  const [data, setData] = useState<FormattedTransaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const loadTransactions = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/transactions");
      if (!res.ok) {
        throw new Error("Error fetching transactions");
      }
      const transactions = await res.json();

      const transformed: FormattedTransaction[] = transactions.map((transaction: Transaction) => ({
        ...transaction,
        formattedAmount: formatCurrency(transaction.amount.value),
        formattedDate: formatDate(transaction.date),
      }));

      setData(transformed);
    } catch (err: unknown) {
      setError(err instanceof Error ? err : new Error("Error fetching transactions"));
    } finally {
      setIsLoading(false);
    }
  }, [])

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  return {
    data,
    isLoading,
    error
  }
}