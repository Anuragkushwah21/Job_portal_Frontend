import React, { useState } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Extract token from query params

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid or expired token.", { position: "top-center" });
      return;
    }

    try {
      const response = await axios.post("/api/resetPassword", {
        token,
        password: newPassword,
      });
      toast.success(response.data.message || "Password reset successfully!", {
        position: "top-center",
      });
      setIsSuccess(true); // Redirect after success
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to reset password.",
        { position: "top-center" }
      );
    }
  };

  if (isSuccess) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder="Enter new password"
              className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
