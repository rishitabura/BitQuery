import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuestionCard from './QuestionCard';

import { loader } from '../assets';

const DisplayQuestions = ({ title, isLoading, questions }) => {
  
  const navigate = useNavigate();
  const handleNavigate = (q) => {
    navigate(`/question-details/${q.id}`, {state: q})
  }
  
  return (
    <div className='mt-[55px] ml-[35px]'>
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

        {!isLoading && questions.length > 0 && questions.map((question) => (
          <QuestionCard
            key={question.id}
            {...question}
            handleClick={() => handleNavigate(question)}
          />))}
      </div>
    </div>
  )
}

export default DisplayQuestions