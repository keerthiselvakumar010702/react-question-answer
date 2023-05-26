import React, { useContext,useState } from 'react'
import { listContext } from "./Main";
import { useNavigate } from 'react-router-dom';
import {  Link } from "react-router-dom";
// import "./style.css";
const Question = ({error,question}) => {
    const{Submit,handleQuestionChange}=useContext(listContext)  ;
  // const [date, setDate] = useState();
  const navigate = useNavigate();
  const handleSubmit=()=>{
    Submit(navigate);
    // navigate('/answer')
  }
  // const [time, setTime] = useState();

  return (
    <div>
        <div>
      <div className="question">
        <div>
          <h1>ASK QUESTION</h1>
        </div>
        <div>
          <textarea value={question} onChange={handleQuestionChange}></textarea>
          {error && question.length <= 0 ? (
            <p className="warning">*Question can't be empty</p>
          ) : (
            ""
          )}
        </div>
        <div>
         <button className="question-submit-button"  onClick={handleSubmit}>
         SUBMIT
         
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Question
