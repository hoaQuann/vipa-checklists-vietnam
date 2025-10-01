import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Papa from 'papaparse';
import { checklistData } from '@/data/checklistData';

// Định nghĩa kiểu dữ liệu cho request body
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

    const generalInfo = [
        ["Tên Doanh nghiệp:", results.companyInfo.name],
        ["Số điện thoại:", results.companyInfo.phoneNumber],
        ["Địa chỉ:", results.companyInfo.address],
        ["Người liên hệ:", results.companyInfo.contactPerson],
        ["Ngày đánh giá:", results.companyInfo.assessmentDate],
    ];

    const detailedScores = [["Chỉ số", "Mức độ lựa chọn", "Điểm", "Ghi chú"]];
    checklistData.forEach(pillar => {
        detailedScores.push([pillar.pillar]);
        pillar.indicators.forEach(indicator => {
            const score = results.scores[indicator.id] || 0;
            const selectedOption = indicator.options.find(opt => opt.score === score);
            detailedScores.push([
                `${indicator.id}. ${indicator.title}`,
                selectedOption ? selectedOption.text : "Chưa chọn",
                score.toString(),
                results.notes[indicator.id] || ""
            ]);
        });
    });

    const summary = [[],["BẢNG TỔNG HỢP KẾT QUẢ"],["Trụ cột", "Điểm Trung bình", "Trọng số (%)", "Điểm theo Trọng số"]];
    results.pillarAvgs.forEach((avg: number, index: number) => {
        const pillarName = checklistData[index]?.pillar.replace(/TRỤ CỘT \d+: /i, '') || `Trụ cột ${index + 1}`;
        summary.push([`${index + 1}. ${pillarName}`, avg.toFixed(2), "25%", (avg * 0.25).toFixed(2)]);
    });
    summary.push(["", "", "TỔNG ĐIỂM ViPA", results.totalVipaScore.toFixed(2)]);
    summary.push(["", "", "KẾT LUẬN", results.finalRank]);
    
    // Sửa lỗi: Sử dụng const vì không gán lại
    const finalCsvData: (string | number)[][] = [...generalInfo, [], ...detailedScores, ...summary];

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
    // Sửa lỗi: Cung cấp kiểu cho error
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Lỗi API xuất CSV:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}