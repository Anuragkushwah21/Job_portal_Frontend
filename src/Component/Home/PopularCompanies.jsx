// import React from "react";

// function PopularCompanies() {
//   return (
//     <>
//       <h1>PopularCompanies</h1>
      
//     </>
//   );
// }

// export default PopularCompanies;
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../main";

function PopularCategories() {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const [categoryData, setCategoryData] = useState([]);
  const { isAuthorized, user } = useContext(Context);

  // Fetch category list
  const CategoryList = async () => {
    try {
      const { data } = await axios.get(`/api/getCategoryById/${id}`);
      setCategoryData(data.getCategoryById || []);
    } catch (error) {
      console.error("Error fetching category list:", error);
    }
  };

  // Fetch category data on mount
  useEffect(() => {
    if (isAuthorized) {
      CategoryList();
    } else {
      navigateTo("/");
    }
  }, [id, isAuthorized, navigateTo]);

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <h1 className="text-center text-3xl mb-5 wow fadeInUp" data-wow-delay="0.1s">
          Category List
        </h1>
        <div
          className="tab-class text-center wow fadeInUp"
          data-wow-delay="0.3s"
        >
          <div className="tab-content">
            <div className="tab-pane fade show p-0 active">
              {categoryData.map((element) => {
                const postedDate = new Date(
                  element.jobPostedOn
                ).toLocaleDateString();

                return (
                  <div className="job-item p-4 mb-4" key={element._id}>
                    <div className="row g-4">
                      <div className="col-sm-12 col-md-8 d-flex align-items-center">
                        <img
                          className="flex-shrink-0 img-fluid border rounded"
                          src={element.img || "img/com-logo-1.jpg"}
                          alt={element.title}
                          style={{ width: 80, height: 80 }}
                        />
                        <div className="text-start ps-4">
                          <h5 className="mb-3">{element.title}</h5>
                          <span className="text-truncate me-3">
                            <i className="fa fa-map-marker-alt text-primary me-2" />
                            {element.location}
                          </span>
                          <span className="text-truncate me-3">
                            <i className="far fa-clock text-primary me-2" />
                            {element.category}
                          </span>
                          <span className="text-truncate me-0">
                            <i className="far fa-money-bill-alt text-primary me-2" />
                            ₹{" "}
                            {element.fixedSalary ||
                              `${element.salaryFrom} - ${element.salaryTo}`}
                          </span>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                        <div className="d-flex mb-3">
                          <Link
                            to={`/getallCategory/${element._id}`}
                            className="btn btn-primary"
                          >
                            For more details
                          </Link>
                        </div>
                        <small className="text-truncate">{postedDate}</small>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularCategories;
