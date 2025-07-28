import { useEffect, useState } from "react";
import BarChart from "../Graph/BarChart";
import AreaChart from "../Graph/AreaChart";
import LineChart from "../Graph/LineChart";
import PieChart from "../Graph/PieChart";
import YearlyLineChart from "../Graph/yearlylinechart";

export default function Grid({ params, darkMode }) {
  const [summaryData, setSummaryData] = useState({});
  const [filter, setFilter] = useState("month");

  useEffect(() => {
    fetch("https://api.mobilexecure.com/dealers/analytics/4000782")
      .then((res) => res.json())
      .then((data) => {
        setSummaryData(data);
      })
      .catch((err) => {
        console.error("Error fetching summary:", err);
      });
  }, []);

  const summaryCards = [
    { label: "Total Sold", value: summaryData?.totalsold },
    { label: "Total Used", value: summaryData?.totalused },
    { label: "Total Unused", value: summaryData?.totalunused },
    { label: "Monthly Sold", value: summaryData?.summary?.month },
  ];

  return (
    <div className="ml-4 md:ml-[16.5rem] xl:ml-[19rem] mt-[1rem] mr-4">
      {/* === Summary Cards === */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 mb-6">
        {summaryCards.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col justify-center p-4 rounded-2xl border border-white/10 backdrop-blur-xl
              ${
                darkMode
                  ? "text-white font-[500] bg-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
                  : "text-[#1A237E] font-[500] bg-white/50 shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition-all"
              }`}
          >
            <div className="text-sm">{item.label}</div>
            <div className="text-xl font-bold mt-2">
              {item.value !== undefined ? item.value : "—"}
            </div>
          </div>
        ))}
      </section>

      {/* === Keep the chart sections as-is (unchanged) === */}
      <section className="grid grid-cols-1 mb-6">
        <div
          className={`border border-white/10 p-4 rounded-2xl ${
            darkMode
              ? "text-white bg-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
              : "bg-white/50 shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition-all"
          }`}
        >
          <YearlyLineChart darkMode={darkMode} />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 sm:grid-cols-1 sm:gap-2 gap-6 mb-6">
        <div
          className={`bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl ${
            darkMode
              ? "text-white shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
              : "bg-white/50 shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition-all"
          }`}
        >
          <AreaChart darkMode={darkMode} />
        </div>
        <div
          className={`bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl ${
            darkMode
              ? "text-white shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
              : "bg-white/50 shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition-all"
          }`}
        >
          <LineChart darkMode={darkMode} />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 sm:grid-cols-1 sm:gap-2 gap-6 mb-6">
        <div
          className={`bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl ${
            darkMode
              ? "text-white shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
              : "bg-white/50 shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition-all"
          }`}
        >
          <PieChart darkMode={darkMode} />
        </div>
        <div
          className={`bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl ${
            darkMode
              ? "text-white shadow-[0_8px_30px_rgba(0,0,0,0.1)]"
              : "bg-white/50 shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition-all"
          }`}
        >
          <BarChart darkMode={darkMode} />
        </div>
      </section>
    </div>
  );
}
