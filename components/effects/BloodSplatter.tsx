type Props = {
  className?: string;
  variant?: "top" | "bottom" | "side";
  opacity?: number;
};

export function BloodSplatter({ className = "", variant = "top", opacity = 0.4 }: Props) {
  const id = `splatter-${variant}`;
  return (
    <svg
      aria-hidden
      viewBox="0 0 1600 200"
      className={`pointer-events-none absolute w-full ${className}`}
      preserveAspectRatio="none"
      style={{ opacity }}
    >
      <defs>
        <filter id={id}>
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" seed="2" />
          <feDisplacementMap in="SourceGraphic" scale="40" />
        </filter>
        <linearGradient id={`${id}-grad`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8B0000" stopOpacity="1" />
          <stop offset="100%" stopColor="#3a0000" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g filter={`url(#${id})`} fill={`url(#${id}-grad)`}>
        <ellipse cx="200" cy="50" rx="200" ry="20" />
        <ellipse cx="600" cy="40" rx="140" ry="18" />
        <ellipse cx="1100" cy="60" rx="220" ry="22" />
        <ellipse cx="1500" cy="30" rx="100" ry="14" />
        <circle cx="320" cy="90" r="4" fill="#dc143c" />
        <circle cx="780" cy="110" r="3" fill="#dc143c" />
        <circle cx="1230" cy="100" r="5" fill="#dc143c" />
      </g>
    </svg>
  );
}
