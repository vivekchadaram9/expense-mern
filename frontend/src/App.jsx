import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Component";
import AddReport from "./pages/reports/addReports/Component";
import Reports from "./pages/reports/viewReports/Component";



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-report" element={<AddReport />} />
        <Route path='/update-report' element={<AddReport />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;
