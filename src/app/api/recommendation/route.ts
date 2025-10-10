import { NextResponse } from 'next/server';

interface RequestBody {
  results: {
    companyInfo: { [key: string]: string };
    pillarAvgs: number[];
    totalVipaScore: number;
    finalRank: string;
  };
}

export async function POST(request: Request) {
  try {
    const { results }: RequestBody = await request.json();

    // --- PROMPT NÂNG CẤP ---
    const newPrompt = `
      **BỐI CẢNH:**
      Bạn là một chuyên gia tư vấn chiến lược chuyển đổi số và năng suất chất lượng hàng đầu tại Việt Nam, có khả năng truy cập và phân tích dữ liệu kinh tế vĩ mô và ngành để đưa ra những đề xuất mang tính thời sự và có chiều sâu.

      **THÔNG TIN DOANH NGHIỆP:**
      - Tên Doanh nghiệp: "${results.companyInfo.name || 'Một doanh nghiệp'}"
      - Tỉnh/Thành phố: ${results.companyInfo.city || '[Chưa nhập]'}
      - Lĩnh vực kinh doanh: ${results.companyInfo.industry || '[Chưa nhập]'}
      - Sản phẩm/dịch vụ chủ chốt: ${results.companyInfo.mainProduct || '[Chưa nhập]'}

      **KẾT QUẢ ĐÁNH GIÁ VIPA:**
      - Tổng điểm ViPA: ${results.totalVipaScore.toFixed(2)} - Mức độ: ${results.finalRank}
      - Điểm trung bình các trụ cột (thang điểm 5):
        - Quản lý Doanh nghiệp: ${results.pillarAvgs[0].toFixed(2)}
        - Quản lý Năng suất: ${results.pillarAvgs[1].toFixed(2)}
        - Hệ thống hạ tầng cho CĐS: ${results.pillarAvgs[2].toFixed(2)}
        - Sản xuất Thông minh: ${results.pillarAvgs[3].toFixed(2)}

      **YÊU CẦU TƯ VẤN (SỬ DỤNG TÌM KIẾM THÔNG TIN MỚI NHẤT):**
      Dựa vào toàn bộ thông tin trên, hãy xây dựng một báo cáo tư vấn chiến lược chi tiết, bao gồm 4 phần sau:

      1.  **Phân tích Bối cảnh Ngành & Địa phương:**
          * Phân tích ngắn gọn xu hướng chuyển đổi số và lộ trình phát triển chung của ngành "${results.companyInfo.industry || 'sản xuất kinh doanh'}" tại Việt Nam hiện nay.
          * Nêu một vài đặc điểm kinh tế nổi bật hoặc định hướng phát triển của tỉnh/thành phố "${results.companyInfo.city || 'Việt Nam nói chung'}".

      2.  **Định vị Doanh nghiệp (Benchmarking):**
          * Dựa trên kết quả phân tích bối cảnh và điểm ViPA, hãy đưa ra nhận định sơ bộ về vị thế của doanh nghiệp này so với mặt bằng chung của ngành và các doanh nghiệp khác trong cùng tỉnh.

      3.  **Tư vấn Hệ thống Quản lý (ISO):**
          * Dựa vào ngành nghề và sản phẩm/dịch vụ là "${results.companyInfo.mainProduct || results.companyInfo.industry || 'sản xuất'}", hãy gợi ý 2-3 hệ thống quản lý theo tiêu chuẩn quốc tế (ví dụ: ISO 9001, ISO 14001, ISO 22000, ISO 27001) phù hợp nhất mà doanh nghiệp nên xem xét áp dụng. Giải thích ngắn gọn lợi ích chính của từng hệ thống đối với doanh nghiệp.

      4.  **Lộ trình Hành động Chiến lược:**
          * Từ các phân tích trên, xây dựng một lộ trình 3 bước cụ thể và khả thi để doanh nghiệp bắt kịp xu hướng của ngành và cải thiện điểm số ViPA. Ưu tiên các giải pháp nền tảng, có tác động lớn trước. Với mỗi bước, giải thích rõ 'Tại sao' (lợi ích chiến lược) và 'Làm thế nào' (gợi ý công nghệ/giải pháp cụ thể cần triển khai).

      **ĐỊNH DẠNG:** Vui lòng trình bày báo cáo bằng tiếng Việt, sử dụng định dạng Markdown chuyên nghiệp, có tiêu đề rõ ràng cho từng phần.
    `;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY chưa được cấu hình trên server.");
    }

    const googleApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    // --- CẬP NHẬT PAYLOAD: THÊM TÍNH NĂNG TÌM KIẾM ---
    const payload = {
      contents: [{ parts: [{ "text": newPrompt }] }],
      tools: [{ "google_search": {} }] // Kích hoạt tính năng tìm kiếm
    };

    const response = await fetch(googleApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
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
    
    return NextResponse.json({ recommendation: aiText });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định";
    console.error("Lỗi API gọi AI:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}