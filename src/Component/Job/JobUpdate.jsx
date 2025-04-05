import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function UpdateJob() {
  const { id } = useParams(); // Get the job ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    country: "",
    jobType: "",
    keySkill: "",
    location: "",
    salaryType: "",
    fixedSalary: "",
    salaryFrom: "",
    salaryTo: "",
  });

  useEffect(() => {
    // Fetch job details by ID
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`/api/job/${id}`); // Replace with your API endpoint
        // console.log(response.data)
        setFormData(response.data.job);
      } catch (error) {
        console.error("Error fetching job details", error);
        toast.error("Failed to fetch job details.");
      }
    };
    fetchJobDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/update/${id}`, formData); // Replace with your API endpoint
      //   console.log(response.data)
      toast.success(response.data.message || "Job updated successfully!");
      navigate("/job/me"); // Redirect to the jobs list or another page
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to update job. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bgimg min-h-screen flex items-center justify-center p-6">
      <div className="container mx-auto max-w-2xl bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Update Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block font-bold text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter Your Title"
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter Your Description"
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold text-gray-700">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter Your Country"
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold text-gray-700">Job Type</label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose The Job Type</option>
              <option value="Part Time">Part Time</option>
              <option value="Full Time">Full Time</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-bold text-gray-700">Key Skills</label>
            <input
              type="text"
              name="keySkill"
              value={formData.keySkill}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter Your Key Skills"
            />
          </div>

          <div className="mb-4">
            <label className="block font-bold text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="Enter Your Location"
            />
          </div>

          {/* Salary */}
          <div className="mb-3">
            <label htmlFor="salaryType" className="form-label">
              Salary
            </label>
            <select
              name="salaryType"
              className="form-select"
              value={formData.salaryType}
              onChange={handleChange}
            >
              <option value="default">Select Salary Type</option>
              <option value="Fixed Salary">Fixed Salary</option>
              <option value="Ranged Salary">Ranged Salary</option>
            </select>

            {/* Conditional Salary Inputs */}
            {formData.salaryType === "Fixed Salary" ? (
              <div className="mt-2">
                <input
                  type="number"
                  name="fixedSalary"
                  className="form-control"
                  placeholder="Enter Fixed Salary"
                  value={formData.fixedSalary}
                  onChange={handleChange}
                />
              </div>
            ) : formData.salaryType === "Ranged Salary" ? (
              <div className="mt-2">
                <input
                  type="number"
                  name="salaryFrom"
                  className="form-control mb-2"
                  placeholder="Salary From"
                  value={formData.salaryFrom}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="salaryTo"
                  className="form-control"
                  placeholder="Salary To"
                  value={formData.salaryTo}
                  onChange={handleChange}
                />
              </div>
            ) : (
              <div className="mt-2 text-danger">
                Please provide Salary Type.
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Update Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateJob;
