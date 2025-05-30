import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../../main";

function Registrer() {
  const initialData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "",
  };

  const { isAuthorized, setIsAuthorized } = useContext(Context);
  const [data, setData] = useState(initialData);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (
      !data.name ||
      !data.email ||
      !data.password ||
      !data.confirmPassword ||
      !data.phone ||
      !data.role
    ) {
      toast.error("Please fill in all fields", { position: "top-center" });
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match", { position: "top-center" });
      return;
    }

    try {
      const response = await axios.post(
        "https://job-bakend.onrender.com/api/signUp",
        data
      );

      if (response.status === 201) {
        toast.success("Registered successfully!", {
          position: "top-center",
        });
        setData(initialData);
        setIsAuthorized(true);
      } else {
        toast.error("Failed to register", { position: "top-center" });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed", {
        position: "top-center",
      });
    }
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: "url('/Image/back_raga.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full max-w-md my-16 bg-white rounded-lg shadow-md shadow-slate-400 p-6">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <form onSubmit={submitForm}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              name="name"
              onChange={inputHandler}
              value={data.name}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={inputHandler}
              value={data.email}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={inputHandler}
              value={data.password}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              name="confirmPassword"
              onChange={inputHandler}
              value={data.confirmPassword}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
              Phone Number
            </label>
            <input
              id="phone"
              type="text"
              placeholder="Enter your phone number"
              name="phone"
              onChange={inputHandler}
              value={data.phone}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="text-gray-700 text-sm font-bold mb-2 block">
              Select Role:
            </label>
            <select
              name="role"
              onChange={inputHandler}
              value={data.role}
              id="role"
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:border-blue-500"
            >
              <option value="" disabled hidden>
                Choose your role
              </option>
              <option value="employer">Employer</option>
              <option value="jobSeeker">Job Seeker</option>
            </select>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>

          <p className="text-md pt-3 text-center">
            Already Have An Account?{" "}
            <Link to="/" className="font-semibold underline">
              Login Now!!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registrer;
