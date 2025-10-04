"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { saveAs } from 'file-saver';
import { marked } from 'marked';
// Import component AIModal vừa tạo
import AIModal from './AIModal';

// ... (Các interface ResultsData, ResultsPageProps không đổi)
interface ResultsData {
  companyInfo: { [key: string]: string };
  scores: Record<string, number>;
  notes: Record<string, string>;
  pillarAvgs: number[];
  totalVipaScore: number;
  finalRank: string;
}

interface ResultsPageProps {
  results: ResultsData;
  onBack: () => void;
}

export default function ResultsPage({ results, onBack }: ResultsPageProps) {
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [exportingFormat, setExportingFormat] = useState<'csv' | 'word' | null>(null);
  
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  // State để quản lý việc đóng/mở modal
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const saveResults = async () => {
      if (!results || assessmentId) return;
      setSaveStatus('saving');
      
      try {
        const { data, error } = await supabase
          .from('assessments')
          .insert([{
            company_name: results.companyInfo.name,
            phone_number: results.companyInfo.phoneNumber,
            total_score: results.totalVipaScore,
            final_rank: results.finalRank,
            detailed_results: { scores: results.scores, notes: results.notes, companyInfo: results.companyInfo }
          }])
          .select('id')
          .single();

        if (error) throw error;
        if (data) setAssessmentId(data.id);
        setSaveStatus('success');
      } catch (error) {
        console.error('Lỗi khi lưu dữ liệu vào Supabase:', error);
        setSaveStatus('error');
      }
    };
    saveResults();
  }, [results, assessmentId]);

  const handleGetAI = async () => {
    setIsModalOpen(true); // Mở modal ngay lập tức
    setIsAiLoading(true);
    setAiRecommendation(null);
    try {
      const response = await fetch('/api/recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ results }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setAiRecommendation(data.recommendation);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định";
      console.error("Lỗi khi lấy gợi ý AI:", error);
      setAiRecommendation(`**Đã xảy ra lỗi:** ${errorMessage}`);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleExport = async (format: 'csv' | 'word') => {
    if (!assessmentId) {
      alert("Chưa có ID đánh giá, không thể xuất file.");
      return;
    }
    setExportingFormat(format);
    
    try {
      const response = await fetch(`/api/export/${format}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ results, assessmentId, aiRecommendation }),
      });

      const { url, error } = await response.json();
      if (error) throw new Error(error);

      const updateField = format === 'csv' ? 'csv_export_url' : 'word_export_url';
      await supabase
        .from('assessments')
        .update({ [updateField]: url })
        .eq('id', assessmentId);

      const fileName = `VIPA_Report_${(results.companyInfo.name || 'Bao_cao').replace(/ /g, '_')}.${format === 'csv' ? 'csv' : 'doc'}`;
      saveAs(url, fileName);

    } catch (error) {
      console.error(`Lỗi khi xuất file ${format}:`, error);
      alert(`Đã xảy ra lỗi khi tạo file ${format}.`);
    } finally {
      setExportingFormat(null);
    }
  };
  
  const weights: { [key: number]: number } = { 0: 0.25, 1: 0.25, 2: 0.25, 3: 0.25 };
  const pillarNames = ["1. Quản lý Doanh nghiệp", "2. Quản lý Năng suất", "3. Hệ thống hạ tầng cho CĐS", "4. Sản xuất Thông minh"];

  return (
    <>
      <div className="max-w-4xl w-full mx-auto bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg my-8 animate-fade-in">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4 text-center">KẾT QUẢ ĐÁNH GIÁ</h1>
        
        <div className="mt-2 text-center text-sm text-gray-500">
          {saveStatus === 'saving' && <p>Đang lưu kết quả...</p>}
          {saveStatus === 'success' && <p className="text-green-600">Lưu kết quả thành công!</p>}
          {saveStatus === 'error' && <p className="text-red-600">Lưu kết quả thất bại. Vui lòng thử lại.</p>}
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-3 uppercase">Phần C: Bảng tổng hợp kết quả đánh giá</h2>
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
                {results.pillarAvgs.map((avg, index) => {
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
                  <td className="p-3 border border-gray-300 text-center">{results.totalVipaScore.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-3 uppercase">Kết luận mức độ sẵn sàng: <span className="text-blue-600 font-bold">{results.finalRank}</span></h2>
        </div>

        {/* CẤU TRÚC LẠI CÁC NÚT BẤM */}
        <div className="mt-10 border-t pt-8">
          <div className="flex flex-wrap justify-center items-center gap-4">
            
            <button onClick={onBack} className="flex items-center gap-2 bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/></svg>
              Quay lại Checklist
            </button>

            <button onClick={handleGetAI} disabled={isAiLoading} className="flex items-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50">
              ✨ Nhận Gợi ý AI
            </button>
            
            <button onClick={() => handleExport('csv')} disabled={exportingFormat !== null || !assessmentId} className="flex items-center gap-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 disabled:opacity-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/><path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L6.354 8.146a.5.5 0 0 0-.708.708l2 2z"/></svg>
              {exportingFormat === 'csv' ? 'Đang xử lý...' : 'Xuất ra file CSV'}
            </button>
            
            <button onClick={() => handleExport('word')} disabled={exportingFormat !== null || !assessmentId} className="flex items-center gap-2 bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300 disabled:opacity-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/><path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L6.354 8.146a.5.5 0 0 0-.708.708l2 2z"/></svg>
              {exportingFormat === 'word' ? 'Đang xử lý...' : 'Xuất ra file Word'}
            </button>
          </div>
        </div>
      </div>

      {/* Render component Modal */}
      <AIModal 
        isOpen={isModalOpen}
        isLoading={isAiLoading}
        recommendation={aiRecommendation}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}