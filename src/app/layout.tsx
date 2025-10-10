import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; // 1. Import component Header

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
      <body className={inter.className}>
        {/* 2. Thêm Header vào ngay trên cùng của trang */}
        <Header /> 
        
        {/* Nội dung chính của các trang sẽ hiển thị bên dưới */}
        {children}
      </body>
    </html>
  );
}