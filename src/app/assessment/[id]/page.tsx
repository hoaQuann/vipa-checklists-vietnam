"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';

interface Assessment {
  id: string;
  created_at: string;
  company_name: string;
  total_score: number;
  final_rank: string;
}

export default function DashboardPage() {
  const router = useRouter();
  // Sửa lỗi: Xóa biến 'user' không được sử dụng
  // const [user, setUser] = useState<User | null>(null);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessionAndData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/auth');
        return;
      }
      
      // setUser(session.user); // Xóa dòng này

      try {
        // Sửa lỗi 'any': Định nghĩa kiểu dữ liệu trả về cho data
        const { data, error }: { data: Assessment[] | null, error: any } = await supabase
          .from('assessments')
          .select('id, created_at, company_name, total_score, final_rank')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setAssessments(data || []);
      } catch (e: any) { // Sửa lỗi 'any'
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionAndData();
  }, [router]);

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <p>Đang tải dữ liệu...</p>
      </main>
    );
  }

  return (
    <main className="bg-slate-50 p-4 sm:p-8 min-h-screen">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 border-b pb-4 text-3xl font-bold text-gray-800">
          Lịch sử Đánh giá
        </h1>
        
        {error && <p className="text-red-500">Lỗi: {error}</p>}

        {assessments.length === 0 && !error ? (
          <div className="text-center text-gray-600">
            <p>Bạn chưa có bài đánh giá nào.</p>
            {/* Sửa lỗi: Thay thế <a> bằng <Link> */}
            <Link href="/" className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700">
              Thực hiện Đánh giá Mới
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg bg-white shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Doanh nghiệp</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Ngày Đánh giá</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Điểm ViPA</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Xếp hạng</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {assessments.map((assessment) => (
                  <tr key={assessment.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">{assessment.company_name || 'Chưa đặt tên'}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-500">{new Date(assessment.created_at).toLocaleDateString('vi-VN')}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-gray-500">{assessment.total_score.toFixed(2)}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800">
                        {assessment.final_rank}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      <Link href={`/assessment/${assessment.id}`} className="text-blue-600 hover:text-blue-900">
                        Xem & Tải về
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}