import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../../main";
import axios from "axios";
import HeroSection from "./HeroSection";
import PopularCategories from "./PopularCategories";
import About from "../Layout/About";
import toast from "react-hot-toast";
import API from "../../../config";

function Home() {
  const [jobs, setJobs] = useState([]);
  
  // Fetch job listings from the API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(API.ALL_JOBS,{withCredentials: true});
        console.log(response.data.data)
        setJobs(response.data.data); // Assuming API returns an array of job objects
        if(response.data.data.length === 0){
          toast.error("No Job Listings Found",)
        }
      } catch (error) {
        console.error("Error fetching job listings:", error);
      }
    };

    fetchJobs();
  }, []);

  const { isAuthorized } = useContext(Context);
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <HeroSection />
      <PopularCategories />
      <About />

      {/* Job Listings Section */}
      <div className="container mx-auto py-5 ml-auto">
        <div className="text-center mb-5">
          <h1 className="text-3xl font-bold mb-5">Job Listing</h1>
          <div className="inline-flex justify-center border-b mb-5">
            <ul className="flex border-b">
              <li className="mr-3">
                <a
                  className="inline-flex items-center pb-3 border-b-2 border-blue-600 text-blue-600"
                  href="#tab-1"
                >
                  <h6 className="text-lg">Featured</h6>
                </a>
              </li>
              <li className="mr-3">
                <a
                  className="inline-flex items-center pb-3 border-b-2 border-transparent hover:border-blue-600 hover:text-blue-600"
                  href="#tab-2"
                >
                  <h6 className="text-lg">Full Time</h6>
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center pb-3 border-b-2 border-transparent hover:border-blue-600 hover:text-blue-600"
                  href="#tab-3"
                >
                  <h6 className="text-lg">Part Time</h6>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="space-y-4">
          {jobs.slice(0, 3).map((job) => (
            <div
              key={job._id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center"
            >
              <div className="flex-shrink-0">
                <img
                  className="w-20 h-20 rounded border"
                  src="/Image/com-logo-1.jpg"
                  alt="Company Logo"
                />
              </div>
              <div className="text-start ml-4 md:w-2/3">
                <h5 className="text-lg font-bold mb-3">{job.title}</h5>
                <div className="flex flex-wrap items-center text-sm">
                  <span className="flex items-center mr-3">
                    <i className="fas fa-map-marker-alt text-blue-600 mr-2"></i>
                    {job.location}
                  </span>
                  <span className="flex items-center mr-3">
                  <i className="far fa-clock text-blue-600 mr-2"></i>
                    {job.jobType}
                  </span>
                  <span className="flex items-center">
                    <i className="far fa-money-bill-alt text-blue-600 mr-2"></i>
                    ₹{" "}
                        {job.fixedSalary ||
                          `${job.salaryFrom} - ${job.salaryTo}`}
                  </span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 md:w-1/3 flex flex-col items-start md:items-end">
                <div className="flex space-x-3 mb-3">
                  <button className="btn btn-light p-3 border rounded">
                    <i className="far fa-heart text-blue-600"></i>
                  </button>
                  <Link
                    to={`/job/${job._id}`} // Correctly placing the Link with the path
                    className="btn btn-[#00b074] py-2  px-4 bg-[#00b074] mt-2 text-white hover:bg-green-700 rounded"
                  >
                    Apply Now
                  </Link>
                </div>
                <small className="text-sm">
                  <i className="far fa-calendar-alt text-blue-600 mr-2"></i>
                  Date Line: {new Date(job.createdAt).toLocaleDateString()}
                </small>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            className="btn btn-[#00b074] mt-5 py-3 px-5 bg-[#00b074] text-white rounded hover:bg-green-700"
            to="/job/getall"
          >
            Browse More Jobs
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
