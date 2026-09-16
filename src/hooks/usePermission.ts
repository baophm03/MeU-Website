"use client";

import { useMemo } from "react";
import useProfileStore from "@/store/useProfileStore";

export function usePermission(
  resourceOrPermissions: string | string[],
  actionOrMode?: string,
): boolean {
  const appUser = useProfileStore((state) => state.appUser);

  return useMemo(() => {
    const userPermissions = (appUser?.permissions || []).map((p) => p.toUpperCase());

    if (typeof resourceOrPermissions === "string" && typeof actionOrMode === "string") {
      const permission = `${resourceOrPermissions}:${actionOrMode}`.toUpperCase();
      return userPermissions.includes(permission);
    }

    if (Array.isArray(resourceOrPermissions)) {
      const required = resourceOrPermissions.map((p) => p.toUpperCase());
      const mode = actionOrMode as "all" | "any" | undefined;

      if (mode === "any") {
        return required.some((perm) => userPermissions.includes(perm));
      }
      return required.every((perm) => userPermissions.includes(perm));
    }

    if (typeof resourceOrPermissions === "string") {
      return userPermissions.includes(resourceOrPermissions.toUpperCase());
    }

    return false;
  }, [appUser, resourceOrPermissions, actionOrMode]);
}

export function useHasRole(roleName: string | string[]): boolean {
  const appUser = useProfileStore((state) => state.appUser);

  return useMemo(() => {
    const userRoles = appUser?.roles || [];

    if (Array.isArray(roleName)) {
      return roleName.some((role) => userRoles.includes(role));
    }

    return userRoles.includes(roleName);
  }, [appUser, roleName]);
}

export function useAllPermissions(): string[] {
  const appUser = useProfileStore((state) => state.appUser);
  return appUser?.permissions || [];
}

export function useAllRoles(): string[] {
  const appUser = useProfileStore((state) => state.appUser);
  return appUser?.roles || [];
}

export function useHasAnyPermission(): boolean {
  const appUser = useProfileStore((state) => state.appUser);
  return (appUser?.permissions?.length || 0) > 0;
}

export function useIsSystemAdmin(): boolean {
  return useHasRole("system_admin");
}

export function useIsAdmin(): boolean {
  return useHasRole(["admin", "system_admin"]);
}
