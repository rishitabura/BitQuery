import React from 'react'

import { tagType, thirdweb } from '../assets';

const QuestionCard = ({ asker, question, domain, extras, amount, handleClick }) => {
  return (
    <div className='sm:w-[800px] xl:max-w-[1000px] max-w-[650px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer' onClick={handleClick}>
        <div className='flex flex-col p-4'>
            <div className='flex flex-row items-center mb-[18px]'>
                <img src={tagType} alt='tag' className='w-[17px] h-[17px] object-contain'/>
                <p className='ml-[12px] mt-[2px] font-epilogue font-bold text-[14px] text-[#808191]'>{domain}</p>            
            </div>
            <div className='block'>
                <h4 className='font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate'>{question}</h4>
                <p className='mt-[5px] font-epliogue font-semibold text-[12px] text-[#b2b3bd] text-left'>Amount: {amount} ETH</p>
            </div>
            <div className='flex items-center mt-[20px] gap-[12px]'>
                <div className='w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]'>
                    <img src={thirdweb} alt='user' className='w-1/2 h-1/2 object-contain'/>
                </div>
                <p className='flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate'>by <span className='text-[#b2b3bd]'>{asker}</span></p>                
            </div>
        </div>
    </div>
  )
}

export default QuestionCard