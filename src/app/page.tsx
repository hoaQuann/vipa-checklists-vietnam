"use client";
import { useState } from 'react';
// Sửa lỗi: Sử dụng đường dẫn alias '@/' là cách làm chuẩn và ổn định nhất
import LandingPage from '@/components/LandingPage';
import ChecklistPage from '@/components/ChecklistPage';
import ResultsPage from '@/components/ResultsPage';

// Định nghĩa một kiểu dữ liệu chung cho trang thái của ứng dụng
type AppState = 'landing' | 'checklist' | 'results';

export default function HomePage() {
  const [currentView, setCurrentView] = useState<AppState>('landing');
  const [resultsData, setResultsData] = useState<any>(null);

  const handleStart = () => {
    setCurrentView('checklist');
  };

  const handleShowResults = (results: any) => {
    setResultsData(results);
    setCurrentView('results');
  };

  const handleBackToChecklist = () => {
    setCurrentView('checklist');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24 bg-slate-50">
      {currentView === 'landing' && <LandingPage onStart={handleStart} />}
      {currentView === 'checklist' && <ChecklistPage onShowResults={handleShowResults} />}
      {currentView === 'results' && resultsData && (
        <ResultsPage results={resultsData} onBack={handleBackToChecklist} />
      )}
    </main>
  );
}