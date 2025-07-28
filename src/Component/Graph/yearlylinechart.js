import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import "../StyleSheet/style.css";

const YearlyLineChart = ({ darkMode }) => {
  const [series, setSeries] = useState([
    {
      name: "Sales",
      data: [],
    },
  ]);

  const categories = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  useEffect(() => {
    const fetchYearlyData = async () => {
      try {
        const res = await axios.get("https://api.mobilexecure.com/dealers/analytics/4000782");
        const dayWise = res.data?.dayWise || {};

        const monthMap = {
          Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
          Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
        };

        const monthlyTotals = new Array(12).fill(0);

        for (const date in dayWise) {
          const parts = date.split(" "); // ["28", "Jun", "25"]
          const monthStr = parts[1]; // "Jun"
          const value = dayWise[date];

          const monthIndex = monthMap[monthStr];
          if (monthIndex !== undefined) {
            monthlyTotals[monthIndex] += value;
          }
        }

        setSeries([
          {
            name: "Sales",
            data: monthlyTotals,
          },
        ]);
      } catch (error) {
        console.error("YearlyLineChart API Error:", error);
      }
    };

    fetchYearlyData();
  }, []);

  const options = {
    chart: {
      id: "year-line-chart",
      background: "transparent",
      foreColor: darkMode ? "#ffffff" : "#333333",
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
    },
    xaxis: {
      categories,
      labels: {
        style: {
          colors: darkMode ? "#ffffff" : "#333333",
        },
      },
    },
    stroke: {
      curve: "smooth",
    },
    colors: [darkMode ? "#38bdf8" : "#1976d2"],
    dataLabels: {
      enabled: false,
    },
    title: {
      text: "Yearly Sales Overview",
      align: "center",
      style: {
        color: darkMode ? "#ffffff" : "#1A237E",
        fontSize: "16px",
      },
    },
    tooltip: {
      theme: darkMode ? "dark" : "light",
    },
    theme: {
      mode: darkMode ? "dark" : "light",
    },
  };

  return (
    <Chart options={options} series={series} type="line" height={300} width="100%" />
  );
};

export default YearlyLineChart;
