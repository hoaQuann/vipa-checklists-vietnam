import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Papa from 'papaparse';
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
  results: ResultsData; // Sử dụng kiểu dữ liệu đã định nghĩa
  assessmentId: string;
  aiRecommendation: string | null;
}

export async function POST(request: Request) {
  try {
    const { results, assessmentId, aiRecommendation }: ExportRequestBody = await request.json();
    const reportData = generateReportData(results);

    const generalInfoCsv = Object.entries(reportData.generalInfo).map(([key, value]) => [key, value]);
    
    const detailedScoresCsv = [["Trụ cột", "Chỉ số", "Mức độ lựa chọn", "Điểm", "Ghi chú"]];
    let currentPillar = "";
    reportData.detailedScores.forEach(item => {
        if(item.pillar !== currentPillar) {
            detailedScoresCsv.push([item.pillar]);
            currentPillar = item.pillar;
        }
        detailedScoresCsv.push([
            "",
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
    
    // Sửa lỗi: Chuyển 'let' thành 'const'
    const finalCsvData: (string | number)[][] = [
        ...generalInfoCsv,
        [],
        ...detailedScoresCsv,
        [],
        ...summaryCsv
    ];

    if (aiRecommendation) {
        finalCsvData.push([]);
        finalCsvData.push(["LỘ TRÌNH ĐỀ XUẤT TỪ AI"]);
        finalCsvData.push([aiRecommendation]); 
    }

    const csvString = Papa.unparse(finalCsvData);

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