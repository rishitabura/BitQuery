import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { CustomButton, About } from "../components";
import { logo, menu, search, thirdweb } from "../assets";
import { navlinks } from "../constants";

const Home = () => {
  return (
    <div>
      <div className="flex flex-row justify-center items-center h-[100px] my-50">
        {/* This search bar is in the center of the homepage */}
        <div className="lg:flex-1 flex flex-row xl:max-w-[1000px] max-w-[650px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
          <input
            type="text"
            placeholder="Search for domains"
            className="flex  w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-[#ffffff] bg-transparent outline-none"
          />

          <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
            <img
              src={search}
              alt="search"
              className="w-[15px] h-[15px] object-contain"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse justify-between items-center">
        <About />
      </div>
    </div>
  );
};

export default Home;
