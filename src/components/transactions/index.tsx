import * as Tabs from "@radix-ui/react-tabs";
import { FormattedTransaction } from "../../../types";
import "./index.css";
import { Transaction } from "./item";
import { useFetchTransactions } from "../../hooks/useFetchTransactions";
import { Loading } from "../loading";
import { Error } from "../error";

const isExpense = (transaction: FormattedTransaction) => transaction.amount.value < 0;
const isIncome = (transaction: FormattedTransaction) => transaction.amount.value > 0;

const Expenses = ({ data }: { data: FormattedTransaction[] }) => {
  return (
    <table aria-label="Expenses">
      <thead>
        <tr>
          <th>Description</th>
          <th>Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.filter(isExpense).map((transaction: FormattedTransaction) => (
          <Transaction transaction={transaction} key={transaction.id} />
        ))}
      </tbody>
    </table>
  );
};

const Income = ({ data }: { data: FormattedTransaction[] }) => {
  return (
    <table aria-label="Income">
      <thead>
        <tr>
          <th>Description</th>
          <th>Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.filter(isIncome).map((transaction: FormattedTransaction) => (
          <Transaction transaction={transaction} key={transaction.id} />
        ))}
      </tbody>
    </table>
  );
};

export const TransactionHistory = () => {
  const { data, isLoading, error } = useFetchTransactions();

  return (
    <section>
      <h2 className="align-left">Transaction history</h2>

      {isLoading && <Loading />}

      {error && <Error />}

      {!isLoading && !error && <Tabs.Root defaultValue="expenses" className="flow">
        <Tabs.List className="tabs__list" aria-label="Filter your transactions">
          <Tabs.Trigger value="expenses">Expenses</Tabs.Trigger>
          <Tabs.Trigger value="income">Income</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content className="TabsContent" value="expenses">
          <Expenses data={data} />
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="income">
          <Income data={data} />
        </Tabs.Content>
      </Tabs.Root>}
    </section>
  );
};
