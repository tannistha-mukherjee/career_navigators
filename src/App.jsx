import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
      <Router>
       <Routes>
        {/* Route for Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Route for AI Career Counselor (nested under dashboard) */}
        <Route path="/dashboard/aicareer" element={<AICareerCounselor />} />
      </Routes>
      </Router>
    </>
  );
}

export default App;
