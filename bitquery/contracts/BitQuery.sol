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
        string answer;
        bool accepted;
        bool rejected;
    }
    
    mapping(uint256 => Question) public questions;
    mapping(uint256 => Answer) public answers;
    uint256 public questionCount = 0;
    
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
    
    function answerQuestion(address payable _responder, uint256 _questionId, string memory _answer) public {
        Question storage question = questions[_questionId];
        Answer storage ans = answers[_questionId];

        ans.responder = _responder;
        ans.answer = _answer;
        ans.accepted = false;
        ans.rejected = false;
        question.answered = true; 
    }
    
    function acceptAnswer(uint256 _questionId) public payable {
        Answer storage answer = answers[_questionId];

        address payable _to = answer.responder;

        uint256 payout = msg.value;
        (bool sent,) = _to.call{value: payout}("");
        require(sent, "Failed to send Ether");
        if(sent){
            answer.accepted = true;
            answer.rejected = false;
        }
    }

    function rejectAnswer(uint256 _questionId) public {
        Question storage question = questions[_questionId];
        Answer storage answer = answers[_questionId];

        question.answered = false;
        answer.accepted = false;
        answer.rejected = true;
    }

    function getQuestions() public view returns (Question[] memory) {
        Question[] memory allQuestions = new Question[](questionCount);

        for(uint i = 0; i < questionCount; i++) {
            allQuestions[i] = questions[i];
        }
        return allQuestions;
    }

    function getAnswer(uint256 _questionId) public view returns (Answer memory) {
        Answer memory answer = answers[_questionId];

        return answer;
    }
}
