import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Employees from "./pages/Employees";
import Teams from "./pages/Team";
import Login from "./pages/Login";
import RegisterOrg from "./pages/RegisterOrg";
import Navbar from "./components/Navbar"; // <--- 1. Import the Navbar
import "./App.css";

// 2. Create a Layout component that includes the Navbar
function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="page-container">{children}</div>
    </>
  );
}

// 3. Update PrivateRoute to use the Layout
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? <Layout>{children}</Layout> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes (No Navbar) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterOrg />} />

        {/* Protected routes (With Navbar) */}
        <Route
          path="/employees"
          element={
            <PrivateRoute>
              <Employees />
            </PrivateRoute>
          }
        />

        <Route
          path="/teams"
          element={
            <PrivateRoute>
              <Teams />
            </PrivateRoute>
          }
        />

        {/* Default route */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
