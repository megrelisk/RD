"use client";

import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "div";
  intense?: boolean;
};

export function GlitchText({
  children,
  className,
  as: Tag = "span",
  intense = false,
}: Props) {
  const text = typeof children === "string" ? children : "";
  return (
    <Tag
      data-text={text}
      className={cn(
        "relative inline-block",
        intense ? "glitch-intense" : "glitch-base",
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      {text && (
        <>
          <span
            aria-hidden
            className="absolute inset-0 z-0 mix-blend-screen text-[#dc143c] translate-x-[2px] translate-y-[1px] opacity-80 pointer-events-none select-none"
          >
            {text}
          </span>
          <span
            aria-hidden
            className="absolute inset-0 z-0 mix-blend-screen text-[#00c8ff] -translate-x-[2px] -translate-y-[1px] opacity-60 pointer-events-none select-none"
          >
            {text}
          </span>
        </>
      )}
    </Tag>
  );
}
