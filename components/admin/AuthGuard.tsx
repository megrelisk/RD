"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldAlert } from "lucide-react";

import { useAdminAuth } from "@/hooks/useAdminAuth";
import { signOut } from "@/lib/firebase/auth";
import { Button } from "@/components/ui/button";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/admin/login");
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-8 h-8 text-[#dc143c] animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-6">
        <div className="max-w-md text-center space-y-6 border border-[#dc143c]/40 bg-black p-8">
          <ShieldAlert className="w-16 h-16 text-[#dc143c] mx-auto" />
          <h1 className="font-display text-3xl text-white">ACCESS DENIED</h1>
          <p className="font-mono text-sm text-white/60 uppercase tracking-wider">
            Your account ({user.email}) is not on the admin allowlist.
            <br />Ask the site owner to add your UID to the &quot;admins&quot; collection.
          </p>
          <code className="block bg-black border border-white/10 p-3 text-xs text-[#dc143c] font-mono break-all">
            {user.uid}
          </code>
          <Button
            onClick={() => signOut().then(() => router.replace("/admin/login"))}
            variant="outline"
            className="rounded-none font-display tracking-wider"
          >
            SIGN OUT
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
