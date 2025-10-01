/**
 * v0 by Vercel.
 * @see https://v0.dev/t/l1g8qYJ4Z4x
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import WeightingChart from "./WeightingChart"; // Import the new chart component

interface LandingPageProps {
  onStartClick: () => void;
}

export default function LandingPage({ onStartClick }: LandingPageProps) {
  return (
    <div className="container mx-auto p-4 sm:p-8 bg-white shadow-lg rounded-lg my-8">
      {/* ... existing code for header and pillars ... */}
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#004AAD]">Phương pháp luận ViPA</h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Công cụ đánh giá mức độ sẵn sàng, thúc đẩy chuyển đổi số và sản xuất thông minh cho doanh nghiệp Việt Nam.
        </p>
      </header>
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">4 Trụ cột Đánh giá Toàn diện</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200">
            <div className="text-5xl mb-4 text-[#004AAD]">🏢</div>
            <h3 className="text-xl font-bold mb-2">Quản lý Doanh nghiệp</h3>
            <p className="text-gray-600">
              Nền tảng về chiến lược, văn hóa, và năng lực con người, tạo tiền đề cho sự phát triển bền vững.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200">
            <div className="text-5xl mb-4 text-[#0076D1]">📈</div>
            <h3 className="text-xl font-bold mb-2">Quản lý Năng suất</h3>
            <p className="text-gray-600">
              Năng lực tối ưu hóa quy trình, áp dụng tiêu chuẩn và công cụ cải tiến để nâng cao hiệu quả vận hành.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200">
            <div className="text-5xl mb-4 text-[#00AEEF]">💻</div>
            <h3 className="text-xl font-bold mb-2">Hạ tầng cho CĐS</h3>
            <p className="text-gray-600">
              Nền tảng công nghệ thông tin và năng lực số hóa, điều kiện tiên quyết cho các sáng kiến công nghệ.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200">
            <div className="text-5xl mb-4 text-[#80D8F7]">🤖</div>
            <h3 className="text-xl font-bold mb-2">Sản xuất Thông minh</h3>
            <p className="text-gray-600">
              Mức độ ứng dụng công nghệ 4.0 để tự động hóa, kết nối và thông minh hóa hoạt động sản xuất.
            </p>
          </div>
        </div>
      </section>
      <section className="mb-20 bg-slate-50 rounded-xl shadow-lg p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-4">Mô hình Trọng số Đề xuất</h2>
            <p className="text-gray-600 mb-6">
              Để đảm bảo tính cân bằng và toàn diện, mô hình ViPA phân bổ trọng số đồng đều cho 4 trụ cột. Doanh
              nghiệp có thể tùy chỉnh các trọng số này trong tương lai để phù hợp với định hướng chiến lược riêng.
            </p>
            <div className="space-y-4 text-left">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-3 bg-[#004AAD]" />
                <span>
                  Quản lý Doanh nghiệp: <b>25%</b>
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-3 bg-[#0076D1]" />
                <span>
                  Quản lý Năng suất: <b>25%</b>
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-3 bg-[#00AEEF]" />
                <span>
                  Hệ thống hạ tầng cho CĐS: <b>25%</b>
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full mr-3 bg-[#80D8F7]" />
                <span>
                  Sản xuất Thông minh: <b>25%</b>
                </span>
              </div>
            </div>
          </div>
          <div className="relative mx-auto h-[300px] w-[300px]">
            {/* Replace the placeholder div with the actual chart component */}
            <WeightingChart />
          </div>
        </div>
      </section>
      {/* ... existing code for levels, button, and footer ... */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">5 Cấp độ Sẵn sàng của Doanh nghiệp</h2>
        <div className="relative max-w-4xl mx-auto border-l-4 border-blue-200">
          <div className="step-item relative pl-16 pb-12">
            <div className="absolute left-[-26px] top-0 flex items-center justify-center w-12 h-12 bg-white border-4 border-blue-200 rounded-full">
              <span className="text-xl font-bold text-blue-600">1</span>
            </div>
            <div className="ml-4">
              <h4 className="text-xl font-bold text-blue-800">Cấp 1: Khởi tạo (1.0 - 1.79)</h4>
              <p className="mt-2 text-gray-600">
                Hoạt động chủ yếu dựa trên kinh nghiệm, tự phát, thiếu quy trình chuẩn hóa. Năng lực cạnh tranh thấp.
              </p>
            </div>
          </div>
          <div className="step-item relative pl-16 pb-12">
            <div className="absolute left-[-26px] top-0 flex items-center justify-center w-12 h-12 bg-white border-4 border-blue-300 rounded-full">
              <span className="text-xl font-bold text-blue-600">2</span>
            </div>
            <div className="ml-4">
              <h4 className="text-xl font-bold text-blue-800">Cấp 2: Bắt đầu (1.8 - 2.59)</h4>
              <p className="mt-2 text-gray-600">
                Bắt đầu có những thử nghiệm cải tiến hoặc ứng dụng công nghệ nhưng còn rời rạc, thiếu chiến lược tổng
                thể.
              </p>
            </div>
          </div>
          <div className="step-item relative pl-16 pb-12">
            <div className="absolute left-[-26px] top-0 flex items-center justify-center w-12 h-12 bg-white border-4 border-blue-400 rounded-full">
              <span className="text-xl font-bold text-blue-600">3</span>
            </div>
            <div className="ml-4">
              <h4 className="text-xl font-bold text-blue-800">Cấp 3: Hình thành (2.6 - 3.39)</h4>
              <p className="mt-2 text-gray-600">
                Đã xây dựng được quy trình, hệ thống cơ bản nhưng việc áp dụng và tích hợp toàn diện còn là thách
                thức.
              </p>
            </div>
          </div>
          <div className="step-item relative pl-16 pb-12">
            <div className="absolute left-[-26px] top-0 flex items-center justify-center w-12 h-12 bg-white border-4 border-blue-500 rounded-full">
              <span className="text-xl font-bold text-blue-600">4</span>
            </div>
            <div className="ml-4">
              <h4 className="text-xl font-bold text-blue-800">Cấp 4: Nâng cao (3.4 - 4.19)</h4>
              <p className="mt-2 text-gray-600">
                Vận hành dựa trên quy trình chuẩn hóa, tích hợp và tối ưu bằng công nghệ. Ra quyết định dựa trên dữ
                liệu.
              </p>
            </div>
          </div>
          <div className="step-item relative pl-16">
            <div className="absolute left-[-26px] top-0 flex items-center justify-center w-12 h-12 bg-white border-4 border-blue-600 rounded-full">
              <span className="text-xl font-bold text-blue-600">5</span>
            </div>
            <div className="ml-4">
              <h4 className="text-xl font-bold text-blue-800">Cấp 5: Dẫn đầu (4.2 - 5.0)</h4>
              <p className="mt-2 text-gray-600">
                Đạt mức độ trưởng thành cao, lấy chuyển đổi số làm cốt lõi, có khả năng dẫn dắt và kiến tạo mô hình
                mới.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="text-center mt-16">
        <button 
          onClick={onStartClick}
          className="bg-blue-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-700 transition duration-300 text-xl shadow-lg"
        >
          Bắt đầu Đánh giá
        </button>
      </section>
      <footer className="text-center text-gray-500 pt-8 mt-16 border-t">
        <p>Phát triển bởi Viện Nghiên cứu Phát triển Tiêu chuẩn Chất lượng (ISSQ).</p>
        <p>© 2025 - Công cụ thuộc Chương trình Quốc gia 1322.</p>
      </footer>
    </div>
  )
}