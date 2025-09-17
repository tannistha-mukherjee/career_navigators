import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Features from "./components/Features";
import Dashboard from "./pages/Dashboard";
import AICareerCounselor from "./pages/AICareerCounselor";

function App() {
  

  return (
    <>
      <Dashboard/>
      {/* <AICareerCounselor/> */}
    </>
  );
}

export default App;
