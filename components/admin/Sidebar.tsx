"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Award,
  ExternalLink,
  Film,
  Home,
  Image as ImageIcon,
  Inbox,
  LayoutGrid,
  LogOut,
  Mail,
  Newspaper,
  Star,
  Target,
  Users,
  User as UserIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { signOut } from "@/lib/firebase/auth";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "DASHBOARD", icon: Home },
  { href: "/admin/profile", label: "FIGHTER PROFILE", icon: UserIcon },
  { href: "/admin/stats", label: "STATS", icon: LayoutGrid },
  { href: "/admin/socials", label: "SOCIALS", icon: Users },
  { href: "/admin/videos", label: "VIDEOS", icon: Film },
  { href: "/admin/gallery", label: "GALLERY", icon: ImageIcon },
  { href: "/admin/packages", label: "PACKAGES", icon: Star },
  { href: "/admin/gear-zones", label: "GEAR ZONES", icon: Target },
  { href: "/admin/sponsors", label: "SPONSORS", icon: Award },
  { href: "/admin/testimonials", label: "TESTIMONIALS", icon: Newspaper },
  { href: "/admin/press", label: "PRESS", icon: Newspaper },
  { href: "/admin/achievements", label: "ACHIEVEMENTS", icon: Award },
  { href: "/admin/audience", label: "AUDIENCE", icon: Users },
  { href: "/admin/leads", label: "LEADS", icon: Inbox },
  { href: "/admin/media-kit", label: "MEDIA KIT", icon: Mail },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { user } = useAdminAuth();

  return (
    <aside className="bg-black border-r border-[#dc143c]/30 lg:min-h-screen lg:sticky lg:top-0 flex flex-col">
      <div className="p-6 border-b border-white/10">
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#dc143c] mb-1">
          ● CONTROL ROOM
        </div>
        <div className="font-display text-2xl text-white tracking-wider">FIGHT.HQ</div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {NAV.map((n) => {
          const Icon = n.icon;
          const active = pathname === n.href || (n.href !== "/admin" && pathname.startsWith(n.href));
          return (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 font-mono text-[10px] tracking-[0.2em] uppercase border-l-2 transition-colors",
                active
                  ? "text-white bg-[#dc143c]/20 border-[#dc143c]"
                  : "text-white/60 border-transparent hover:bg-white/5 hover:text-white",
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {n.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 px-3 py-2 font-mono text-[10px] tracking-[0.2em] uppercase text-white/60 hover:text-[#dc143c]"
        >
          <ExternalLink className="w-4 h-4" />
          VIEW LIVE SITE
        </Link>
        <div className="px-3 py-2 font-mono text-[10px] text-white/40 truncate">
          {user?.email}
        </div>
        <Button
          onClick={() => signOut()}
          variant="outline"
          className="w-full rounded-none border border-white/20 hover:border-[#dc143c] hover:text-[#dc143c] hover:bg-transparent font-mono text-[10px] tracking-[0.2em] uppercase"
        >
          <LogOut className="w-4 h-4 mr-2" />
          SIGN OUT
        </Button>
      </div>
    </aside>
  );
}
