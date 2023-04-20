import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CustomButton, FormField, Loader } from '../components';

const PostQuestion = () => {
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false);
    const { askQuestion } = useStateContext();
    const [form, setform] = useState({
        domain: '',
        question: '',
        extras: '', // optional
        amount: '', 
    });

    const handleFormFieldChange = (fieldName, e) => {
        setform({ ...form, [fieldName]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setisLoading(true);
        await askQuestion({...form, amount: ethers.utils.parseUnits(form.amount, 18)});
        setisLoading(false);
        navigate('/user-home');

        console.log(form);
    };

  return (
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
        {isLoading && <Loader />}
        <div className='flex justify-center items-center flex-col p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
            <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>Post your Question</h1>
        </div>

        <form onSubmit={handleSubmit} className='w-full mt-[65px] flex flex-col gap-[30px]'>
            <FormField 
                labelName="Domain *"
                placeholder="Select Domain" 
                // {/* // TODO: change the input type from text to dropdown */}
                inputType="text"
                value={form.domain}
                handleChange={(e) => handleFormFieldChange('domain', e)}
            />
            <FormField 
                labelName="Your Question *"
                placeholder="Enter your question here"
                isTextArea 
                value={form.question}
                handleChange={(e) => handleFormFieldChange('question', e)}
            />
            {/* Removed the image field */}
            {/* <FormField 
                labelName="Image"
                placeholder="Enter an image here if needed"
                inputType="url" 
                value={form.image}
                handleChange={(e) => handleFormFieldChange('image', e)}
            />   */}
            <FormField 
                labelName="Extras"
                placeholder="Enter any additional stuff, if needed (E.g. methods already tried/implemented"
                isTextArea
                value={form.extras}
                handleChange={(e) => handleFormFieldChange('extras', e)}
            />  
            <FormField 
                labelName="Amount *"
                placeholder="Enter the amount willing to pay here"
                inputType="text" 
                value={form.amount}
                handleChange={(e) => handleFormFieldChange('amount', e)}
            />   
            <div className='flex justify-center items-center mt-[40px]'>
                <CustomButton 
                    btnType="submit"
                    title='Post the Question'
                    styles='bg-[#1dc071] px-[30px]'
                />
            </div>      
        </form>
    </div>
  )
}

export default PostQuestion