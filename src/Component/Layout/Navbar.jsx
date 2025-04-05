import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";

function Navbar() {
  const navigateTo = useNavigate();
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/getUser");
        // console.log(response.data.data)
        setUser(response.data.data);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [setUser, setIsAuthorized]);
  const handleLogout = async () => {
    try {
      const { data } = await axios.post("/api/signOut");
      toast.success(data.message);
      setIsAuthorized(false);
      setUser(null);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message, setIsAuthorized(true));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <nav
        className={`md:flex md:justify-between md:items-center bg-white px-3 w-full py-3 z-10 ${
          isAuthorized ? "navbarShow" : "navbarHide"
        }`}
      >
        <div className="logo flex justify-between items-center">
          <h1 className="text-4xl font-bold text-green-500 text-center">
            PN JOB PORTAL
          </h1>

          {/* mobile icon */}
          <button onClick={() => setOpen(!open)} className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
          </button>
        </div>

        <div className="menu md:flex hidden">
          <ul className="md:flex gap-5 text-black font-semibold text-[17px] mt-2">
            <li className="nav-item">
              <Link to="/" onClick={() => setOpen(false)}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/job/getAll" onClick={() => setOpen(false)}>
                All Job
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/application/me" onClick={() => setOpen(false)}>
                {user && user.role === "employer"
                  ? "Applications Applicant"
                  : "My Applications"}
              </Link>
            </li>
            {user && user.role === "employer" && (
              <>
                <li className="nav-item">
                  <Link to="/job/post" onClick={() => setOpen(false)}>
                    Post New Job
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/categoryInsert" onClick={() => setOpen(false)}>
                    PostNewCategory
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/job/me" onClick={() => setOpen(false)}>
                    View Your Job
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item text-green-500 rounded hover:bg-slate-300">
              <div className="tooltip-container">
                <Link to="/profile" onClick={() => setOpen(false)}>
                  <img
                    src={user?.avatar || "../../../public/Image/anuragPi.png"}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
                  />
                </Link>
                <span className="tooltip-text">{user?.name || "User"}</span>
              </div>
            </li>

            <li>
              <button
                className="btn my-auto hover:bg-red-500 text-white bg-[#00b074]"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        {/* Mobile menu */}
        {open && (
          <div className="md:hidden py-3 flex justify-center">
            <ul className="text-black font-semibold text-[17px]">
              <li>
                <Link to="/" onClick={() => setOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/job/getAll" onClick={() => setOpen(false)}>
                  All Job
                </Link>
              </li>
              <li>
                <Link to="/job/me" onClick={() => setOpen(false)}>
                  My Job Application
                </Link>
              </li>
              <li>
                <Link to="/applications/me" onClick={() => setOpen(false)}>
                  {user && user.role === "employer"
                    ? "Applications Applicant"
                    : "My Applications"}
                </Link>
              </li>
              {user && user.role === "employer" && (
                <>
                  <li className="nav-item">
                    <Link to="/job/post" onClick={() => setOpen(false)}>
                      Post New Job
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/job/me" onClick={() => setOpen(false)}>
                      View Your Job
                    </Link>
                  </li>
                </>
              )}
              <li className="nav-item text-green-500 bg-slate-800 hover:bg-red-500">
                <Link to="/profile" onClick={() => setOpen(false)}>
                  {user.name}
                </Link>
              </li>
              <li>
                <button className="btn bg-[#00b074]" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
