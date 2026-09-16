"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";
import useProfileStore from "@/store/useProfileStore";
import { Spinner } from "@/components/ui/spinner";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const hasHydrated = useAuthStore((s) => s._hasHydrated);
  const isAuthenticated = useAuthStore((s) => s.appIsLoggedIn);
  const hasUser = useProfileStore((s) => !!s.appUser);

  const shouldRedirect = isAuthenticated && hasUser;

  useEffect(() => {
    if (!hasHydrated) return;
    if (shouldRedirect) router.push("/");
  }, [hasHydrated, shouldRedirect, router]);

  if (!hasHydrated || shouldRedirect) {
    return (
      <div className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-background px-4 py-12">
        <Spinner className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f9ff] px-4 py-8 text-gray-700">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center">
        <div className="w-full rounded-[28px] border border-[#063e8e]/10 bg-white shadow-[0_20px_60px_rgba(6,62,142,0.10)]">
          <section className="px-5 py-6 sm:px-8 lg:px-12 lg:py-12">
            <div className="mx-auto w-full max-w-md">{children}</div>
          </section>
        </div>
      </div>
    </div>
  );
}
