import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";

const GlobalStyleGrid = {};

const RadarChart = ({ data }) => {
  const canvasRef = useRef(null);
  const optionsDarkMode = {
    elements: {
      line: {
        borderWidth: 3,
        borderColor: "white",
        backgroundColor: "rgba(255, 255, 255, 0.2)", // Màu nền của dải
      },
    },
    scales: {
      r: {
        grid: {
          color: "white", // Màu của đường lưới trục radial
        },
        angleLines: {
          color: "white", // Màu của các đường góc
        },
        pointLabels: {
          color: "white",
        },
        ticks: {
          color: "white",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
  };
  useEffect(() => {
    const config = {
      type: "radar",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: data.datasets[0].label,
            data: data.datasets[0].data,
            fill: true,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgb(255, 99, 132)",
            pointBackgroundColor: "rgb(255, 99, 132)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(255, 99, 132)",
          },
        ],
      },
      options: optionsDarkMode,
    };

    const chart = new Chart(canvasRef.current, config);

    return () => {
      chart.destroy();
    };
  }, [data]);

  return <canvas ref={canvasRef}></canvas>;
};

const BarChart = ({ data }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (data && data.datasets[0].data.length > 0) {
      const config = {
        type: "doughnut",
        data: {
          labels: data.datasets[0].labels,
          datasets: [
            {
              label: data.datasets[0].label,
              data: data.datasets[0].data,
              fill: true,
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
              ],

              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: GlobalStyleGrid,

          plugins: {
            legend: {
              labels: {
                color: "black",
              },
            },
          },
        },
      };

      const chart = new Chart(canvasRef.current, config);

      return () => {
        chart.destroy();
      };
    }
  }, [data]);

  return <canvas ref={canvasRef}></canvas>;
};

const DoughnutAndPieChart = ({ data, options }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const config = {
      type: "doughnut",
      data: data,
      options: options,
    };

    const chart = new Chart(canvasRef.current, config);

    return () => {
      chart.destroy();
    };
  }, [data, options]);

  return <canvas ref={canvasRef}></canvas>;
};

const LineChart = ({ data }) => {
  const canvasRef = useRef(null);
  var options = {
    scales: GlobalStyleGrid,
  };
  useEffect(() => {
    if (data) {
      const config = {
        type: "line",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: data.datasets[0].label,
              data: data.datasets[0].data,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
        options: options,
      };

      const chart = new Chart(canvasRef.current, config);

      return () => {
        chart.destroy();
      };
    }
  }, [data]);

  return <canvas ref={canvasRef}></canvas>;
};

export { BarChart, RadarChart, DoughnutAndPieChart, LineChart };
