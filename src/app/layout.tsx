import type { Metadata } from "next";
import { Inter } from "next/font/google";

// ĐẢM BẢO DÒNG NÀY LUÔN ĐƯỢC IMPORT: Đây là chìa khóa để nạp CSS của Tailwind
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      {/* Áp dụng font chữ cho toàn bộ trang */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}