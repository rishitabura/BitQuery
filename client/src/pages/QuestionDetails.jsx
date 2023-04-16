import React from 'react'
import { useStateContext } from "../context";

import { DisplayQuestions, Sidebar } from "../components";
import { search } from "../assets";

const QuestionDetails = () => {
  return (
    <div>
        <div className="lg:flex-1 flex flex-row xl:max-w-[1000px] max-w-[650px] mx-auto mt-[50px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
            <input
                type="text"
                placeholder="Search for domains"
                className="flex  w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-[#ffffff] bg-transparent outline-none"
            />
        </div>
        <div className="relative sm:-8 p-1 bg-[#13131a] min-h-screen flex flex-row">
            <div className="sm:flex hidden mr-10 relative">
                <Sidebar />
            </div>     
        </div>
    </div>
  )
}

export default QuestionDetails