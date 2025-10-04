"use client";
import { useState, useEffect } from 'react'; // Import useEffect
// Sửa lỗi: Sử dụng đường dẫn tương đối để đảm bảo file luôn được tìm thấy
import LandingPage from '../components/LandingPage';
import ChecklistPage from '../components/ChecklistPage';
import ResultsPage from '../components/ResultsPage';

// Định nghĩa kiểu dữ liệu cho kết quả để sử dụng nhất quán
export interface ResultsData {
  companyInfo: { [key: string]: string };
  scores: Record<string, number>;
  notes: Record<string, string>;
  pillarAvgs: number[];
  totalVipaScore: number;
  finalRank: string;
}

type AppState = 'landing' | 'checklist' | 'results';

export default function HomePage() {
  const [currentView, setCurrentView] = useState<AppState>('landing');
  // Sử dụng kiểu ResultsData
  const [resultsData, setResultsData] = useState<ResultsData | null>(null);

  // SỬA LỖI: Thêm useEffect để cuộn lên đầu trang khi view thay đổi
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]); // Hook này sẽ chạy mỗi khi giá trị `currentView` thay đổi

  const handleStart = () => {
    setCurrentView('checklist');
  };

  // Sử dụng kiểu ResultsData
  const handleShowResults = (results: ResultsData) => {
    setResultsData(results);
    setCurrentView('results');
  };

  const handleBackToChecklist = () => {
    setCurrentView('checklist');
  };

  return (
    // Bỏ các class căn giữa để component con tự quyết định layout
    <main className="min-h-screen bg-slate-50">
      {currentView === 'landing' && <LandingPage onStart={handleStart} />}
      {currentView === 'checklist' && <ChecklistPage onShowResults={handleShowResults} />}
      {currentView === 'results' && resultsData && (
        <ResultsPage results={resultsData} onBack={handleBackToChecklist} />
      )}
    </main>
  );
}