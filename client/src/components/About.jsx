import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context";

import { homephoto } from "../assets";
import { CustomButton } from './';

const About = () => {

  const { address } = useStateContext();
  const navigate = useNavigate();

  return (

    <div>
      <section className="flex justify-between items-center sm:my-16 my-6 sm:px-16 px-6 sm:py-8 py-4  sm:flex-row flex-col bg-[#1c1c24] rounded-[20px] gap-6">   
      <div>
        <h2 className="text-white max-w-[1200px] text-justify lg:pr-32 lg:pl-10">Development of an educational site where people can post their questions, be it arithmetic, logical, a complex question of a specific subject, programming error related questions. A site where people can ask a question and get an answer for a price that they are willing to pay for an answer to the question. If the user is satisfied by the answer, then the answerer would get the amount. This incentivizes the answers to give valid responses and through the use of Blockchain technology, we wouldhandle the privacy issues faced by the users of pre-existing sites</h2>
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
              title={address ? "Post Question" : "Connect Wallet"} 
              styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
              handleClick={() => {
                if (address) navigate('/user-home');
                else connect();
              }}
            />
      </div>
    
    </div>
    
  )
}

export default About