import React, { useState} from "react";
import Answer from "./Answer";
import Question from "./Question";
// import { Sort } from './Sort';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
// import { useNavigate } from "react-router-dom";
import { SpecificAnswer } from "./SpecificAnswer";
// import "./style.css";
const listContext = React.createContext();
const Main = () => {
  const [list, setList] = useState([]);
  // const [viewList, setViewList] = useState([]);
  const [question, setQuestion] = useState("");
  const [error, setError] = useState(false);
  const [id, setId] = useState(0);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  // const a = useNavigate();
  const [showbookmark, setShowBookmark] = useState(false);
    const [viewList, setViewList] = useState([]);

  const Submit = (navigate) => {
    // console.log(id);
    let showdate = new Date();
    let displaydate =
      showdate.getDate() +
      "/" +
      (showdate.getMonth() + 1) +
      "/" +
      showdate.getFullYear();
    let displaytime =
      showdate.getHours() +
      ":" +
      showdate.getMinutes() +
      ":" +
      showdate.getSeconds();
    // console.log(displaydate,displaytime);
    setDate(displaydate);
    setTime(displaytime);
    let details = {
      id: id,
      question: question,
      answer: "",
      bookmark: false,
      vote: 0,
      disable: false,
      date: displaydate,
      time: displaytime,
    };
    //console.log(time);
    // e.preventDefault();
    if (question.length == 0) {
      setError(true);
      console.log(error);
      return;
    }
    setId(id + 1);
    setList(() => [...viewList, details]);
    setViewList((prev) => [...prev, details]);
    navigate('/answer')
    // setList(() => [...viewList, details]);

    console.log(list);
  };
  const handleQuestionChange = (event) => {
    console.log(event.target.value);
    setQuestion(event.target.value);
    console.log(question);
  };
  const handlesetsort = (sortKey) => {
    const Array = [...viewList];
    if (sortKey === "vote") {
      Array.sort((a, b) => a.vote - b.vote);
    } else if (sortKey === "time") {
      Array.sort((a, b) => b.time.localeCompare(a.time));
      console.log(Array);
    }
    return Array;
  };
  const handleSort = (sortKey) => {
    const sorted = handlesetsort(sortKey);
    setViewList(sorted);
  };
  const handleSetBookmark= () => {
    //   setBookmark(!bookmark)
    //  const newArray=list.filter((book)=>book.bookmark==true)
    setShowBookmark(!showbookmark);
    const newArray = list.filter((book) => book.bookmark == true);
    if (showbookmark) {
      console.log("inside if");
      setViewList(list);
    } else {
      console.log("inside else", newArray);
      setViewList(newArray);
    }
  };
 
  const handleIncreaseVote = (id) => {                                                      
  //  let newArray = [...viewList];
  let  newArray=viewList.map((item) => {
    console.log(viewList);
      if (item.id === id) {
      //  console.log(viewList);
      console.log(item);
      console.log(item.vote);
        return  {...item, vote: item.vote + 1};
      } else {
        return item;
      }
    });
    console.log("he",newArray)
    return newArray;
  };
  const handleSetIncreaseVote = (id) => {
    const increase = handleIncreaseVote(id);
    setList(increase);
    setViewList(increase);
    console.log(viewList);
  };
  const handleDecreaseVote = (id) => {
    //let newArray = [...viewList];
    let newArray =  viewList.map((item) => {
      if (item.id === id) {
        return {...item, vote: item.vote - 1};
      } else {
        return item;
      }
    });
   // console.log(list);
    return newArray;
  };
  const handleSetDecreaseVote = (id) => {
    const decrease = handleDecreaseVote(id);
    setViewList(decrease);
  };
  const handleSave = (id) => {
    //let book = [...viewList];
    let book=viewList.map((item) => {
      if (item.id === id) {
        return  {...item,bookmark:item.bookmark = !item.bookmark};
        // (item.bookmark = !item.bookmark);
      } else {
        return item;
      }
    });
    return book;
  };
  const handleSetSave = (id) => {
    const saved = handleSave(id);
    setViewList(saved);
  };
  const handleAnswerSubmit = (id) => {
    // else {
      let showSubmit = [...viewList];
      showSubmit.map((item) => {
        if (item.id === id) {
          return (item.disable = !item.disable);
        } else {
          return item;
        }
      });
     // setList(showSubmit);
     setViewList(showSubmit)
    // }
  };
  const handleDelete = (id) => {
    let removedList = viewList.filter((item) => item.id !== id);
    return removedList;
  };
  const handleSetDelete = (id) => {
    const removed = handleDelete(id);
    setViewList(removed);
  };
  return (
    <listContext.Provider
      value={{
        viewList,
        // error,
        // answer,
        // answererror,
        // question,
        handleSetDelete,
        handleSetBookmark,
        handleSetSave,
        handleSort,
        // handleAnswerChange,
        handleSetIncreaseVote,
        handleSetDecreaseVote,
        handleAnswerSubmit,
        Submit,
        handleQuestionChange,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Question error={error} question={question}/>} />
            <Route path="answer" element={<Answer />} />
            <Route path="answer/:id" element={<SpecificAnswer />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Question />
    <Sort/>
    <Answer /> */}
    </listContext.Provider>
  );
};

export { listContext };
export { Main };
