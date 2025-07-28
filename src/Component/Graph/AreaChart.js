import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import ChartFilterButtons from "../Reusable/filterbutton";

const AreaChart = ({ darkMode }) => {
  const [filter, setFilter] = useState("month");
  const [chartData, setChartData] = useState({ categories: [], values: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://api.mobilexecure.com/dealers/analytics/4000782"
        );
        const data = res.data.dayWise;

        const allDates = Object.keys(data);
        const allValues = Object.values(data);

        let filtered = { categories: [], values: [] };

        if (filter === "day") {
          const last7 = allDates.slice(-7);
          filtered = {
            categories: last7,
            values: last7.map(date => data[date]),
          };
        } else if (filter === "week") {
          const last28 = allDates.slice(-28);
          const weekChunks = [];
          for (let i = 0; i < last28.length; i += 7) {
            const week = last28.slice(i, i + 7);
            const weekSum = week.reduce((sum, date) => sum + data[date], 0);
            weekChunks.push({ week: `Week ${i / 7 + 1}`, value: weekSum });
          }
          filtered = {
            categories: weekChunks.map(w => w.week),
            values: weekChunks.map(w => w.value),
          };
        } else if (filter === "month") {
          filtered = {
            categories: allDates,
            values: allValues,
          };
        }

        setChartData(filtered);
      } catch (err) {
        console.error("Failed to fetch analytics", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [filter]);

  const options = {
    chart: {
      type: "area",
      background: "transparent",
      foreColor: darkMode ? "#fff" : "#333",
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
        style: {
          colors: darkMode ? "#fff" : "#333",
        },
        rotate: -45,
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: darkMode ? "#fff" : "#333",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    tooltip: {
      theme: darkMode ? "dark" : "light",
    },
    colors: [darkMode ? "#38bdf8" : "#2196f3"],
    title: {
      text: `Area Chart (${filter})`,
      align: "center",
      style: {
        color: darkMode ? "#fff" : "#1A237E",
        fontSize: "16px",
      },
    },
  };

  const series = [
    {
      name: "Total Sold",
      data: chartData.values,
    },
  ];

  return (
    <div className="flex flex-col-reverse md:flex-col xl:flex-col gap-4">
      <ChartFilterButtons
        activeFilter={filter}
        onChange={setFilter}
        darkMode={darkMode}
      />
      {loading ? (
        <p className="text-center text-gray-500">Loading chart...</p>
      ) : (
        <Chart options={options} series={series} type="area" height={300} width="100%" />
      )}
    </div>
  );
};

export default AreaChart;
