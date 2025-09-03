import type { FormattedAccount } from "../../../types";
import "./index.css";

type Props = {
  account: FormattedAccount;
};

export const AccountItem = ({ account }: Props) => {
  return (
    <div className="account">
      <div className="total">Total {account.balance.amount.currency}</div>
      <strong>{account.formattedBalance}</strong>
    </div>
  );
};
