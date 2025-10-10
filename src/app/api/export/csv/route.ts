import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Papa from 'papaparse';
// Import hàm tiện ích vừa tạo
import { generateReportData } from '@/lib/reportUtils';

// Interface cho request body không đổi
interface ExportRequestBody {
  results: any; 
  assessmentId: string;
  aiRecommendation: string | null;
}

export async function POST(request: Request) {
  try {
    const { results, assessmentId, aiRecommendation }: ExportRequestBody = await request.json();

    // === TÁI CẤU TRÚC ===
    // Gọi hàm tiện ích để lấy dữ liệu đã được xử lý
    const reportData = generateReportData(results);
    // === KẾT THÚC TÁI CẤU TRÚC ===

    // Xây dựng nội dung CSV từ dữ liệu đã có cấu trúc
    const generalInfoCsv = Object.entries(reportData.generalInfo).map(([key, value]) => [key, value]);
    
    const detailedScoresCsv = [["Trụ cột", "Chỉ số", "Mức độ lựa chọn", "Điểm", "Ghi chú"]];
    let currentPillar = "";
    reportData.detailedScores.forEach(item => {
        // Thêm dòng tiêu đề cho trụ cột mới
        if(item.pillar !== currentPillar) {
            detailedScoresCsv.push([item.pillar]);
            currentPillar = item.pillar;
        }
        detailedScoresCsv.push([
            "", // Để trống cột trụ cột cho các dòng chỉ số
            `${item.indicatorId}. ${item.indicatorTitle}`,
            item.selectionText,
            item.score.toString(),
            item.note
        ]);
    });

    const summaryCsv = [[""], ["BẢNG TỔNG HỢP"]];
    summaryCsv.push(["Trụ cột", "Điểm Trung bình", "Trọng số (%)", "Điểm theo Trọng số"]);
    reportData.summary.pillarDetails.forEach(detail => {
        summaryCsv.push([detail.name, detail.avg, detail.weight, detail.weightedScore]);
    });
    summaryCsv.push(["", "", "TỔNG ĐIỂM ViPA", reportData.summary.totalVipaScore]);
    summaryCsv.push(["", "", "KẾT LUẬN", reportData.summary.finalRank]);
    
    let finalCsvData: (string | number)[][] = [
        ...generalInfoCsv,
        [], // Dòng trống
        ...detailedScoresCsv,
        [], // Dòng trống
        ...summaryCsv
    ];

    if (aiRecommendation) {
        finalCsvData.push([]);
        finalCsvData.push(["LỘ TRÌNH ĐỀ XUẤT TỪ AI"]);
        finalCsvData.push([aiRecommendation]); 
    }

    const csvString = Papa.unparse(finalCsvData);

    // Logic upload lên Supabase không thay đổi
    const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const filePath = `reports/${assessmentId}/report-${Date.now()}.csv`;
    const { error: uploadError } = await supabaseAdmin.storage.from('exports').upload(filePath, csvString, { contentType: 'text/csv;charset=utf-8', upsert: false });
    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabaseAdmin.storage.from('exports').getPublicUrl(filePath);
    if (!publicUrlData) throw new Error("Could not get public URL for CSV");

    return NextResponse.json({ url: publicUrlData.publicUrl });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Lỗi khi xuất file CSV:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
