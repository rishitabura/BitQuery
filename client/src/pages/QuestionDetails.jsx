import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ethers } from 'ethers';
import { AnswerCard, AcceptanceCard } from "../components";

import { useStateContext } from '../context';
import { tagType, thirdweb, loader } from '../assets';

//TODO: Still to implement Loader component on this

const QuestionDetails = () => {

    const { state } = useLocation();
    const { contract, address, getAnswer } = useStateContext();
    
    const [isLoading, setisLoading] = useState(false);
    const [answer, setanswer] = useState([]);

    const fetchAnswer = async () => {
        const data = await getAnswer(state.id);

        setanswer(data);

        console.log("fetchAnswer data: ", data);
    };

    useEffect(() => {
      if(contract) fetchAnswer();
    }, [contract, address]);
    
    const answered = state.answered;

    return (
        <div>  
            <div className='mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]'>
                <div className='flex flex-col p-4'>
                    <div className='flex flex-row items-center mb-[18px]'>
                        <img src={tagType} alt='tag' className='w-[17px] h-[17px] object-contain'/>
                        <p className='ml-[12px] mt-[2px] font-epilogue font-bold text-[14px] text-[#808191]'>{state.domain}</p>            
                    </div>
                    <div className='block'>
                        <h4 className='font-epilogue font-semibold text-[16px] text-white text-left leading-[26px]'>{state.question}</h4>
                        <h5 className='mt-[12px] font-epilogue font-normal text-[14px] text-white text-left leading-[26px]'>{state.extras}</h5>
                        <p className='mt-[20px] font-epliogue font-semibold text-[12px] text-[#b2b3bd] text-left'>Amount: {state.amount} ETH</p>
                    </div>
                    <div className='flex items-center mt-[20px] gap-[12px]'>
                        <div className='w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]'>
                            <img src={thirdweb} alt='user' className='w-1/2 h-1/2 object-contain'/>
                        </div>
                        <p className='flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate'>by <span className='text-[#b2b3bd]'>{state.asker}</span></p>                
                    </div>
                </div>
            </div>   
            <div>
                {isLoading && (
                    <img src={loader} alt='loader' className='w-[100px] h-[100px] object-contain'/>
                )}

                {!isLoading && answered && (
                    <div>
                        <div>
                            <p className="mt-[20px] ml-[32px] font-epilogue fount-medium text-[14px] leading-[30px] text-left text-white">
                                This is the answer to the question.
                            </p>
                            <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                                <div className='mt-[20px]'>                         
                                    <p className='ml-[20px] font-epilogue font-normal text-[16px] text-white text-left leading-[26px]'>
                                        {answer.answer}
                                    </p>
                                    <div className='flex items-center mt-[20px] ml-[20px] gap-[12px]'>
                                        <div className='w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]'>
                                            <img src={thirdweb} alt='user' className='w-1/2 h-1/2 object-contain'/>
                                        </div>
                                        <p className='flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate'>by <span className='text-[#b2b3bd]'>{answer.responder}</span></p>                
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {!isLoading && !answered && (
                    <div>
                        <AnswerCard 
                            qid={state.id}
                        />
                    </div>
                )}
            </div>     
            <div>
                {!isLoading && answered && address===state.asker && (
                    <div>
                        <AcceptanceCard 
                            qid={state.id}
                            qamount={state.amount}
                        />
                    </div>
                )}
            </div>      
        </div>
    );
}

export default QuestionDetails