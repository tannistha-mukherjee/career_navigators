import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
 import Aptitude from "./pages/Aptitude";
// import Steam from "./pages/Steam";
// import Career from "./pages/Career";
// import Colleges from "./pages/Colleges";
// import Cutoff from "./pages/Cutoff";
// import Scholarship from "./pages/Scholarship";
// import Timeline from "./pages/Timeline";
// import Analytics from "./pages/Analytics";
import VirtualTour from "./pages/VirtualTour";
 import AiCareer from "./pages/AICareerCounselor";
 
import GameRoadmapVisualizer from "./pages/GameRoadmapVisualizer";
import Roadmap from "./pages/Roadmap";
import Timeline from "./pages/Timeline";

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <div className="flex">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div
          className={`flex-1 transition-all duration-300 ${
            collapsed ? "ml-20" : "ml-64"
          }`}
        >
          <Navbar />
          <main className="p-4 md:p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/aptitude" element={<Aptitude />} />
              <Route path="/steam" element={<Steam />} />
              <Route path="/career" element={<Career />} />
              <Route path="/colleges" element={<Colleges />} />
              <Route path="/cutoff" element={<Cutoff />} />
              <Route path="/scholarship" element={<Scholarship />} />
              <Route path="/timeline" element={<Timeline />} />
              
              <Route path="/analytics" element={<Analytics />} /> */}
              <Route path="/roadmap" element={<GameRoadmapVisualizer/>} />
              <Route path="/timeline" element={<Timeline />}/>
              <Route path="/roadmap2" element={<Roadmap/>} />
              <Route path="/aptitude" element={<Aptitude />}/>
              
              <Route path="/aicareer" element={<AiCareer/>} />
              <Route path="/virtual" element={<VirtualTour/>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
