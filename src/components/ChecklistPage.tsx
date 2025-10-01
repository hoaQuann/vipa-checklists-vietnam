"use client";
import { useState, Fragment } from 'react';
import { checklistData } from '../data/checklistData';

// Định nghĩa kiểu dữ liệu cho kết quả
interface ResultsData {
  pillarAvgs: { [key: number]: number };
  totalVipaScore: number;
  finalRank: string;
}

// Định nghĩa props, bao gồm một hàm callback onShowResults
interface ChecklistPageProps {
  onShowResults: (results: ResultsData) => void;
}

export default function ChecklistPage({ onShowResults }: ChecklistPageProps) {
  const [scores, setScores] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [generalInfo, setGeneralInfo] = useState({
    companyName: '',
    address: '',
    city: '',
    contactPerson: '',
    mainProduct: '',
    industry: '',
    assessmentDate: new Date().toISOString().split('T')[0],
  });

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGeneralInfo({ ...generalInfo, [e.target.name]: e.target.value });
  };
  
  const handleNoteChange = (indicatorId: string, note: string) => {
    setNotes(prev => ({ ...prev, [indicatorId]: note }));
  }

  const handleScoreChange = (indicatorId: string, score: number) => {
    setScores(prev => ({ ...prev, [indicatorId]: score }));
  };

  // Hàm tính điểm trung bình cho một trụ cột, được gọi để hiển thị real-time
  const calculatePillarAvg = (pillarIndex: number) => {
      const pillar = checklistData[pillarIndex];
      if (!pillar) return 0;
      
      let pillarScoreSum = 0;
      pillar.indicators.forEach(indicator => {
          if(scores[indicator.id]) {
              pillarScoreSum += scores[indicator.id];
          }
      });

      // Điểm trung bình được tính trên TỔNG SỐ câu hỏi của trụ cột, không phải số câu đã trả lời
      return pillar.indicators.length > 0 ? pillarScoreSum / pillar.indicators.length : 0;
  }

  // Hàm tính toán kết quả cuối cùng
  const calculateResults = () => {
    const pillarAvgs: { [key: number]: number } = {};
    let totalVipaScore = 0;
    // Sửa lỗi: Khai báo biến 'weights' với kiểu dữ liệu rõ ràng ngay trong hàm
    const weights: { [key: number]: number } = { 1: 0.25, 2: 0.25, 3: 0.25, 4: 0.25 };

    checklistData.forEach((_, index) => {
      const pillarIndex = index + 1;
      const avg = calculatePillarAvg(index);
      pillarAvgs[pillarIndex] = avg;
      totalVipaScore += avg * weights[pillarIndex];
    });

    // Logic xếp hạng
    let finalRank = 'Chưa xếp hạng';
    if (totalVipaScore > 0 && totalVipaScore <= 1.79) finalRank = 'Cấp 1: Khởi tạo';
    else if (totalVipaScore <= 2.59) finalRank = 'Cấp 2: Bắt đầu';
    else if (totalVipaScore <= 3.39) finalRank = 'Cấp 3: Hình thành';
    else if (totalVipaScore <= 4.19) finalRank = 'Cấp 4: Nâng cao';
    else if (totalVipaScore >= 4.2) finalRank = 'Cấp 5: Dẫn đầu';

    return { pillarAvgs, totalVipaScore, finalRank };
  };

  // Hàm xử lý khi nhấn nút "Xem Kết quả"
  const handleViewResultsClick = () => {
    const results = calculateResults();
    onShowResults(results); // Gọi hàm callback của cha và truyền dữ liệu kết quả lên
  };
  
  return (
    <div className="max-w-7xl w-full mx-auto bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg my-8 animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Bảng Đánh giá Mức độ Sẵn sàng (ViPA Checklist)</h1>
      <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">PHẦN A: THÔNG TIN CHUNG</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="companyName" placeholder="Tên Doanh nghiệp" onChange={handleInfoChange} className="p-2 border rounded-md" />
              <input type="text" name="address" placeholder="Địa chỉ" onChange={handleInfoChange} className="p-2 border rounded-md" />
              <input type="text" name="city" placeholder="Tỉnh/Thành phố" onChange={handleInfoChange} className="p-2 border rounded-md" />
              <input type="text" name="contactPerson" placeholder="Người liên hệ" onChange={handleInfoChange} className="p-2 border rounded-md" />
              <input type="text" name="mainProduct" placeholder="Sản phẩm/dịch vụ chủ chốt" onChange={handleInfoChange} className="p-2 border rounded-md" />
              <input type="text" name="industry" placeholder="Lĩnh vực ngành nghề trọng điểm" onChange={handleInfoChange} className="p-2 border rounded-md" />
              <input type="date" name="assessmentDate" value={generalInfo.assessmentDate} onChange={handleInfoChange} className="p-2 border rounded-md" />
          </div>
      </div>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">PHẦN B: BẢNG CÂU HỎI VÀ CHẤM ĐIỂM CHI TIẾT</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200 sticky top-0">
                <tr>
                    <th className="p-3 border border-gray-300 text-left w-1/4">Chỉ số</th>
                    <th className="p-3 border border-gray-300 text-left w-2/4">Hạng mục Đánh giá (Chọn 1 mức độ)</th>
                    <th className="p-3 border border-gray-300 w-1/12">Điểm</th>
                    <th className="p-3 border border-gray-300 text-left">Bằng chứng / Ghi chú</th>
                </tr>
            </thead>
           <tbody>
            {checklistData.map((pillar, pillarIndex) => (
                <Fragment key={pillar.pillar}>
                    <tr className="bg-gray-300 font-bold"><td colSpan={4} className="p-3 border border-gray-300">{pillar.pillar}</td></tr>
                    {pillar.indicators.map((indicator) => (
                        <tr key={indicator.id}>
                            <td className="p-3 border border-gray-300 align-top">
                                <b>{indicator.id}. {indicator.title}</b>
                                <p className="text-sm font-normal text-gray-600 mt-1">{indicator.description}</p>
                            </td>
                            <td className="p-2 border border-gray-300 align-top">
                                <div className="space-y-2">
                                {indicator.options.map(option => (
                                    <label key={option.score} className="flex items-start">
                                        <input 
                                            type="radio"
                                            name={`score_${indicator.id}`}
                                            value={option.score}
                                            checked={scores[indicator.id] === option.score}
                                            onChange={() => handleScoreChange(indicator.id, option.score)}
                                            className="mt-1 flex-shrink-0"
                                        />
                                        <span className="ml-2 text-sm">{option.text}</span>
                                    </label>
                                ))}
                                </div>
                            </td>
                            <td className="p-2 border border-gray-300 text-center align-middle font-bold text-lg">{scores[indicator.id] || 0}</td>
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
                    <tr className="font-bold bg-gray-100">
                        <td colSpan={2} className="p-3 border border-gray-300 text-right">ĐIỂM TRUNG BÌNH TRỤ CỘT {pillarIndex + 1}</td>
                        <td className="p-3 border border-gray-300 text-center text-lg" colSpan={2}>{calculatePillarAvg(pillarIndex).toFixed(2)}</td>
                    </tr>
                </Fragment>
            ))}
           </tbody>
        </table>
      </div>
      <div className="mt-8 text-center">
        <button 
          onClick={handleViewResultsClick} 
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Xem Kết quả
        </button>
      </div>
    </div>
  );
}