// src/lib/reportUtils.ts
import { checklistData } from '@/data/checklistData';

// Tái sử dụng interface ResultsData để đảm bảo tính nhất quán
interface ResultsData {
  companyInfo: { [key: string]: string };
  scores: Record<string, number>;
  notes: Record<string, string>;
  pillarAvgs: number[];
  totalVipaScore: number;
  finalRank: string;
}

/**
 * Hàm này tập trung logic xử lý dữ liệu kết quả,
 * trả về một cấu trúc dữ liệu báo cáo có tổ chức.
 * @param results - Dữ liệu kết quả thô từ client.
 * @returns Một đối tượng chứa thông tin chung, điểm chi tiết và bảng tóm tắt.
 */
export function generateReportData(results: ResultsData) {
  const { companyInfo, scores, notes, pillarAvgs, totalVipaScore, finalRank } = results;

  // 1. Xử lý thông tin chung
  const generalInfo = {
    "Tên Doanh nghiệp": companyInfo.name || '',
    "Số điện thoại": companyInfo.phoneNumber || '',
    "Địa chỉ": companyInfo.address || '',
    "Người liên hệ": companyInfo.contactPerson || '',
    "Ngày đánh giá": companyInfo.assessmentDate || '',
    "Sản phẩm/dịch vụ chủ chốt": companyInfo.mainProduct || '',
    "Lĩnh vực ngành nghề": companyInfo.industry || ''
  };

  // 2. Xử lý điểm chi tiết
  const detailedScores = checklistData.flatMap(pillar => {
    return pillar.indicators.map(indicator => {
      const score = scores[indicator.id] || 0;
      const selectedOption = indicator.options.find(opt => opt.score === score);
      return {
        pillar: pillar.pillar,
        indicatorId: indicator.id,
        indicatorTitle: indicator.title,
        selectionText: selectedOption ? selectedOption.text : "Chưa trả lời",
        score: score,
        note: notes[indicator.id] || ''
      };
    });
  });

  // 3. Xử lý bảng tóm tắt
  const pillarNames = [
    "1. Quản lý Doanh nghiệp",
    "2. Quản lý Năng suất",
    "3. Hệ thống hạ tầng cho CĐS",
    "4. Sản xuất Thông minh"
  ];
  const weights: Record<number, number> = { 0: 0.25, 1: 0.25, 2: 0.25, 3: 0.25 };
  const summary = {
    pillarDetails: pillarAvgs.map((avg, index) => ({
      name: pillarNames[index],
      avg: avg.toFixed(2),
      weight: `${weights[index] * 100}%`,
      weightedScore: (avg * weights[index]).toFixed(2)
    })),
    totalVipaScore: totalVipaScore.toFixed(2),
    finalRank: finalRank
  };

  return { generalInfo, detailedScores, summary };
}
