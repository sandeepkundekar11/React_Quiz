import { createContext, useEffect, useState } from "react";
import simpleModequiz from "../quizJson/simpleModequiz.json";
import HardModequiz from "../quizJson/hardModequiz.json";
import Popup from "../Components/Popup";
export const AppContext = createContext();
const ContextProvider = (props) => {
  const getHistory=()=>
  {
    let data=localStorage.getItem("history")
    if(data)
    {
      return JSON.parse(data)
    }
    else
    {
      return []
    }
  }
  const SimpleQuiz = [...simpleModequiz];
  const HardQuiz = [...HardModequiz];
  const [popup, setPopup] = useState("");
  const [preview, setPreview] = useState([]);
  const [quizScore,setQuizscore]=useState(0)
  const [quizData,setQuizData]=useState({Qmode:"",total:0,time:0})
  const [history,setHistory]=useState(getHistory())
  useEffect(()=>
  {
    localStorage.setItem("history",JSON.stringify(history))
  },[history])
  const QuizScoreFun=(data)=>
  {
    setQuizscore(data)
  }
  const PushPreview = (arr = []) => {
    setPreview([...arr]);
  };
  const getPopup = (data) => {
    setPopup(data);
  };
  const arr = [
    {
      title: "popup",
      comp: <Popup />,
    },
  ];

  const QuizInfo=(mode,totalQ,time)=>
  {
    setQuizData({
      Qmode:mode,
      total:totalQ,
      time:time
    })
  }
  const showPopup = () => {
    let component = arr.find((obj) => {
      return obj.title === popup;
    });
    if (component) {
      return component.comp;
    } else {
      return <></>;
    }
  };
  const storeHistory=(data={})=>
  {
    setHistory([...history,data])
  }
  const info = {
    SimpleQuiz,
    HardQuiz,
    showPopup,
    getPopup,
    PushPreview,
    preview,
    QuizScoreFun,
    quizScore,
    QuizInfo,
    quizData,
    storeHistory
  };
  return (
    <AppContext.Provider value={info}>{props.children}</AppContext.Provider>
  );
};
export default ContextProvider;
