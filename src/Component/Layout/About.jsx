import React from 'react'

function About() {
  return (
    <>
     {/* About */}

     <div className="container-xxl py-12">
        <div className="container">
          <div className="flex flex-wrap items-center gap-5">
            {/* First column */}
            <div
              className="lg:w-1/2 w-full animate-fadeIn"
              data-wow-delay="0.1s"
            >
              <div className="flex flex-wrap gap-0 rounded-lg overflow-hidden">
                <div className="w-1/2 text-start">
                  <img
                    className="w-full object-cover"
                    src="/Image/about-1.jpg"
                    alt="About 1"
                  />
                </div>
                <div className="w-1/2 text-start">
                  <img
                    className="w-[85%] mt-1/6 object-cover"
                    src="/Image/about-2.jpg"
                    alt="About 2"
                  />
                </div>
                <div className="w-1/2 text-end">
                  <img
                    className="w-[85%] object-cover"
                    src="/Image/about-3.jpg"
                    alt="About 3"
                  />
                </div>
                <div className="w-1/2 text-end">
                  <img
                    className="w-full object-cover"
                    src="/Image/about-4.jpg"
                    alt="About 4"
                  />
                </div>
              </div>
            </div>

            {/* Second column */}
            <div
              className="lg:w-1/3 w-full animate-fadeIn"
              data-wow-delay="0.5s"
            >
              <h1 className="text-2xl font-bold mb-4">
                We Help To Get The Best Job And Find A Talent
              </h1>
              <p className="mb-4">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo magna dolore erat amet
              </p>
              <p className="flex items-center mb-2">
                <i className="fa fa-check text-[#00b074] mr-3"></i>Tempor erat
                elitr rebum at clita
              </p>
              <p className="flex items-center mb-2">
                <i className="fa fa-check text-[#00b074] mr-3"></i>Aliqu diam
                amet diam et eos
              </p>
              <p className="flex items-center mb-4">
                <i className="fa fa-check text-[#00b074] mr-3"></i>Clita duo
                justo magna dolore erat amet
              </p>
              <a
                className="btn-[#00b074] py-3 px-5 mt-3 inline-block bg-[#00b074] text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                href=""
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* About */}
    </>
  )
}

export default About
