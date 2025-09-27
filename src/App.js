import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import ReportFound from "./Pages/ReportFound";
import BrowseFound from "./Pages/BrowseFound";
import AdminDashboard from "./Pages/AdminDashboard";
import MyActivity from "./Pages/MyActivity";
import Layout from "./Layout";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function AppWrapper() {
  const location = useLocation();
  const noLayoutRoutes = ["/login", "/register"];
  const hideLayout = noLayoutRoutes.includes(location.pathname);

  return hideLayout ? (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  ) : (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/report-found" element={<ReportFound />} />
        <Route path="/browse-found" element={<BrowseFound />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/my-activity" element={<MyActivity />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
