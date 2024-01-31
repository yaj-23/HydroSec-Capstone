// DailyUsageLineChart.js
import React from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const DailyUsageLineChart = ({ data }) => {
    // Extract days and energyUsage from the data
    const days = data.map((entry) => entry.day);
    const energyUsage = data.map((entry) => entry.energyUsage);

    const chartData = {
        labels: days,
        datasets: [
        {
            label: 'Energy Usage',
            data: energyUsage,
            borderColor: 'rgba(76,175,79,1)',
            borderWidth: 2,
        },
        ],
    };

    const options = {
        legend: {
            display: true,
          },
        scales: {
        xAxes: [
            {
            scaleLabel: {
                display: true,
                labelString: 'Day',
            },
            },
        ],
        yAxes: [
            {
            scaleLabel: {
                display: true,
                labelString: 'Energy Usage',
            },
            },
        ],
        },
        tooltips: {
            callbacks: {
              label: () => '', // Set the label to an empty string
            },
        },
    };

    return (
        <div>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default DailyUsageLineChart;