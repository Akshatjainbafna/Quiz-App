import React, { useEffect, useState } from 'react';
import Axios from "axios";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import './home.css'


function HomePage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [question, setQuestion] = useState('')
    const [userAnswer, setUserAnswer] = useState('');
    const [showAnswer, setShowAnswer] = useState(false);
    const questionIds = ['AreaUnderTheCurve_901', 'BinomialTheorem_901', 'DifferentialCalculus2_901']

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        console.log(currentQuestionIndex)
        Axios.get('https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=' + questionIds[currentQuestionIndex + 1])
            .then(res => setQuestion(res.data[0].Question))
            .catch(err => console.log(err))
        setUserAnswer('');
        setShowAnswer(false);
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        Axios.get('https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=' + questionIds[currentQuestionIndex - 1])
            .then(res => setQuestion(res.data[0].Question))
            .catch(err => console.log(err))
        setUserAnswer('');
        setShowAnswer(false);
    };

    const handleAnswerChange = (event) => {
        setUserAnswer(event.target.value);
    };

    const handleSubmitAnswer = (event) => {
        event.preventDefault();
        setShowAnswer(true);
    };

    useEffect(() => {
        Axios.get('https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=AreaUnderTheCurve_901')
            .then(res => { setQuestion(res.data[0].Question); console.log(res.data) })
            .catch(err => console.log(err))
    }, [])


    return (
        <div className='neoBody'>
            <h1>Mathematics Questions</h1>
            <h2>Question {currentQuestionIndex + 1}</h2>
            <div className='neoQuestionContainer'>
                <MathJaxContext>
                    <MathJax>
                        <div id='neoQuestion'>
                            {question}
                        </div>
                    </MathJax>
                </MathJaxContext>
                <form id='neoForm' onSubmit={handleSubmitAnswer} >
                    <input id="answer" type="text" value={userAnswer} placeholder='Enter Answer' onChange={handleAnswerChange} required/>
                    <button style={{ border: 'none', fontSize: '30px', backgroundColor: 'aliceblue', marginLeft: '10px' }} type="submit"><i className="fa fa-send-o"></i></button>
                </form>
                {showAnswer && <p>Correct Answer.</p>}
                <div className='neoPrevNextButtons'>
                    <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
                    <button onClick={handleNextQuestion} disabled={currentQuestionIndex === 2}>Next</button>
                </div>
            </div>

        </div>
    );
}

export default HomePage;