import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ethers } from 'ethers';
import { Sidebar } from "../components";

import { useStateContext } from '../context';
import { CustomButton, Loader } from '../components';
import { thirdweb } from '../assets';

//TODO: Still to implement Loader component on this

const QuestionDetails = () => {

    const { state } = useLocation();
    const { getAnswers, contract, address } = useStateContext();
    
    const [isLoading, setisLoading] = useState(false);
    const [amount, setamount] = useState('');

    return (
        <div>
            <div className="relative sm:-8 p-1 bg-[#13131a] min-h-screen flex flex-row">
                <div className="sm:flex hidden mr-10 relative">
                    <Sidebar />
                </div>

            </div>
        </div>
    )
}

export default QuestionDetails