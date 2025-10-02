// File: list-models.mjs
// Chạy bằng lệnh: node list-models.mjs
import 'dotenv/config'; // Import thư viện để đọc file .env.local

async function listModels() {
  // Tự động đọc API key từ file .env.local
  const apiKey = process.env.GEMINI_API_KEY; 

  if (!apiKey) {
    console.error('Lỗi: Không tìm thấy GEMINI_API_KEY trong file .env.local của bạn.');
    return;
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error.message);
    }
    const data = await response.json();

    console.log("=== CÁC MODEL CÓ SẴN HỖ TRỢ 'generateContent' ===");
    data.models.forEach((model) => {
      // Chỉ hiển thị các model hỗ trợ 'generateContent'
      if (model.supportedGenerationMethods.includes('generateContent')) {
        console.log(`- Tên Model: ${model.name}`);
        console.log(`  Mô tả: ${model.description}`);
        console.log('--------------------');
      }
    });

  } catch (error) {
    console.error('Đã xảy ra lỗi khi gọi API:', error);
  }
}

listModels();