import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { formatNumber } from '_app/utils/formatNumber.utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

const LineChart = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${formatNumber(context.raw)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          offset: true,
        },
        ticks: {
          color: 'gray',
        },
      },
      y: {
        display: true,
        ticks: {
          callback: function (value) {
            return Number.isInteger(value) ? formatNumber(value) : '';
          },
          maxTicksLimit: 8,
        },
        grid: {
          display: true,
        },
        border: {
          display: false,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
