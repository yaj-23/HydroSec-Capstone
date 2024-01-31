// MonthlyCostLineChart.js
import React from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const MonthlyCostLineChart = ({ data }) => {
  // Extract months and costs from the data
  const months = data.map((entry) => entry.monthYear);
  const costs = data.map((entry) => entry.cost);

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Monthly Cost',
        data: costs,
        borderColor: 'rgba(76,175,79,1)', 
        borderWidth: 2,
      },
    ],
  };

  const options = {
    legend: {
      display: false, // Set display to false to hide the legend
    },
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Month',
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'Cost',
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem) => `$${tooltipItem.yLabel.toFixed(2)}`, // Format cost to currency
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MonthlyCostLineChart;
