import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, Navigate} from "react-router-dom";
import { Context } from "../../main";

function Registrer() {
  const job = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "",
  };

  const { isAuthorized, setIsAuthorized, user } = useContext(Context);

  const [data, setData] = useState(job);

  const inputHandler = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    // console.log(data);
    try {
      const response = await axios.post("/api/signUp", data);
      if (response.status === 201) {
        toast.success(response.data.message, {
          position: "top-center",
          message: "Register Success",
        });
        setData(job);
        setIsAuthorized(true);
      } else {
        console.error("failed to insert data", error);
      }
    } catch (error) {
      console.error("error inserting data", error);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <center>
        <div
          className="flex items-center justify-center min-h-screen"
          style={{
            backgroundImage: "url('/Image/back_raga.jpg')",
            backgroundPosition: "center",
            // backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="w-full max-w-md my-16 bg-white rounded-lg shadow-md shadow-slate-400  p-6">
            <h2 className="text-2xl font-bold mb-6">Register</h2>
            <form onSubmit={submitForm}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  onChange={inputHandler}
                  value={data.name}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  onChange={inputHandler}
                  value={data.email}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  onChange={inputHandler}
                  value={data.password}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="confirm-password"
                >
                  Confirm Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  name="confirmPassword"
                  onChange={inputHandler}
                  value={data.confirmPassword}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  for="phone"
                >
                  Phone Number
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="text"
                  placeholder="Enter your phone number"
                  name="phone"
                  onChange={inputHandler}
                  value={data.phone}
                />
              </div>

              {/* <div className="mb-4">
                <label className="text-gray-700 text-sm font-bold mb-2" for="">
                  Select Role:
                </label>
                <select
                  name="role"
                  onChange={inputHandler}
                  value={data.role}
                  id=""
                  classNameName="ms-3"
                >
                  <option value="" style={{ display: "none" }}>
                    Job
                  </option>
                  <option value="Employer">Employer</option>
                  <option value="Job_Seeker">Job Seeker</option>
                </select>
              </div> */}

              <div classNameName="mb-4">
                <label
                  classNameName="text-gray-700 text-sm font-bold mb-2 block"
                  htmlFor="role"
                >
                  Select Role:
                </label>
                <div classNameName="relative">
                  <select
                    name="role"
                    onChange={inputHandler}
                    value={data.role}
                    id="role"
                    classNameName="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  >
                    <option value="" disabled hidden>
                      Choose your role
                    </option>
                    <option value="employer">Employer</option>
                    <option value="jobSeeker">Job Seeker</option>
                  </select>
                  <div classNameName="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 items-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Register
                </button>
              </div>
              <p classNameName="text-md pt-3">
                Already Have An Account &nbsp;
                <span>
                  <Link to="/" classNameName="font-semibold underline">
                    Login Now!!
                  </Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </center>
    </>
  );
}

export default Registrer;
