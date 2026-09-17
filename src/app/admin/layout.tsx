'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AbilityProvider } from '@casl/react';
import { ability } from '@/config/casl/ability';
import { AdminAuthLoadingScreen, useAdminAuthStatus } from '@/components/layout/admin/admin-auth-guard';
import { AdminSidebar } from '@/components/layout/admin/admin-sidebar';
import { AdminHeader } from '@/components/layout/admin/admin-header';
import { useSidebarStore } from '@/hooks/use-admin-sidebar';
import { cn } from '@/lib/utils';

function AdminShell({ children }: { children: ReactNode }) {
  const { close, isOpen } = useSidebarStore();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const syncSidebar = () => {
      if (mediaQuery.matches) close();
    };

    syncSidebar();
    mediaQuery.addEventListener('change', syncSidebar);

    return () => mediaQuery.removeEventListener('change', syncSidebar);
  }, [close]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <AdminSidebar />
      {isOpen ? (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-slate-950/35 backdrop-blur-[1px] lg:hidden"
          onClick={close}
        />
      ) : null}
      <div
        className={cn(
          'min-w-0 transition-all duration-300',
          isOpen ? 'lg:pl-72' : 'lg:pl-24',
        )}
      >
        <AdminHeader />
        <main className="px-4 py-4 lg:px-6 lg:py-6">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isChangePasswordPage = pathname === '/admin/change-password';
  const authStatus = useAdminAuthStatus();

  let content: ReactNode;

  if (isChangePasswordPage) {
    content = <div className="min-h-screen bg-slate-50">{children}</div>;
  } else if (authStatus === 'loading') {
    content = <AdminAuthLoadingScreen />;
  } else if (authStatus === 'blocked') {
    content = null;
  } else {
    content = <AdminShell>{children}</AdminShell>;
  }

  return <AbilityProvider value={ability}>{content}</AbilityProvider>;
}
