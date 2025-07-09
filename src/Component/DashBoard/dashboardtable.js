import axios from "axios";
import { useEffect, useState } from "react";
// https://api.mobilexecure.com/dealers/

export const DashBoardTable = (darkMode) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  const fetchData = async (page) => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      const fullData = res.data;

      const start = (page - 1) * itemsPerPage;
      const paginated = fullData.slice(start, start + itemsPerPage);

      setData(paginated);
      setTotalPages(Math.ceil(fullData.length / itemsPerPage));
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handlePageClick = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    fetchData(page);
  };

  useEffect(() => {
    fetchData(currentPage);
  }, []);

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

  return (
    <div class="flex flex-col p-5 bg-white rounded-lg shadow-md">
      {/* Summary Section */}
      <div class="flex justify-between items-center flex-wrap mb-2">
        <p class="flex-1 text-[3vw] sm:text-[2.5vw] md:text-[2vw] lg:text-xl font-bold line-clamp-1">
          Summary
        </p>
        <div className="flex items-center gap-2">
          <label
            htmlFor="show-selector"
            className="text-sm text-gray-600 font-semibold"
          >
            Show
          </label>
          <select
            name="show"
            className="h-9 rounded-lg appearance-none bg-gray-200 border border-gray-300 px-2.5 text-gray-800 w-[120px] bg-no-repeat focus:outline-none focus:border-transparent"
            style={{
              backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='black' height='14' viewBox='0 0 24 24' width='14' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
              backgroundPosition: "right 5px center",
              backgroundSize: "18px",
            }}
          >
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <button class="h-[2.2rem] border-none bg-purple-700 px-4 rounded-lg  text-white text-[13px] font-semibold shadow-md hover:shadow-lg transition">
            Dispatch
          </button>
        </div>

        {/* Pagination */}
        {/* <div style={DashboardStyleSheet.pagination}>
          <div
            className="pagination-button"
            style={{
              ...DashboardStyleSheet.arrow,
              ...(currentPage === 1 ? DashboardStyleSheet.disabled : {}),
            }}
            onClick={() => currentPage > 1 && handlePageClick(1)}
          >
            First
          </div>

          <div
            className="pagination-button"
            style={{
              ...DashboardStyleSheet.arrow,
              ...(currentPage === 1 ? DashboardStyleSheet.disabled : {}),
            }}
            onClick={() => currentPage > 1 && handlePageClick(currentPage - 1)}
          >
            Previous
          </div>

          <div
            className="pagination-button"
            style={{
              ...DashboardStyleSheet.page,
              ...DashboardStyleSheet.pageActive,
            }}
          >
            {currentPage}
          </div>

          <div
            className="pagination-button"
            style={{
              ...DashboardStyleSheet.arrow,
              ...(currentPage === 1 ? DashboardStyleSheet.disabled : {}),
            }}
            onClick={() =>
              currentPage < totalPages && handlePageClick(currentPage + 1)
            }
          >
            Next
          </div>

          <div
            className="pagination-button"
            style={{
              ...DashboardStyleSheet.arrow,
              ...(currentPage === 1 ? DashboardStyleSheet.disabled : {}),
            }}
            onClick={() =>
              currentPage < totalPages && handlePageClick(totalPages)
            }
          >
            Last
          </div>
        </div> */}
        <div className="ml-2 flex flex-wrap items-center justify-center gap-1.5">
          {/* First Button */}
          <button
            onClick={() => currentPage > 1 && handlePageClick(1)}
            disabled={currentPage === 1}
            className={getButtonClasses(currentPage === 1, currentPage === 1)}
          >
            First
          </button>

          {/* Previous Button */}
          <button
            onClick={() => currentPage > 1 && handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
            className={getButtonClasses(false, currentPage === 1)}
          >
            Previous
          </button>

          {/* Current Page */}
          <div className={getButtonClasses(true, false)}>{currentPage}</div>

          {/* Next Button */}
          <button
            onClick={() =>
              currentPage < totalPages && handlePageClick(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className={getButtonClasses(false, currentPage === totalPages)}
          >
            Next
          </button>

          {/* Last Button */}
          <button
            onClick={() =>
              currentPage < totalPages && handlePageClick(totalPages)
            }
            disabled={currentPage === totalPages}
            className={getButtonClasses(
              currentPage === totalPages,
              currentPage === totalPages
            )}
          >
            Last
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-gray-100 font-semibold text-left px-4 py-3 border-b border-gray-300 text-sm">
                <div className="flex items-center gap-2">
                  <input type="checkbox" name="ID" id="id-checker" />
                  <label htmlFor="id-checker">ID</label>
                </div>
              </th>
              <th className="bg-gray-100 font-semibold text-left px-4 py-3 border-b border-gray-300 text-sm">
                Name
              </th>
              <th className="bg-gray-100 font-semibold text-left px-4 py-3 border-b border-gray-300 text-sm">
                Country
              </th>
              <th className="bg-gray-100 font-semibold text-left px-4 py-3 border-b border-gray-300 text-sm">
                Phone
              </th>
              <th className="bg-gray-100 font-semibold text-left px-4 py-3 border-b border-gray-300 text-sm">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="bg-gray-50 hover:bg-gray-100">
                <td className="px-4 py-3 border-b border-gray-300 text-left text-sm">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>{row.id}</span>
                  </div>
                </td>
                <td className="px-4 py-3 border-b border-gray-300 text-left text-sm">
                  {row.name}
                </td>
                <td className="px-4 py-3 border-b border-gray-300 text-left text-sm">
                  {row.country}
                </td>
                <td className="px-4 py-3 border-b border-gray-300 text-left text-sm">
                  {row.phone}
                </td>
                <td className="px-4 py-3 border-b border-gray-300 text-left text-sm">
                  {row.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
