import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0x0c4B3E5cfB242dE2418773cf171C62869E5bFC44'); // working mumbai contract, has get answer function added in 
    
    const { mutateAsync: askQuestion } = useContractWrite(contract, 'askQuestion'); // used to write to contract
    const { mutateAsync: answerQuestion } = useContractWrite(contract, 'answerQuestion');

    const address = useAddress();
    const connect = useMetamask();

    const getQuestion = async(form) => {
        try {
            const data = await askQuestion([
                address, // asker
                form.question, // question
                form.domain, // domain
                form.extras, // extras
                form.amount // amount
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

    const accept = async(qid, qamount) => {

        try {
            const data = await contract.call('acceptAnswer', qid, {value: ethers.utils.parseEther(qamount)});

            console.log("Answer accept call success", data);
        } catch (error) {
            console.log("Answer accept call failure", error);
        }
    }

    const reject = async() => {

        try {
            const data = await contract.call('rejectAnswer');

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
                acceptAnswer: accept,
                rejectAnswer: reject
             }}
        >
        {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);