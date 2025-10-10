"use client";

import { useParams } from 'next/navigation';
import { checklistData } from '@/data/checklistData';
import Link from 'next/link';

export default function PillarDetailPage() {
  const params = useParams();
  const pillarId = params.id;

  // Tìm dữ liệu trụ cột dựa trên ID từ URL
  const pillar = checklistData.find(p => p.id.toString() === pillarId);

  // Xử lý trường hợp không tìm thấy trụ cột
  if (!pillar) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="text-center">
            <h1 className="text-4xl font-bold text-red-600">Lỗi 404</h1>
            <p className="mt-4 text-lg">Không tìm thấy thông tin cho trụ cột này.</p>
            <Link href="/" legacyBehavior>
                <a className="mt-6 inline-block rounded bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700">
                    Quay về Trang chủ
                </a>
            </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12 lg:p-24 bg-slate-50">
        <div className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-lg">
            <h1 className="mb-6 border-b pb-4 text-center text-3xl font-bold text-blue-800">{pillar.pillar}</h1>
            
            {/* Sử dụng dangerouslySetInnerHTML để render nội dung HTML */}
            <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: pillar.detailedDescription }} 
            />

            <div className="mt-8 border-t pt-6 text-center">
                <Link href="/" legacyBehavior>
                    <a className="inline-block rounded bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700">
                        Bắt đầu Đánh giá ngay
                    </a>
                </Link>
            </div>
        </div>
    </main>
  );
}