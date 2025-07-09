import { Menu, X, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const menuItems = [
  { name: "Dashboard", path: "/" },
  { name: "Tables", path: "/tables" },
  { name: "Billing", path: "/billing" },
  { name: "Profile", path: "/profile" },
  { name: "Dealer", path: "/dealer" },
  { name: "Retailer", path: "/retailer" },
  { name: "Sign In", path: "/signin" },
  { name: "Sign Up", path: "/signup" },
];

const Header = ({ open, setOpen, darkMode, setDarkMode }) => {
  const location = useLocation();
  // const lightColor = "rgba(0,103,216,0.8)";
  const lightColor = "#1A237E";

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pageTitle =
    menuItems.find((item) => item.path === location.pathname)?.name ||
    "My Dashboard";

  return (
    <header
      className={`
      sticky z-10 rounded-md
      ${scrolled ? "top-2 md:top-3 xl:top-4" : "top-0"}
      md:ml-[16.5rem] xl:ml-[19rem] 
      px-4 py-3 font-[Poppins] 
      flex items-center justify-between
      transition-all duration-300
      xl:mt-4 md:mt-3
      ${
        scrolled
          ? darkMode
            ? "ml-2  mt-2 mr- md:mt-3 md:mr-4 xl:mt-2 xl:mr-4 bg-white/10 backdrop-blur border-white/10 text-white"
            : "ml-2 mt-2 mr-2 md:mt-3 md:mr-4 xl:mt-2 xl:mr-4 bg-[rgba(0,104,216,0.95)]  transition-all"
          : ""
      }
    `}
    >
      {/* Sidebar Toggle for Mobile */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 z-50 rounded-md text-white md:hidden"
        style={{
          color: darkMode ? "white" : scrolled ? "white" : lightColor,
        }}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Heading and Toggle */}
      <div className="flex items-center justify-between w-full">
        <span
          className="text-lg font-semibold mx-auto md:mx-0"
          style={{
            color: darkMode ? "white" : scrolled ? "white" : lightColor,
          }}
        >
          {pageTitle}
        </span>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 bg-white/10 backdrop-blur rounded-md text-white"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-white" />
          ) : (
            <Moon
              className={`w-5 h-5`}
              style={{ color: scrolled ? "white" : lightColor }}
            />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
