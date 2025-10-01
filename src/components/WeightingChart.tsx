"use client"; // This directive marks this as a Client Component

import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const WeightingChart = () => {
  const data = {
    labels: ['Quản lý Doanh nghiệp', 'Quản lý Năng suất', 'Hạ tầng cho CĐS', 'Sản xuất Thông minh'],
    datasets: [{
        data: [25, 25, 25, 25],
        backgroundColor: ['#004AAD', '#0076D1', '#00AEEF', '#80D8F7'],
        borderColor: '#ffffff',
        borderWidth: 4,
        hoverOffset: 8
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { 
        display: false 
      }, 
      tooltip: { 
        callbacks: { 
          label: (context: any) => `${context.label}: ${context.parsed}%` 
        } 
      } 
    },
    cutout: '60%'
  };

  return <Doughnut data={data} options={options} />;
};

export default WeightingChart;
