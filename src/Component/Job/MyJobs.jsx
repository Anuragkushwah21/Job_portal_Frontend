import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { Id } = useParams();
  // Fetch jobs posted by the employer
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/api/employerJobs");
        console.log(response.data)
        setJobs(response.data.jobs);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to fetch jobs.");
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);
  // Delete job function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) {
      return; // Exit if user cancels
    }
    try {
      await axios.delete(`/api/delete/${id}`);
      // Update job list after successful deletion
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      console.error("Error deleting job:", err);
      setError("Failed to delete the job.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Jobs Posted By You
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job._id} className="bg-white p-4 rounded-lg shadow-md">
                <h5 className="text-lg font-bold mb-2">{job.title}</h5>
                <p className="text-sm mb-2">
                  <i className="fas fa-map-marker-alt text-blue-600 mr-2"></i>
                  {job.location}
                </p>
                <p className="text-sm mb-2">
                  <i className="far fa-clock text-blue-600 mr-2"></i>
                  {job.jobType}
                </p>
                <p className="text-sm mb-2">
                  <i className="far fa-money-bill-alt text-blue-600 mr-2"></i>₹{" "}
                  {job.fixedSalary || `${job.salaryFrom} - ${job.salaryTo}`}
                </p>
                <p className="text-sm">
                  <i className="far fa-calendar-alt text-blue-600 mr-2"></i>
                  Posted on: {new Date(job.createdAt).toLocaleDateString()}
                </p>
                <div className="mt-4 flex space-x-3">
                  <button
                    className="btn btn-danger text-white bg-red-500 hover:bg-red-700 py-1 px-3 rounded"
                    onClick={() => handleDelete(job._id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <div>
                    <button className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">
                      <Link to={`/jobUpdate/` + job._id}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600">
              No jobs posted yet.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MyJobs;
