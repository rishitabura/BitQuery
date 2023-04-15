import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    // const { contract } = useContract('0x8a5744a12E8c733d649823047E3C79fE49e14d4f'); // thirdweb contract address
    // const { contract } = useContract('0x0c4B3E5cfB242dE2418773cf171C62869E5bFC44'); // thirdweb contract address for no require statement
    // const { contract } = useContract('0x9DC09a3053a2D7d6c02B438e12c662a5fd6bCE29'); // working thirdweb contract on Goerli old version
    const { contract } = useContract('0x252219E75A5014C1dae3Fe0c9801E40A13f59FC5');
    const { mutateAsync: askQuestion } = useContractWrite(contract, 'askQuestion'); // used to write to contract

    const address = useAddress();
    const connect = useMetamask();

    const getQuestion = async(form) => {

        // TODO: will have to make changes here once contract is updated to hold extra information and price is changed into amount field
        try {
            const data = await askQuestion([
                address, // asker
                form.question, // question
                form.domain, // domain
                form.extras, // extras
                form.amount // price
            ])         
            
            console.log("Contract call success", data);
        } catch (error) {
            console.log("Contract call failure", error);
        }
    }

    const getQuestions = async() => {
        const questions = await contract.call('getQuestions');

        // TODO: will have to make changes here once contract is updated to hold extra information and price is changed into amount field

        const parsedQuestions = questions.map((q, i) => ({
            asker: q.asker,
            question: q.question,
            domain: q.domain,
            extras: q.extras,
            amount: ethers.utils.formatEther(q.amount.toString()),
            pId: i
        }));

        console.log("Questions call success", parsedQuestions);
        return parsedQuestions;
    }

    return (
        <StateContext.Provider
            value={{ 
                address,
                contract,
                connect,
                askQuestion: getQuestion,
                getQuestions
             }}
        >
        {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);