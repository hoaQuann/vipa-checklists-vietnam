"use client";

import { useState } from 'react';
// Sử dụng alias path '@/' để import, đây là cách chuẩn của Next.js
import LandingPage from "@/components/LandingPage";
import ChecklistPage from "@/components/ChecklistPage";
import ResultsPage from "@/components/ResultsPage"; 

// Định nghĩa kiểu dữ liệu (interface) cho đối tượng kết quả.
// Việc này giúp code an toàn và dễ đọc hơn.
interface ResultsData {
  pillarAvgs: { [key: number]: number };
  totalVipaScore: number;
  finalRank: string;
}

export default function Home() {
  // State để quản lý màn hình đang hiển thị: 'landing', 'checklist', hoặc 'results'
  const [currentView, setCurrentView] = useState('landing');
  // State để lưu trữ dữ liệu kết quả sau khi tính toán
  const [results, setResults] = useState<ResultsData | null>(null);

  // Hàm được gọi khi người dùng nhấn nút "Bắt đầu" trên LandingPage
  const handleStart = () => setCurrentView('checklist');

  // Hàm được gọi khi người dùng nhấn "Xem kết quả" trên ChecklistPage
  const handleShowResults = (calculatedResults: ResultsData) => {
    setResults(calculatedResults); // Lưu lại dữ liệu kết quả
    setCurrentView('results');    // Chuyển sang màn hình hiển thị kết quả
  };

  // Hàm được gọi khi người dùng nhấn "Quay lại" trên ResultsPage
  const handleBackToChecklist = () => {
    setCurrentView('checklist');
  };
  
  // Hàm xử lý khi người dùng yêu cầu gợi ý từ AI
  const handleGetRecommendations = () => {
    // Logic thực tế để gọi AI sẽ được triển khai ở Giai đoạn 7
    alert("Tính năng gợi ý AI sẽ được tích hợp ở Giai đoạn 7!");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-12 lg:p-24 bg-slate-50">
      {/* Dựa vào state 'currentView' để hiển thị component tương ứng */}
      {currentView === 'landing' && <LandingPage onStartClick={handleStart} />}
      
      {currentView === 'checklist' && <ChecklistPage onShowResults={handleShowResults} />}
      
      {currentView === 'results' && results && (
        <ResultsPage 
          results={results} 
          onBack={handleBackToChecklist}
          onGetRecommendations={handleGetRecommendations}
        />
      )}
    </main>
  );
}