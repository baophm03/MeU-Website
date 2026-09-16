"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import useProfileStore from "@/store/useProfileStore";
import { usePermission } from "@/hooks/usePermission";
import { Loader2, ShieldX, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

// Thứ tự ưu tiên các trang admin mặc định
const ADMIN_LANDING_ROUTES = [
  { path: "/admin/dashboard", permission: "DASHBOARD:READ" as const },
  { path: "/admin/news", permission: "POSTS:READ" as const },
  { path: "/admin/base-config", permission: "SETTINGS:READ" as const },
  { path: "/admin/users", permission: "USERS:READ" as const },
  { path: "/admin/password-reset-requests", permission: "USERS:READ" as const },
  { path: "/admin/roles", permission: "ROLES:READ" as const },
  { path: "/admin/advertisements", permission: "ADVERTISEMENTS:READ" as const },
  { path: "/admin/media", permission: "FILES:READ" as const },
  { path: "/admin/tags", permission: "TAGS:READ" as const },
  { path: "/admin/videos", permission: "VIDEOS:READ" as const },
  { path: "/admin/members", permission: "MEMBERS:READ" as const },
  { path: "/admin/contact-management", permission: "CONTACT:READ" as const },
];

export default function AdminPage() {
  const router = useRouter();
  const appUser = useProfileStore((state) => state.appUser);
  const hasHydrated = useAuthStore((state) => state._hasHydrated);
  const isLoggedIn = useAuthStore((state) => state.appIsLoggedIn);

  const hasDashboard = usePermission("DASHBOARD", "VIEW");
  const hasPosts = usePermission("POSTS", "VIEW");
  const hasSettings = usePermission("SETTINGS", "VIEW");
  const hasUsers = usePermission("USERS", "VIEW");
  const hasRoles = usePermission("ROLES", "VIEW");
  const hasAds = usePermission("ADVERTISEMENTS", "VIEW");
  const hasFiles = usePermission("FILES", "VIEW");
  const hasTags = usePermission("TAGS", "VIEW");
  const hasVideos = usePermission("VIDEOS", "VIEW");
  const hasMembers = usePermission("MEMBERS", "VIEW");
  const hasContact = usePermission("CONTACT", "VIEW");

  const permissionMap: Record<string, boolean> = {
    "DASHBOARD:READ": hasDashboard,
    "POSTS:READ": hasPosts,
    "SETTINGS:READ": hasSettings,
    "USERS:READ": hasUsers,
    "ROLES:READ": hasRoles,
    "ADVERTISEMENTS:READ": hasAds,
    "FILES:READ": hasFiles,
    "TAGS:READ": hasTags,
    "VIDEOS:READ": hasVideos,
    "MEMBERS:READ": hasMembers,
    "CONTACT:READ": hasContact,
  };

  useEffect(() => {
    if (!hasHydrated || !isLoggedIn) return;
    if (appUser?.must_change_password) return; // AuthGuard sẽ xử lý

    // Tìm trang admin đầu tiên user có quyền
    const firstAllowed = ADMIN_LANDING_ROUTES.find(
      (route) => permissionMap[route.permission],
    );

    if (firstAllowed) {
      router.replace(firstAllowed.path);
    }
    // Nếu không có quyền gì → stay on /admin, render no-access message
  }, [hasHydrated, isLoggedIn, appUser, router]);

  // Loading
  if (!hasHydrated || !isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fbff]">
        <Loader2 className="h-8 w-8 animate-spin text-[#063e8e]" />
      </div>
    );
  }

  // Nếu phải đổi mật khẩu → AuthGuard sẽ redirect, tạm render loading
  if (appUser?.must_change_password) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fbff]">
        <Loader2 className="h-8 w-8 animate-spin text-[#063e8e]" />
      </div>
    );
  }

  // Kiểm tra có quyền gì không
  const hasAnyPermission = ADMIN_LANDING_ROUTES.some(
    (route) => permissionMap[route.permission],
  );

  // Nếu có quyền → loading (đang redirect)
  if (hasAnyPermission) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fbff]">
        <Loader2 className="h-8 w-8 animate-spin text-[#063e8e]" />
      </div>
    );
  }

  // Không có quyền gì → hiển thị thông báo
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#f6f9ff] via-[#edf4ff] to-[#f8fbff] px-4">
      <div className="w-full max-w-2xl rounded-3xl border border-[#063e8e]/10 bg-white p-8 text-center shadow-xl md:p-12">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
          <ShieldX className="h-10 w-10 text-amber-600" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-[#163b73] md:text-3xl">
          Tài khoản chưa được cấp quyền
        </h1>

        {/* Message */}
        <p className="mx-auto mt-4 max-w-md text-sm text-slate-600 md:text-base">
          Tài khoản của bạn hiện tại chưa có quyền quản trị chức năng nào.
          Vui lòng liên hệ ban quản trị website hoặc bên kỹ thuật để được hỗ trợ.
        </p>

        {/* User info */}
        <div className="mt-6 rounded-2xl border border-[#063e8e]/10 bg-[#f8fbff] px-6 py-4 text-left">
          <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
            <div>
              <span className="text-slate-500">Email:</span>{" "}
              <span className="font-medium text-[#163b73]">{appUser?.email}</span>
            </div>
            <div>
              <span className="text-slate-500">Vai trò:</span>{" "}
              <span className="font-medium text-[#163b73]">
                {appUser?.roles?.length ? appUser.roles.join(", ") : "Chưa có"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
