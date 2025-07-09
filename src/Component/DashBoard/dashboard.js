import { DashboardSearch } from "./dashboardSearch";
import { DashBoardTable } from "./dashboardtable";

const Dashboard = () => {
  return (
    <>
      <div className="ml-4 md:ml-[16.5rem] xl:ml-[19rem] mt-[1rem] mr-4 mb-5 ">
        <DashboardSearch />
        <DashBoardTable />
      </div>
    </>
  );
};

export default Dashboard;
