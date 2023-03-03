import React from "react";
import { CustomButton } from './';

const About = () => {

  const address = "0xabc";

  return (
    <section className="flex justify-between items-center sm:my-16 my-6 sm:px-16 px-6 sm:py-12 py-4 sm:flex-row flex-col bg-[#1c1c24] rounded-[20px] gap-6">   
      <div>
        <h2 className="text-white max-w-[1200px] text-justify lg:pr-32 lg:pl-10">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h2>
      </div>

      <div>
      {/* Added a button in the about page as well*/}
      <CustomButton
              btnType="button"
              title={address ? "Create a profile" : "Connect"}
              styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
              handleClick={() => {
                if (address) navigate("create-campaign");
                else connect();
              }}
            />
      </div>
    </section>
  )
}

export default About