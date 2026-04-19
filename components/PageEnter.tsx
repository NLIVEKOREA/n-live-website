"use client";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

type Variant =
  | "wipe-r"
  | "wipe-l"
  | "rise"
  | "fall"
  | "iris"
  | "curtain"
  | "diagonal"
  | "blocks";

type Theme = "k-brand" | "k-seller" | "o-brand" | "o-seller";

interface Props {
  variant: Variant;
  color?: string;
  theme?: Theme;
  children: ReactNode;
  className?: string;
}

/**
 * Wraps a page in an animated div. Uses pathname as React key so the
 * wrapper REMOUNTS on every route change — that's what re-fires the
 * CSS animation under Next.js App Router client navigation.
 *
 * Without the key, the .pt div is preserved across client navigations
 * (since the layout doesn't change) and CSS animation won't replay.
 */
export default function PageEnter({
  variant,
  theme,
  children,
  className = "",
}: Props) {
  const pathname = usePathname();
  const themeClass = theme ? `theme-${theme}` : "";

  return (
    <div
      key={pathname}
      className={`pt pt-${variant} ${themeClass} ${className}`}
    >
      {children}
    </div>
  );
}
