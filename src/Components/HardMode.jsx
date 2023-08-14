import { useContext, useEffect, useState } from "react";
import "../App.css";
import { AppContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
const HardMode = () => {
  const {
    HardQuiz,
    showPopup,
    PushPreview,
    QuizScoreFun,
    QuizInfo,
    storeHistory,
  } = useContext(AppContext);
  const [timer, setTimer] = useState(900);
  const [hardQuizMode, setHardQuizMode] = useState([...HardQuiz]);
  const [questionCount, setQuestioncount] = useState(0);
  const navigator = useNavigate();

  const question = hardQuizMode[questionCount];
  useEffect(() => {
    let intervel = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    return () => {
      clearInterval(intervel);
    };
  }, [timer]);
  useEffect(() => {
    if (timer === 0) {
      let newArr = hardQuizMode.filter((data) => {
        let dataArr = data.options.filter((op) => {
          return op.color !== "transparent";
        });
        return dataArr.length > 0;
      });

      PushPreview(newArr);

      let scoreArr = hardQuizMode.filter((data) => {
        let score = data.options.filter((op) => {
          if (op.color === "#b1edfa") {
            if (op.value === data.answer) {
              return data;
            }
          }
        });

        return score.length > 0;
      });
      QuizScoreFun(scoreArr.length);
      QuizInfo("Hard Mode", hardQuizMode.length, timer);
      navigator("/preview");
    }
  });
  const Select = (index) => {
    setHardQuizMode((arr) => {
      return arr.map((questions, i) => {
        if (i === questionCount) {
          return {
            ...questions,
            options: questions.options.map((op, j) => {
              if (j === index) {
                return { ...op, color: "#b1edfa" };
              } else {
                return { ...op, color: "transparent" };
              }
            }),
          };
        } else {
          return questions;
        }
      });
    });
  };
  return (
    <div className="mode">
      {showPopup()}
      <div className="subContainer">
        <h1 className="quizHead">Quiz Hard Mode</h1>
        <div className="timeAndQuestion">
          <div className="QuestionCondown">
            Question No.{questionCount + 1} of {hardQuizMode.length}
          </div>
          <div className="timer">
            <div>
              {Math.floor(timer / 60) < 10
                ? `0${Math.floor(timer / 60)}`
                : Math.floor(timer / 60)}
            </div>
            <div>{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</div>
          </div>
        </div>
        <span className="Questions">
          <p className="q">Q{question.id}.</p>
          <p>{question.question}</p>
        </span>
        <div className="options">
          {question.options.map((data, index) => {
            return (
              <div
                onClick={() => Select(index)}
                style={{ backgroundColor: data.color }}
              >
                {index === 0 ? (
                  <h4>A.</h4>
                ) : index === 1 ? (
                  <h4>B.</h4>
                ) : index === 2 ? (
                  <h4>C. </h4>
                ) : (
                  index === 3 && <h4>D.</h4>
                )}
                <div>{data.value}</div>
              </div>
            );
          })}
        </div>
        <div className="questionBtns">
          {questionCount >= 1 ? (
            <button
              onClick={() => {
                setQuestioncount(questionCount - 1);
              }}
            >
              Previous
            </button>
          ) : (
            <p></p>
          )}
          {questionCount < 14 ? (
            <button
              onClick={() => {
                setQuestioncount(questionCount + 1);
              }}
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => {
                let newArr = hardQuizMode.filter((data) => {
                  let dataArr = data.options.filter((op) => {
                    return op.color !== "transparent";
                  });
                  return dataArr.length > 0;
                });

                PushPreview(newArr);

                let scoreArr = hardQuizMode.filter((data) => {
                  let score = data.options.filter((op) => {
                    if (op.color === "#b1edfa") {
                      if (op.value === data.answer) {
                        return data;
                      }
                    }
                  });

                  return score.length > 0;
                });
                QuizScoreFun(scoreArr.length);
                QuizInfo("Hard Mode", hardQuizMode.length, timer);
                let data = {
                  reviewArr: newArr,
                  score: scoreArr.length,
                  mode: "Hard Mode",
                  totalQuestions: hardQuizMode.length,
                  time: timer,
                  liveTime:new Date()
                };
                storeHistory(data);
                navigator("/preview");
              }}
            >
              Submit & Preview
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default HardMode;
