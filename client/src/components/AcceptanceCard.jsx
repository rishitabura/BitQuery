import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomButton from './CustomButton';
import Loader from './Loader';
import { useStateContext } from '../context';

const AcceptanceCard = ({ qid, qamount }) => {

    const navigate = useNavigate();
    const { acceptAnswer, rejectAnswer } = useStateContext();
    const [isLoading, setisLoading] = useState(false);

    const accept = async () => {
        
        console.log("Accepting...");
        setisLoading(true);
        await acceptAnswer(qid, qamount);
        setisLoading(false);
        navigate('/user-home');
    }

    const reject = async () => {
        
        console.log("Rejecting...");
        setisLoading(true);
        await rejectAnswer();
        setisLoading(false);
        navigate('/user-home');
    }
    return (
        <div className='mt-[20px] flex flex-row justify-center items-center'>
            {isLoading && <Loader />}
            <CustomButton 
                btnType="button"
                title='Accept Answer'
                styles='bg-[#1dc071] px-[30px]'
                handleClick={accept}
            />
            <CustomButton 
                btnType="button"
                title='Reject Answer'
                styles='bg-[#1dc071] px-[30px]'
                handleClick={reject}
            />
        </div>
    )
}

export default AcceptanceCard