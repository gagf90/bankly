import { useCallback, useEffect, useState } from "react";
import { Account, FormattedAccount } from "../../types";
import { formatCurrency } from "../utils";

export const useFetchAccounts = () => {
  const [data, setData] = useState<FormattedAccount[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const loadAccounts = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/accounts");
      if (!res.ok) {
        throw new Error("Error fetching accounts");
      }
      const accounts = await res.json();

      const transformed: FormattedAccount[] = accounts.map((account: Account) => ({
        ...account,
        formattedBalance: formatCurrency(account.balance.amount.value, account.balance.amount.currency),
      }));

      setData(transformed);
    } catch (err: unknown) {
      setError(err instanceof Error ? err : new Error("Error fetching accounts"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAccounts();
  }, [loadAccounts]);

  return {
    data,
    isLoading,
    error
  }
}