import React from "react";
import { homephoto } from "../assets";
import { CustomButton } from './';


const About = () => {

  const address = "0xabc";

  return (

    <div>
      <section className="flex justify-between items-center sm:my-16 my-6 sm:px-16 px-6 sm:py-8 py-4  sm:flex-row flex-col bg-[#1c1c24] rounded-[20px] gap-6">   
      <div>
        <h2 className="text-white max-w-[1200px] text-justify lg:pr-32 lg:pl-10">Lorem ipsum dolor sit amet, consectetur adipiscing 
        elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h2>
      </div>


      {/* added image */}
      <div>
      <img
            src={homephoto}
            alt="user"
            className="w-[80%] h-[60%] object-contain rounded-[30px] sm:ml-20"
          />
      </div>
    </section>
      <div>
        {/* Added a button in the about page as well*/}
        <CustomButton
              btnType="button"
              title={address ? "Post Question" : "Create profile"} 
              // TODO: Will have to change this button to match the one on navbar, where if there is an address, the button will show the post question on frontend else it will prompt the user to connect
              styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
              handleClick={() => {
                if (address) navigate("create-campaign");
                else connect();
              }}
            />
      </div>
    
    </div>
    
  )
}

export default About