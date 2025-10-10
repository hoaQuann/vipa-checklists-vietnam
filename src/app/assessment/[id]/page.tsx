"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// Định nghĩa kiểu dữ liệu chi tiết cho một bản ghi đánh giá
interface AssessmentDetails {
  id: string;
  created_at: string;
  company_name: string;
  total_score: number;
  final_rank: string;
  csv_export_url?: string;
  word_export_url?: string;
  detailed_results: {
    pillarAvgs: number[];
  };
}

export default function AssessmentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [assessment, setAssessment] = useState<AssessmentDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const weights: { [key: number]: number } = { 0: 0.25, 1: 0.25, 2: 0.25, 3: 0.25 };
  const pillarNames = ["1. Quản lý Doanh nghiệp", "2. Quản lý Năng suất", "3. Hệ thống hạ tầng cho CĐS", "4. Sản xuất Thông minh"];

  useEffect(() => {
    if (!id) return;

    const fetchAssessment = async () => {
      // Đảm bảo người dùng đã đăng nhập
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth');
        return;
      }

      try {
        // Lấy chi tiết bài đánh giá
        const { data, error } = await supabase
          .from('assessments')
          .select('*')
          .eq('id', id)
          .eq('user_id', session.user.id) // Quan trọng: Chỉ lấy bài của người dùng hiện tại
          .single();

        if (error) throw error;
        if (!data) throw new Error("Không tìm thấy bài đánh giá.");

        setAssessment(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessment();
  }, [id, router]);

  if (loading) {
    return <main className="flex min-h-screen flex-col items-center justify-center"><p>Đang tải chi tiết...</p></main>;
  }

  if (error) {
    return <main className="flex min-h-screen flex-col items-center justify-center"><p className="text-red-500">Lỗi: {error}</p></main>;
  }

  return (
    <main className="bg-slate-50 p-4 sm:p-8 min-h-screen">
      <div className="max-w-4xl w-full mx-auto bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg my-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Chi tiết Đánh giá
        </h1>
        <p className="text-center text-gray-500 mb-6 border-b pb-4">
          Doanh nghiệp: <strong>{assessment?.company_name || 'N/A'}</strong> | Ngày: {new Date(assessment?.created_at || '').toLocaleDateString('vi-VN')}
        </p>
        
        {assessment && (
          <>
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">BẢNG TỔNG HỢP KẾT QUẢ</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead className="bg-gray-100 font-semibold">
                    <tr>
                      <th className="p-3 border border-gray-300 text-left">Trụ cột</th>
                      <th className="p-3 border border-gray-300">Điểm Trung bình</th>
                      <th className="p-3 border border-gray-300">Trọng số (%)</th>
                      <th className="p-3 border border-gray-300">Điểm theo Trọng số</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assessment.detailed_results.pillarAvgs.map((avg, index) => {
                      const weightedScore = avg * weights[index];
                      return (
                          <tr key={index}>
                            <td className="p-3 border border-gray-300">{pillarNames[index]}</td>
                            <td className="p-3 border border-gray-300 text-center">{avg.toFixed(2)}</td>
                            <td className="p-3 border border-gray-300 text-center">{weights[index] * 100}%</td>
                            <td className="p-3 border border-gray-300 text-center">{weightedScore.toFixed(2)}</td>
                          </tr>
                      )
                    })}
                    <tr className="bg-blue-100 text-lg font-bold">
                      <td colSpan={3} className="p-3 border border-gray-300 text-right">TỔNG ĐIỂM ViPA</td>
                      <td className="p-3 border border-gray-300 text-center">{assessment.total_score.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-8 text-center">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">KẾT LUẬN MỨC ĐỘ SẴN SÀNG: <span className="text-blue-600 font-bold">{assessment.final_rank}</span></h2>
            </div>
            
            <div className="mt-10 border-t pt-6">
                <h3 className="text-lg font-semibold text-center mb-4">Tải về Báo cáo</h3>
                <div className="flex justify-center items-center gap-4">
                    {assessment.csv_export_url ? (
                        <a href={assessment.csv_export_url} target="_blank" rel="noopener noreferrer" download className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition">
                            <span>📥 Tải CSV</span>
                        </a>
                    ) : <p className="text-sm text-gray-500">Chưa có file CSV.</p>}
                    
                    {assessment.word_export_url ? (
                        <a href={assessment.word_export_url} target="_blank" rel="noopener noreferrer" download className="flex items-center gap-2 bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition">
                            <span>📥 Tải Word</span>
                        </a>
                    ) : <p className="text-sm text-gray-500">Chưa có file Word.</p>}
                </div>
            </div>

            <div className="mt-10 text-center border-t pt-6">
                <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 font-semibold">
                    &larr; Quay lại Lịch sử
                </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}