import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../main";
import toast from "react-hot-toast";

function Profile() {
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  // console.log(isAuthorized)
  const [loading, setLoading] = useState(true);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState(false);

  // Toggle modals
  const togglePasswordModal = () => {
    setIsPasswordModalOpen(!isPasswordModalOpen);
    if (!isPasswordModalOpen) {
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    }
  };

  const toggleProfileModal = () => {
    setIsProfileModalOpen(!isProfileModalOpen);
    if (!isProfileModalOpen) {
      setProfileData({ name: user?.name || "", email: user?.email || "" });
    }
  };

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle password update
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    setUpdatingPassword(true);
    try {
      const response = await axios.post("/api/updatePassword", {
        oldPassword,
        newPassword,
        confirmPassword,
      });

      toast.success(response.data.message || "Password updated successfully!");
      togglePasswordModal();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to update password. Please try again.";
      toast.error(errorMessage);
      console.error("Update Password Error:", error);
    } finally {
      setUpdatingPassword(false);
    }
  };

  // Handle profile update
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const { name, email } = profileData;

    setUpdatingProfile(true);
    try {
      const response = await axios.post("/api/updateProfile", { name, email });
      toast.success(response.data.message || "Profile updated successfully!");
      setUser((prev) => ({ ...prev, name, email }));
      toggleProfileModal();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to update profile. Please try again.";
      toast.error(errorMessage);
      console.error("Update Profile Error:", error);
    } finally {
      setUpdatingProfile(false);
    }
  };

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/getUser");
        setUser(response.data.data);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
        console.error("Fetch User Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [setUser, setIsAuthorized]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden m-8">
        <div className="bg-green-500 h-32 flex items-center justify-center">
          <img
            src={user?.avatar || "../../../public/Image/anuragPi.png"}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
        </div>
        <div className="p-4 text-center">
          <h2 className="text-xl font-semibold text-gray-800">{user?.name}</h2>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-sm text-green-500 mt-1">{user?.role || "User"}</p>
        </div>
        <div className="flex justify-around p-4 bg-gray-100">
          <button
            onClick={toggleProfileModal}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Edit Profile
          </button>
          <button
            onClick={togglePasswordModal}
            className="px-4 py-2 bg-blue-800 text-gray-200 rounded hover:bg-green-600"
          >
            Edit Password
          </button>
        </div>
      </div>

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold">Update Profile</h3>
              <button
                onClick={toggleProfileModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <form className="space-y-4" onSubmit={handleProfileSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileData.name}
                    onChange={handleProfileChange}
                    className="block w-full mt-1 p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="block w-full mt-1 p-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={toggleProfileModal}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    disabled={updatingProfile}
                  >
                    {updatingProfile ? "Updating..." : "Update Profile"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold">Update Password</h3>
              <button
                onClick={togglePasswordModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <form className="space-y-4" onSubmit={handlePasswordSubmit}>
                <div>
                  <label
                    htmlFor="oldPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Old Password
                  </label>
                  <input
                    type="password"
                    id="oldPassword"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full mt-1 p-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={togglePasswordModal}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    disabled={updatingPassword}
                  >
                    {updatingPassword ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
