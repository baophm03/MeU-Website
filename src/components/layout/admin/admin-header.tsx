'use client';

import { LogOut, Menu } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { usePostApiV10AuthLogout } from '@/api/endpoints/authentication';
import { redirectToLogin } from '@/lib/auth/admin-auth';
import { useSidebarStore } from '@/hooks/use-admin-sidebar';
import useAuthStore from '@/store/useAuthStore';
import useProfileStore from '@/store/useProfileStore';

export function AdminHeader() {
  const { toggle } = useSidebarStore();
  const logoutMutation = usePostApiV10AuthLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch {
      // Ignore API failure, still clear local state
    }
    useAuthStore.getState().resetStore();
    useProfileStore.getState().clearProfile();
    toast.success("Đã đăng xuất khỏi trang quản trị");
    redirectToLogin();
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#063e8e]/15 bg-background/95 shadow-sm backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="flex min-h-16 items-center justify-between gap-3 px-3 py-2 sm:px-4 lg:px-6">
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="text-[#063e8e]"
            title="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="border-[#063e8e]/15 text-[#063e8e]"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Đăng xuất</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
