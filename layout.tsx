import type { Metadata } from "next";
// Các import dưới đây gây ra lỗi trong môi trường build, tạm thời vô hiệu hóa.
// import { Inter } from "next/font/google";
// import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ViPA Checklist App",
  description: "Công cụ đánh giá mức độ sẵn sàng chuyển đổi số ViPA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      {/* Do font 'Inter' đã bị vô hiệu hóa, chúng ta sử dụng thẻ body mặc định */}
      <body>{children}</body>
    </html>
  );
}