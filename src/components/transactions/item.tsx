import type { FormattedTransaction } from "../../../types";
import { Avatar } from "./avatar";

type Props = {
  transaction: FormattedTransaction;
};

export const Transaction = ({ transaction }: Props) => (
  <tr>
    <td>
      <div className="transaction-detail">
        <Avatar name={transaction.description} />
        <div className="transaction-description">
          {transaction.description}
          <div className="transaction-category">{transaction.category}</div>
        </div>
      </div>
    </td>
    <td>
      <div>{transaction.formattedDate}</div>
    </td>
    <td className="transaction-amount">
      <div className="amount">{transaction.formattedAmount}</div>
    </td>
  </tr>
);
