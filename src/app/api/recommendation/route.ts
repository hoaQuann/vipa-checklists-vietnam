import { NextResponse } from 'next/server';

// Định nghĩa kiểu dữ liệu cho request body từ client
interface RequestBody {
  results: {
    companyInfo: { [key: string]: string };
    pillarAvgs: number[];
    totalVipaScore: number;
    finalRank: string;
  };
}

// Hàm này sẽ chạy an toàn trên server
export async function POST(request: Request) {
  try {
    const { results }: RequestBody = await request.json();

    // 1. Xây dựng một prompt chi tiết và chuyên nghiệp
    const prompt = `
      Bạn là một chuyên gia tư vấn chiến lược chuyển đổi số, chuyên gia năng suất chất lượng cao hàng đầu tại Việt Nam. 
      Một doanh nghiệp có thông tin như sau vừa hoàn thành bài đánh giá ViPA:
      - Tên Doanh nghiệp: "${results.companyInfo.name || 'Một doanh nghiệp'}"
      - Lĩnh vực kinh doanh: ${results.companyInfo.industry || '[Chưa nhập]'}
      - Sản phẩm/dịch vụ chủ chốt: ${results.companyInfo.mainProduct || '[Chưa nhập]'}

      Kết quả đánh giá ViPA của họ:
      - Tổng điểm ViPA: ${results.totalVipaScore.toFixed(2)} - Mức độ: ${results.finalRank}
      - Điểm trung bình các trụ cột (thang điểm 5):
        - Quản lý Doanh nghiệp: ${results.pillarAvgs[0].toFixed(2)}
        - Quản lý Năng suất: ${results.pillarAvgs[1].toFixed(2)}
        - Hệ thống hạ tầng cho CĐS: ${results.pillarAvgs[2].toFixed(2)}
        - Sản xuất Thông minh: ${results.pillarAvgs[3].toFixed(2)}
      
      DỰA VÀO CÁC THÔNG TIN TRÊN, HÃY CUNG CẤP MỘT BÁO CÁO TƯ VẤN CHI TIẾT:
      
      1.  **Phân tích SWOT:** Dựa trên kết quả điểm ViPA, hãy xây dựng một phân tích SWOT (Điểm mạnh, Điểm yếu, Cơ hội, Thách thức) cho doanh nghiệp này trong bối cảnh chuyển đổi số.
      
      2.  **Lộ trình Hành động Chiến lược:** Đề xuất một lộ trình 3 bước cụ thể, ưu tiên các giải pháp nền tảng trước, phù hợp với lĩnh vực kinh doanh của họ. Với mỗi bước, giải thích rõ 'Tại sao' (lợi ích) và 'Làm thế nào' (gợi ý triển khai).
      
      Vui lòng trình bày câu trả lời bằng tiếng Việt, sử dụng định dạng Markdown chuyên nghiệp, rõ ràng (tiêu đề, in đậm, danh sách).`;

    // 2. Lấy API key an toàn từ biến môi trường của server
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY chưa được cấu hình trên server.");
    }

    const googleApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    // 3. Gọi đến Gemini API từ server
    const response = await fetch(googleApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ "text": prompt }] }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `Lỗi HTTP: ${response.status}`);
    }

    const data = await response.json();
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiText) {
      throw new Error("Không nhận được phản hồi hợp lệ từ AI.");
    }
    
    // 4. Trả kết quả về cho client
    return NextResponse.json({ recommendation: aiText });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định";
    console.error("Lỗi API gọi AI:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
