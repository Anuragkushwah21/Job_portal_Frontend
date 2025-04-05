import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PopularCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from API
    axios
      .get("/api/getallCategory") // Replace with your API URL
      .then((response) => setCategories(response.data.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <>
      {/* Category */}
      <div className="py-12">
        <div className="container mx-auto overflow-hidden">
          <h1
            className="text-center text-5xl font-semibold mb-20 animate-fadeInUp"
            data-wow-delay="0.1s"
          >
            Explore By Category
          </h1>
          <div className="flex flex-wrap -mx-2">
            {categories.map((category, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 lg:w-1/4 px-2 mb-8 animate-fadeInUp"
                data-wow-delay={category.delay}
              >
                <Link
                  className="block bg-white rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
                  to={`/categoryJobs/${category.categoryName}`}
                >
                  <i
                    className={`fa fa-3x ${category.icon} text-[#00b074] mb-4`}
                  ></i>
                  <h6 className="mb-3 font-semibold">{category.categoryName}</h6>
                  <p className="mb-0">{category.vacancyCount} Vacancy</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Category End */}
    </>
  );
}

export default PopularCategories;
