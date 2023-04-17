import React, { useState } from 'react'

import { useStateContext } from '../context';
import FormField from './FormField';
import CustomButton from './CustomButton';

const AnswerCard = ({ id }) => {

    const [isLoading, setisLoading] = useState(false);
    const [form, setform] = useState({
        answer: '', // this is the only field currently
    });

    const { answerQuestion } = useStateContext();

    const handleFormFieldChange = (fieldName, e) => {
        setform({ ...form, [fieldName]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setisLoading(true);
        await answerQuestion({...form, });
        setisLoading(false);
        navigate('/user-home');
    }

    return (
        <div>
            <p className="mt-[20px] ml-[32px] font-epilogue fount-medium text-[14px] leading-[30px] text-left text-white">
                Anwser the question...
            </p>
            <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                <form onSubmit={handleSubmit}>
                    <FormField 
                        labelName="Answer"
                        placeholder="Enter answer to the above question here"
                        isTextArea
                        value={form.answer}
                        handleChange={(e) => handleFormFieldChange('extras', e)}
                    />                     
                </form>
            </div>
        </div>
    )
}

export default AnswerCard