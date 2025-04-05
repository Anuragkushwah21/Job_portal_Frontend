import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const { id } = useParams();

  // Fetch job listings from the API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/api/jobList");
        setJobs(response.data.data); // Assuming API returns an array of job objects
      } catch (error) {
        console.error("Error fetching job listings:", error);
      }
    };

    fetchJobs();
  }, []);

 

  return (
    <>
      <div className="container mx-auto py-5 ml-auto">
        <div className="text-center mb-5">
          <h1 className="text-3xl font-bold mb-5">Job Listing</h1>
        </div>

        {/* Dynamically render job listings without filtering by type */}
        <div className="space-y-4">
          {jobs.map((job,index) => (
            <div
              key={index}
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
                    Job Details
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
      </div>
    </>
  );
}

export default Jobs;
