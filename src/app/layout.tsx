import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ViPA Checklist App",
  description: "Công cụ đánh giá mức độ sẵn sàng chuyển đổi số ViPA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Sửa lỗi: Thay vì import, chúng ta sẽ nhúng trực tiếp link font và CDN của Tailwind
  // vào thẻ <head> để đảm bảo chúng luôn được tải, tương tự file HTML gốc.
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        {/* Tải Tailwind CSS từ CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* Tải Google Font: Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        
        {/* Áp dụng font cho toàn bộ trang */}
        <style>
          {`
            body {
              font-family: 'Inter', sans-serif;
            }
          `}
        </style>
      </head>
      <body>{children}</body>
    </html>
  );
}

