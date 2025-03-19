import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import StudentForm from "./components/student";
import StudentTable from "./components/StudentTable";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<StudentForm />} />
          <Route path="/StudentTable" element={<StudentTable />} />
        </Routes>
      </Router>
      <Outlet />
    </>
  );
};

export default App;
