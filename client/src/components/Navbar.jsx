import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useStateContext } from "../context";
import { CustomButton } from "./";
import { logo, menu, thirdweb, logo_transparent } from "../assets";

{
  /* removed search from imports */
}
import { navlinks } from "../constants";

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[80px] h-[80px] rounded-[10px] ${
      isActive && isActive == name && "bg-[#2c2f32]"
    } flex justify-center items-center ${
      !disabled && "cursor-pointer"
    } ${styles}`}
    onClick={handleClick}
  >
    {!isActive ? (
      <img src={imgUrl} alt="fund_logo" className="w-15 h-15" />
    ) : (
      <img
        src={imgUrl}
        alt="fund_logo"
        className={`w-5 h-5 ${isActive !== name && "grayscale"}`}
      />
    )}
  </div>
);

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();

  // const address = "0xabc";
  // let address; // * if we do not give an address, it will change the frontend to show the connect buttons and help buttons

  return (
    <div className="flex flex-col-reverse mb-[35px] max-h-[100px] gap-6 mt-5">
      {" "}
      {/* removed md:flex-reverse to align the help and profile button to the right*/}
      {/* div for logo  */}
      {/* search bar */}
      {/* <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2  h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input type="text" placeholder="Search for domains" className="flex  w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none" />

        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <img src={search} alt="search" className="w-[15px] h-[15px] object-contain" />

        </div>
      </div> */}
      {/* search bar trial*/}
      {/* <div> */}
      {/* <input type="text" placeholder="Search for domains" className="flex  w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none" />

        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <img src={search} alt="search" className="w-[15px] h-[15px] object-contain" />

        </div> */}
      {/* </div> */}
      {/* tried to do something but ended up doing nothing */}
      {/* Well the search bar isn't needed here as it is in the center*/}
      {/* <div className=" lg:flex-1 bg-[#1c1c24] rounded-[100px] pb-5">
        <div>
          <input
            type="text"
            placeholder="Search for domains"
            className="flex  w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
          />
        </div>
      </div> */}
      {/* CREATE PROFILE BUTTON FOR large devices*/}
      <div className="sm:flex flex-row justify-between">
      <Link to="/">
            <Icon
              styles="w-[100px] h-[100px]"
              imgUrl={logo_transparent}
            />
          </Link>
        <div className="sm:flex hidden flex-row justify-end gap-[10px]">
          <CustomButton
            btnType="button"
            title={address ? "Post Question" : "Connect Wallet"} 
            // {/* If the address is present , it means that the user already has a profile, if there is no address, we prompt the user to connect / create a profile */}
            styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
            handleClick={() => {
              if (address) navigate("user-home");
              // * Changed navigation from create campaign to post question
              else connect();
            }}
          />

          {/* added help button for large devices */}
          <CustomButton
            btnType="button"
            title={address ? "Help" : "Help"} 
            // TODO: Have to add a help page for both, if there is an address present as well as if there is no address present.
            styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
            handleClick={() => {
              if (address) navigate("help-address");
              else connect();
            }}
          />

        </div>
      </div>
      {/**/}
      <div className="sm:hidden flex justify-between items-center relative">
        {/* <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img
            src={logo_transparent}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
          />
        </div> */}
        {/* // * Logo for small devices */}

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${
                  isActive === link.name && "bg-[#3a3a43]"
                }`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${
                    isActive === link.name ? "grayscale-0" : "grayscale"
                  }`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === link.name ? "text-[#1dc071]" : "text-[#808191]"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          {/* create profile for small devices */}
          {/* This should'nt actually be in the navbar but on the homepage where there would be a create profile button on the homepage itself*/}
          <div className="flex mx-4">
            <CustomButton
              btnType="button"
              title={address ? "Post Question" : "Connect"}
              styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
              handleClick={() => {
                if (address) navigate("user-home");
                else connect();
              }}
            />

            {/* added help button for small devices */}
            <CustomButton
              btnType="button"
              title={address ? "Help" : "Connect"}
              styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
              handleClick={() => {
                if (address) navigate("create-campaign");
                // TODO: add help page and support
                else connect();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
