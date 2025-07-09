import { DealerTable } from "./dashboardDealer";
import { DealerSearch } from "./dealerSearch";

const Dealer = ({darkMode}) => {
  return (
    <>
      <div className="ml-4 md:ml-[16.5rem] xl:ml-[19rem] mt-[1rem] mr-4 mb-5 ">
        <DealerSearch />
        <DealerTable darkMode={darkMode}/>
      </div>
    </>
  );
};

export default Dealer;
