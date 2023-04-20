import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import FormField from './FormField';
import CustomButton from './CustomButton';
import Loader from './Loader';

const AnswerCard = ({ qid }) => {

    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(false);
    const [form, setform] = useState({
        id: qid,
        answer: '', // this is the only field currently
    });

    console.log(qid);

    const { answerQuestion } = useStateContext();

    const handleFormFieldChange = (fieldName, e) => {
        setform({ ...form, [fieldName]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
 
        setisLoading(true);
        await answerQuestion({...form});
        setisLoading(false);
        navigate('/user-home');

        console.log("This is the answer form", form);
    };

    return (
        <div>
            {isLoading && <Loader />}
            <p className="mt-[20px] ml-[32px] font-epilogue fount-medium text-[14px] leading-[30px] text-left text-white">
                Anwser the question...
            </p>
            <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                <form onSubmit={handleSubmit} className='w-full flex flex-col gap-[30px]'>
                    <FormField 
                        labelName="Answer"
                        placeholder="Enter answer to the above question here"
                        isTextArea
                        value={form.answer}
                        handleChange={(e) => handleFormFieldChange('answer', e)}
                    />   
                    <div className='flex justify-center items-center mt-[40px]'>
                        <CustomButton 
                            btnType="submit"
                            title='Submit Answer'
                            styles='bg-[#1dc071] px-[30px]'
                        />
                    </div>                  
                </form>
            </div>
        </div>
    )
}

export default AnswerCard