import { Accounts } from "../../components/accounts";
import { TransactionHistory } from "../../components/transactions";
import "./index.css";

export const Home = () => (
  <main className="home-page">
    <Accounts />
    <TransactionHistory />
  </main>
);
