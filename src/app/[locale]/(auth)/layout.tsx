"use client";

import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { LockKeyhole } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const t = useTranslations("auth");
  const isForgot = pathname === "/forgot-password";

  const title = isForgot ? t("forgotTitle") : t("loginTitle");
  const description = isForgot ? t("forgotDescription") : t("loginDescription");

  return (
    <div className="min-h-screen bg-[#f6f9ff] px-4 py-8 text-gray-700">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center">
        <div className="w-full rounded-[28px] border border-[#063e8e]/10 bg-white shadow-[0_20px_60px_rgba(6,62,142,0.10)]">
          <section className="px-5 py-6 sm:px-8 lg:px-12 lg:py-12">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf4ff] text-[#063e8e]">
                  <LockKeyhole className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-2xl font-bold text-gray-900">
                  {title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-700">
                  {description}
                </p>
              </div>

              {children}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
