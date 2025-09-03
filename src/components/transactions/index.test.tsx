import { fireEvent, render, screen } from "@testing-library/react";
import { TransactionHistory } from ".";
import { useFetchTransactions } from "../../hooks/useFetchTransactions";

vi.mock("../../hooks/useFetchTransactions", () => ({
  useFetchTransactions: vi.fn(),
}));

const mockedUseFetchTransactions = vi.mocked(useFetchTransactions);

describe("transaction history", () => {

  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("shows Loading component while data is being fetched", () => {
    mockedUseFetchTransactions.mockReturnValue({
      data: [],
      isLoading: true,
      error: null,
    });

    render(<TransactionHistory />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("shows Error component when fetching transactions fails", () => {
    mockedUseFetchTransactions.mockReturnValue({
      data: [],
      isLoading: false,
      error: new Error("Error fetching transactions"),
    });

    render(<TransactionHistory />);

    expect(screen.getByRole("alert")).toHaveTextContent("We couldn't load the data. Please try again later.");
    expect(screen.queryByRole("table", {
      name: "Expenses",
    })).not.toBeInTheDocument();
    expect(screen.queryByRole("tab", { name: "Expenses" })).not.toBeInTheDocument();
  });

  test("the expenses tab should be shown by default once data is loaded", () => {
    mockedUseFetchTransactions.mockReturnValue({
      data: [
        {
          id: "1",
          date: "2022-06-22",
          description: "Max Mustermann",
          category: "income",
          amount: {
            value: -20.25,
            currency_iso: "GBP",
          },
          formattedAmount: "-£20.25",
          formattedDate: "22 June 2022",
        },
      ],
      isLoading: false,
      error: null,
    });

    render(<TransactionHistory />);

    expect(screen.getByText("Transaction history")).toBeInTheDocument();

    const expensesTabTrigger = screen.getByRole("tab", {
      name: "Expenses",
    });

    expect(expensesTabTrigger).toHaveAttribute("data-state", "active");

    const expensesTable = screen.getByRole("table", {
      name: "Expenses",
    });

    expect(expensesTable).toBeInTheDocument();
    expect(screen.getByText("-£20.25")).toBeInTheDocument();
  });

  test("changing between the expenses and income tabs should show different transactions", () => {
    mockedUseFetchTransactions.mockReturnValue({
      data: [
        {
          id: "1",
          date: "2022-06-22",
          description: "Max Mustermann",
          category: "income",
          amount: {
            value: -20.25,
            currency_iso: "GBP",
          },
          formattedAmount: "-£20.25",
          formattedDate: "22 June 2022",
        },
      ],
      isLoading: false,
      error: null,
    });

    render(<TransactionHistory />);

    const expensesTabTrigger = screen.getByRole("tab", {
      name: "Expenses",
    });
    const incomeTabTrigger = screen.getByRole("tab", {
      name: "Income",
    });
    const expensesTable = screen.getByRole("table", {
      name: "Expenses",
    });
    const incomeTable = screen.queryByRole("table", {
      name: "Income",
    });

    expect(expensesTable).toBeInTheDocument();
    expect(incomeTable).not.toBeInTheDocument();

    expect(screen.getByText("-£20.25")).toBeInTheDocument();

    fireEvent.focus(incomeTabTrigger)

    expect(incomeTabTrigger).toHaveAttribute("data-state", "active")
    expect(expensesTabTrigger).toHaveAttribute("data-state", "inactive");
    expect(screen.queryByText("-£20.25")).not.toBeInTheDocument();
  });
});
