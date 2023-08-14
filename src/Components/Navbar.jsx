import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../context/ContextProvider";

const Navbar = () => {
  const location = useLocation();
  const { getPopup } = useContext(AppContext);
  return (
    <div className="Navbar">
      {location.pathname === "/" ? (
        ""
      ) : (
        <button
          onClick={() => {
            getPopup("popup");
          }}
        >
          Home
        </button>
      )}
      <h2>Quiz App</h2>
    </div>
  );
};
export default Navbar;
