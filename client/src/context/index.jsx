import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    // const { contract } = useContract('0x8a5744a12E8c733d649823047E3C79fE49e14d4f'); // thirdweb contract address
    // const { contract } = useContract('0x0c4B3E5cfB242dE2418773cf171C62869E5bFC44'); // thirdweb contract address for no require statement
    // const { contract } = useContract('0x9DC09a3053a2D7d6c02B438e12c662a5fd6bCE29'); // working thirdweb contract on Goerli old version
    // const { contract } = useContract('0x252219E75A5014C1dae3Fe0c9801E40A13f59FC5'); // goerli contract address, works for questions but not for answers
    
    // const { contract } = useContract('0x1C3360A0E93364285D59C0789cBcdDE37a7Db776'); // working mumbai contract 
    const { contract } = useContract('0x0c4B3E5cfB242dE2418773cf171C62869E5bFC44'); // working mumbai contract, has get answer function added in 
    
    const { mutateAsync: askQuestion } = useContractWrite(contract, 'askQuestion'); // used to write to contract
    const { mutateAsync: answerQuestion } = useContractWrite(contract, 'answerQuestion');
    const { mutateAsync: acceptAnswer } = useContractWrite(contract, 'acceptAnswer');
    const { mutateAsync: rejectAnswer } = useContractWrite(contract, 'rejectAnswer');

    const address = useAddress();
    const connect = useMetamask();

    const getQuestion = async(form) => {
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

        console.log("Questions", questions);

        const parsedQuestions = questions.map((q, i) => ({
            asker: q.asker,
            question: q.question,
            domain: q.domain,
            extras: q.extras,
            amount: ethers.utils.formatEther(q.amount.toString()),
            answered: q.answered,
            id: i
        }));

        console.log("Questions call success", parsedQuestions);
        return parsedQuestions;
    }

    const getUserQuestions = async() => {
        const allQuestions = await getQuestions();

        const filteredQuestions = allQuestions.filter((question) => question.asker === address);

        return filteredQuestions;
    }

    // TODO: still have to implement this while searching for domain specific questions
    const getDomainQuestions = async(dom) => {
        const allQuestions = await getQuestions();

        const domainQuestions = allQuestions.filter((question) => question.domain === dom);

        return domainQuestions;
    }  

    const getAnswer = async(id) => {
        const ans = await contract.call('getAnswer', id);

        const parsedAnswer = {
            responder: ans.responder,
            answer: ans.answer,
            accepted: ans.accepted,
            rejected: ans.rejected,
            id: id
        };

        console.log("Answer", ans);

        console.log("parsedAnswer", parsedAnswer);

        return parsedAnswer;
    }

    const submitAnswer = async(form) => {
        try {
            const data = await answerQuestion([
                address, //responder
                form.id, // id of the question
                form.answer //answer to the question
            ])

            console.log("Answer contract call success", data);
        } catch (error) {
            console.log("Answer contract call failure", error);
        }
    }

    const accept = async(qid) => {
        try {
            const data = await acceptAnswer([
                qid // id of the question
            ])

            console.log("Answer accept call success", data);
        } catch (error) {
            console.log("Answer accept call failure", error);
        }
    }

    return (
        <StateContext.Provider
            value={{ 
                address,
                contract,
                connect,
                askQuestion: getQuestion,
                getQuestions,
                getUserQuestions,
                getDomainQuestions,
                answerQuestion: submitAnswer,
                getAnswer,
                acceptAnswer: accept
             }}
        >
        {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);