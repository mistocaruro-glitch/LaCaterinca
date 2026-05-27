import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
          name: string
          credits: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string
          credits?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          credits?: number
          created_at?: string
          updated_at?: string
        }
      }
      characters: {
        Row: {
          id: string
          name: string
          description: string
          avatar: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          avatar: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          avatar?: string
          created_at?: string
        }
      }
      pranks: {
        Row: {
          id: string
          user_id: string
          character_id: string
          victim_number: string
          victim_name: string | null
          status: 'pending' | 'in_progress' | 'success' | 'failed'
          duration: number | null
          credits_used: number
          created_at: string
          updated_at: string
          recording_url: string | null
        }
        Insert: {
          id?: string
          user_id: string
          character_id: string
          victim_number: string
          victim_name?: string | null
          status?: 'pending' | 'in_progress' | 'success' | 'failed'
          duration?: number | null
          credits_used?: number
          created_at?: string
          updated_at?: string
          recording_url?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          character_id?: string
          victim_number?: string
          victim_name?: string | null
          status?: 'pending' | 'in_progress' | 'success' | 'failed'
          duration?: number | null
          credits_used?: number
          created_at?: string
          updated_at?: string
          recording_url?: string | null
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          amount: number
          credits: number
          status: 'pending' | 'completed' | 'failed'
          stripe_payment_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          credits: number
          status?: 'pending' | 'completed' | 'failed'
          stripe_payment_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          credits?: number
          status?: 'pending' | 'completed' | 'failed'
          stripe_payment_id?: string | null
          created_at?: string
        }
      }
    }
  }
}
