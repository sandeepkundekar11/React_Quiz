import { useContext } from "react";
import { AppContext } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const Popup = () => {
  const { getPopup } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className="popUp">
      <p>You really want to quite this quiz</p>
      <div className="btns">
        <button
          onClick={() => {
            getPopup("");
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            getPopup("");
            navigate("/");
          }}
        >
          Quite
        </button>
      </div>
    </div>
  );
};
export default Popup;
