"use client";
import { useEffect, useState } from 'react';
// Sửa lỗi: Sử dụng đường dẫn tương đối để đảm bảo file luôn được tìm thấy
import { supabase } from '../lib/supabaseClient'; 

// Định nghĩa kiểu dữ liệu cho props
interface ResultsData {
  pillarAvgs: { [key: number]: number };
  totalVipaScore: number;
  finalRank: string;
}

interface ResultsPageProps {
  results: ResultsData;
  onBack: () => void; // Hàm callback để quay lại trang checklist
}

// Khai báo kiểu dữ liệu cho biến weights
const weights: { [key: number]: number } = { 1: 0.25, 2: 0.25, 3: 0.25, 4: 0.25 };
const pillarNames: { [key: number]: string } = {
  1: "Quản lý Doanh nghiệp",
  2: "Quản lý Năng suất",
  3: "Hệ thống hạ tầng cho CĐS",
  4: "Sản xuất Thông minh"
};

export default function ResultsPage({ results, onBack }: ResultsPageProps) {
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  // Sử dụng useEffect để lưu dữ liệu vào Supabase MỘT LẦN khi component được render
  useEffect(() => {
    const saveResults = async () => {
      setSaveStatus('saving');
      try {
        const { data, error } = await supabase
          .from('assessments') // Tên bảng của bạn
          .insert([
            {
              // Thêm các trường dữ liệu bạn muốn lưu
              // company_name: 'Test Company', // Bạn sẽ lấy thông tin này từ state sau
              total_score: results.totalVipaScore,
              final_rank: results.finalRank,
              detailed_results: results.pillarAvgs, // Lưu điểm trung bình các trụ cột
            },
          ]);

        if (error) {
          throw error;
        }

        console.log('Đã lưu kết quả thành công:', data);
        setSaveStatus('success');
      } catch (error) {
        console.error('Lỗi khi lưu dữ liệu vào Supabase:', error);
        setSaveStatus('error');
      }
    };

    saveResults();
  }, [results]); // Dependency array đảm bảo useEffect chỉ chạy khi 'results' thay đổi

  return (
    <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg my-8 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4 text-center">KẾT QUẢ ĐÁNH GIÁ</h1>
      
      <div className="mt-2 text-center text-sm">
        {saveStatus === 'saving' && <p className="text-blue-600">Đang lưu kết quả vào cơ sở dữ liệu...</p>}
        {saveStatus === 'success' && <p className="text-green-600">Lưu kết quả thành công!</p>}
        {saveStatus === 'error' && <p className="text-red-600">Lưu kết quả thất bại. Vui lòng kiểm tra console log.</p>}
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">PHẦN C: BẢNG TỔNG HỢP KẾT QUẢ ĐÁNH GIÁ</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 border border-gray-300 text-left">Trụ cột</th>
                <th className="p-3 border border-gray-300">Điểm Trung bình</th>
                <th className="p-3 border border-gray-300">Trọng số (%)</th>
                <th className="p-3 border border-gray-300">Điểm theo Trọng số</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(results.pillarAvgs).map(pillarKey => {
                const key = parseInt(pillarKey);
                const avg = results.pillarAvgs[key];
                const weightedScore = avg * weights[key];
                return (
                  <tr key={key}>
                    <td className="p-3 border border-gray-300">{key}. {pillarNames[key]}</td>
                    <td className="p-3 border border-gray-300 text-center">{avg.toFixed(2)}</td>
                    <td className="p-3 border border-gray-300 text-center">{weights[key] * 100}%</td>
                    <td className="p-3 border border-gray-300 text-center">{weightedScore.toFixed(2)}</td>
                  </tr>
                );
              })}
              <tr className="bg-blue-100 text-lg font-bold">
                <td colSpan={3} className="p-3 border border-gray-300 text-right">TỔNG ĐIỂM ViPA</td>
                <td className="p-3 border border-gray-300 text-center">{results.totalVipaScore.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-8 text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          KẾT LUẬN MỨC ĐỘ SẴN SÀNG: <span className="text-blue-600 font-bold">{results.finalRank}</span>
        </h2>
      </div>
      <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 flex-wrap">
        <button onClick={onBack} className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300">
          Quay lại Checklist
        </button>
        <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
          ✨ Nhận Gợi ý AI
        </button>
      </div>
    </div>
  );
}