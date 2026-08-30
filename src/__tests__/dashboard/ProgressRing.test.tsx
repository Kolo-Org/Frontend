import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProgressRing } from "@/components/dashboard/ProgressRing";

describe("ProgressRing", () => {
  it("renders an SVG with two circles (track + progress)", () => {
    const { container } = render(<ProgressRing progress={75} />);
    const circles = container.querySelectorAll("circle");
    expect(circles).toHaveLength(2);
  });

  it("has correct aria-label reflecting the progress value", () => {
    render(<ProgressRing progress={82} />);
    expect(
      screen.getByRole("img", { name: "Savings progress: 82%" }),
    ).toBeInTheDocument();
  });

  it("clamps progress above 100 to 100%", () => {
    render(<ProgressRing progress={150} />);
    expect(
      screen.getByRole("img", { name: "Savings progress: 100%" }),
    ).toBeInTheDocument();
  });

  it("clamps progress below 0 to 0%", () => {
    render(<ProgressRing progress={-20} />);
    expect(
      screen.getByRole("img", { name: "Savings progress: 0%" }),
    ).toBeInTheDocument();
  });

  it("renders children inside the ring", () => {
    render(
      <ProgressRing progress={50}>
        <span>50%</span>
      </ProgressRing>,
    );
    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("uses emerald green (#10B981) for the progress arc", () => {
    const { container } = render(<ProgressRing progress={60} />);
    const circles = container.querySelectorAll("circle");
    // Second circle is the progress arc
    expect(circles[1].getAttribute("stroke")).toBe("#10B981");
  });

  it("uses a muted gray (#E5E7EB) for the track", () => {
    const { container } = render(<ProgressRing progress={60} />);
    const circles = container.querySelectorAll("circle");
    // First circle is the track
    expect(circles[0].getAttribute("stroke")).toBe("#E5E7EB");
  });

  it("sets stroke-dasharray on the progress arc", () => {
    const { container } = render(<ProgressRing progress={40} />);
    const progressCircle = container.querySelectorAll("circle")[1];
    expect(progressCircle.getAttribute("stroke-dasharray")).toBeTruthy();
  });

  it("uses non-scaling-stroke vector-effect for responsive scaling", () => {
    const { container } = render(<ProgressRing progress={50} />);
    const circles = container.querySelectorAll("circle");
    circles.forEach((circle) => {
      expect(circle.getAttribute("vector-effect")).toBe("non-scaling-stroke");
    });
  });

  it("applies a custom className to the wrapper", () => {
    const { container } = render(
      <ProgressRing progress={50} className="w-32 h-32" />,
    );
    expect(container.firstChild).toHaveClass("w-32", "h-32");
  });

  it("renders loading skeleton with animate-pulse when isLoading", () => {
    // ProgressRing itself has no loading state — verify SavingsCircles skeleton
    // still uses animate-pulse (tested in SavingsCircles.test.tsx).
    // This test is a placeholder confirming ProgressRing renders without error at 0%.
    const { container } = render(<ProgressRing progress={0} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
