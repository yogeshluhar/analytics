import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
import Dashboard from "./Component/DashBoard/dashboard";
import Dealer from "./Component/Dealer/dealer";
import Retailer from "./Component/Retailer/retailer";
import { TransactionTable } from './Component/Dealer/transactionhistory';


function App() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    document.body.style.background = darkMode
      ? "url('/background-1.jpg') no-repeat top fixed"
      : "url('/windows 11.jpg') no-repeat top fixed";
    document.body.style.backgroundSize = "cover";
    document.body.style.overflow = open ? "hidden" : "auto";

    // Save to localStorage
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode, open]);

  return (
    <Router>
      <div className="flex  min-h-screen">
        <Sidebar open={open} setOpen={setOpen} darkMode={darkMode} />
        <div className="flex-1 ">
          <Header
            open={open}
            setOpen={setOpen}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
          <Routes>
            <Route path="/" element={<Grid darkMode={darkMode}/>} />
            <Route path="/transactions" element={<TransactionTable darkMode={darkMode} />} />
            <Route path="/tables" element={<Tables darkMode={darkMode} />} />
            <Route path="/billing" element={<Billing darkMode={darkMode} />} />
            <Route path="/profile" element={<Profile darkMode={darkMode} />} />
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
            <Route path="/dealer" element={<Dealer darkMode={darkMode} />} />
            <Route path="/retailer" element={<Retailer darkMode={darkMode} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
