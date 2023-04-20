import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import CustomButton from './CustomButton';
import { useStateContext } from '../context';

const AcceptanceCard = ({qid}) => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const { acceptAnswer } = useStateContext();

    return (
        <div className='mt-[20px] flex flex-row justify-center items-center'>
            <CustomButton 
                btnType="button"
                title='Accept Answer'
                styles='bg-[#1dc071] px-[30px]'
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