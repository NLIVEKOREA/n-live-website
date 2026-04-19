"use client";
import { ReactNode } from "react";

type Variant =
  | "wipe-r"     // colored panel sweeps left → right
  | "wipe-l"     // colored panel sweeps right → left
  | "rise"       // bottom-up wipe
  | "fall"       // top-down wipe
  | "iris"       // circular expand from center
  | "curtain"    // two halves slide apart from center
  | "diagonal"   // diagonal wipe from corner
  | "blocks";    // mosaic of color blocks reveal

type Theme = "k-brand" | "k-seller" | "o-brand" | "o-seller";

interface Props {
  variant: Variant;
  color?: string;          // CSS color or var(...)
  theme?: Theme;           // optional category theme
  children: ReactNode;
  className?: string;
}

/**
 * Wraps a page with an entrance overlay animation so users get
 * clear visual feedback that the route changed.
 */
export default function PageEnter({
  variant,
  color,
  theme,
  children,
  className = "",
}: Props) {
  const themeClass = theme ? `theme-${theme}` : "";
  const style = color
    ? ({ ["--pt-c" as string]: color } as React.CSSProperties)
    : undefined;

  // Special "blocks" variant renders a mosaic of color cells
  if (variant === "blocks") {
    const rows = 4;
    const cols = 8;
    const cells = [];
    for (let i = 0; i < rows * cols; i++) {
      cells.push(
        <span
          key={i}
          className="pt-block"
          style={{
            animationDelay: `${(i % cols) * 0.04 + Math.floor(i / cols) * 0.04}s`,
          }}
        />
      );
    }
    return (
      <div className={`pt pt-blocks ${themeClass} ${className}`} style={style}>
        <div className="pt-overlay-blocks" aria-hidden="true">
          {cells}
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className={`pt pt-${variant} ${themeClass} ${className}`} style={style}>
      <div className="pt-overlay" aria-hidden="true" />
      {children}
    </div>
  );
}
