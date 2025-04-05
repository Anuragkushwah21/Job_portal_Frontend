import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../main";

function Footer() {
  const { isAuthorized } = useContext(Context);
  return (
    <>
      <footer
        // We have use Location insted of auth
        className={isAuthorized ? "footerShow" : "footerHide"}
        style={{ backgroundColor: "black" }}
      >
        <div className="max-w-[1120px]  pt-[2cm]  grid grid-cols-1 md:grid-cols-3 mx-auto">
          <div className="pb-[3cm]">
            <img className="mx-auto" src="/Image/colorlogo.png" alt="" />
            <p className="text-[#ffffff] ms-[1cm] md:ms-[0cm] font-light text-[14px] leading-[25px]">
              PN INFOSYS is a leading global business consulting and IT service
              company. We provides a full range of maintenance and compliance
              services for Government and Commercial facilities both large and
              small. Whether you need to run your business more efficiently or
              accelerate revenue growth, PN INFOSYS can get you there.
            </p>

            <button className="p-2 text-[1cm] my-6 ms-16 mx-auto rounded-lg text-white text-center">
              <Link to="https://www.facebook.com/pninfosys/">
                <i className="fa-brands fa-facebook"></i>
              </Link>
            </button>
            <button className="p-2 text-[1cm] my-6 ms-2 mx-auto rounded-lg text-white text-center">
              <Link to="https://www.instagram.com/pn_infosys/">
                <i className="fa-brands fa-instagram"></i>
              </Link>
            </button>
            <button className="p-2 text-[1cm] my-6 ms-2 mx-auto rounded-lg text-white text-center">
              <Link to="https://www.linkedin.com/company/pninfosys/">
                <i className="fa-brands fa-linkedin"></i>{" "}
              </Link>
            </button>
          </div>

          <div className="mx-auto pb-[3cm] text-white">
            <h1 className="text-xl font-semibold ms-[20px]">Get In Touch!</h1>
            <div className="font-light text-[14px] leading-[25px]">
              <p className="pt-4 ms-[21px]">www.pninfosys.com</p>
              <p>support@pninfosys.com</p>
            </div>

            <div className="ms-6 font-light text-[14px] leading-[25px]">
              <p className="pt-4 text-center">+91 7000846823</p>
              <p className="text-center">+91 7415289378</p>
            </div>

            <div className="font-light text-[14px] leading-[25px]">
              <p className="pt-4 text-center">MIG-332</p>
              <p className="text-center">Darpan Colony,Thatipur,</p>
              <p className="text-center">Gwalior,Madhya Pradesh</p>
            </div>
          </div>

          <div className="mx-auto text-white">
            <h1 className="text-xl font-semibold">COMPANIES WORKSHOP</h1>
            <div className="font-light text-[14px] leading-[25px]">
              <p className="ms-[60px] pt-5">Xiaomi MI Company</p>
              <p className="text-[16px] text-center font-normal">
                August 20 / Mr.Vaibhav Shrivastava
              </p>
            </div>

            <div className="font-light  text-[14px] leading-[25px]">
              <p className="ms-[60px] pt-5">Bentchair Company</p>
              <p className="text-[16px] text-center font-normal">
                October 06 / Mr.Nicket Bansal
              </p>
            </div>

            <div className="font-light text-[14px] leading-[25px]">
              <p className="ms-[60px] pt-5">MPCT College Gwalior</p>
              <p className="text-[16px] text-center font-normal">
                November 02 / PN Infosys Team
              </p>
            </div>

            <div className="font-light text-[14px] leading-[25px]">
              <p className="ms-[60px] pt-5">RJIT College Tekanpur</p>
              <p className="text-[16px] text-center font-normal">
                Febuary 24 / PN Infosys Team
              </p>
            </div>
          </div>
        </div>
        <hr className="max-w-[1020px] text-slate-300 mx-auto mb-12" />
        <p className="text-center mb-5 text-white font-light text-[14px]">
          Copyright © 2024 |
          <span className="font-bold">PN INFOSYS IT COMPANY IN GWALIOR !</span>.
          All rights reserved.
        </p>

        <h1 className="text-[#337ab7] text-center">
          <button className="text-white mb-2">
            <Link to="https://github.com/Anuragkushwah21">
              Made By_Anurag kushwah(9669907552)
            </Link>
          </button>
        </h1>
      </footer>
    </>
  );
}

export default Footer;
