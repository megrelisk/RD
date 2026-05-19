"use client";

import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  speed?: "slow" | "normal" | "fast";
  reverse?: boolean;
  className?: string;
  pauseOnHover?: boolean;
};

export function Marquee({
  children,
  speed = "normal",
  reverse = false,
  className,
  pauseOnHover = true,
}: Props) {
  const duration =
    speed === "slow" ? "60s" : speed === "fast" ? "18s" : "30s";

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className={cn(
          "flex shrink-0 w-max gap-12",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${duration} linear infinite`,
        }}
      >
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div className="flex shrink-0 items-center gap-12" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
