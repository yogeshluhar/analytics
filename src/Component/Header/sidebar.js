import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Table,
  CreditCard,
  User,
  LogIn,
  UserPlus,
  Briefcase,
  Store,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "Tables", icon: Table, path: "/tables" },
  { name: "Billing", icon: CreditCard, path: "/billing" },
  { name: "Profile", icon: User, path: "/profile" },
  { name: "Dealer", icon: Briefcase, path: "/dealer" },
  { name: "Retailer", icon: Store, path: "/retailer" },
  { name: "Sign In", icon: LogIn, path: "/signin" },
  { name: "Sign Up", icon: UserPlus, path: "/signup" },
];

const Sidebar = ({ open, setOpen, darkMode }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
        ></div>
      )}

      <aside
        className={`
          fixed top-2 left-[-5px] md:left-5 xl:left-5 z-40 w-full max-w-[230px] xl:max-w-[264px] h-[calc(100vh-20px)]
          border border-white/10 text-white p-6 xl:p-4 md:p-3 rounded-2xl font-[Poppins] flex flex-col
          transition-all duration-300 ease-in-out
          ${open ? "translate-x-[20px]" : "-translate-x-full"}
          md:translate-x-0 md:left-5
              ${
                darkMode
                  ? "bg-white/5 text-white shadow-[0_8px_30px_rgba(0,0,0,0.1)] backdrop-blur-xl"
                  : "backdrop-blur-xl bg-white/70 md:bg-white/50 xl:bg-white/50 shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition-all"
              }
        `}
      >
        <h2
          className={`
          text-center font-bold tracking-wide mt-2 mb-4 text-[clamp(1rem,2vw,1.5rem)]
         ${darkMode ? "text-white" : "text-[#1A237E]"}`}
        >
          SIDEBAR BOARD
        </h2>

        <ul className="flex flex-col gap-2 p-2">
          {menuItems.map(({ name, icon: Icon, path }, index) => {
            const isActive = currentPath === path;

            const linkClasses = darkMode
              ? isActive
                ? "bg-purple-700 text-white font-semibold"
                : "text-gray-400 hover:bg-purple-700 hover:text-white font-medium"
              : isActive
              ? "bg-[rgba(0,103,216,0.8)] text-white font-semibold"
              : "text-[#1A237E] hover:bg-[rgba(140,206,247,0.47)] font-medium";

            return (
              <li key={index}>
                <Link
                  to={path}
                  onClick={() => setOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg w-full transition-all duration-300
                    ${linkClasses}
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
