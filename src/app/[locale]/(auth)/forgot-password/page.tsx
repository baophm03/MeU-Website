"use client";

import { FormEvent, useState } from "react";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  LoaderCircle,
  Mail,
} from "lucide-react";
import { toast } from "sonner";
import { usePostApiV10AuthForgotPasswordRequest } from "@/api/endpoints/authentication";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";

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

function InlineMessage({ type, message }: {
  type: "error" | "success";
  message: string;
}) {
  return (
    <div
      className={
        type === "error"
          ? "rounded-2xl border border-[#063e8e]/15 bg-[#f8fbff] px-4 py-3 text-sm text-gray-700"
          : "rounded-2xl border border-[#063e8e]/15 bg-[#edf4ff] px-4 py-3 text-sm text-[#063e8e]"
      }
    >
      <div className="flex items-start gap-2">
        {type === "success" ? (
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
        ) : null}
        <span>{message}</span>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  const t = useTranslations("auth");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const forgotMutation = usePostApiV10AuthForgotPasswordRequest({
    mutation: {
      onSuccess: (response: any) => {
        const data = response?.responseData ?? response?.data?.responseData;
        setSuccessMessage(
          data?.message ||
          t("forgotSuccess"),
        );
        setNote("");
        toast.success(t("forgotSuccessToast"));
      },
      onError: (error: any) => {
        setError(
          getAuthErrorMessage(error, t("forgotError")),
        );
      },
      onSettled: () => {
        setLoading(false);
      },
    },
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email.trim()) {
      setError(t("forgotEmailRequired"));
      return;
    }

    setLoading(true);
    forgotMutation.mutate({
      data: { email: email.trim(), note: note.trim() || undefined },
    });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {error ? <InlineMessage type="error" message={error} /> : null}
      {successMessage ? (
        <InlineMessage type="success" message={successMessage} />
      ) : null}

      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        {t("forgotInfo")}
      </div>

      <div className="space-y-2">
        <Label htmlFor="forgot-email" className="text-gray-700">
          {t("forgotEmailLabel")}
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
          <Input
            id="forgot-email"
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
        <Label htmlFor="forgot-note" className="text-gray-700">
          {t("forgotNoteLabel")}
        </Label>
        <Textarea
          id="forgot-note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder={t("forgotNotePlaceholder")}
          rows={3}
          className="rounded-xl border-[#063e8e]/15 bg-white text-gray-700 placeholder:text-gray-400 shadow-sm focus-visible:ring-[#063e8e]/30 resize-none"
        />
      </div>

      <Button
        type="submit"
        className="h-11 rounded-xl bg-[#063e8e] text-white shadow-[0_12px_24px_rgba(6,62,142,0.16)] hover:bg-[#052f6c] w-full"
        disabled={loading}
      >
        {loading ? (
          <>
            <LoaderCircle className="h-4 w-4 animate-spin" />
            {t("forgotSubmitting")}
          </>
        ) : (
          t("forgotSubmit")
        )}
      </Button>

      <Link href="/login">
        <Button
          type="button"
          variant="ghost"
          className="h-10 w-full rounded-xl text-gray-700 hover:bg-[#edf4ff] hover:text-[#063e8e]"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("forgotBackToLogin")}
        </Button>
      </Link>
    </form>
  );
}
