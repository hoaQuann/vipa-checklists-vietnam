// Đây là nơi tập trung toàn bộ dữ liệu câu hỏi.
// Việc tách riêng file này giúp mã nguồn sạch sẽ, dễ bảo trì và cập nhật.

export const checklistData = [
    {
      id: 1, // Thêm ID để định danh
      pillar: "TRỤ CỘT 1: QUẢN LÝ DOANH NGHIỆP",
      detailedDescription: `
        <p class="mb-4">Trụ cột Quản lý Doanh nghiệp là nền tảng cốt lõi, quyết định sự thành bại của quá trình chuyển đổi số. Nó không chỉ đơn thuần là việc quản lý các hoạt động hàng ngày, mà còn bao gồm việc xây dựng một tầm nhìn chiến lược, một văn hóa tổ chức sẵn sàng cho sự thay đổi, và phát triển nguồn nhân lực có đủ năng lực để thực thi chiến lược đó.</p>
        <h3 class="text-lg font-semibold mb-2">Các yếu tố chính bao gồm:</h3>
        <ul class="list-disc list-inside space-y-2">
            <li><strong>Sự lãnh đạo & Tầm nhìn chiến lược:</strong> Ban lãnh đạo phải có một tầm nhìn rõ ràng về chuyển đổi số, không chỉ là một dự án công nghệ mà là một sự chuyển đổi toàn diện về mô hình kinh doanh.</li>
            <li><strong>Định hướng Khách hàng:</strong> Lấy khách hàng làm trung tâm, sử dụng công nghệ để thấu hiểu và cải thiện trải nghiệm của họ trên mọi điểm chạm.</li>
            <li><strong>Phát triển Nguồn nhân lực:</strong> Đầu tư vào đào tạo, nâng cao kỹ năng số cho nhân viên và xây dựng chính sách thu hút, giữ chân nhân tài.</li>
            <li><strong>Văn hóa Đổi mới:</strong> Khuyến khích sự sáng tạo, chấp nhận thử nghiệm và thất bại, và có một hệ thống để quản lý tri thức và tài sản trí tuệ.</li>
        </ul>
        <p class="mt-4">Một doanh nghiệp có nền tảng quản trị vững chắc sẽ dễ dàng tiếp nhận và triển khai thành công các công nghệ mới, trong khi một doanh nghiệp yếu về quản trị sẽ gặp rất nhiều khó khăn dù có đầu tư bao nhiêu vào công nghệ.</p>
      `,
      indicators: [
        {
          id: "1.1",
          title: "Sự lãnh đạo",
          description: "(Tầm nhìn, sứ mệnh; Chính sách/Mục tiêu; Kế hoạch/Chiến lược; Trách nhiệm xã hội)",
          options: [
            { score: 1, text: "Chưa có bất kỳ nội dung nào" },
            { score: 2, text: "Có tầm nhìn, sứ mạng nhưng chưa cụ thể hóa bằng chiến lược/chính sách/mục tiêu" },
            { score: 3, text: "Có chiến lược/chính sách/mục tiêu đã triển khai nhưng chưa được đánh giá định kỳ" },
            { score: 4, text: "Chiến lược/chính sách/mục tiêu được triển khai toàn diện và có đánh giá, điều chỉnh định kỳ" },
            { score: 5, text: "Có đầy đủ các nội dung và được triển khai hiệu quả trong điều hành doanh nghiệp" },
          ],
        },
        {
          id: "1.2",
          title: "Định hướng khách hàng",
          description: "(Đáp ứng thị trường; Thỏa mãn khách hàng; Năng lực cạnh tranh)",
          options: [
              { score: 1, text: "Chưa triển khai hoạt động nào" },
              { score: 2, text: "Cố gắng thỏa mãn khách hàng nhưng chưa có biện pháp bài bản" },
              { score: 3, text: "Có bộ phận Sales chịu trách nhiệm nhưng sự phối hợp giữa các bộ phận còn yếu" },
              { score: 4, text: "Có bộ phận chuyên trách nghiên cứu thị trường/khảo sát sự thỏa mãn của khách hàng" },
              { score: 5, text: "Có chiến lược nâng cao năng lực cạnh tranh và sự phối hợp nhịp nhàng giữa các bộ phận" },
          ],
        },
        {
          id: "1.3",
          title: "Phát triển nguồn nhân lực",
          description: "(Đào tạo; Môi trường làm việc; Chế độ chính sách; Thu hút và giữ chân nhân tài)",
          options: [
              { score: 1, text: "Rất ít hoạt động đào tạo, chưa có chính sách phát triển nhân viên" },
              { score: 2, text: "Đảm bảo môi trường làm việc ở mức tối thiểu, chưa có chính sách giữ chân nhân tài" },
              { score: 3, text: "Có các hệ thống phát triển nguồn nhân lực nhưng triển khai chưa hiệu quả" },
              { score: 4, text: "Các chính sách nhân sự được thực thi tốt nhưng chưa có chiến lược rõ ràng cho nhân tài" },
              { score: 5, text: "Có hệ thống/chiến lược rõ ràng để giữ chân người tài và thu hút nhân tài mới" },
          ],
        },
        {
          id: "1.4",
          title: "Văn hóa đổi mới và cải tiến",
          description: "(Dự án đổi mới; Cải tiến liên tục; Quản lý tri thức; Sở hữu trí tuệ)",
          options: [
              { score: 1, text: "Không có dự án cải tiến/đổi mới trong 2 năm gần đây, không có hệ thống quản lý tri thức" },
              { score: 2, text: "Mỗi năm có một số dự án đổi mới sản phẩm và quy trình nhỏ lẻ" },
              { score: 3, text: "Có bộ phận R&D thường xuyên nghiên cứu sản phẩm và đổi mới quy trình" },
              { score: 4, text: "Có chính sách khuyến khích nhân viên đổi mới, quản lý và chia sẻ tri thức hiệu quả" },
              { score: 5, text: "Đổi mới sáng tạo và cải tiến liên tục trở thành văn hóa của DN, có chiến lược SHTT" },
          ],
        },
      ],
    },
    {
      id: 2,
      pillar: "TRỤ CỘT 2: QUẢN LÝ NĂNG SUẤT",
      detailedDescription: `
        <p class="mb-4">Quản lý Năng suất là "cỗ máy vận hành" của doanh nghiệp. Trước khi áp dụng các công nghệ 4.0 phức tạp, việc tối ưu hóa, chuẩn hóa và số hóa các quy trình hiện tại là bước đi tiên quyết. Trụ cột này đánh giá năng lực của doanh nghiệp trong việc liên tục cải tiến để hoạt động hiệu quả hơn, giảm lãng phí và nâng cao chất lượng sản phẩm/dịch vụ.</p>
        <h3 class="text-lg font-semibold mb-2">Các yếu tố chính bao gồm:</h3>
        <ul class="list-disc list-inside space-y-2">
            <li><strong>Áp dụng Tiêu chuẩn & Công cụ:</strong> Mức độ áp dụng các hệ thống quản lý chất lượng (như ISO 9001) và các công cụ cải tiến năng suất (như 5S, Kaizen, Lean, Six Sigma).</li>
            <li><strong>Kiểm soát Quá trình:</strong> Năng lực giám sát, đo lường và kiểm soát các quy trình sản xuất, kinh doanh để đảm bảo sự ổn định và chất lượng đầu ra.</li>
            <li><strong>Quản lý Hiệu suất:</strong> Việc thiết lập các chỉ số đo lường hiệu suất (KPIs), theo dõi hiệu suất thiết bị (OEE) và hiệu suất lao động để ra quyết định dựa trên dữ liệu.</li>
        </ul>
        <p class="mt-4">Một hệ thống quản lý năng suất hiệu quả sẽ tạo ra một nền tảng dữ liệu vận hành tin cậy, là đầu vào quý giá cho các hệ thống sản xuất thông minh và phân tích dữ liệu lớn sau này.</p>
      `,
      indicators: [
          {
              id: "2.1",
              title: "Tiêu chuẩn/ Công cụ quản lý",
              description: "(Áp dụng HTQL; Áp dụng công cụ NS; Áp dụng công cụ nâng cao)",
              options: [
                  { score: 1, text: "Chưa áp dụng bất kỳ tiêu chuẩn/ công cụ quản lý nào." },
                  { score: 2, text: "Áp dụng ISO 9000 chưa duy trì được" },
                  { score: 3, text: "Đã được cấp chứng chỉ và duy trì nhưng chưa hiệu quả." },
                  { score: 4, text: "Đã áp dụng 1-2 HTQL theo tiêu chuẩn và một vài công cụ cải tiến năng suất/ Đã tích hợp các hệ thống và công cụ quản lý" },
                  { score: 5, text: "Áp dụng Lean/ Lean Six Sigma để cải tiến liên tục Hệ thống quản lý và nâng cao hiệu quả hoạt động của DN." },
              ],
          },
          {
              id: "2.2",
              title: "Mức độ áp dụng",
              description: "(Áp dụng HTQL; Áp dụng công cụ NS; Áp dụng công cụ nâng cao)",
              options: [
                  { score: 1, text: "Chưa áp dụng" },
                  { score: 2, text: "Đang áp dụng, chưa được đánh giá chứng nhận" },
                  { score: 3, text: "Đã được chứng nhận, duy trì" },
                  { score: 4, text: "Áp dụng hiệu quả, có một số cải tiến" },
                  { score: 5, text: "Áp dụng hiệu quả, thường xuyên cải tiến" },
              ],
          },
          {
              id: "2.3",
              title: "Kiểm soát quá trình",
              description: "(Đảm bảo chất lượng; Điều hành SXKD; Trao đổi thông tin)",
              options: [
                  { score: 1, text: "Các bộ phận thực hiện theo chức năng/ chưa chú trọng vào kiểm soát quá trình" },
                  { score: 2, text: "Có hệ thống đảm bảo chất lượng, trách nhiệm chính được phân công cho bộ phận QA, QC" },
                  { score: 3, text: "Có hệ thống quản lý quá trình bằng văn bản/ các điểm kiểm soát được xác định và quản lý/ lưu trữ đầy đủ hồ sơ" },
                  { score: 4, text: "Quản lý theo cách tiếp cận quá trình/ chất lượng sản phẩm được đảm bảo" },
                  { score: 5, text: "Thường xuyên cải tiến/ các bộ phận phối hợp tốt để kiểm soát sự thay đổi/ sử dụng công nghệ thông tin (phần mền, sensor,...) để kiểm soát quá trình" },
              ],
          },
          {
              id: "2.4",
              title: "Quản lý hiệu suất",
              description: "(Sử dụng thiết bị đo; Đo lường hiệu suất SX; Đo lường hiệu suất DN)",
              options: [
                  { score: 1, text: "Thực hiện việc đo lường hiệu suất thủ công, phụ thuộc vào con người" },
                  { score: 2, text: "Trang bị một số cảm biến, phần mền để đo lường hiệu suất thiết bị/ sản lượng ..." },
                  { score: 3, text: "Quản lý hiệu suất thiết bị (OEE, OPE...), hiệu sản xuất (sản lượng/ thiết bị, sản lượng/ người (giờ công) ... lưu trữ đầy đủ hồ sơ, dữ liệu" },
                  { score: 4, text: "Sử dụng các phần mền chuyên dụng để quản lý sản xuất" },
                  { score: 5, text: "Hằng năm đều tính toán, phân tích các chỉ tiêu hiệu suất hoạt động của DN làm cơ sở cho việc phân tích và định hướng chiến lược" },
              ],
          },
      ]
    },
    {
      id: 3,
      pillar: "TRỤ CỘT 3: HỆ THỐNG HẠ TẦNG CHO CHUYỂN ĐỔI SỐ",
      detailedDescription: `
        <p class="mb-4">Đây là "xương sống" công nghệ của doanh nghiệp trong kỷ nguyên số. Hạ tầng cho chuyển đổi số không chỉ là máy tính và mạng internet, mà còn bao gồm các hệ thống phần mềm, nền tảng dữ liệu và năng lực của đội ngũ IT để hỗ trợ và triển khai các sáng kiến số.</p>
        <h3 class="text-lg font-semibold mb-2">Các yếu tố chính bao gồm:</h3>
        <ul class="list-disc list-inside space-y-2">
            <li><strong>Nền tảng Cơ sở vật chất:</strong> Chất lượng của hệ thống máy tính, mạng nội bộ, kết nối internet và năng lực của đội ngũ IT.</li>
            <li><strong>Chiến lược Chuyển đổi số:</strong> Sự tồn tại của một lộ trình, kế hoạch và ngân sách rõ ràng cho việc triển khai các dự án chuyển đổi số.</li>
            <li><strong>Ứng dụng Phần mềm:</strong> Mức độ sử dụng các phần mềm chuyên dụng (như ERP, CRM, MES) để số hóa và quản lý các hoạt động cốt lõi của doanh nghiệp.</li>
            <li><strong>Quản lý Dữ liệu:</strong> Năng lực thu thập, lưu trữ, bảo mật và khai thác dữ liệu từ các hoạt động sản xuất kinh doanh.</li>
        </ul>
        <p class="mt-4">Một hạ tầng số vững chắc không chỉ giúp doanh nghiệp vận hành hiệu quả hơn mà còn tạo ra lợi thế cạnh tranh, cho phép doanh nghiệp nhanh chóng thích ứng và triển khai các mô hình kinh doanh mới.</p>
      `,
      indicators: [
          {
              id: "3.1",
              title: "Nền tảng cơ sở vật chất",
              description: "(Máy tính, mạng; Nguồn nhân lực IT; Đầu tư CNTT)",
              options: [
                  { score: 1, text: "Chưa quan tâm đến việc sử dụng máy tính và ứng dụng CNTT" },
                  { score: 2, text: "Có hệ thống máy tính nhưng hệ thống mạng yếu, chưa có cán bộ chuyên trách IT" },
                  { score: 3, text: "Sử dụng mạng và máy tính thường xuyên nhưng chưa có điều kiện đầu tư nhân sự IT và mạng tốc độ cao" },
                  { score: 4, text: "Hệ thống máy tính, mạng đáp ứng công việc, chưa có kế hoạch đầu tư nguồn lực" },
                  { score: 5, text: "Có kế hoạch hằng năm cho đầu tư CNTT, có Phòng/Ban chuyên trách về CNTT" },
              ],
          },
          {
              id: "3.2",
              title: "Chiến lược Chuyển đổi số",
              description: "(Nhận thức của Lãnh đạo; Hoạch định nguồn lực; Kế hoạch triển khai)",
              options: [
                  { score: 1, text: "Đã tìm hiểu và mong muốn hoặc đã tham gia các chương trình đào tạo, hội thảo về CĐS" },
                  { score: 2, text: "Đã xem xét, đánh giá các quy trình có khả năng ứng dụng hoặc đã ứng dụng một phần tự động hóa" },
                  { score: 3, text: "Đã xây dựng định hướng chiến lược cho việc triển khai thực hiện các dự án CĐS" },
                  { score: 4, text: "Đã hoạch định và chuẩn bị nguồn lực (tài chính, nhân sự...) cho các dự án CĐS" },
                  { score: 5, text: "Đã và đang thực hiện các dự án CĐS một cách bài bản" },
              ],
          },
          {
              id: "3.3",
              title: "Ứng dụng phần mềm quản lý",
              description: "(Quản lý công việc, phần mềm quản lý chuyên dụng, kết nối chuỗi cung ứng)",
              options: [
                  { score: 1, text: "Sử dụng các công cụ văn phòng cơ bản (Word, Excel), chưa có phần mềm chuyên dụng" },
                  { score: 2, text: "Có ứng dụng công cụ chat, mạng xã hội hoặc có định hướng phát triển phần mềm" },
                  { score: 3, text: "Đã có kế hoạch cụ thể hoặc đã triển khai các phần mềm quản lý nội bộ (kế toán, nhân sự)" },
                  { score: 4, text: "Đã ứng dụng phần mềm quản lý trong hầu hết hoạt động nhưng chưa kết nối với chuỗi cung ứng" },
                  { score: 5, text: "Các phần mềm được tích hợp với nhau và có kết nối với đối tác, khách hàng" },
              ],
          },
          {
              id: "3.4",
              title: "Quản lý hoạt động đổi mới",
              description: "(Sản phẩm, quy trình, tổ chức quản lý, mô hình kinh doanh)",
              options: [
                  { score: 1, text: "Chưa quan tâm đến hoạt động đổi mới sản phẩm, quy trình, mô hình kinh doanh" },
                  { score: 2, text: "Có kế hoạch hoặc đã triển khai các hoạt động đổi mới sản phẩm, quy trình" },
                  { score: 3, text: "Có bộ phận R&D hoặc có định hướng đổi mới tổ chức, mô hình kinh doanh" },
                  { score: 4, text: "Có kế hoạch cụ thể hoặc đã triển khai các dự án CĐS có tác động đến mô hình kinh doanh" },
                  { score: 5, text: "Các hoạt động quản lý SXKD đã thực hiện số hóa và được cải tiến liên tục" },
              ],
          },
      ]
    },
    {
      id: 4,
      pillar: "TRỤ CỘT 4: SẢN XUẤT THÔNG MINH",
      detailedDescription: `
        <p class="mb-4">Sản xuất Thông minh là cấp độ cao nhất trong lộ trình chuyển đổi số của một doanh nghiệp sản xuất, nơi các công nghệ của cuộc Cách mạng Công nghiệp 4.0 được ứng dụng để tạo ra một hệ sinh thái sản xuất kết nối, tự động và thông minh.</p>
        <h3 class="text-lg font-semibold mb-2">Các yếu tố chính bao gồm:</h3>
        <ul class="list-disc list-inside space-y-2">
            <li><strong>Kết nối & Tích hợp (IoT):</strong> Mức độ sử dụng cảm biến để thu thập dữ liệu thời gian thực từ máy móc, thiết bị và kết nối chúng thành một hệ thống đồng nhất.</li>
            <li><strong>Tự động hóa & Robotics:</strong> Việc áp dụng robot công nghiệp, hệ thống tự hành (AGV) để tự động hóa các công đoạn lặp đi lặp lại, nguy hiểm hoặc đòi hỏi độ chính xác cao.</li>
            <li><strong>Phân tích Dữ liệu & AI:</strong> Khả năng sử dụng các thuật toán, trí tuệ nhân tạo (AI) để phân tích dữ liệu lớn (Big Data) thu thập được, từ đó đưa ra các dự báo, tối ưu hóa quy trình và hỗ trợ ra quyết định.</li>
            <li><strong>Các công nghệ khác:</strong> Mức độ tìm hiểu và ứng dụng các công nghệ tiên tiến khác như in 3D, thực tế ảo tăng cường (AR/VR), blockchain để tạo ra các sản phẩm và quy trình đột phá.</li>
        </ul>
        <p class="mt-4">Việc tiến tới Sản xuất Thông minh giúp doanh nghiệp đạt được hiệu quả vượt trội, tăng tính linh hoạt, giảm chi phí và tạo ra những sản phẩm, dịch vụ có giá trị cao hơn cho thị trường.</p>
      `,
      indicators: [
          {
              id: "4.1",
              title: "Sử dụng hệ thống cảm biến",
              description: "(Kết nối tích hợp, đồng bộ hóa dữ liệu)",
              options: [
                  { score: 1, text: "Bố trí sản xuất theo kinh nghiệm, chưa có hệ thống cảm biến" },
                  { score: 2, text: "Đã áp dụng các công cụ cải tiến để bố trí sản xuất, chưa có cảm biến" },
                  { score: 3, text: "Đã nhận biết các điểm cần kiểm soát và có ý định lắp đặt cảm biến để theo dõi" },
                  { score: 4, text: "Đã có sự kết nối và đồng bộ hóa thông tin giữa các cảm biến" },
                  { score: 5, text: "Có hệ thống điều khiển trung tâm để giám sát thiết bị (DCS/SCADA)" },
              ],
          },
          {
              id: "4.2",
              title: "Giải pháp CNTT khai thác dữ liệu",
              description: "(Giải pháp quản lý SX, quản lý KD, tích hợp giải pháp)",
              options: [
                  { score: 1, text: "Chưa xây dựng giải pháp nào để ứng dụng CNTT trong quản lý SX" },
                  { score: 2, text: "Quan tâm đến giải pháp quản lý kho và truy xuất nguồn gốc" },
                  { score: 3, text: "Đã triển khai một số giải pháp nhưng chưa tích hợp để kết nối thông tin (ERP, MES...)" },
                  { score: 4, text: "Đã thực hiện tích hợp một số giải pháp quản lý quá trình nội bộ" },
                  { score: 5, text: "Đã tích hợp các giải pháp nội bộ theo tiêu chuẩn (ISA-95) và liên kết với bên ngoài" },
              ],
          },
          {
              id: "4.3",
              title: "Tổng hợp và xây dựng CSDL",
              description: "(Đồng bộ dữ liệu, dữ liệu trên đám mây, khai thác dữ liệu)",
              options: [
                  { score: 1, text: "Chưa có kế hoạch thực hiện đồng bộ hóa dữ liệu" },
                  { score: 2, text: "Đã có kế hoạch hoặc đã thực hiện đồng bộ hóa nhưng chưa có hệ thống trên đám mây" },
                  { score: 3, text: "Có CSDL đã được đồng bộ hóa và có hệ thống dữ liệu dùng chung trên nền tảng đám mây" },
                  { score: 4, text: "Có sở hữu nền tảng riêng biệt trên điện toán đám mây (PaaS)" },
                  { score: 5, text: "Có sở hữu hạ tầng thiết bị và nền tảng riêng trên đám mây (IaaS)" },
              ],
          },
          {
              id: "4.4",
              title: "Ứng dụng công nghệ 4.0",
              description: "(Tự động hóa, Robot, In 3D, Blockchain, Big Data & AI)",
              options: [
                  { score: 1, text: "Chưa có kế hoạch ứng dụng các giải pháp 4.0" },
                  { score: 2, text: "Có kế hoạch xây dựng các module tích hợp sản xuất và kinh doanh" },
                  { score: 3, text: "Đã triển khai các ứng dụng tự động hóa, robot hoặc in 3D trong hoạt động SXKD" },
                  { score: 4, text: "Hoạt động sản xuất đã tự động hóa cao và sử dụng robot/in 3D" },
                  { score: 5, text: "Có kế hoạch hoặc đã triển khai sử dụng Big Data và AI để phân tích và ra quyết định" },
              ],
          },
      ]
    }
  ];