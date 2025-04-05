import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CategoryInsert() {
  const [categoryName, setCategory] = useState("");
  const [categories, setCategories] = useState([]); // Initialize as an array
  const [icon, setIcon] = useState("");
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/categoryInsert", {
        categoryName,
        icon,
      });
      setCategory("");
      setIcon("");
      toast.success(response.data.message || "Category inserted successfully!");
      fetchCategories(); // Refresh the list after inserting
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/employerCategory");
      console.log(response.data)
      setCategories(response.data.category); // Assuming API returns an array of category objects
    } catch (error) {
      console.error("Error fetching Category listings:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/deleteCategory/${id}`);
      toast.success(response.data.message || "Category deleted successfully!");
      fetchCategories(); // Refresh the list after deletion
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while deleting");
    }
  };
  navigate("/categoryInsert")

  useEffect(() => {
    fetchCategories();
  }, []);


  return (
    <>
      <div className="col-md-5 mx-auto p-4">
        <h2 className="my-4 text-center">Category Insert</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Category Name"
              className="form-control"
              value={categoryName}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Icon"
              className="form-control"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-outline-success" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Categories Posted By You
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category._id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <h5 className="text-lg font-bold mb-2">
                  {category.categoryName}
                </h5>
                <p className="text-sm mb-2">
                  <i className="fas fa-map-marker-alt text-blue-600 mr-2"></i>
                  {category.icon}
                </p>
                <p className="text-sm">
                  <i className="far fa-calendar-alt text-blue-600 mr-2"></i>
                  Posted on:{" "}
                  {new Date(category.createdAt).toLocaleDateString()}
                </p>
                <div className="mt-4 flex space-x-3">
                  <button
                    className="btn btn-danger text-white bg-red-500 hover:bg-red-700 py-1 px-3 rounded"
                    onClick={() => handleDelete(category._id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600">
              No Category posted yet.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CategoryInsert;
