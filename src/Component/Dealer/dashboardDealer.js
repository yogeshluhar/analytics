import axios from "axios";
import { useEffect, useState } from "react";

export const DealerTable = ({ darkMode, searchTerm }) => {
  const [allData, setAllData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchAllData = async () => {
    try {
      const res = await axios.get("https://api.mobilexecure.com/vendors/", {
        params: {
          page: 1,
          size: 10000, // fetch all
          sort: "-createddate",
          dealer: 4000782,
          admin: true,
        },
      });
      setAllData(res.data.items || []);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getButtonClasses = (isActive, disabled = false) => {
    return `
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
  };

  const filteredData = allData.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchTerm.text.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    // <div className="flex flex-col p-5 bg-white rounded-lg shadow-md w-full mx-auto xl:max-w-[1020px]">
    <div
      className="flex flex-col p-5 bg-white rounded-lg shadow-md w-full mx-auto 
  max-w-full sm:max-w-[95%] md:max-w-[90%] lg:max-w-[1020px] xl:max-w-[1020px] 2xl:max-w-none"
    >
      {/* Header & Pagination */}
      <div className="flex justify-between items-center flex-wrap mb-2">
        <p className="flex-1 text-[3vw] sm:text-[2.5vw] md:text-[2vw] lg:text-xl font-bold line-clamp-1">
          Dealer Summary
        </p>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 font-semibold">Show</label>
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="h-9 rounded-lg appearance-none bg-gray-200 border border-gray-300 px-2.5 text-gray-800 w-[120px] focus:outline-none"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <button
            className={`h-[2.2rem] border-none px-4 rounded-lg text-white text-[13px] font-semibold shadow-md hover:shadow-lg transition
             ${darkMode ? "bg-purple-700" : "bg-[rgba(0,103,216,0.8)]"}
             `}
          >
            Dispatch
          </button>
        </div>
        <div className="ml-2 flex flex-wrap items-center justify-center gap-1.5 mt-4 sm:mt-0">
          <button
            onClick={() => handlePageClick(1)}
            disabled={currentPage === 1}
            className={getButtonClasses(false, currentPage === 1)}
          >
            First
          </button>
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
            className={getButtonClasses(false, currentPage === 1)}
          >
            Previous
          </button>
          <div className={getButtonClasses(true)}>{currentPage}</div>
          <button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={getButtonClasses(false, currentPage === totalPages)}
          >
            Next
          </button>
          <button
            onClick={() => handlePageClick(totalPages)}
            disabled={currentPage === totalPages}
            className={getButtonClasses(false, currentPage === totalPages)}
          >
            Last
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto w-full max-w-[100%]">
        <table className="w-full border-collapse mt-3">
          <thead>
            <tr>
              {[
                "ID",
                "Owner Name",
                "Shop Name",
                "Phone",
                "Email",
                "Location",
                "PAN",
                "Aadhar",
                "Pincode",
                "Units",
                "Remaining",
                "Vendor Code",
                "Created Date",
              ].map((header) => (
                <th
                  key={header}
                  className="w-[120px] max-w-[120px] truncate text-left text-xs bg-gray-100 font-semibold px-4 py-3 border-b border-gray-300"
                >
                  {header === "ID" ? (
                    <div className="flex items-center gap-2">
                      <input type="checkbox" name="ID" id="id-checker" />
                      <label htmlFor="id-checker">{header}</label>
                    </div>
                  ) : (
                    header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <tr key={row.id} className="bg-gray-50 hover:bg-gray-100">
                  <td className="px-4 py-3 border-b border-gray-300 text-left text-sm">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span>{index + 1}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300 text-left text-sm">
                    {row.ownerName}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300 text-left text-sm">
                    {row.shopName}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300 text-left text-sm">
                    {row.phoneNumber}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300 text-left text-sm">
                    {row.email}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300 text-left text-sm">
                    {row.location}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300 text-left text-sm">
                    {row.PAN}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300 text-left text-sm">
                    {row.Aadhar}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300 text-left text-sm">
                    {row.pincode}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300 text-left text-sm">
                    {row.units}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300 text-left text-sm">
                    {row.remaining}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300 text-left text-sm">
                    {row.vendorCode}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-300 text-left text-sm">
                    {new Date(row.createddate).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={13}
                  className="px-4 py-3 border-b border-gray-300 text-center text-sm"
                >
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
