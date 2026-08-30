import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SavingsCircles } from "@/components/dashboard/SavingsCircles";

describe("SavingsCircles", () => {
  it("renders loading state correctly", () => {
    const { container } = render(
      <SavingsCircles groups={[]} isLoading={true} />,
    );
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });

  it("renders groups correctly", () => {
    const mockGroups = [
      {
        id: "1",
        name: "Home Fund",
        tag: "FAMILY HOME",
        saved: 8200,
        target: 10000,
        nextDate: "Oct 24",
        avatars: ["https://example.com/av1.jpg", "+3"],
      },
    ];

    render(<SavingsCircles groups={mockGroups} isLoading={false} />);

    expect(screen.getByText("My Savings Circles")).toBeInTheDocument();
    expect(screen.getByText("Home Fund")).toBeInTheDocument();
    expect(screen.getByText("FAMILY HOME")).toBeInTheDocument();
    expect(screen.getByText("$8,200 saved")).toBeInTheDocument();
    expect(screen.getByText("82%")).toBeInTheDocument();
    expect(screen.getByText("Next: Oct 24")).toBeInTheDocument();

    // Check for the new circle button
    expect(screen.getByText("New Circle")).toBeInTheDocument();
  });
});
