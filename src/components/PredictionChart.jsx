import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

// Register all chart types and elements
ChartJS.register(...registerables);

const PredictionChart = ({ chartData }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // To hold the current chart instance

  useEffect(() => {
    if (!chartData || !chartData.labels || !chartData.data) {
      // Avoid rendering or creating a chart if chartData is not fully available
      return;
    }

    // If a chart already exists, destroy it
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create a new chart
    const ctx = chartRef.current.getContext('2d');
    chartInstanceRef.current = new ChartJS(ctx, {
      type: 'line',
      data: {
        labels: chartData.labels, // X-axis labels (e.g., dates)
        datasets: [
          {
            label: 'Stock Price Prediction',
            data: chartData.data, // The predicted stock prices
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Price',
            },
          },
        },
      },
    });

    // Cleanup the chart on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartData]); // Re-run effect when `chartData` changes

  return (
    <div>
      <canvas ref={chartRef} id="predictionChart" />
    </div>
  );
};

export default PredictionChart;
