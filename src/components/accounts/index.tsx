import { AccountItem } from "./item";
import "./index.css";
import { useFetchAccounts } from "../../hooks/useFetchAccounts";

export const Accounts = () => {
  const { data } = useFetchAccounts();

  return (
    <section>
      <h2 className="align-left">Your accounts</h2>
      <div className="accounts">
        {data.map((account) => (
          <AccountItem account={account} key={account.account_id} />
        ))}
      </div>
    </section>
  );
};
