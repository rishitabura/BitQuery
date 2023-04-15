import React from 'react';
import { useNavigate } from 'react-router-dom';

import { loader } from '../assets';

const DisplayQuestions = ({ title, isLoading, questions }) => {
  
  const navigate = useNavigate();
  
  return (
    <div>
      <h1 className='font-epilogue font-semibold text-[18px] text-white text-left'>{title} ({questions.length})</h1>
      <div className='flex flex-wrap mt-[20px] gap-[26px]'>
        {isLoading && (
          <img src={loader} alt='loader' className='w-[100px] h-[100px] object-contain'/>
        )}

        {!isLoading && questions.length === 0 && (
          <p className='font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]'>
            No questions created!!
          </p>
        )}
      </div>
    </div>
  )
}

export default DisplayQuestions