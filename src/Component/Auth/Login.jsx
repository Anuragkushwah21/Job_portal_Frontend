import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../../main";

function Login() {
  const { isAuthorized, setIsAuthorized } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal
  const [forgotEmail, setForgotEmail] = useState(""); // Email for password reset

  const SubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/signIn", {
        email,
        password,
        role,
      });
      setIsAuthorized(true);
      toast.success("Login successful!", {
        position: "top-center",
      });

      // console.log("Login successful:", response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!", {
        position: "top-center",
      });
      console.log("Login error:", error);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/forgotPassword", {
        email: forgotEmail,
      });
      toast.success(response.data.message || "Password reset link sent!", {
        position: "top-center",
      });
      setIsModalOpen(false); // Close modal after successful submission
      setForgotEmail(""); // Clear email input
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset link.", {
        position: "top-center",
      });
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen blur-background"
        style={{
          backgroundImage: "url('/Image/background_login.jpeg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="w-full max-w-xs">
          <form
            onSubmit={SubmitForm}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="***********"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="role"
              >
                Select Role:
              </label>
              <select
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                id="role"
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              >
                <option value="" disabled hidden>
                  Select Role
                </option>
                <option value="employer">Employer</option>
                <option value="jobSeeker">Job Seeker</option>
              </select>
            </div>

            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
            </div>
            <p className="text-md pt-3">
              Don't Have An Account?&nbsp;
              <Link to="/registrer" className="font-semibold underline">
                Register Now!
              </Link>
              <span
                className="font-semibold underline cursor-pointer text-blue-500 ml-3"
                onClick={() => setIsModalOpen(true)}
              >
                Forgot Password!
              </span>
            </p>
          </form>
        </div>
      </div>

      {/* Modal for Forgot Password */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4">Forgot Password</h2>
            <form onSubmit={handleForgotPassword}>
              <label
                htmlFor="forgot-email"
                className="block text-sm font-medium text-gray-700"
              >
                Enter your email:
              </label>
              <input
                type="email"
                id="forgot-email"
                className="mt-2 block w-full border border-gray-300 rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
