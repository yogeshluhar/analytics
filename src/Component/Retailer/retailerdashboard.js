import axios from "axios";
import { useEffect, useState } from "react";

export const RetailerTable = ({ darkMode, searchTerm }) => {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    first: null,
    last: null,
    next: null,
    previous: null,
  });
  const getCategoryKey = (category) => {
    const map = {
      "Phone Number": "phoneNumber",
      "Owner Name": "ownerName",
      Location: "location",
      PAN: "PAN",
      Aadhar: "Aadhar",
      GST: "gst",
      Email: "email",
      Pincode: "pincode",
      Units: "units",
      Remaining: "remaining",
      "Vendor Code": "vendorCode",
      "Created Date": "createddate",
    };
    return map[category] || null;
  };

  const fetchData = async (page = 1, size = pageSize) => {
    try {
      const res = await axios.get("https://api.mobilexecure.com/vendors/", {
        params: {
          page,
          size,
          sort: "-createddate",
          dealer: 4000782,
          admin: true,
        },
      });

      let items = res.data.items || [];

      if (searchTerm?.text) {
        const lower = searchTerm.text.toLowerCase();
        items = items.filter((item) => {
          const categoryKey = getCategoryKey(searchTerm.category);
          if (categoryKey && item[categoryKey]) {
            return String(item[categoryKey]).toLowerCase().includes(lower);
          } else {
            return (
              item.ownerName?.toLowerCase().includes(lower) ||
              item.phoneNumber?.toLowerCase().includes(lower) ||
              item.email?.toLowerCase().includes(lower) ||
              item.location?.toLowerCase().includes(lower)
            );
          }
        });
      }

      if (searchTerm?.status) {
        items = items.filter(
          (item) => String(item.status) === searchTerm.status
        );
      }

      console.log("Fetching data with:", {
        page,
        size,
        search: searchTerm?.text,
        category: searchTerm?.category,
        status: searchTerm?.status,
      });

      setData(items);
      setPagination({
        page,
        totalPages: res.data.total_pages || 1,
        first: res.data.first,
        last: res.data.last,
        next: res.data.next,
        previous: res.data.previous,
      });
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    fetchData(currentPage, pageSize);
  }, [currentPage, pageSize, searchTerm]);

  const handlePageClick = (page) => {
    if (page) {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
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

  return (
    <div className="flex flex-col p-5 bg-white rounded-lg shadow-md w-full mx-auto xl:max-w-[1000px] 2xl:max-w-screen-2xl">
      <div className="flex justify-between items-center flex-wrap mb-2">
        <p className="flex-1 text-[3vw] sm:text-[2.5vw] md:text-[2vw] lg:text-xl font-bold line-clamp-1">
          Dealer Summary
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
            value={pageSize}
            onChange={handlePageSizeChange} // ✅ Update on change
            className="h-9 rounded-lg appearance-none bg-gray-200 border border-gray-300 px-2.5 text-gray-800 w-[120px] bg-no-repeat focus:outline-none focus:border-transparent"
            style={{
              backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='black' height='14' viewBox='0 0 24 24' width='14' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
              backgroundPosition: "right 5px center",
              backgroundSize: "18px",
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <button className="h-[2.2rem] border-none bg-purple-700 px-4 rounded-lg  text-white text-[13px] font-semibold shadow-md hover:shadow-lg transition">
            Dispatch
          </button>
        </div>

        {/* Pagination */}
        <div className="ml-2 flex flex-wrap items-center justify-center gap-1.5 mt-4 sm:mt-0">
          <button
            onClick={() => handlePageClick(pagination.first)}
            disabled={!pagination.first}
            className={getButtonClasses(false, !pagination.first)}
          >
            First
          </button>

          <button
            onClick={() => handlePageClick(pagination.previous)}
            disabled={!pagination.previous}
            className={getButtonClasses(false, !pagination.previous)}
          >
            Previous
          </button>

          <div className={getButtonClasses(true, false)}>{pagination.page}</div>

          <button
            onClick={() => handlePageClick(pagination.next)}
            disabled={!pagination.next}
            className={getButtonClasses(false, !pagination.next)}
          >
            Next
          </button>

          <button
            onClick={() => handlePageClick(pagination.last)}
            disabled={!pagination.last}
            className={getButtonClasses(false, !pagination.last)}
          >
            Last
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto w-full max-w-[100%] ">
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
            {data.length > 0 ? (
              data.map((row, index) => (
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
