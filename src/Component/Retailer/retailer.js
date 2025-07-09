import { RetailerTable } from "./retailerdashboard";
import { RetailerSearch } from "./retailerSearch";

const Retailer = ({ darkMode }) => {
  return (
    <>
      <div className="ml-4 md:ml-[16.5rem] xl:ml-[19rem] mt-[1rem] mr-4 mb-5 ">
        <RetailerSearch></RetailerSearch>
        <RetailerTable darkMode={darkMode}></RetailerTable>
      </div>
    </>
  );
};

export default Retailer;
