import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BalanceCard } from "@/components/dashboard/BalanceCard";

describe("BalanceCard", () => {
  it("renders loading state correctly", () => {
    const { container } = render(<BalanceCard isLoading={true} />);
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("renders balance and trend data correctly", () => {
    render(
      <BalanceCard
        balance={12450}
        currency="USDC"
        trendPercentage={2.4}
        isLoading={false}
      />,
    );

    expect(screen.getByText("Total Balance")).toBeInTheDocument();
    expect(screen.getByText("12,450.00")).toBeInTheDocument();
    expect(screen.getByText("USDC")).toBeInTheDocument();
    expect(screen.getByText("+2.4%")).toBeInTheDocument();

    // Check for action buttons
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /deposit/i }),
    ).toBeInTheDocument();
  });

  it("handles negative trends correctly", () => {
    render(
      <BalanceCard
        balance={100}
        currency="USDC"
        trendPercentage={-1.5}
        isLoading={false}
      />,
    );
    expect(screen.getByText("-1.5%")).toBeInTheDocument();
  });
});
