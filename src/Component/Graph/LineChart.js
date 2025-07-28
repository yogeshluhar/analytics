import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import ChartFilterButtons from "../Reusable/filterbutton";

const LineChart = ({ darkMode }) => {
  const [filter, setFilter] = useState("month");
  const [chartData, setChartData] = useState({ categories: [], values: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://api.mobilexecure.com/dealers/analytics/4000782"
        );
        const { dayWise = {} } = res.data;

        const dates = Object.keys(dayWise);
        const values = Object.values(dayWise);

        if (filter === "day") {
          setChartData({ categories: dates, values });
        } else if (filter === "week") {
          const weekChunks = [];
          for (let i = 0; i < values.length; i += 7) {
            const chunk = values.slice(i, i + 7);
            weekChunks.push(chunk.reduce((sum, v) => sum + v, 0));
          }

          const categories = weekChunks.map((_, i) => `Week ${i + 1}`);
          setChartData({ categories, values: weekChunks });
        } else if (filter === "month") {
          const monthMap = {};
          dates.forEach((date, i) => {
            const parts = date.split(" "); // "28 Jun 25"
            const month = parts[1];
            monthMap[month] = (monthMap[month] || 0) + values[i];
          });

          const categories = Object.keys(monthMap);
          const valuesByMonth = Object.values(monthMap);

          setChartData({ categories, values: valuesByMonth });
        }
      } catch (error) {
        console.error("LineChart fetch error:", error);
        setChartData({ categories: [], values: [] });
      }
    };

    fetchData();
  }, [filter]);

  const options = {
    chart: {
      id: "line-chart",
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
      categories: chartData.categories,
      labels: {
        style: { colors: darkMode ? "#ffffff" : "#333333" },
      },
    },
    yaxis: {
      labels: {
        style: { colors: darkMode ? "#ffffff" : "#333333" },
      },
    },
    stroke: { curve: "smooth" },
    colors: [darkMode ? "#10b981" : "#1976d2"],
    dataLabels: {
      enabled: true,
      style: {
        colors: [darkMode ? "#ffffff" : "#000000"],
      },
    },
    title: {
      text: `Line Chart (${filter})`,
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

  const series = [
    {
      name: "Sales",
      data: Array.isArray(chartData.values) ? chartData.values : [],
    },
  ];

  return (
    <div className="flex flex-col-reverse md:flex-col xl:flex-col gap-4">
      <ChartFilterButtons
        activeFilter={filter}
        onChange={setFilter}
        darkMode={darkMode}
      />
      <Chart
        options={options}
        series={series}
        type="line"
        height={300}
        width="100%"
      />
    </div>
  );
};

export default LineChart;
