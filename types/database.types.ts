export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      edge: {
        Row: {
          created_at: string
          from: string
          id: string
          to: string
        }
        Insert: {
          created_at?: string
          from: string
          id?: string
          to: string
        }
        Update: {
          created_at?: string
          from?: string
          id?: string
          to?: string
        }
        Relationships: [
          {
            foreignKeyName: "edge_from_fkey"
            columns: ["from"]
            isOneToOne: false
            referencedRelation: "node"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "edge_to_fkey"
            columns: ["to"]
            isOneToOne: false
            referencedRelation: "node"
            referencedColumns: ["id"]
          },
        ]
      }
      invite_to_project: {
        Row: {
          created_at: string
          id: string
          sender_project_member_id: string
          target_email: string
        }
        Insert: {
          created_at?: string
          id?: string
          sender_project_member_id: string
          target_email: string
        }
        Update: {
          created_at?: string
          id?: string
          sender_project_member_id?: string
          target_email?: string
        }
        Relationships: [
          {
            foreignKeyName: "invite_to_project_sender_project_member_id_fkey"
            columns: ["sender_project_member_id"]
            isOneToOne: false
            referencedRelation: "project_member"
            referencedColumns: ["id"]
          },
        ]
      }
      module_website: {
        Row: {
          created_at: string
          description: string | null
          id: string
          url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          url?: string | null
        }
        Relationships: []
      }
      node: {
        Row: {
          created_at: string
          id: string
          type: string
          x_coord: number | null
          y_coord: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          type: string
          x_coord?: number | null
          y_coord?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          type?: string
          x_coord?: number | null
          y_coord?: number | null
        }
        Relationships: []
      }
      notification: {
        Row: {
          created_at: string
          id: string
          message: string
          target_user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          target_user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          target_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_target_user_id_fkey"
            columns: ["target_user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      project: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      project_member: {
        Row: {
          id: string
          project_id: string
          user_id: string | null
        }
        Insert: {
          id?: string
          project_id: string
          user_id?: string | null
        }
        Update: {
          id?: string
          project_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_member_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_member_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      project_member_roles: {
        Row: {
          created_at: string
          id: string
          project_member_id: string
          project_role_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          project_member_id: string
          project_role_id: string
        }
        Update: {
          created_at?: string
          id?: string
          project_member_id?: string
          project_role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_member_roles_project_member_id_fkey"
            columns: ["project_member_id"]
            isOneToOne: false
            referencedRelation: "project_member"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_member_roles_project_role_id_fkey"
            columns: ["project_role_id"]
            isOneToOne: false
            referencedRelation: "project_role"
            referencedColumns: ["id"]
          },
        ]
      }
      project_role: {
        Row: {
          id: string
          title: string
        }
        Insert: {
          id?: string
          title: string
        }
        Update: {
          id?: string
          title?: string
        }
        Relationships: []
      }
      task: {
        Row: {
          created_at: string
          description: string | null
          id: string
          project_id: string
          status: Database["public"]["Enums"]["task_status"]
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          project_id: string
          status?: Database["public"]["Enums"]["task_status"]
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          project_id?: string
          status?: Database["public"]["Enums"]["task_status"]
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "project"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      my_project_ids: {
        Args: Record<PropertyKey, never>
        Returns: {
          project_id: string
        }[]
      }
    }
    Enums: {
      task_status: "todo" | "in_progress" | "done"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
