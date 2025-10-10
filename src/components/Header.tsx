"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // 1. Import useRouter
import type { User } from '@supabase/supabase-js';

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // 2. Khởi tạo router

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-4">
        {/* 3. Thêm nhóm nút điều hướng */}
        <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-800">
                Trang chủ
            </Link>
            <div className="flex items-center gap-2">
                <button 
                    onClick={() => router.back()} 
                    title="Quay lại"
                    className="rounded-full p-2 hover:bg-gray-100"
                >
                    <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button 
                    onClick={() => router.forward()} 
                    title="Tiến tới"
                    className="rounded-full p-2 hover:bg-gray-100"
                >
                    <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>

        <div>
          {loading ? (
            <div className="h-8 w-24 animate-pulse rounded-md bg-gray-200"></div>
          ) : user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user.email}</span>
              <Link href="/dashboard" className="font-semibold text-blue-600 hover:text-blue-800">
                Lịch sử
              </Link>
              <button onClick={handleLogout} className="rounded bg-red-500 px-3 py-1 text-sm font-bold text-white hover:bg-red-600">
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link href="/auth" className="rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700">
              Đăng nhập
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}