import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate, useParams } from "react-router-dom";

function PostJob() {
  const{id}=useParams()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [jobType, setJobType] = useState("");
  const [country, setCountry] = useState("");
  const [keySkill, setKeySkill] = useState("");
  const [location, setLocation] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [salaryType, setSalaryType] = useState(""); 
  // Initialize as an empty array
  const [selectedCategory, setSelectedCategory] = useState([]);

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  if (!isAuthorized || (user && user.role !== "employer")) {
    return <Navigate to={"/"} />;
  }  

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/getallCategory"); // Adjust endpoint if necessary
        setSelectedCategory(response.data.data || []);
      } catch (error) {
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryFrom("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
    try {
      const { data } = await axios.post(
        "/api/jobPost",
        fixedSalary.length >= 4
          ? {
              title,
              description,
              category,
              jobType,
              country,
              keySkill,
              location,
              fixedSalary,
            }
          : {
              title,
              description,
              category,
              jobType,
              country,
              keySkill,
              location,
              salaryFrom,
              salaryTo,
            },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      toast.success(data.message);
      setTitle("");
      setDescription("");
      setCategory("");
      setCountry("");
      setJobType("");
      setKeySkill("");
      setLocation("");
      setFixedSalary("");
      setSalaryFrom("");
      setSalaryTo("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="bgimg min-h-screen flex items-center justify-center p-6">
        <div className="container mx-auto max-w-2xl bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Post a Job</h2>
          <form onSubmit={handelSubmit}>
            <div className="mb-2">
              <label className="block font-bold text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Enter Your Title"
              />
            </div>

            <div className="mb-4">
              <label className="block font-bold text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Enter Your Description"
              />
            </div>

            <div className="mb-4">
              <label className="block font-bold text-gray-700">Category</label>
              <select
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {selectedCategory.map((cat,index) => (
                  <option key={index} value={cat.categoryName} >
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-bold text-gray-700">Country</label>
              <input
                type="text"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Enter Your Country"
              />
            </div>

            <div className="mb-4">
              <label className="block font-bold text-gray-700">Job Type</label>
              <select
                id="jobType"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Choose The Job Type</option>
                <option value="Part Time">Part Time</option>
                <option value="Full Time">Full Time</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block font-bold text-gray-700">
                Key Skills
              </label>
              <input
                type="text"
                name="city"
                value={keySkill}
                onChange={(e) => setKeySkill(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Enter Your City"
              />
            </div>

            <div className="mb-4">
              <label className="block font-bold text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
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
                    id="salaryType"
                    className="form-select"
                    value={salaryType}
                    onChange={(e) => setSalaryType(e.target.value)}
                  >
                    <option value="default">Select Salary Type</option>
                    <option value="Fixed Salary">Fixed Salary</option>
                    <option value="Ranged Salary">Ranged Salary</option>
                  </select>

                  {/* Conditional Salary Inputs */}
                  {salaryType === "Fixed Salary" ? (
                    <div className="mt-2">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Fixed Salary"
                        value={fixedSalary}
                        onChange={(e) => setFixedSalary(e.target.value)}
                      />
                    </div>
                  ) : salaryType === "Ranged Salary" ? (
                    <div className="mt-2">
                      <input
                        type="number"
                        className="form-control mb-2"
                        placeholder="Salary From"
                        value={salaryFrom}
                        onChange={(e) => setSalaryFrom(e.target.value)}
                      />
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Salary To"
                        value={salaryTo}
                        onChange={(e) => setSalaryTo(e.target.value)}
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
             {id ? "Update Job" : "Create Job"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PostJob;