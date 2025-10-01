"use client";
import { useEffect } from 'react';
// Sửa lỗi: Import 'TooltipItem' để định nghĩa kiểu dữ liệu chính xác
import Chart, { type TooltipItem } from 'chart.js/auto';

const WeightingChart = () => {
  useEffect(() => {
    const canvas = document.getElementById('weightingChart') as HTMLCanvasElement;
    if (!canvas) return;

    // Hủy biểu đồ cũ nếu tồn tại để tránh lỗi
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
      existingChart.destroy();
    }

    new Chart(canvas.getContext('2d')!, {
      type: 'doughnut',
      data: {
        labels: ['Quản lý Doanh nghiệp', 'Quản lý Năng suất', 'Hạ tầng cho CĐS', 'Sản xuất Thông minh'],
        datasets: [{
          data: [25, 25, 25, 25],
          backgroundColor: ['#004AAD', '#0076D1', '#00AEEF', '#80D8F7'],
          borderColor: '#ffffff',
          borderWidth: 4,
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              // Sửa lỗi: Khai báo kiểu 'TooltipItem' cho context
              label: (context: TooltipItem<'doughnut'>) => {
                return `${context.label}: ${context.parsed}%`;
              }
            }
          }
        },
        cutout: '60%'
      }
    });
  }, []);

  return (
    <div className="relative mx-auto h-[300px] w-[300px]">
      <canvas id="weightingChart"></canvas>
    </div>
  );
};

export default WeightingChart;