"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogIn } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { signInWithEmail, signInWithGoogle } from "@/lib/firebase/auth";
import { isFirebaseConfigured } from "@/lib/firebase/client";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace("/admin");
  }, [user, loading, router]);

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await signInWithEmail(email, password);
      toast.success("SIGNED IN");
    } catch (err) {
      toast.error(`FAILED — ${err instanceof Error ? err.message : "INVALID CREDENTIALS"}`);
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    setBusy(true);
    try {
      await signInWithGoogle();
      toast.success("SIGNED IN VIA GOOGLE");
    } catch (err) {
      toast.error(`FAILED — ${err instanceof Error ? err.message : "POPUP CLOSED"}`);
    } finally {
      setBusy(false);
    }
  };

  if (!isFirebaseConfigured()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-6">
        <div className="max-w-md text-center border border-[#dc143c]/40 p-8 space-y-4">
          <h1 className="font-display text-3xl text-white">FIREBASE NOT CONFIGURED</h1>
          <p className="font-mono text-sm text-white/60 uppercase tracking-wider">
            Copy <code className="text-[#dc143c]">.env.local.example</code> to <code className="text-[#dc143c]">.env.local</code> and fill in your Firebase project credentials, then restart the dev server.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-black">
      {/* Left: brand */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 border-r border-[#dc143c]/30 bg-gradient-to-br from-[#1a0000] via-black to-black overflow-hidden">
        <div className="font-mono text-xs tracking-[0.3em] uppercase text-[#dc143c]">
          ● FIGHTER CONTROL ROOM
        </div>
        <div>
          <h1 className="font-display text-6xl lg:text-7xl text-white leading-none">
            WELCOME
            <br />
            <span className="blood-text">BACK,</span>
            <br />
            <span className="text-stroke">CHAMP.</span>
          </h1>
          <p className="font-mono text-xs text-white/60 uppercase tracking-wider mt-6 max-w-xs">
            » Manage stats, gallery, packages, and incoming sponsorship leads from one place.
          </p>
        </div>
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30">
          ENCRYPTED CHANNEL // RESTRICTED ACCESS
        </div>
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="font-display text-4xl text-white">SIGN IN</h2>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mt-2">
              ADMIN ACCESS ONLY
            </p>
          </div>

          <form onSubmit={handleEmail} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/60">
                EMAIL
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black border-white/20 focus:border-[#dc143c] rounded-none h-12 font-mono"
                placeholder="admin@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/60">
                PASSWORD
              </Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black border-white/20 focus:border-[#dc143c] rounded-none h-12 font-mono"
                placeholder="••••••••"
              />
            </div>
            <Button
              type="submit"
              disabled={busy}
              className="w-full h-12 rounded-none font-display text-lg tracking-wider bg-[#dc143c] hover:bg-[#ff1744] text-white"
            >
              {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4 mr-2" />}
              SIGN IN
            </Button>
          </form>

          <div className="relative flex items-center">
            <div className="flex-1 border-t border-white/10" />
            <span className="px-3 font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">OR</span>
            <div className="flex-1 border-t border-white/10" />
          </div>

          <Button
            type="button"
            variant="outline"
            disabled={busy}
            onClick={handleGoogle}
            className="w-full h-12 rounded-none font-display tracking-wider border-2 border-white/40 hover:border-[#dc143c] hover:bg-[#dc143c] hover:text-white"
          >
            CONTINUE WITH GOOGLE
          </Button>

          <p className="text-center font-mono text-[10px] tracking-wider uppercase text-white/40">
            » First time? Sign up via Firebase console first, then add your UID to the &quot;admins&quot; collection.
          </p>
        </div>
      </div>
    </div>
  );
}
