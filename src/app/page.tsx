"use client";
import { useState } from 'react';
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
  const [resultsData, setResultsData] = useState<ResultsData | null>(null);

  const handleStart = () => {
    setCurrentView('checklist');
  };

  const handleShowResults = (results: ResultsData) => {
    setResultsData(results);
    setCurrentView('results');
  };

  const handleBackToChecklist = () => {
    setCurrentView('checklist');
  };

  // **SỬA LỖI QUAN TRỌNG:**
  // Xóa các class flexbox căn giữa khỏi thẻ <main>.
  // Điều này cho phép các component con (LandingPage, ChecklistPage, etc.)
  // tự kiểm soát bố cục và chiều rộng của chúng, đúng với thiết kế ban đầu.
  return (
    <main className="min-h-screen bg-slate-100">
      {currentView === 'landing' && <LandingPage onStart={handleStart} />}
      {currentView === 'checklist' && <ChecklistPage onShowResults={handleShowResults} />}
      {currentView === 'results' && resultsData && (
        <ResultsPage results={resultsData} onBack={handleBackToChecklist} />
      )}
    </main>
  );
}