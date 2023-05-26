import React,{useContext} from 'react'
import { useParams } from 'react-router-dom';
import { listContext } from './Main';
import { Icon } from '@iconify/react';

const SpecificAnswer = () => {
    const{viewList,answer,answererror,handleSetDelete,handleSetIncreaseVote,handleSetSave,handleSetDecreaseVote,handleAnswerSubmit,handleAnswerChange }=useContext(listContext)  ;
      const IncreaseVote = (id) => {
        handleSetIncreaseVote(id);
      };
      const DecreaseVote = (id) => {
        handleSetDecreaseVote(id);
      };
      const Submit=(id)=>{
        handleAnswerSubmit(id);
      }
      const Change=(event)=>{
        handleAnswerChange(event);
      } 
      const Save = (id) => {
        handleSetSave(id);
      };
      const Delete = (id) => () => {
        handleSetDelete(id);
      };
    const {id}=useParams()
    console.log(id)
    console.log(viewList);

  
  return (
    
    <>
  
  <div className="scroll">
    {viewList.filter((question)=>question.id===+id).map((question) => {
      return (
        
        <div className="Answer" key={question.id}>
          <div className="vote">
            <div className="number">
              {question.vote}</div>
            <div>
            <Icon
                className="arrow-icon"
                icon="ic:round-arrow-drop-up"
                onClick={() => IncreaseVote(question.id)}
              />
              <Icon
                className="arrow-icon"
                icon="ic:round-arrow-drop-down"
                onClick={() => DecreaseVote(question.id)}
              />   </div>
          </div>
          <div className="qa">
        <h3>{question.question}</h3>
            <div>
              {question.disable ? (
                <textarea
                  className="answer-textarea"
                  disabled
                  onChange={Change}
                ></textarea>
              ) : (
                <textarea
                  className="answer-textarea"
                  onChange={Change}
                ></textarea>
              )}
              {answererror && answer.length <= 0 ? (
                <p className="warning">*Answer can't be empty</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="right">
          {question.bookmark ? (
              <Icon
                icon="ri:bookmark-fill"
                className="bookmark-icon"
                color="#003552"
                onClick={() => Save(question.id)}
              />
            ) : (
              <Icon
                icon="ri:bookmark-fill"
                color="white"
                className="bookmark-icon"
                onClick={() => Save(question.id)}
              />
            )}
            {/* <button onClick={() => Save(question.id)}>save</button> */}
            {!question.disable ? (
              <button
                onClick={() => Submit(question.id)}
                className="answer-submit-button"
              >
                SUBMIT
              </button>
            ) : (
              <></>
            )}

            <Icon
              icon="ic:baseline-delete"
              className="delete"
              onClick={Delete(question.id)}
            />
            <div className="date-time">
              {question.date}&nbsp;{question.time}
            </div>
          </div>
        </div>
      );
    })}
  </div>
  </>
  )
}

export  {SpecificAnswer};
