"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setMessage('Đăng nhập thành công! Đang chuyển hướng...');
        router.push('/'); 
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('Đăng ký thành công! Vui lòng kiểm tra email để xác thực.');
      }
    } catch (error) {
      setMessage(`Lỗi: ${error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          {isLogin ? 'Đăng nhập' : 'Đăng ký tài khoản'}
        </h1>
        <form onSubmit={handleAuthAction}>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="email">
              Địa chỉ Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="password">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              required
              minLength={6}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={isLoading}
              className="focus:shadow-outline rounded bg-blue-600 px-4 py-2 font-bold text-white transition duration-300 hover:bg-blue-700 focus:outline-none disabled:opacity-50"
            >
              {isLoading ? 'Đang xử lý...' : (isLogin ? 'Đăng nhập' : 'Đăng ký')}
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800"
            >
              {isLogin ? 'Tạo tài khoản mới?' : 'Đã có tài khoản?'}
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-center text-sm text-green-600">{message}</p>}
      </div>
    </main>
  );
}