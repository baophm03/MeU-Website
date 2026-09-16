export interface PermissionActionDef {
  action: string;
  label: string;
  description?: string;
}

export interface PermissionModuleDef {
  module: string;
  label: string;
  description?: string;
  actions: PermissionActionDef[];
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  user_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface EditForm {
  name: string;
  description: string;
  permissions: string[];
}

export const SYSTEM_ROLES = ["system_admin", "admin", "user"];
