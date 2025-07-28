import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Tables({ darkMode }) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    axios
      .get("https://api.mobilexecure.com/vendors/", {
        params: {
          page: 1,
          size: 10000,
          sort: "-createddate",
          dealer: 4000782,
          admin: true,
        },
      })
      .then((res) => setData(res.data.items || []))
      .catch((err) => console.error("Error fetching vendor data:", err));
  }, []);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

  const containerClasses = `p-4 md:p-6 rounded-2xl border 
    ${darkMode
      ? "bg-white/5 text-white border-white/20"
      : "bg-white/60 text-[#1A237E] border-[#1A237E]/30"} 
    backdrop-blur-2xl shadow-[0_8px_20px_rgba(0,0,0,0.2)] transition-all`;

  const headerCell = "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider border-b";
  const rowCell = "px-4 py-3 border-b whitespace-nowrap text-sm";

  const getButtonClasses = (isActive, disabled = false) => `
    flex justify-center items-center px-4 py-2 rounded-lg w-full sm:w-auto transition-all duration-300
    ${
      darkMode
        ? disabled
          ? "opacity-50 cursor-not-allowed text-gray-400 font-semibold"
          : isActive
          ? "bg-purple-700 text-white font-semibold"
          : "text-gray-400 hover:bg-purple-700 hover:text-white font-medium"
        : disabled
        ? "opacity-50 cursor-not-allowed text-[#1A237E] font-medium"
        : isActive
        ? "bg-[rgba(0,103,216,0.8)] text-white font-semibold"
        : "text-[#1A237E] hover:bg-[rgba(0,103,216,0.8)] hover:text-white font-medium"
    }
  `;

  return (
    <div className="ml-4 md:ml-[16.5rem] xl:ml-[19rem] mt-4 mr-4">
      <section className="grid grid-cols-1 gap-6 mb-6">
        <div className={containerClasses}>
          <h2 className="text-2xl font-semibold mb-6 text-center">Dealer Summary</h2>
          <div className="overflow-x-auto rounded-lg scrollbar-custom">
            <table className="min-w-[1000px] w-full">
              <thead
                className={`sticky top-0 z-10 backdrop-blur ${
                  darkMode ? "bg-purple-700 text-white" : "bg-[rgba(0,103,216,0.8)] text-white"
                }`}
              >
                <tr>
                  {[
                    "ID", "Owner Name", "Shop Name", "Phone", "Email", "Location", "PAN",
                    "Aadhar", "Pincode", "Units", "Remaining", "Vendor Code", "Created Date"
                  ].map((header) => (
                    <th key={header} className={headerCell}>
                      {header === "ID" ? (
                        <div className="flex items-center gap-2">
                          <input type="checkbox" />
                          <label>{header}</label>
                        </div>
                      ) : (
                        header
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={`${darkMode ? "divide-white/20" : "divide-[#1A237E]/30"} divide-y`}>
                {paginatedData.length > 0 ? (
                  paginatedData.map((row, index) => (
                    <tr
                      key={row.id}
                      className={`transition ${
                        darkMode
                          ? `${index % 2 === 0 ? "bg-white/10" : "bg-white/5"} hover:bg-white/20`
                          : `${index % 2 === 0 ? "bg-white/40" : "bg-white/60"} hover:bg-white/80`
                      }`}
                    >
                      <td className={rowCell}>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" />
                          <span>{index + 1 + (currentPage - 1) * rowsPerPage}</span>
                        </div>
                      </td>
                      <td className={rowCell}>{row.ownerName}</td>
                      <td className={rowCell}>{row.shopName}</td>
                      <td className={rowCell}>{row.phoneNumber}</td>
                      <td className={rowCell}>{row.email}</td>
                      <td className={rowCell}>{row.location}</td>
                      <td className={rowCell}>{row.PAN}</td>
                      <td className={rowCell}>{row.Aadhar}</td>
                      <td className={rowCell}>{row.pincode}</td>
                      <td className={rowCell}>{row.units}</td>
                      <td className={rowCell}>{row.remaining}</td>
                      <td className={rowCell}>{row.vendorCode}</td>
                      <td className={rowCell}>
                        {row.createddate ? new Date(row.createddate).toLocaleDateString() : "—"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="13" className="text-center py-4 text-gray-500">
                      No data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="mt-6 flex flex-row sm:flex-row justify-between items-center gap-4">
            {/* Left side: First & Prev */}
            <div className="flex flex-row sm:flex-row gap-2 sm:w-auto">
              <button
                onClick={() => currentPage > 1 && setCurrentPage(1)}
                className={getButtonClasses(currentPage === 1, currentPage === 1)}
              >
                <span className="block sm:hidden">«</span>
                <span className="hidden sm:block">First</span>
              </button>
              <button
                onClick={() => currentPage > 1 && setCurrentPage((prev) => prev - 1)}
                className={getButtonClasses(false, currentPage === 1)}
              >
                <span className="block sm:hidden">‹</span>
                <span className="hidden sm:block">Previous</span>
              </button>
            </div>

            {/* Center: Page info */}
            <div className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </div>

            {/* Right side: Next & Last */}
            <div className="flex flex-row sm:flex-row gap-2 sm:w-auto">
              <button
                onClick={() => currentPage < totalPages && setCurrentPage((prev) => prev + 1)}
                className={getButtonClasses(false, currentPage === totalPages)}
              >
                <span className="block sm:hidden">›</span>
                <span className="hidden sm:block">Next</span>
              </button>
              <button
                onClick={() => currentPage < totalPages && setCurrentPage(totalPages)}
                className={getButtonClasses(currentPage === totalPages, currentPage === totalPages)}
              >
                <span className="block sm:hidden">»</span>
                <span className="hidden sm:block">Last</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
