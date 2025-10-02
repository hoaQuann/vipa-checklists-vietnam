import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { checklistData } from '@/data/checklistData';
// Import thư viện marked trên server
import { marked } from 'marked';

// ... (Interface ExportRequestBody không đổi)
interface ExportRequestBody {
  results: {
    companyInfo: { [key: string]: string };
    scores: Record<string, number>;
    notes: Record<string, string>;
    pillarAvgs: number[];
    totalVipaScore: number;
    finalRank: string;
  };
  assessmentId: string;
  aiRecommendation: string | null;
}

export async function POST(request: Request) {
  try {
    const { results, assessmentId, aiRecommendation }: ExportRequestBody = await request.json();

    // Toàn bộ logic tạo HTML cho các phần A, B, C không đổi
    let htmlContent = `<!DOCTYPE html><html><head><meta charset='utf-8'><title>Báo cáo ViPA</title></head><body>`;
    htmlContent += `<h1>BÁO CÁO ĐÁNH GIÁ MỨC ĐỘ SẴN SÀNG CHUYỂN ĐỔI SỐ (ViPA)</h1>`;
    htmlContent += `<h2>PHẦN A: THÔNG TIN CHUNG</h2>`;
    htmlContent += `<table border="1" cellpadding="5" style="border-collapse: collapse; width: 100%;"><tbody>
        <tr><td style="width: 30%;"><b>Tên Doanh nghiệp</b></td><td>${results.companyInfo.name || ''}</td></tr>
        <tr><td><b>Số điện thoại</b></td><td>${results.companyInfo.phoneNumber || ''}</td></tr>
        <tr><td><b>Địa chỉ</b></td><td>${results.companyInfo.address || ''}</td></tr>
        <tr><td><b>Người liên hệ</b></td><td>${results.companyInfo.contactPerson || ''}</td></tr>
        <tr><td><b>Ngày đánh giá</b></td><td>${results.companyInfo.assessmentDate || ''}</td></tr>
    </tbody></table>`;

    htmlContent += `<h2>PHẦN B: BẢNG TỔNG HỢP KẾT QUẢ</h2>`;
    htmlContent += `<table border="1" cellpadding="5" style="border-collapse: collapse; width: 100%;">
        <thead><tr><th>Trụ cột</th><th>Điểm Trung bình</th><th>Trọng số (%)</th><th>Điểm theo Trọng số</th></tr></thead><tbody>`;
    results.pillarAvgs.forEach((avg: number, index: number) => {
        const pillarName = checklistData[index]?.pillar.replace(/TRỤ CỘT \d+: /i, '') || `Trụ cột ${index + 1}`;
        htmlContent += `<tr><td>${index + 1}. ${pillarName}</td><td style="text-align:center;">${avg.toFixed(2)}</td><td style="text-align:center;">25%</td><td style="text-align:center;">${(avg * 0.25).toFixed(2)}</td></tr>`;
    });
    htmlContent += `<tr><td colspan='3' style='text-align:right;'><b>TỔNG ĐIỂM ViPA</b></td><td style="text-align:center;"><b>${results.totalVipaScore.toFixed(2)}</b></td></tr>`;
    htmlContent += `<tr><td colspan='3' style='text-align:right;'><b>KẾT LUẬN MỨC ĐỘ SẴN SÀNG</b></td><td style="text-align:center;"><b>${results.finalRank}</b></td></tr>`;
    htmlContent += `</tbody></table>`;
    
    htmlContent += `<h2>PHẦN C: BẢNG CHẤM ĐIỂM CHI TIẾT</h2>`;
    htmlContent += `<table border="1" cellpadding="5" style="border-collapse: collapse; width: 100%;"><thead><tr><th style="width: 25%;">Chỉ số</th><th style="width: 45%;">Mức độ lựa chọn</th><th style="width: 10%;">Điểm</th><th>Ghi chú</th></tr></thead><tbody>`;
    checklistData.forEach(pillar => {
        htmlContent += `<tr style="background-color: #f2f2f2;"><td colspan="4"><b>${pillar.pillar}</b></td></tr>`;
        pillar.indicators.forEach(indicator => {
            const score = results.scores[indicator.id] || 0;
            const selectedOption = indicator.options.find(opt => opt.score === score);
            htmlContent += `<tr><td><b>${indicator.id}. ${indicator.title}</b></td><td>${selectedOption ? selectedOption.text : 'Chưa chọn'}</td><td style="text-align:center;">${score}</td><td>${results.notes[indicator.id] || ''}</td></tr>`;
        });
    });
    htmlContent += `</tbody></table>`;
    
    // THAY ĐỔI QUAN TRỌNG: Sử dụng `marked` để chuyển đổi Markdown sang HTML
    if (aiRecommendation) {
      htmlContent += `<h2>PHẦN D: LỘ TRÌNH HÀNH ĐỘNG DO AI ĐỀ XUẤT</h2>`;
      // Chuyển đổi Markdown sang HTML trước khi thêm vào
      const aiHtml = marked.parse(aiRecommendation);
      htmlContent += `<div>${aiHtml}</div>`;
    }
    
    htmlContent += `</body></html>`;

    // Logic upload lên Supabase không đổi
    const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const filePath = `reports/${assessmentId}/report-${Date.now()}.doc`;
    const { error: uploadError } = await supabaseAdmin.storage.from('exports').upload(filePath, htmlContent, { contentType: 'application/msword;charset=utf-8', upsert: false });
    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabaseAdmin.storage.from('exports').getPublicUrl(filePath);
    if (!publicUrlData) throw new Error("Could not get public URL for Word");

    return NextResponse.json({ url: publicUrlData.publicUrl });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Lỗi API xuất Word:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}