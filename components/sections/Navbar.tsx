"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

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
  const [open, setOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const logoUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "dolidze-5cdf0.firebasestorage.app"}/o/logo%2Flogo.png?alt=media&token=0d9b46a3-893a-41a3-aebd-6e1bc468b992`;

  return (
    <nav className="absolute top-0 left-0 right-0 z-40">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a
          href="#top"
          className="flex items-center gap-2 font-display text-xl tracking-wider text-white hover:text-[#dc143c] transition-colors"
        >
          {!logoError ? (
            <div className="relative h-8 flex items-center justify-center overflow-hidden">
              <img
                src={logoUrl}
                alt={`${fighterName} Logo`}
                className="h-full w-auto object-contain"
                onError={() => setLogoError(true)}
              />
            </div>
          ) : (
            <>
              <span className="text-[#dc143c]">●</span>
              <span>{fighterName.split(" ")[0]}</span>
            </>
          )}
        </a>

        <ul className="hidden lg:flex items-center gap-2">
          {NAV.map((n) => (
            <li key={n.href}>
              <a
                href={n.href}
                className="px-3 py-2 font-mono text-[20px] tracking-[0.3em] uppercase text-white/70 hover:text-[#dc143c] transition-colors"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

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
