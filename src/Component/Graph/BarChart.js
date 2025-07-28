import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import ChartFilterButtons from "../Reusable/filterbutton";

const BarChart = ({ darkMode }) => {
  const [filter, setFilter] = useState("month");
  const [categories, setCategories] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://api.mobilexecure.com/dealers/analytics/4000782"
        );
        const { dayVendorWise = {} } = res.data;

        const dateKeys = Object.keys(dayVendorWise).sort(
          (a, b) => new Date(a) - new Date(b)
        );
        const vendorSet = new Set();

        // Collect all vendors
        dateKeys.forEach((date) => {
          Object.keys(dayVendorWise[date]).forEach((vendor) =>
            vendorSet.add(vendor)
          );
        });

        const vendors = Array.from(vendorSet);
        const vendorData = {};

        if (filter === "day") {
          vendors.forEach((vendor) => {
            vendorData[vendor] = dateKeys.map(
              (date) => dayVendorWise[date]?.[vendor] || 0
            );
          });
          setCategories(dateKeys);
        }

        else if (filter === "week") {
          const weekChunks = [];
          for (let i = 0; i < dateKeys.length; i += 7) {
            weekChunks.push(dateKeys.slice(i, i + 7));
          }

          vendors.forEach((vendor) => {
            vendorData[vendor] = weekChunks.map((chunk) =>
              chunk.reduce((sum, date) => sum + (dayVendorWise[date]?.[vendor] || 0), 0)
            );
          });

          const weekLabels = weekChunks.map((_, i) => `Week ${i + 1}`);
          setCategories(weekLabels);
        }

        else if (filter === "month") {
          const monthChunks = {};
          dateKeys.forEach((date) => {
            const [_, mon, yr] = date.split(" "); // e.g. "28 Jun 25"
            const key = `${mon} ${yr}`;
            if (!monthChunks[key]) monthChunks[key] = [];
            monthChunks[key].push(date);
          });

          const monthKeys = Object.keys(monthChunks);

          vendors.forEach((vendor) => {
            vendorData[vendor] = monthKeys.map((month) =>
              monthChunks[month].reduce(
                (sum, date) => sum + (dayVendorWise[date]?.[vendor] || 0),
                0
              )
            );
          });

          setCategories(monthKeys);
        }

        const chartSeries = vendors.map((vendor) => ({
          name: vendor,
          data: vendorData[vendor],
        }));

        setSeries(chartSeries);
      } catch (err) {
        console.error("BarChart API Error:", err);
        setCategories([]);
        setSeries([]);
      }
    };

    fetchData();
  }, [filter]);

  const chartOptions = {
    chart: {
      type: "bar",
      stacked: true,
      background: "transparent",
      foreColor: darkMode ? "#ffffff" : "#333333",
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 4,
        columnWidth: "60%",
      },
    },
    xaxis: {
      categories,
      labels: { style: { colors: darkMode ? "#ffffff" : "#333333" } },
    },
    yaxis: {
      labels: { style: { colors: darkMode ? "#ffffff" : "#333333" } },
    },
    colors: [
      "#FF6384", "#36A2EB", "#FFCE56", "#10B981", "#8B5CF6", "#F59E0B",
      "#EF4444", "#3B82F6", "#EC4899", "#22C55E", "#6366F1", "#EAB308",
    ],
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "bottom",
      labels: {
        colors: darkMode ? "#ffffff" : "#333333",
      },
    },
    tooltip: {
      theme: darkMode ? "dark" : "light",
    },
    title: {
      text: `Vendor-wise Sales (${filter})`,
      align: "center",
      style: {
        color: darkMode ? "#ffffff" : "#1A237E",
        fontSize: "16px",
      },
    },
  };

  return (
    <div className="flex flex-col-reverse md:flex-col xl:flex-col gap-4">
      <ChartFilterButtons
        activeFilter={filter}
        onChange={setFilter}
        darkMode={darkMode}
      />
      <Chart options={chartOptions} series={series} type="bar" height={550} />
    </div>
  );
};

export default BarChart;
