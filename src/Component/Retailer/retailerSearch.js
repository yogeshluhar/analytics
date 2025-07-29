import { useState } from "react";

export const RetailerSearch = ({ darkMode, onSearch }) => {
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch?.({ text: value, category });
  };

  const handleSearchClick = () => {
    onSearch?.({ text: searchInput, category });
  };

  return (
    <div className="m-1 p-4">
      <div className="flex justify-between items-center mb-5">
        <h4 className="text-2xl font-bold text-white">Retailers</h4>
        <button
          className={`h-10 text-white font-semibold shadow-md cursor-pointer px-4 py-2 rounded-lg
            ${darkMode ? "bg-purple-700" : "bg-[rgba(0,103,216,0.8)]"}`}
        >
          Create Order
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 flex flex-wrap gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-semibold text-black mb-1">
            Search
          </label>
          <input
            type="search"
            placeholder="Search"
            value={searchInput}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300"
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-semibold text-black mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              onSearch?.({ text: searchInput, category: e.target.value });
            }}
            className="w-full px-4 py-2 rounded-lg border border-gray-300"
          >
            <option value="">All</option>
            <option value="customerName">Customer Name</option>
            <option value="imei1">IMEI 1</option>
            <option value="imei2">IMEI 2</option>
            <option value="dealerId">Dealer ID</option>
            <option value="vendorId">Vendor ID</option>
            <option value="phoneNumber">Phone Number</option>
            <option value="email">Email</option>
          </select>
        </div>

        <div className="flex-1 max-w-[12rem]">
          <button
            onClick={handleSearchClick}
            className={`w-full px-4 py-2 rounded-lg text-white font-bold
              ${darkMode ? "bg-purple-700" : "bg-[rgba(0,103,216,0.8)]"}`}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};
