type Props = {
  label?: string;
  number?: string;
};

export function SectionDivider({ label, number }: Props) {
  return (
    <div className="relative w-full py-6 overflow-hidden border-y border-[#dc143c]/20">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8B0000]/15 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3 text-[#dc143c] font-mono text-xs tracking-[0.3em] uppercase">
          <span className="inline-block w-2 h-2 bg-[#dc143c] rotate-45" />
          {number ?? "//"}
        </div>
        {label && (
          <div className="flex-1 text-center font-display tracking-[0.4em] text-white/40 text-xs uppercase truncate">
            {label}
          </div>
        )}
        <div className="text-[#dc143c] font-mono text-xs tracking-[0.3em] uppercase flex items-center gap-3">
          //
          <span className="inline-block w-2 h-2 bg-[#dc143c] rotate-45" />
        </div>
      </div>
    </div>
  );
}
