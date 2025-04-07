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
      articles: {
        Row: {
          author_created_at: string
          author_id: string
          author_index_number: string | null
          author_name: string
          author_role: string
          content: string
          created_at: string
          excerpt: string
          id: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_created_at: string
          author_id: string
          author_index_number?: string | null
          author_name: string
          author_role: string
          content: string
          created_at?: string
          excerpt: string
          id?: string
          status: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_created_at?: string
          author_id?: string
          author_index_number?: string | null
          author_name?: string
          author_role?: string
          content?: string
          created_at?: string
          excerpt?: string
          id?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          entity_id: string
          entity_type: string
          id: number
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          entity_id: string
          entity_type: string
          id?: number
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          entity_id?: string
          entity_type?: string
          id?: number
          user_id?: string | null
        }
        Relationships: []
      }
      bookings: {
        Row: {
          booking_date: string | null
          booking_status: string | null
          client_id: number | null
          created_at: string | null
          id: number
          trip_id: number | null
        }
        Insert: {
          booking_date?: string | null
          booking_status?: string | null
          client_id?: number | null
          created_at?: string | null
          id?: never
          trip_id?: number | null
        }
        Update: {
          booking_date?: string | null
          booking_status?: string | null
          client_id?: number | null
          created_at?: string | null
          id?: never
          trip_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "trips"
            referencedColumns: ["id"]
          },
        ]
      }
      cart_items: {
        Row: {
          created_at: string
          id: number
          product_id: number
          product_type: Database["public"]["Enums"]["product_type"]
          quantity: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          product_id: number
          product_type: Database["public"]["Enums"]["product_type"]
          quantity?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          product_id?: number
          product_type?: Database["public"]["Enums"]["product_type"]
          quantity?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      clients: {
        Row: {
          created_at: string | null
          email: string
          id: number
          name: string
          phone: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: never
          name: string
          phone?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: never
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      domains: {
        Row: {
          auto_renew: boolean | null
          created_at: string
          dns_records: Json | null
          expiry_date: string
          id: number
          name: string
          price: number
          registration_date: string | null
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          auto_renew?: boolean | null
          created_at?: string
          dns_records?: Json | null
          expiry_date: string
          id?: number
          name: string
          price: number
          registration_date?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          auto_renew?: boolean | null
          created_at?: string
          dns_records?: Json | null
          expiry_date?: string
          id?: number
          name?: string
          price?: number
          registration_date?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      hosting_plans: {
        Row: {
          created_at: string
          description: string | null
          features: Json | null
          id: number
          name: string
          price: number
          stripe_price_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: number
          name: string
          price: number
          stripe_price_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: number
          name?: string
          price?: number
          stripe_price_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          created_at: string
          customer_name: string
          email: string
          id: number
          message: string
          status: string | null
          subject: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          customer_name: string
          email: string
          id?: number
          message: string
          status?: string | null
          subject: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          customer_name?: string
          email?: string
          id?: number
          message?: string
          status?: string | null
          subject?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      items: {
        Row: {
          category: string
          created_at: string
          date_reported: string
          description: string | null
          id: string
          image_url: string | null
          location: string
          name: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          date_reported: string
          description?: string | null
          id?: string
          image_url?: string | null
          location: string
          name: string
          status: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          date_reported?: string
          description?: string | null
          id?: string
          image_url?: string | null
          location?: string
          name?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          id: number
          order_id: number | null
          price: number
          product_id: number
          product_type: string
          quantity: number
        }
        Insert: {
          created_at?: string
          id?: number
          order_id?: number | null
          price: number
          product_id: number
          product_type: string
          quantity?: number
        }
        Update: {
          created_at?: string
          id?: number
          order_id?: number | null
          price?: number
          product_id?: number
          product_type?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          id: number
          invoice_url: string | null
          status: string
          total_amount: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          invoice_url?: string | null
          status?: string
          total_amount: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          invoice_url?: string | null
          status?: string
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      packages: {
        Row: {
          best_season: string | null
          created_at: string
          description: string | null
          difficulty_level: string | null
          duration: string | null
          highlights: string[] | null
          id: number
          image_url: string | null
          included_services: string[] | null
          itinerary: Json | null
          location: string | null
          max_guests: number | null
          name: string
          price: number | null
          rating: number | null
          review_count: number | null
          updated_at: string
        }
        Insert: {
          best_season?: string | null
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          duration?: string | null
          highlights?: string[] | null
          id?: number
          image_url?: string | null
          included_services?: string[] | null
          itinerary?: Json | null
          location?: string | null
          max_guests?: number | null
          name: string
          price?: number | null
          rating?: number | null
          review_count?: number | null
          updated_at?: string
        }
        Update: {
          best_season?: string | null
          created_at?: string
          description?: string | null
          difficulty_level?: string | null
          duration?: string | null
          highlights?: string[] | null
          id?: number
          image_url?: string | null
          included_services?: string[] | null
          itinerary?: Json | null
          location?: string | null
          max_guests?: number | null
          name?: string
          price?: number | null
          rating?: number | null
          review_count?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          last_login: string | null
          last_name: string | null
          phone: string | null
          role: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_login?: string | null
          last_name?: string | null
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_login?: string | null
          last_name?: string | null
          phone?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          content: string
          created_at: string
          entity_id: number
          entity_type: string
          id: number
          rating: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          entity_id: number
          entity_type: string
          id?: number
          rating: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          entity_id?: number
          entity_type?: string
          id?: number
          rating?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          price: number | null
          rating: number | null
          review_count: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          price?: number | null
          rating?: number | null
          review_count?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          price?: number | null
          rating?: number | null
          review_count?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      settings: {
        Row: {
          booking_alerts: boolean | null
          company_name: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          email_notifications: boolean | null
          id: number
          two_factor_enabled: boolean | null
          updated_at: string
        }
        Insert: {
          booking_alerts?: boolean | null
          company_name?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          email_notifications?: boolean | null
          id?: number
          two_factor_enabled?: boolean | null
          updated_at?: string
        }
        Update: {
          booking_alerts?: boolean | null
          company_name?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          email_notifications?: boolean | null
          id?: number
          two_factor_enabled?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          created_at: string
          description: string
          id: number
          priority: string | null
          status: string | null
          subject: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          priority?: string | null
          status?: string | null
          subject: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          priority?: string | null
          status?: string | null
          subject?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      trips: {
        Row: {
          created_at: string | null
          destination: string
          duration: string | null
          id: number
          price: number
        }
        Insert: {
          created_at?: string | null
          destination: string
          duration?: string | null
          id?: never
          price: number
        }
        Update: {
          created_at?: string | null
          destination?: string
          duration?: string | null
          id?: never
          price?: number
        }
        Relationships: []
      }
      User: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          index_number: string | null
          name: string
          password_hash: string
          role: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          index_number?: string | null
          name: string
          password_hash: string
          role: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          index_number?: string | null
          name?: string
          password_hash?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      dashboard_stats: {
        Row: {
          confirmed_bookings: number | null
          total_bookings: number | null
          total_inquiries: number | null
          total_packages: number | null
          total_revenue: number | null
          total_services: number | null
          total_users: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      product_type: "hosting" | "domain"
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
