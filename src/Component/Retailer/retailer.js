import { useState } from "react";
import { RetailerTable } from "./retailerdashboard";
import { RetailerSearch } from "./retailerSearch";

const Retailer = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState({
    text: "",
    category: "",
    status: "",
  });

  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  return (
    <>
      <div className="ml-4 md:ml-[16.5rem] xl:ml-[19rem] mt-[1rem] mr-4 mb-5  ">
        <RetailerSearch darkMode={darkMode} onSearch={handleSearch} />
        <RetailerTable darkMode={darkMode} searchTerm={searchTerm} />
      </div>
    </>
  );
};

export default Retailer;
