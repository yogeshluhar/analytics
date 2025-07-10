import { useState } from "react";

export const DealerSearch = ({ darkMode, onSearch }) => {
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch?.({
      text: value,
      category,
      status,
    });
  };

  const handleSearchClick = () => {
    onSearch?.({
      text: searchInput,
      category,
      status,
    });
  };

  return (
    <>
      <div className="m-1 p-4 ">
        {/* Upper Filter */}
        <div className="flex justify-between items-center mb-5">
          <div className="text-2xl font-bold m-0">
            <h4 style={{ margin: "0px", color: "white" }}>Order</h4>
          </div>
          <div>
            <button
              className={`h-10  text-white font-semibold border-none shadow-md cursor-pointer  flex items-center gap-3 px-4 py-3 rounded-lg w-full
                   ${darkMode ? "bg-purple-700" : "bg-[rgba(0,103,216,0.8)]"}
              `}
            >
              create order
            </button>
          </div>
        </div>

        {/* Middle Filter */}
        <div className="m-1 flex items-center justify-between p-4 rounded-xl bg-white gap-4 flex-wrap">
          {/* <div style={"dashboard-scs-container"> */}
          <div className="flex-1">
            <h4 className="text-black">What are you looking for?</h4>
            <input
              type="search"
              placeholder="Search"
              value={searchInput}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-base transition
              focus:outline-none focus:border-black"
            />
          </div>

          <div className="flex-1">
            <h4 className="text-black">Category</h4>
            <select
              defaultValue=""
              value={category}
              onChange={(e) => {
                const value = e.target.value;
                setCategory(value);
                onSearch?.({ text: searchInput, category: value, status });
              }}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-base appearance-none bg-no-repeat bg-[right_1.25rem_center] bg-[length:1.5rem] focus:border-black focus:outline-none transition"
              style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='black' height='14' viewBox='0 0 24 24' width='14' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 5px center",
                backgroundSize: "18px",
              }}
            >
              <option value="" disabled hidden>
                Select
              </option>
              <option>Created Date</option>
              <option>Remaining</option>
              <option>GST</option>
              <option>PAN</option>
              <option>Location</option>
              <option>Owner Name</option>
              <option>Units</option>
              <option>Aadhar</option>
              <option>Updated At</option>
              <option>Phone Number</option>
            </select>
          </div>

          {/* </div> */}
          <div className="flex flex-1 max-w-[12rem] w-full">
            <button
              type="submit"
              onClick={handleSearchClick}
              className={`w-full flex justify-center items-center gap-3 px-4 py-3 rounded-lg text-white font-extrabold shadow-md border-none
                ${darkMode ? "bg-purple-700" : "bg-[rgba(0,103,216,0.8)]"}
              `}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
