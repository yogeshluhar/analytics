import { useState } from "react";
import { DealerTable } from "./dashboardDealer";
import { DealerSearch } from "./dealerSearch";

const Dealer = ({darkMode}) => {
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
         <DealerSearch darkMode={darkMode} onSearch={handleSearch} />
         <DealerTable darkMode={darkMode} searchTerm={searchTerm} />
       </div>
     </>
   );
 };

export default Dealer;
