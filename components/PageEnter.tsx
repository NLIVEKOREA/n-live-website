"use client";
import { ReactNode } from "react";

type Variant =
  | "wipe-r"     // content slides in from left
  | "wipe-l"     // content slides in from right
  | "rise"       // content slides up from below
  | "fall"       // content slides down from above
  | "iris"       // content zooms in subtly
  | "curtain"    // content squeezes in horizontally
  | "diagonal"   // content slides in from upper-left
  | "blocks";    // content scales + fades

type Theme = "k-brand" | "k-seller" | "o-brand" | "o-seller";

interface Props {
  variant: Variant;
  color?: string;     // kept for API back-compat (no longer rendered)
  theme?: Theme;
  children: ReactNode;
  className?: string;
}

/**
 * Wraps a page so the content animates in smoothly on mount.
 * Pure content motion — no overlays, no flashing bars.
 * Each variant uses a different direction so users still get a
 * subtle sense of "different page".
 */
export default function PageEnter({
  variant,
  theme,
  children,
  className = "",
}: Props) {
  const themeClass = theme ? `theme-${theme}` : "";
  return (
    <div className={`pt pt-${variant} ${themeClass} ${className}`}>
      {children}
    </div>
  );
}
