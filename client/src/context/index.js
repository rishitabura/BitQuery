import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0x1B9f815B5eC7eAC192a0db25CDD149bE6Ea5aa35'); // thirdweb contract address
    const { mutateAsync: askQuestion } = useContractWrite(contract, 'askQuestion'); // used to write to contract

    const address = useAddress();
    const connect = useMetamask();

    const getQuestion = async(form) => {
        const data = await askQuestion([

        ])
    }
}