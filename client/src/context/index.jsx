import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0x8a5744a12E8c733d649823047E3C79fE49e14d4f'); // thirdweb contract address
    const { mutateAsync: askQuestion } = useContractWrite(contract, 'askQuestion'); // used to write to contract

    const address = useAddress();
    const connect = useMetamask();

    const getQuestion = async(form) => {

        try {
            const data = await askQuestion([
                address, // asker
                form.question, // question
                form.domain, // domain
                form.price // price
            ])         
            
            console.log("Contract call success", data);
        } catch (error) {
            console.log("Contract call failure", error);
        }
    }

    return (
        <StateContext.Provider
            value={{ 
                address,
                contract,
                connect,
                askQuestion: getQuestion,
             }}
        >
        {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);