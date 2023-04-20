import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomButton from './CustomButton';
import { useStateContext } from '../context';

const AcceptanceCard = ({ qid, qamount }) => {

    const navigate = useNavigate();
    const { acceptAnswer } = useStateContext();
    const [isLoading, setisLoading] = useState(false);

    const accept = async () => {
        
        console.log("Accepting...");
        setisLoading(true);
        await acceptAnswer(qid, qamount);
        setisLoading(false);
        navigate('/user-home');
    }

    return (
        <div className='mt-[20px] flex flex-row justify-center items-center'>
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
            />
        </div>
    )
}

export default AcceptanceCard