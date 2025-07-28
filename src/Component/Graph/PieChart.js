import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import ChartFilterButtons from "../Reusable/filterbutton";
import axios from "axios";
import "../StyleSheet/style.css";

const PieChart = ({ darkMode }) => {
  const [filter, setFilter] = useState("month");
  const [allVendors, setAllVendors] = useState([]);
  const [vendorSales, setVendorSales] = useState({});
  const [visible, setVisible] = useState({});
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          "https://api.mobilexecure.com/dealers/analytics/4000782"
        );
        const data = response.data;
        const dayVendorWise = data.dayVendorWise || {};
        const vendorSalesData = {};

        const dateKeys = Object.keys(dayVendorWise).sort(
          (a, b) => new Date(a) - new Date(b)
        );

        if (filter === "week") {
          const weeks = [];
          for (let i = 0; i < dateKeys.length; i += 7) {
            const weekChunk = dateKeys.slice(i, i + 7);
            const weeklyVendors = {};
            weekChunk.forEach((date) => {
              const vendors = dayVendorWise[date] || {};
              for (const vendor in vendors) {
                weeklyVendors[vendor] =
                  (weeklyVendors[vendor] || 0) + vendors[vendor];
              }
            });
            weeks.push(weeklyVendors);
          }

          weeks.forEach((week) => {
            for (const vendor in week) {
              vendorSalesData[vendor] =
                (vendorSalesData[vendor] || 0) + week[vendor];
            }
          });
        } else if (filter === "month") {
          const monthMap = {};
          for (const date in dayVendorWise) {
            const parts = date.split(" ");
            const month = parts[1] + " " + parts[2];
            if (!monthMap[month]) monthMap[month] = {};
            const vendors = dayVendorWise[date];
            for (const vendor in vendors) {
              monthMap[month][vendor] =
                (monthMap[month][vendor] || 0) + vendors[vendor];
            }
          }

          for (const month in monthMap) {
            const monthVendors = monthMap[month];
            for (const vendor in monthVendors) {
              vendorSalesData[vendor] =
                (vendorSalesData[vendor] || 0) + monthVendors[vendor];
            }
          }
        } else {
          for (const date in dayVendorWise) {
            const vendors = dayVendorWise[date];
            for (const vendor in vendors) {
              vendorSalesData[vendor] =
                (vendorSalesData[vendor] || 0) + vendors[vendor];
            }
          }
        }

        const vendorNames = Object.keys(vendorSalesData);

        // Dynamic HSL color generator
        const dynamicColors = vendorNames.map((_, i) => {
          const hue = (i * 137.508) % 360; // Golden angle approximation
          return `hsl(${hue}, 65%, 55%)`;
        });

        const initialVisibility = {};
        vendorNames.forEach((v) => (initialVisibility[v] = true));

        setAllVendors(vendorNames);
        setVendorSales(vendorSalesData);
        setVisible(initialVisibility);
        setColors(dynamicColors);
      } catch (error) {
        console.error("PieChart API fetch error:", error);
      }
    };

    fetchChartData();
  }, [filter]);

  const toggleSlice = (vendor) => {
    setVisible((prev) => ({
      ...prev,
      [vendor]: !prev[vendor],
    }));
  };

  const animatedSeries = allVendors.map((vendor) =>
    visible[vendor] ? vendorSales[vendor] : 0
  );

  const options = {
    labels: allVendors,
    colors: colors,
    chart: {
      type: "pie",
      background: "transparent",
      foreColor: darkMode ? "#ffffff" : "#333333",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 500,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      theme: darkMode ? "dark" : "light",
    },
    title: {
      text: `Vendor Contribution - ${filter.toUpperCase()}`,
      align: "center",
      style: {
        color: darkMode ? "#ffffff" : "#1A237E",
        fontSize: "18px",
        fontWeight: 600,
      },
    },
    legend: {
      show: false,
    },
    theme: {
      mode: darkMode ? "dark" : "light",
    },
  };

  return (
    <div className="flex flex-col gap-4">
      <ChartFilterButtons
        activeFilter={filter}
        onChange={setFilter}
        darkMode={darkMode}
      />

      <Chart
        options={options}
        series={animatedSeries}
        type="pie"
        height={360}
        width="100%"
      />

      <div className="flex flex-wrap justify-center gap-2 text-xs px-4">
        {allVendors.map((vendor, index) => (
          <button
            key={vendor}
            onClick={() => toggleSlice(vendor)}
            className={`px-3 py-1 rounded-full border transition-all duration-200 ${
              visible[vendor] ? "opacity-100" : "opacity-40"
            }`}
            style={{
              color: colors[index],
              borderColor: colors[index],
              fontWeight: "500",
              fontSize: "11px",
            }}
          >
            {vendor}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
