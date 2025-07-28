import React, { useEffect, useState } from "react";
import { IndianRupee, FileText, Loader } from "lucide-react";
import PieChart from "../Graph/PieChart";
import BarChart from "../Graph/BarChart";

export default function Billing({ darkMode }) {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.mobilexecure.com/dealers/analytics/4000782")
      .then((res) => res.json())
      .then((data) => {
        setAnalytics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch analytics:", err);
        setLoading(false);
      });
  }, []);

  if (loading || !analytics) return <Loader className="animate-spin mx-auto mt-10" />;

  const { dayWise = {}, summary = {}, vendorWise = {} } = analytics;

  const totalSold = analytics.totalsold || 0;
  const totalUsed = analytics.totalused || 0;
  const totalUnused = analytics.totalunused || 0;
  const months = Object.keys(dayWise).reduce((acc, date) => {
    const [day, month, year] = date.split(" ");
    const key = `${month} ${year}`;
    acc[key] = (acc[key] || 0) + dayWise[date];
    return acc;
  }, {});

  const monthLabels = Object.keys(months);
  const monthData = Object.values(months);
  const vendorLabels = Object.keys(vendorWise);
  const vendorData = Object.values(vendorWise);

  const card = `rounded-2xl p-4 border border-white/10 bg-white/5 backdrop-blur-xl shadow-md ${
    darkMode ? "text-white" : "text-black bg-white/50"
  }`;

  return (
    <div className="ml-4 md:ml-[16.5rem] xl:ml-[19rem] mt-4 mr-4">
      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2 md:gap-4 xl:gap-6 mb-6">
        {[
          { label: "Total Sold", value: totalSold, icon: <IndianRupee size={20} /> },
          { label: "Used", value: totalUsed, icon: <FileText size={20} /> },
          { label: "Unused", value: totalUnused, icon: <FileText size={20} /> },
          { label: "Month Sales", value: summary.month || 0, icon: <FileText size={20} /> },
        ].map((item, i) => (
          <div key={i} className={card}>
            <div className="flex items-center justify-between">
              <p className="text-sm">{item.label}</p>
              {item.icon}
            </div>
            <p className="text-xl font-bold mt-2">{item.value}</p>
          </div>
        ))}
      </section>

      {/* Graphs */}
      <section className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-4">
        <div className={card}>
          <h3 className="text-base font-semibold mb-2">Monthly Sales</h3>
          <BarChart darkMode={darkMode} categories={monthLabels} values={monthData} />
        </div>
        <div className={card}>
          <h3 className="text-base font-semibold mb-2">Sales by Vendor</h3>
          <PieChart darkMode={darkMode} labels={vendorLabels} series={vendorData} />
        </div>
      </section>
    </div>
  );
}
