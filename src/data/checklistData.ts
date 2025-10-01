// Đây là nơi tập trung toàn bộ dữ liệu câu hỏi.
// Việc tách riêng file này giúp mã nguồn sạch sẽ, dễ bảo trì và cập nhật.

export const checklistData = [
    {
      pillar: "TRỤ CỘT 1: QUẢN LÝ DOANH NGHIỆP",
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
      pillar: "TRỤ CỘT 2: QUẢN LÝ NĂNG SUẤT",
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
      pillar: "TRỤ CỘT 3: HỆ THỐNG HẠ TẦNG CHO CHUYỂN ĐỔI SỐ",
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
      pillar: "TRỤ CỘT 4: SẢN XUẤT THÔNG MINH",
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