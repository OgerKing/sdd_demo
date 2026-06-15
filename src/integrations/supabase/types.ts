export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      members: {
        Row: {
          id: number;
          email: string;
          full_name: string;
          joined_at: string;
        };
        Insert: {
          id?: number;
          email: string;
          full_name: string;
          joined_at?: string;
        };
        Update: {
          id?: number;
          email?: string;
          full_name?: string;
          joined_at?: string;
        };
      };
      memberships: {
        Row: {
          id: number;
          member_id: number;
          plan_name: string;
          status: string;
          expires_at: string | null;
        };
      };
      products: {
        Row: {
          id: number;
          name: string;
          price_cents: number;
          is_member_only: boolean;
        };
      };
      orders: {
        Row: {
          id: number;
          member_id: number;
          product_id: number;
          ordered_at: string;
          total_cents: number;
        };
      };
    };
    Functions: {
      run_readonly_query: {
        Args: {
          query: string;
        };
        Returns: Json;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export const SCHEMA_TABLES = [
  {
    name: "members",
    columns: ["id", "email", "full_name", "joined_at"],
  },
  {
    name: "memberships",
    columns: ["id", "member_id", "plan_name", "status", "expires_at"],
  },
  {
    name: "products",
    columns: ["id", "name", "price_cents", "is_member_only"],
  },
  {
    name: "orders",
    columns: ["id", "member_id", "product_id", "ordered_at", "total_cents"],
  },
] as const;
