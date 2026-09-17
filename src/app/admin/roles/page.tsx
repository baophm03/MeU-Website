"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Can } from "@casl/react";
import {
  buildPermissionSet,
  permissionSetToArray,
  togglePermissionInSet,
} from "@/config/permissions";

import {
  getGetApiV10RoleQueryKey,
  useDeleteApiV10RoleId,
  useGetApiV10Role,
  useGetApiV10RoleIdPermission,
  usePostApiV10Role,
  usePutApiV10RoleId,
  usePutApiV10RoleIdPermission,
} from "@/api/endpoints/role";
import { useGetApiV10Permission } from "@/api/endpoints/permission";

import { Role, EditForm, PermissionModuleDef } from "./_components/types";
import { RoleCard } from "./_components/RoleCard";
import { EditRoleDialog } from "./_components/EditRoleDialog";
import { DeleteRoleDialog } from "./_components/DeleteRoleDialog";
import { Pagination } from "./_components/Pagination";

export default function RolesPage() {
  const queryClient = useQueryClient();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState<EditForm>({
    name: "",
    description: "",
    permissions: new Set(),
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  const { data: rolesData, isLoading } = useGetApiV10Role({
    page: currentPage,
    pageSize: 10,
  });

  const { data: permissionsData, isLoading: isLoadingPermissions } =
    useGetApiV10Permission({
      query: { enabled: isEditDialogOpen },
    });

  const { data: rolePermissionsData, isLoading: isLoadingRolePermissions } =
    useGetApiV10RoleIdPermission(selectedRole?.id ?? "", {
      query: { enabled: isEditDialogOpen && !!selectedRole?.id },
    });

  const createRole = usePostApiV10Role();
  const updateRole = usePutApiV10RoleId();
  const setRolePermissions = usePutApiV10RoleIdPermission();
  const deleteRole = useDeleteApiV10RoleId();
  const permissionModules =
    (((permissionsData as unknown as { responseData?: PermissionModuleDef[] })
      ?.responseData) || []) as PermissionModuleDef[];

  const roles =
    (((rolesData as unknown as { responseData?: { rows?: Role[] } })?.responseData?.rows) || []) as Role[];
  const totalRoles =
    ((rolesData as unknown as { responseData?: { count?: number } })?.responseData?.count) || 0;

  // Nạp permissions hiện có của role vào Set khi API trả về
  useEffect(() => {
    const rows = (rolePermissionsData as { responseData?: { module?: string; action?: string }[] })
      ?.responseData;
    if (!Array.isArray(rows)) return;
    setEditForm((prev) => ({ ...prev, permissions: buildPermissionSet(rows) }));
  }, [rolePermissionsData]);

  const invalidateRoles = () =>
    queryClient.invalidateQueries({ queryKey: getGetApiV10RoleQueryKey() });

  const handleCreateRole = () => {
    setSelectedRole(null);
    setEditForm({ name: "", description: "", permissions: new Set() });
    setIsEditDialogOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setEditForm({ name: role.name, description: role.description || "", permissions: new Set() });
    setIsEditDialogOpen(true);
  };

  const handleDeleteRole = (role: Role) => {
    setRoleToDelete(role);
    setIsDeleteDialogOpen(true);
  };

  const handleTogglePermission = (module: string, action: string) => {
    setEditForm((prev) => ({
      ...prev,
      permissions: togglePermissionInSet(prev.permissions, module, action),
    }));
  };

  const handleSaveRole = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      const permissions = permissionSetToArray(editForm.permissions);
      let roleId = selectedRole?.id;

      if (selectedRole) {
        await updateRole.mutateAsync({
          id: roleId!,
          data: {
            name: editForm.name.trim(),
            description: editForm.description || undefined,
          },
        });
      } else {
        const created = await createRole.mutateAsync({
          data: {
            name: editForm.name.trim(),
            description: editForm.description || undefined,
          },
        });
        roleId = (created as unknown as { responseData?: { id?: string } })?.responseData?.id;
      }

      if (roleId) {
        await setRolePermissions.mutateAsync({ id: roleId, data: { permissions } });
      }

      toast.success(selectedRole ? "Đã cập nhật vai trò" : "Đã tạo vai trò mới");
      setIsEditDialogOpen(false);
      await invalidateRoles();
    } catch {
      toast.error("Không thể lưu vai trò. Vui lòng thử lại.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!roleToDelete || isSaving) return;
    setIsSaving(true);
    try {
      await deleteRole.mutateAsync({ id: roleToDelete.id });
      toast.success("Đã xóa vai trò");
      setIsDeleteDialogOpen(false);
      setRoleToDelete(null);
      await invalidateRoles();
    } catch {
      toast.error("Không thể xóa vai trò. Vui lòng thử lại.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#163b73]">Quản lý Vai trò</h1>
          <p className="mt-1 text-sm text-slate-600">
            Quản lý vai trò và phân quyền cho người dùng ({totalRoles} vai trò)
          </p>
        </div>
        <Can I="CREATE" a="ROLES">
          <Button
            onClick={handleCreateRole}
            className="rounded-xl bg-[#063e8e] text-white hover:bg-[#063e8e]/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Tạo vai trò mới
          </Button>
        </Can>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-[#063e8e]" />
        </div>
      )}

      {!isLoading && (
        <div className="grid gap-4">
          {roles.map((role) => (
            <RoleCard
              key={role.id}
              role={role}
              onEdit={handleEditRole}
              onDelete={handleDeleteRole}
            />
          ))}
        </div>
      )}

      {roles.length === 0 && !isLoading && (
        <div className="rounded-[20px] border border-[#063e8e]/10 bg-[#f8fbff] p-10 text-center">
          <p className="text-slate-500">Chưa có vai trò nào</p>
        </div>
      )}

      {totalRoles > 10 && (
        <Pagination
          currentPage={currentPage}
          totalRoles={totalRoles}
          isLoading={isLoading}
          onPageChange={setCurrentPage}
        />
      )}

      <EditRoleDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        selectedRole={selectedRole}
        editForm={editForm}
        setEditForm={setEditForm}
        onTogglePermission={handleTogglePermission}
        onSave={handleSaveRole}
        isPending={isSaving}
        permissionModules={permissionModules}
        isLoadingPermissions={isLoadingPermissions || isLoadingRolePermissions}
      />

      <DeleteRoleDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        roleToDelete={roleToDelete}
        onConfirm={handleConfirmDelete}
        isPending={isSaving}
      />
    </div>
  );
}
