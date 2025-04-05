import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Component/Layout/Navbar";
import Login from "./Component/Auth/Login";
import Registrer from "./Component/Auth/Registrer";
import Home from "./Component/Home/Home";
import Jobs from "./Component/Job/Jobs";
import JobDetails from "./Component/Job/JobDetails";
import Application from "./Component/Application/Application";
import MyApplication from "./Component/Application/MyApplication";
import PostJob from "./Component/Job/PostJob";
import MyJobs from "./Component/Job/MyJobs";
import NotFound from "./Component/NotFound/NotFound";
import Footer from "./Component/Layout/Footer";
import "./App.css";
import { Toaster } from "react-hot-toast";
import PopularCategories from "./Component/Home/PopularCategories";
import About from "./Component/Layout/About";
import Profile from "./Component/Layout/Profile";
import CategoryInsert from "./Component/Home/CategoryInsert";
import JobListByCategory from "./Component/Job/JobListByCategory";
import ResetPassword from "./Component/Auth/ResetPassword";
import JobUpdate from "./Component/Job/JobUpdate";

function App() {
  const location = useLocation(); // Get the current location

  const hideNavbarAndFooter =
    location.pathname === "/login" || location.pathname === "/registrer";

  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registrer" element={<Registrer />} />
        <Route path="/" element={<Home />} />
        <Route path="/job/getall" element={<Jobs />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/application/:id" element={<Application />} />
        <Route path="/application/me" element={<MyApplication />} />
        <Route path="/job/post" element={<PostJob />} />
        <Route path="/job/me" element={<MyJobs />} />
        <Route path="/jobUpdate/:id" element={<JobUpdate />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/category" element={<PopularCategories />} />
        <Route path="/categoryInsert" element={<CategoryInsert />} />
        <Route path="/categoryJobs/:cName" element={<JobListByCategory />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reset-password?/:token" element={<ResetPassword />} />
      </Routes>
      {!hideNavbarAndFooter && <Footer />}
      <Toaster />
    </>
  );
}

export default App;
