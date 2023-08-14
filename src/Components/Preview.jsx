import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const Preview = () => {
  const { preview, showPopup, quizScore, quizData } = useContext(AppContext);
  const [previewq, setPreviewq] = useState([...preview]);
  const navigate = useNavigate();
  const [time, setTime] = useState();
  const [attemptedQ, setAttemptedQ] = useState([...preview]);
  useEffect(() => {
    setTime(quizData.total === 10 ? 600 : 900);
  }, []);
  useEffect(() => {
    setAttemptedQ((arr) => {
      return arr.map((question) => {
        let q = question.options.find((data) => {
          if (data.color === "#b1edfa") {
            if (data.value === question.answer) {
              return data;
            }
          }
        });
        if (q) {
          return {
            ...question,
            color: "green",
          };
        } else {
          return {
            ...question,
            color: "red",
          };
        }
      });
    });
  }, []);
  useEffect(() => {
    if (preview.length === 0) {
      navigate("/");
    }
  });
  useEffect(() => {
    setPreviewq((arr) => {
      return arr.map((questions) => {
        return {
          ...questions,
          options: questions.options.map((op, j) => {
            if (op.value === questions.answer) {
              return { ...op, color: "#7dfa7d" };
            }
            if (op.color === "#b1edfa") {
              return { ...op, color: "#ff8a8c" };
            } else {
              return { ...op, color: "transparent" };
            }
          }),
        };
      });
    });
  }, []);
  return (
    <>
      {showPopup()}
      <a  className="Upbutton" href="#score">Up</a>
      <div className="preview" id="score">
        <div className="scoreShow" >
          <div className="QuizMode">
            <div>
              Quiz Mode:<span>{quizData.Qmode}</span>
            </div>
            <div>
              Total Questions : <span>{quizData.total}Q</span>
            </div>
            <div>
              Your Score:
              <span>
                {quizScore}/{quizData.total}
              </span>
            </div>
          </div>
          <div className="attempts">
            <div>
              Questions Attempted :{/* <span>{previewq.length}</span> */}
            </div>
            <div className="attemptQcontainer">
              {attemptedQ.map((data) => {
                return (
                  <div style={{ backgroundColor: data.color }}>
                    <a href={`#${data.id}`}>Q{data.id}</a>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="scoreTimer">
            <div>
              Time:
              <span>
                {Math.floor(time / 60) -
                  Math.round(quizData.time / 60) +
                  ":" +
                  (60 - (quizData.time % 60))}
              </span>
              Sec
            </div>
            <div>
              Result:
              <span>
                {(quizScore / quizData.total) * 100 >= 45
                  ? "Good"
                  : (quizScore / quizData.total) * 100 >= 60
                  ? "very Good"
                  : (quizScore / quizData.total) * 100 >= 85
                  ? "Excellent"
                  : "Very Bad"}
              </span>
            </div>
          </div>
        </div>
        <h1>Check Your Answers</h1>
        {previewq.map((data, index) => {
          return (
            <div className="previewContainer" id={data.id} key={index}>
              <div>
                <span className="Questions">
                  <p className="q">Q{data.id}.</p>
                  <p>{data.question}</p>
                </span>
                <div className="options">
                  {data.options.map((data, index) => {
                    return (
                      <div style={{ backgroundColor: data.color }}>
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
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Preview;
