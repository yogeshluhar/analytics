import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Grid from "./Component/Header/bentogrid";
import Header from "./Component/Header/header";
import Sidebar from "./Component/Header/sidebar";

import Tables from "./Component/Table/table";
import Billing from "./Component/Billed/Invoice";
import Profile from "./Component/Profile/profile";
import SignUp from "./Component/Auth/SignUp";
import SignIn from "./Component/Auth/Signin";
import VerifyOTP from "./Component/Auth/VerifyOtp";
import Dealer from "./Component/Dealer/dealer";
import Retailer from "./Component/Retailer/retailer";
import { TransactionTable } from "./Component/Dealer/transactionhistory";
import Welcome from "./Component/Auth/Welcome";

function App() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // 👇 yeh pages me Header/Sidebar nahi chahiye
  const hideSidebarHeader = ["/", "/signin", "/signup"];

  useEffect(() => {
    document.body.style.background = darkMode
      ? "url('/background-1.jpg') no-repeat top fixed"
      : "url('/windows 11.jpg') no-repeat top fixed";
    document.body.style.backgroundSize = "cover";
    document.body.style.overflow = open ? "hidden" : "auto";
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode, open]);

  return (
    <div className="flex min-h-screen">
      {!hideSidebarHeader.includes(location.pathname) && (
        <Sidebar open={open} setOpen={setOpen} darkMode={darkMode} />
      )}

      <div className="flex-1">
        {!hideSidebarHeader.includes(location.pathname) && (
          <Header
            open={open}
            setOpen={setOpen}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
        )}

        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={<Welcome darkMode={darkMode} setDarkMode={setDarkMode} />}
          />
          <Route
            path="/signin"
            element={<SignIn darkMode={darkMode} setDarkMode={setDarkMode} />}
          />
          <Route
            path="/signup"
            element={<SignUp darkMode={darkMode} setDarkMode={setDarkMode} />}
          />
          <Route
            path="/verify"
            element={
              <VerifyOTP darkMode={darkMode} setDarkMode={setDarkMode} />
            }
          />

          {/* Private Routes (only if login) */}
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? <Grid darkMode={darkMode} /> : <Welcome />
            }
          />
          <Route
            path="/tables"
            element={
              isAuthenticated ? <Tables darkMode={darkMode} /> : <Welcome />
            }
          />
          <Route
            path="/billing"
            element={
              isAuthenticated ? <Billing darkMode={darkMode} /> : <Welcome />
            }
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? <Profile darkMode={darkMode} /> : <Welcome />
            }
          />
          <Route
            path="/dealer"
            element={
              isAuthenticated ? <Dealer darkMode={darkMode} /> : <Welcome />
            }
          />
          <Route
            path="/retailer"
            element={
              isAuthenticated ? <Retailer darkMode={darkMode} /> : <Welcome />
            }
          />
          <Route
            path="/transactions"
            element={
              isAuthenticated ? (
                <TransactionTable darkMode={darkMode} />
              ) : (
                <Welcome />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
