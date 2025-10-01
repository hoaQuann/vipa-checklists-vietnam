import { createClient } from '@supabase/supabase-js'

// Lấy thông tin từ biến môi trường mà chúng ta đã cấu hình
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Tạo và export một client Supabase duy nhất để tái sử dụng trong toàn bộ ứng dụng
export const supabase = createClient(supabaseUrl, supabaseAnonKey)