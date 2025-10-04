"use client";
import { useState, Fragment, useEffect } from 'react';
// Sửa lỗi: Sử dụng đường dẫn tương đối để đảm bảo file luôn được tìm thấy
import { checklistData } from '../data/checklistData';

// Định nghĩa kiểu dữ liệu cho kết quả
interface ResultsData {
  companyInfo: { [key: string]: string };
  scores: Record<string, number>;
  notes: Record<string, string>;
  pillarAvgs: number[];
  totalVipaScore: number;
  finalRank: string;
}

interface ChecklistPageProps {
  onShowResults: (results: ResultsData) => void;
}

export default function ChecklistPage({ onShowResults }: ChecklistPageProps) {
  const [scores, setScores] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    address: '',
    city: '',
    contactPerson: '',
    phoneNumber: '',
    mainProduct: '',
    industry: '',
    // KHỞI TẠO RỖNG ĐỂ TRÁNH LỖI HYDRATION
    assessmentDate: '', 
  });

  // SỬA LỖI: Đặt ngày tháng mặc định ở phía client bằng useEffect
  useEffect(() => {
    setCompanyInfo(prev => ({
      ...prev,
      assessmentDate: new Date().toISOString().split('T')[0]
    }));
  }, []); // Mảng rỗng đảm bảo useEffect chỉ chạy một lần sau khi component được render

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCompanyInfo(prev => ({ ...prev, [id]: value }));
  };

  const handleNoteChange = (indicatorId: string, value: string) => {
    setNotes(prev => ({ ...prev, [indicatorId]: value }));
  };
  
  const handleScoreChange = (indicatorId: string, score: number) => {
    setScores(prev => ({
      ...prev,
      [indicatorId]: score
    }));
  };

  const calculatePillarAvg = (pillarIndex: number): number => {
    const pillar = checklistData[pillarIndex];
    if (!pillar) return 0;

    const pillarScores = pillar.indicators
      .map(indicator => scores[indicator.id])
      .filter(score => score !== undefined);

    if (pillarScores.length === 0) return 0;

    const sum = pillarScores.reduce((a, b) => a + b, 0);
    // Điểm trung bình được tính trên tổng số câu hỏi của trụ cột
    return sum / pillar.indicators.length;
  };
  
  const calculateResults = (): ResultsData => {
    let totalVipaScore = 0;
    const pillarAvgs: number[] = [];
    const weights: Record<number, number> = { 0: 0.25, 1: 0.25, 2: 0.25, 3: 0.25 };

    checklistData.forEach((_, index) => {
        const pillarIndex = index;
        const avg = calculatePillarAvg(pillarIndex);
        pillarAvgs[pillarIndex] = avg;
        totalVipaScore += avg * weights[pillarIndex];
    });

    let finalRank = 'Chưa xếp hạng';
    if (totalVipaScore > 0 && totalVipaScore <= 1.79) finalRank = 'Cấp 1: Khởi tạo';
    else if (totalVipaScore <= 2.59) finalRank = 'Cấp 2: Bắt đầu';
    else if (totalVipaScore <= 3.39) finalRank = 'Cấp 3: Hình thành';
    else if (totalVipaScore <= 4.19) finalRank = 'Cấp 4: Nâng cao';
    else if (totalVipaScore >= 4.2) finalRank = 'Cấp 5: Dẫn đầu';

    return {
      scores,
      notes,
      companyInfo,
      pillarAvgs,
      totalVipaScore,
      finalRank,
    };
  };
  
  const handleViewResults = () => {
    const results = calculateResults();
    onShowResults(results); 
  };
  
  return (
    <div className="max-w-7xl mx-auto bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg my-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Bảng Đánh giá Mức độ Sẵn sàng (ViPA Checklist)</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">PHẦN A: THÔNG TIN CHUNG</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" id="name" placeholder="Tên Doanh nghiệp" value={companyInfo.name} onChange={handleInfoChange} className="p-2 border rounded-md" />
          <input type="text" id="address" placeholder="Địa chỉ" value={companyInfo.address} onChange={handleInfoChange} className="p-2 border rounded-md" />
          <input type="text" id="city" placeholder="Tỉnh/Thành phố" value={companyInfo.city} onChange={handleInfoChange} className="p-2 border rounded-md" />
          <input type="text" id="contactPerson" placeholder="Người liên hệ" value={companyInfo.contactPerson} onChange={handleInfoChange} className="p-2 border rounded-md" />
          <input type="tel" id="phoneNumber" placeholder="Số điện thoại" value={companyInfo.phoneNumber} onChange={handleInfoChange} className="p-2 border rounded-md" />
          <input type="text" id="mainProduct" placeholder="Sản phẩm/dịch vụ chủ chốt" value={companyInfo.mainProduct} onChange={handleInfoChange} className="p-2 border rounded-md" />
          <input type="text" id="industry" placeholder="Lĩnh vực ngành nghề trọng điểm" value={companyInfo.industry} onChange={handleInfoChange} className="p-2 border rounded-md" />
          <input type="date" id="assessmentDate" value={companyInfo.assessmentDate} onChange={handleInfoChange} className="p-2 border rounded-md" />
        </div>
      </div>
      
      <h2 className="text-xl font-semibold text-gray-700 mb-4">PHẦN B: BẢNG CÂU HỎI VÀ CHẤM ĐIỂM CHI TIẾT</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100 font-semibold sticky top-0 z-10">
                <tr>
                    <th className="p-3 border border-gray-300 text-left w-1/4">Chỉ số</th>
                    <th className="p-3 border border-gray-300 text-left w-2/4">Hạng mục Đánh giá</th>
                    <th className="p-3 border border-gray-300 w-auto">Điểm</th>
                    <th className="p-3 border border-gray-300 text-left w-1/4">Bằng chứng / Ghi chú</th>
                </tr>
            </thead>
            <tbody>
              {checklistData.map((pillar, pillarIndex) => (
                <Fragment key={pillar.pillar}>
                  <tr className="bg-gray-200 font-bold">
                    <td colSpan={4} className="p-3 border border-gray-300">{pillar.pillar}</td>
                  </tr>
                  {pillar.indicators.map((indicator) => (
                    <tr key={indicator.id}>
                      <td className="p-3 border border-gray-300 align-top">
                        <b>{indicator.id}. {indicator.title}</b>
                        <p className="text-sm font-normal text-gray-600 mt-1">{indicator.description}</p>
                      </td>
                      <td className="p-2 border border-gray-300 align-top">
                        <div className="space-y-2">
                          {indicator.options.map((option) => (
                            <label key={option.score} className="flex items-start">
                              <input
                                type="radio"
                                name={`score_${indicator.id}`}
                                value={option.score}
                                onChange={() => handleScoreChange(indicator.id, option.score)}
                                checked={scores[indicator.id] === option.score}
                                className="mt-1 flex-shrink-0"
                              />
                              <span className="ml-2 text-sm">{option.text}</span>
                            </label>
                          ))}
                        </div>
                      </td>
                      <td className="p-2 border border-gray-300 text-center align-middle font-bold text-lg">
                        {scores[indicator.id] || 0}
                      </td>
                       <td className="p-2 border border-gray-300 align-middle">
                        <input
                          type="text"
                          placeholder="Ghi chú..."
                          className="w-full p-1 border rounded-md"
                          value={notes[indicator.id] || ''}
                          onChange={(e) => handleNoteChange(indicator.id, e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                  <tr className="font-bold bg-gray-50">
                    <td colSpan={2} className="p-3 border border-gray-300 text-right">ĐIỂM TRUNG BÌNH TRỤ CỘT {pillarIndex + 1}</td>
                    <td colSpan={2} className="p-3 border border-gray-300 text-center text-lg">{calculatePillarAvg(pillarIndex).toFixed(2)}</td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
        </table>
      </div>
      
      <div className="mt-8 text-center">
        <button 
          onClick={handleViewResults}
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
            Xem Kết quả
        </button>
      </div>
    </div>
  );
}