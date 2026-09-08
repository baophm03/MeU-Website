export interface PageConfig {
  id?: string;
  code?: string;
  name?: string;
  static_link?: string;
  static_link_en?: string;
  parent_id?: string;
  level?: number;
  sort_order?: number;
  is_article?: boolean;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
  updated_by?: string;
  slug?: string;
  description?: string;
  type?: string;
  children?: PageConfig[];
}

export interface PageConfigResponse {
  responseData?: {
    children?: PageConfig[];
  };
  data?: PageConfig[];
}