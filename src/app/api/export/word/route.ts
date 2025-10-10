import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { marked } from 'marked';
import { generateReportData } from '@/lib/reportUtils';

// Định nghĩa kiểu dữ liệu cho ResultsData để tránh lỗi 'any'
interface ResultsData {
  companyInfo: { [key: string]: string };
  scores: Record<string, number>;
  notes: Record<string, string>;
  pillarAvgs: number[];
  totalVipaScore: number;
  finalRank: string;
}

interface ExportRequestBody {
  results: ResultsData;
  assessmentId: string;
  aiRecommendation: string | null;
}

export async function POST(request: Request) {
  try {
    const { results, assessmentId, aiRecommendation }: ExportRequestBody = await request.json();
    const reportData = generateReportData(results);

    let htmlContent = `<!DOCTYPE html><html><head><meta charset='utf-8'><title>Báo cáo ViPA</title></head><body>`;
    htmlContent += `<h1>BÁO CÁO ĐÁNH GIÁ MỨC ĐỘ SẴN SÀNG CHUYỂN ĐỔI SỐ (ViPA)</h1>`;
    
    htmlContent += `<h2>PHẦN A: THÔNG TIN CHUNG</h2>`;
    htmlContent += `<table border="1" cellpadding="5" style="border-collapse: collapse; width: 100%;"><tbody>`;
    Object.entries(reportData.generalInfo).forEach(([key, value]) => {
        htmlContent += `<tr><td style="width: 30%;"><b>${key}</b></td><td>${value}</td></tr>`;
    });
    htmlContent += `</tbody></table>`;
    
    htmlContent += `<h2>PHẦN B: BẢNG CHẤM ĐIỂM CHI TIẾT</h2>`;
    htmlContent += `<table border="1" cellpadding="5" style="border-collapse: collapse; width: 100%;">
        <thead><tr><th style="width: 25%;">Chỉ số</th><th style="width: 45%;">Mức độ lựa chọn</th><th style="width: 10%;">Điểm</th><th>Ghi chú</th></tr></thead><tbody>`;
    let currentPillar = "";
    reportData.detailedScores.forEach(item => {
        if (item.pillar !== currentPillar) {
            htmlContent += `<tr style="background-color: #f2f2f2;"><td colspan="4"><b>${item.pillar}</b></td></tr>`;
            currentPillar = item.pillar;
        }
        htmlContent += `<tr><td><b>${item.indicatorId}. ${item.indicatorTitle}</b></td><td>${item.selectionText}</td><td style="text-align:center;">${item.score}</td><td>${item.note}</td></tr>`;
    });
    htmlContent += `</tbody></table>`;

    htmlContent += `<h2>PHẦN C: BẢNG TỔNG HỢP KẾT QUẢ</h2>`;
    htmlContent += `<table border="1" cellpadding="5" style="border-collapse: collapse; width: 100%;">
        <thead><tr><th>Trụ cột</th><th>Điểm Trung bình</th><th>Trọng số (%)</th><th>Điểm theo Trọng số</th></tr></thead><tbody>`;
    reportData.summary.pillarDetails.forEach(detail => {
        htmlContent += `<tr><td>${detail.name}</td><td style="text-align:center;">${detail.avg}</td><td style="text-align:center;">${detail.weight}</td><td style="text-align:center;">${detail.weightedScore}</td></tr>`;
    });
    htmlContent += `<tr><td colspan='3' style='text-align:right;'><b>TỔNG ĐIỂM ViPA</b></td><td style="text-align:center;"><b>${reportData.summary.totalVipaScore}</b></td></tr>`;
    htmlContent += `<tr><td colspan='3' style='text-align:right;'><b>KẾT LUẬN MỨC ĐỘ SẴN SÀNG</b></td><td style="text-align:center;"><b>${reportData.summary.finalRank}</b></td></tr>`;
    htmlContent += `</tbody></table>`;
    
    if (aiRecommendation) {
      const aiHtml = await marked.parse(aiRecommendation);
      htmlContent += `<h2>PHẦN D: LỘ TRÌNH HÀNH ĐỘNG DO AI ĐỀ XUẤT</h2>`;
      htmlContent += `<div>${aiHtml}</div>`;
    }
    
    htmlContent += `</body></html>`;

    const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const filePath = `reports/${assessmentId}/report-${Date.now()}.doc`;
    const { error: uploadError } = await supabaseAdmin.storage.from('exports').upload(filePath, htmlContent, { contentType: 'application/msword;charset=utf-8', upsert: false });
    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabaseAdmin.storage.from('exports').getPublicUrl(filePath);
    if (!publicUrlData) throw new Error("Could not get public URL for Word");

    return NextResponse.json({ url: publicUrlData.publicUrl });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Lỗi khi xuất file Word:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}