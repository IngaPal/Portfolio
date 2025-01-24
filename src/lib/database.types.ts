export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          is_admin: boolean
          created_at: string
          full_name: string | null
          avatar_url: string | null
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          is_admin: boolean
          created_at: string
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          is_admin: boolean
          created_at: string
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          description: string
          content: string
          image_url: string | null
          project_url: string | null
          technologies: string[]
          status: 'draft' | 'published'
          order: number
          category: string
          media: {
            url: string
            type: 'image' | 'video'
            title: string
          }[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          content: string
          image_url?: string | null
          project_url?: string | null
          technologies?: string[]
          status?: 'draft' | 'published'
          order?: number
          category?: string
          media?: {
            url: string
            type: 'image' | 'video'
            title: string
          }[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          content?: string
          image_url?: string | null
          project_url?: string | null
          technologies?: string[]
          status?: 'draft' | 'published'
          order?: number
          category?: string
          media?: {
            url: string
            type: 'image' | 'video'
            title: string
          }[]
          created_at?: string
          updated_at?: string
        }
      }
      media: {
        Row: {
          id: string
          title: string
          url: string
          type: 'image' | 'video'
          project_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          url: string
          type: 'image' | 'video'
          project_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          url?: string
          type?: 'image' | 'video'
          project_id?: string | null
          created_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          name: string
          email: string
          content: string
          created_at: string
          read: boolean
        }
        Insert: {
          id?: string
          name: string
          email: string
          content: string
          created_at?: string
          read?: boolean
        }
        Update: {
          id?: string
          name?: string
          email?: string
          content?: string
          created_at?: string
          read?: boolean
        }
      }
    }
  }
}