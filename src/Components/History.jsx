import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const History = () => {
  const { showPopup, PushPreview, QuizScoreFun, QuizInfo } =
    useContext(AppContext);
  const navigator = useNavigate();
  const getHistory = () => {
    let data = localStorage.getItem("history");
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };
  const [historyArr, setHistoryArr] = useState(getHistory());
  useEffect(() => {
    setHistoryArr((arr) => {
      return arr.map((data) => {
        return {
          ...data,
          reviewArr: data.reviewArr.map((questions) => {
            let q = questions.options.find((qdata) => {
              if (qdata.color === "#b1edfa") {
                if (qdata.value === questions.answer) {
                  return qdata;
                }
              }
            });

            if (q) {
              return {
                ...questions,
                color: "green",
              };
            } else {
              return {
                ...questions,
                color: "red",
              };
            }
          }),
        };
      });
    });
  }, []);
  const previewQuestion = (data) => {
    navigator("/preview");
    PushPreview(data.reviewArr);

    QuizScoreFun(data.score);
    QuizInfo(data.mode, data.totalQuestions, data?.time);
  };
  return (
    <div className="historyContainer">
      <h1 style={{ textAlign: "center" }}>Quiz History</h1>
      {showPopup()}
      {historyArr.length === 0 ? (
        <div className="emptyHistory">
          <div>No history available</div>
        </div>
      ) : (
        historyArr.map((data) => {
          return (
            <div
              className="historyDiv"
              onClick={() => {
                previewQuestion(data);
              }}
            >
              <div className="scoreShow">
                <div className="QuizMode">
                  <div>
                    Quiz Mode:<span>{data.mode}</span>
                  </div>
                  <div>
                    Total Questions : <span>{data.totalQuestions}Q</span>
                  </div>
                  <div>
                    Your Score:
                    <span>
                      {data.score}/{data.totalQuestions}
                    </span>
                  </div>
                </div>
                <div className="attempts">
                  <div>
                    Questions Attempted :{/* <span>{previewq.length}</span> */}
                  </div>
                  <div className="attemptQcontainer">
                    {data.reviewArr.map((data1) => {
                      return (
                        <div style={{ backgroundColor: data1.color }}>
                          <a href={`#${data1.id}`}>Q{data1.id}</a>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="scoreTimer">
                  <div>
                    Time:
                    <span>
                      {Math.round(
                        (data.mode === "Hard Mode" ? 900 : 600) / 60
                      ) -
                        Math.round(data.time / 60) +
                        ":" +
                        (60 - (data.time % 60))}
                    </span>
                    Sec
                  </div>
                  <div className="date">
                    Date:
                    <span>
                      {new Date(data.liveTime).getFullYear()}/
                      {new Date(data.liveTime).getMonth() < 10
                        ? `0${new Date(data.liveTime).getMonth()}`
                        : new Date(data.liveTime).getMonth()}
                      /
                      {new Date(data.liveTime).getDay() < 10
                        ? `0${new Date(data.liveTime).getDay()}`
                        : new Date(data.liveTime).getDay()}
                    </span>
                    <span>
                      {new Date(data.liveTime).getHours() > 12
                        ? new Date(data.liveTime).getHours() - 12
                        : new Date(data.liveTime).getHours()}
                      :
                      {new Date(data.liveTime).getMinutes() < 10
                        ? `0${new Date(data.liveTime).getMinutes()}`
                        : new Date(data.liveTime).getMinutes()}
                      :
                      {new Date(data.liveTime).getSeconds() < 10
                        ? `0${new Date(data.liveTime).getSeconds()}`
                        : new Date(data.liveTime).getSeconds()}
                      {new Date(data.liveTime).getHours() >= 12 ? "PM" : "AM"}
                    </span>
                  </div>
                  <div>
                    Result:
                    <span>
                      {(data.score / data.totalQuestions) * 100 >= 45
                        ? "Good"
                        : (data.score / data.totalQuestions) * 100 >= 60
                        ? "very Good"
                        : (data.score / data.totalQuestions) * 100 >= 85
                        ? "Excellent"
                        : "Very Bad"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}

      {historyArr.length !== 0 && (
        <div className="clearHistory">
          <button
            onClick={() => {
              localStorage.removeItem("history");
              setHistoryArr(getHistory());
            }}
          >
            Clear history
          </button>
        </div>
      )}
    </div>
  );
};
export default History;
