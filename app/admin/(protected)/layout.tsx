import type { ReactNode } from "react";

import { AuthGuard } from "@/components/admin/AuthGuard";
import { AdminSidebar } from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-black grid grid-cols-1 lg:grid-cols-[260px_1fr]">
        <AdminSidebar />
        <main className="p-6 lg:p-10 overflow-y-auto">{children}</main>
      </div>
    </AuthGuard>
  );
}
