import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { Context } from "../../main";
import jobIcon from "../../../public/Image/job.png";

function JobListByCategory()  {
    const { cName } = useParams();
    const [category, setCategory] = useState([]);
    const { isAuthorized } = useContext(Context);
  
    // Fetch jobs by category
    const categoryList = async () => {
      try {
        const { data } = await axios.get(`/api/categoryJob/${cName}`);
        setCategory(data.categoryList);
      } catch (error) {
        console.error("Error fetching category list:", error);
      }
    };
  
    // Fetch category list on component mount
    useEffect(() => {
      categoryList();
    }, [cName]);
  
    // Render the component
    return isAuthorized ? (
      <div className="container-xxl py-5">
        <div className="container">
          <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
            {cName} Jobs
          </h1>
          <div className="row g-4">
            {category.length === 0 ? (
              <p>No Job is found for this Job Category</p>
            ) : (
              category.map((job) => (
                <div className="job-item p-4 mb-4" key={job._id}>
                  <div className="row g-4">
                    <div className="col-sm-12 col-md-8 d-flex align-items-center">
                      <img
                        className="flex-shrink-0 img-fluid border rounded"
                        src={jobIcon}
                        alt={job.title || "Job Image"}
                        style={{ width: 70, height: 70 }}
                      />
                      <div className="text-start ps-4">
                        <h5 className="mb-3">{job.title}</h5>
                        <span className="text-truncate me-3">
                          <i className="fa fa-map-marker-alt text-primary me-2" />
                          {job.location}
                        </span>
                        <span className="text-truncate me-3">
                        <i className="fa-solid fa-list"></i>
                          {job.category}
                        </span>
                        <span className="text-truncate me-0">
                          <i className="far fa-money-bill-alt text-primary me-2" />
                          ₹{" "}
                          {job.fixedSalary ||
                            `${job.salaryFrom} - ${job.salaryTo}`}
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                      <div className="d-flex mb-3">
                        <Link
                          to={`/job/${job._id}`}
                          className="btn btn-primary"
                        >
                          For more details
                        </Link>
                      </div>
                      <small className="text-truncate">
                        {job.postedDate &&
                          new Date(job.postedDate).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    ) : (
      <Navigate to={"/"} />
    );
  }

export default JobListByCategory
