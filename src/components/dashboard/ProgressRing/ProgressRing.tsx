"use client";

import React, { useEffect, useState } from "react";

interface ProgressRingProps {
  /** Completion percentage from 0 to 100. */
  progress: number;
  /** Logical size of the SVG viewBox (pixels). Defaults to 120. */
  size?: number;
  /** Stroke width in viewBox units. Defaults to 10. */
  strokeWidth?: number;
  className?: string;
  children?: React.ReactNode;
}

const TRACK_COLOR = "#E5E7EB";
const FILL_COLOR = "#10B981";

export function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 10,
  className = "",
  children,
}: ProgressRingProps) {
  const clamped = Math.min(100, Math.max(0, progress));
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference * (1 - clamped / 100);

  // Start fully empty so CSS transition animates fill-up on mount.
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    // Double rAF ensures the initial empty state is painted before the
    // transition to the real offset begins.
    let inner: number;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setOffset(targetOffset));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [targetOffset]);

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      role="img"
      aria-label={`Savings progress: ${Math.round(clamped)}%`}
    >
      <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%">
        {/* Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={TRACK_COLOR}
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
        />
        {/* Progress arc */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={FILL_COLOR}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          vectorEffect="non-scaling-stroke"
          transform={`rotate(-90 ${center} ${center})`}
          style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
        />
      </svg>
      {children !== undefined && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
