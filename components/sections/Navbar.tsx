"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#highlights", label: "REEL" },
  { href: "#gallery", label: "GALLERY" },
  { href: "#packages", label: "PACKAGES" },
  { href: "#gear", label: "GEAR" },
  { href: "#audience", label: "AUDIENCE" },
  { href: "#trust", label: "PROOF" },
  { href: "#book", label: "BOOK" },
];

export function Navbar({ fighterName }: { fighterName: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b",
        scrolled
          ? "bg-black/90 backdrop-blur-xl border-[#dc143c]/30"
          : "bg-transparent border-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#top" className="font-display text-xl tracking-wider text-white hover:text-[#dc143c] transition-colors">
          <span className="text-[#dc143c]">●</span> {fighterName.split(" ")[0]}
        </a>

        <ul className="hidden lg:flex items-center gap-2">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className="px-3 py-2 font-mono text-[10px] tracking-[0.3em] uppercase text-white/70 hover:text-[#dc143c] transition-colors"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <Button
          asChild
          className="hidden lg:inline-flex h-9 rounded-none font-display tracking-wider bg-[#dc143c] hover:bg-[#ff1744] text-white"
        >
          <a href="#book">SPONSOR NOW →</a>
        </Button>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden text-white"
          aria-label="Toggle nav"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-black border-t border-[#dc143c]/30">
          <ul className="px-6 py-4 space-y-3">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block font-mono text-sm tracking-[0.3em] uppercase text-white/80 hover:text-[#dc143c]"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
