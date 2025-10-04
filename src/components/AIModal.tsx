// src/components/AIModal.tsx
"use client";
import { marked } from 'marked';

interface AIModalProps {
  isOpen: boolean;
  isLoading: boolean;
  recommendation: string | null;
  onClose: () => void;
}

export default function AIModal({ isOpen, isLoading, recommendation, onClose }: AIModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center animate-fade-in">
      <div className="relative mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-2xl bg-white">
        <div className="mt-3">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="text-xl leading-6 font-bold text-gray-900">✨ Lộ trình Hành động do AI đề xuất</h3>
            <button
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
          <div className="mt-4 px-4 py-3 text-left max-h-[60vh] overflow-y-auto">
            {isLoading && (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
                <p className="ml-4 text-gray-600">AI đang phân tích, vui lòng chờ...</p>
              </div>
            )}
            {recommendation && (
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: marked(recommendation) }}
              />
            )}
          </div>
           <div className="mt-4 px-4 py-3 border-t text-right">
                <button 
                    onClick={onClose} 
                    className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300"
                >
                    Đóng
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
