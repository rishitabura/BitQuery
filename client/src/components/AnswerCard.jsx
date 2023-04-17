import React from 'react'

import { useStateContext } from '../context';

const AnswerCard = ({ id }) => {
  return (
    <div>
        <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Anwser the question...
            </p>
        </div>
    </div>
  )
}

export default AnswerCard