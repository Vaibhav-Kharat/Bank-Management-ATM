import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import ATM_Form from "./components/ATM_Form";
import ATMPage from "./components/ATMPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ATM_Form />} />
          <Route path="/atm" element={<ATMPage />} />
        </Routes>
      </Router>
      <Outlet />
    </>
  );
}

export default App;
