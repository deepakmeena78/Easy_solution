


import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import HelpById from "./Help/HelpDetails";
import SignUp from "./SignUpIn/SignUp";
import SignIn from "./SignUpIn/SignIn";
import AllHelps from "./Help/AllHelps";
import CategoryPage from "./CategoryPage";
import Dashboard from "./Profile/Dashboard";
import Profile from "./Profile/Profile";
import HelpList from "./Profile/HelpList";
import Prime from "./Profile/Prime";
import Notification from "./Profile/Notification";
import ProtectedRoute from "./Authentication/ProtectedRoute";
import SidebarComp from "./Profile/SideBarComp";
import CreateHelp from "./Profile/CreateHelp";

const Routing = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/help" element={<AllHelps />} />
      <Route path="/help-details" element={<HelpById />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/category" element={<CategoryPage />} />
      <Route
        path="/account/*"
        element={
          <SidebarComp>
            <Routes>
              <Route path="dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
              <Route path="profile" element={<ProtectedRoute element={<Profile />} />} />
              <Route path="help" element={<ProtectedRoute element={<HelpList />} />} />
              <Route path="prime" element={<ProtectedRoute element={<Prime />} />} />
              <Route path="notifications" element={<ProtectedRoute element={<Notification />} />} />
              <Route path="create-help" element={<CreateHelp />} />
            </Routes>
          </SidebarComp>
        }
      />

      {/* 404 Page */}
      <Route path="*" element={<h2>Page Not Found</h2>} />
    </Routes>
  );
};

export default Routing;
