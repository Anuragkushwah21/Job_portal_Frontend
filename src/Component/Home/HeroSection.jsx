import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function HeroSection() {
  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://job-bakend.onrender.com/api/getallCategory", {
          withCredentials: true
        });
        setSelectedCategory(response.data.data);
      } catch (error) {
        toast.error("Failed to load categories");
      }
    };

    const fetchLocations = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/all`,{withCredentials: true});
        const locationData = response.data.map((country) => ({
          id: country.cca3,
          locationName: country.name.common,
        }));
        setLocations(locationData);
      } catch (error) {
        toast.error("Failed to load locations");
      }
    };

    fetchCategories();
    fetchLocations();
  }, []);

  const handleSearch = () => {
    if (!category && !location && !keyword) {
      toast.error("Please enter a keyword, category, or location to search");
      return;
    }

    toast.success("Search submitted!");
    // You can pass keyword, category, location to parent or use navigation
  };

  return (
    <>
      <div className="relative w-full">
        <div className="relative">
          <img className="w-full h-auto" src="/Image/carousel-1.jpg" alt="Banner" />
          <div className="absolute inset-0 flex items-center bg-[rgba(43,57,64,0.5)]">
            <div className="container mx-auto px-4">
              <div className="flex justify-start">
                <div className="w-full lg:w-4/5">
                  <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 animate-slideInDown">
                    Find The Perfect Job That You Deserve
                  </h1>
                  <p className="text-lg lg:text-xl font-medium text-white mb-4 pb-2">
                    Vero elitr justo clita lorem. Ipsum dolor at sed stet sit
                    diam no. Kasd rebum ipsum et diam justo clita et kasd
                    rebum sea elitr.
                  </p>
                  <div>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="bg-[#00b074] text-xl py-3 px-5 mr-3 inline-block animate-slideInLeft text-white"
                    >
                      Search A Job
                    </a>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="bg-orange-500 text-xl py-3 px-5 inline-block animate-slideInRight text-white"
                    >
                      Find A Talent
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-[#00b074] mb-5 p-[35px]">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-5/6 px-2">
              <div className="flex flex-wrap -mx-2">
                <div className="w-full md:w-1/3 px-2">
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full p-3 rounded"
                    placeholder="Keyword"
                  />
                </div>
                <div className="w-full md:w-1/3 px-2">
                  <select
                    className="w-full p-3 rounded"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {selectedCategory.map((cat, index) => (
                      <option key={index} value={cat.categoryName}>
                        {cat.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full md:w-1/3 px-2">
                  <select
                    className="w-full p-3 rounded"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="">Select Location</option>
                    {locations.map((loc) => (
                      <option key={loc.id} value={loc.locationName}>
                        {loc.locationName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/6 px-2">
              <button
                className="bg-black text-white w-full py-3 rounded"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Search Section Ends */}
    </>
  );
}

export default HeroSection;
