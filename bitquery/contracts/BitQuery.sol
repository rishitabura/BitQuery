// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract BitQuery {
    struct Question {
        address payable asker;
        string question;
        string domain;
        string extras;
        uint256 amount;
        bool answered;
    }
    
    struct Answer {
        address payable responder;
        string answerText;
        bool accepted;
    }
    
    mapping(uint256 => Question) public questions;
    mapping(uint256 => Answer) public answers;
    uint256 public questionCount = 0;

    event NewAnswer(uint256 indexed questionId, address indexed responder, string answerText);
    event QuestionAccepted(uint256 indexed questionId);
    
    function askQuestion(address payable _asker, string memory _question, string memory _domain,string memory _extras, uint256 _amount) public payable {

        Question storage q = questions[questionCount];

        q.asker = _asker;
        q.question = _question;
        q.domain = _domain;
        q.amount = _amount;
        q.extras = _extras;
        q.answered = false; // initially false as the question not answered

        questionCount++;
    }
    
    function answerQuestion(uint256 questionId, string memory answerText) public {
        Question storage question = questions[questionId];
        require(msg.sender != question.asker, "Asker cannot answer their own question");
        require(!question.answered, "Question has already been answered");
        answers[questionId] = Answer(payable(msg.sender), answerText, false);
        emit NewAnswer(questionId, msg.sender, answerText);
    }
    
    function acceptAnswer(uint256 questionId) public {
        Question storage question = questions[questionId];
        Answer storage answer = answers[questionId];
        require(msg.sender == question.asker, "Only asker can accept an answer");
        require(!question.answered, "Question has already been answered");
        answer.accepted = true;
        question.answered = true;
        uint256 payout = answer.responder.balance + question.amount;
        answer.responder.transfer(payout);
        emit QuestionAccepted(questionId);
    }

    function getQuestions() public view returns (Question[] memory) {
        Question[] memory allQuestions = new Question[](questionCount);

        for(uint i = 0; i < questionCount; i++) {
            allQuestions[i] = questions[i];
        }
        return allQuestions;
    }
}
