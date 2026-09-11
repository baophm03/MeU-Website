"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter, Link } from "@/i18n/navigation";
import {
  Eye,
  EyeOff,
  LoaderCircle,
  Mail,
} from "lucide-react";
import { toast } from "sonner";
import {
  useGetApiV10AuthMe,
  usePostApiV10AuthLogin,
} from "@/api/endpoints/authentication";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import useAuthStore from "@/store/useAuthStore";
import useProfileStore from "@/store/useProfileStore";

type ErrorResponse = {
  message?: string;
  error?: {
    message?: {
      vi?: string;
      en?: string;
    };
  };
};

function getAuthErrorMessage(error: unknown, fallback: string) {
  const apiError = error as {
    response?: {
      data?: ErrorResponse;
    };
    message?: string;
  };

  return (
    apiError.response?.data?.error?.message?.vi ??
    apiError.response?.data?.message ??
    apiError.message ??
    fallback
  );
}

export default function AdminLoginPage() {
  const router = useRouter();
  const t = useTranslations("auth");

  const hasHydrated = useAuthStore((state) => state._hasHydrated);
  const isLoggedIn = useAuthStore((state) => state.appIsLoggedIn);
  const rememberState = useAuthStore((state) => state.appUserRemember);
  const setAppUserRemember = useAuthStore((state) => state.setAppUserRemember);

  const loginMutation = usePostApiV10AuthLogin();
  const meQuery = useGetApiV10AuthMe({ query: { enabled: false } });
  const mustChangePasswordRef = useRef(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    if (!rememberState?.remember) return;

    setEmail(rememberState.username);
    setPassword(rememberState.password);
    setRemember(true);
  }, [rememberState]);

  // Set profile store when /me data arrives
  useEffect(() => {
    if (!meQuery.data) return;
    const meData = (meQuery.data as any)?.responseData;
    if (meData?.id && meData?.email && meData?.username) {
      useProfileStore.getState().setAppUser({
        id: meData.id,
        email: meData.email,
        username: meData.username,
        first_name: meData.first_name ?? null,
        last_name: meData.last_name ?? null,
        roles: Array.isArray(meData.roles) ? meData.roles : [],
        permissions: Array.isArray(meData.permissions) ? meData.permissions : [],
        status: meData.status ?? null,
        last_login_at: null,
        must_change_password: mustChangePasswordRef.current,
      });
    }
  }, [meQuery.data]);

  useEffect(() => {
    if (!hasHydrated || !isLoggedIn) return;

    const currentUser = useProfileStore.getState().appUser;
    if (currentUser?.must_change_password) {
      router.replace("/admin/change-password");
    } else {
      router.replace("/admin");
    }
  }, [hasHydrated, isLoggedIn, router]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const response = await loginMutation.mutateAsync({
        data: { email: email.trim(), password },
      }) as any;
      const loginData = response?.responseData ?? response?.data?.responseData ?? response?.data;

      if (!loginData?.access_token || !loginData?.refresh_token || !loginData?.expires_in) {
        throw new Error(t("missingSession"));
      }

      mustChangePasswordRef.current = loginData.must_change_password === true;

      // Set auth store first so the axios interceptor picks up the token for /me
      useAuthStore.getState().setAuthSession({
        accessToken: loginData.access_token,
        refreshToken: loginData.refresh_token,
        expiresIn: loginData.expires_in,
        session: {
          id: null,
          expires_at: null,
          refresh_expires_at: loginData.refresh_expires_in
            ? new Date(Date.now() + loginData.refresh_expires_in * 1000).toISOString()
            : null,
        },
        persistSession: remember,
      });

      setAppUserRemember(
        remember ? email.trim() : "",
        remember ? password : "",
        remember,
      );

      // Trigger /me fetch — interceptor uses the token we just stored
      meQuery.refetch();

      if (mustChangePasswordRef.current) {
        toast.success(t("loginSuccessChangePassword"));
        router.replace("/admin/change-password");
      } else {
        toast.success(t("loginSuccess"));
        router.replace("/admin");
      }
    } catch (error) {
      setLoginError(
        getAuthErrorMessage(error, t("loginFailed")),
      );
    } finally {
      setLoginLoading(false);
    }
  };

  if (!hasHydrated) {
    return (
      <div className="rounded-2xl border border-[#063e8e]/10 bg-[#f8fbff] px-4 py-3 text-sm text-gray-700">
        {t("loading")}
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleLogin}>
      {loginError ? (
        <div className="rounded-2xl border border-[#063e8e]/15 bg-[#f8fbff] px-4 py-3 text-sm text-gray-700">
          {loginError}
        </div>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="admin-email" className="text-gray-700">
          {t("email")}
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
          <Input
            id="admin-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t("emailPlaceholder")}
            className="h-11 rounded-xl border-[#063e8e]/15 bg-white text-gray-700 placeholder:text-gray-400 shadow-sm focus-visible:ring-[#063e8e]/30 pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="admin-password" className="text-gray-700">
          {t("password")}
        </Label>
        <div className="relative">
          <Input
            id="admin-password"
            type={passwordVisible ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={t("passwordPlaceholder")}
            className="h-11 rounded-xl border-[#063e8e]/15 bg-white text-gray-700 placeholder:text-gray-400 shadow-sm focus-visible:ring-[#063e8e]/30 pr-11"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setPasswordVisible((current) => !current)}
            className="absolute right-1 top-1 h-9 w-9 rounded-lg text-gray-700 hover:bg-[#edf4ff] hover:text-[#063e8e]"
            title={passwordVisible ? t("hidePassword") : t("showPassword")}
          >
            {passwordVisible ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor="remember-account"
          className="flex cursor-pointer items-center gap-3 text-sm text-gray-700"
        >
          <Checkbox
            id="remember-account"
            checked={remember}
            onCheckedChange={(checked) => setRemember(checked === true)}
            className="border-[#063e8e]/25 data-[state=checked]:bg-[#063e8e]"
          />
          {t("rememberAccount")}
        </label>

        <Link
          href="/forgot-password"
          className="text-sm font-semibold text-[#063e8e] hover:text-[#052f6c]"
        >
          {t("forgotPassword")}
        </Link>
      </div>

      <Button
        type="submit"
        className="h-11 rounded-xl bg-[#063e8e] text-white shadow-[0_12px_24px_rgba(6,62,142,0.16)] hover:bg-[#052f6c] w-full"
        disabled={loginLoading}
      >
        {loginLoading ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" />
            {t("signingIn")}
          </>
        ) : (
          t("signIn")
        )}
      </Button>
    </form>
  );
}
