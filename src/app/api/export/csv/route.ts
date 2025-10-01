import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Papa from 'papaparse';
import { checklistData } from '@/data/checklistData';

// Hàm này sẽ chạy trên server
export async function POST(request: Request) {
  try {
    const { results, assessmentId, aiRecommendation } = await request.json();

    // 1. Tạo nội dung CSV chi tiết
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
    
    let finalCsvData: (string | number)[][] = [...generalInfo, [], ...detailedScores, ...summary];

    if (aiRecommendation) {
        finalCsvData.push([]);
        finalCsvData.push(["LỘ TRÌNH ĐỀ XUẤT TỪ AI"]);
        finalCsvData.push([aiRecommendation]);
    }

    const csvString = Papa.unparse(finalCsvData);

    // 2. Kết nối và upload lên Supabase
    const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    const filePath = `reports/${assessmentId}/report-${Date.now()}.csv`;
    const { error: uploadError } = await supabaseAdmin.storage.from('exports').upload(filePath, csvString, { contentType: 'text/csv;charset=utf-8', upsert: false });
    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabaseAdmin.storage.from('exports').getPublicUrl(filePath);
    if (!publicUrlData) throw new Error("Could not get public URL for CSV");

    return NextResponse.json({ url: publicUrlData.publicUrl });
  } catch (error: any) {
    console.error("Lỗi API xuất CSV:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

