import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <NavLink className="navlink" style={{textDecoration:"none"}} to="/simpleMode">Simple Mode</NavLink>
      <NavLink className="navlink" style={{textDecoration:"none"}} to="/hardMode">hard Mode</NavLink>
      <NavLink className="navlink" style={{textDecoration:"none"}}to="/history">Quiz History</NavLink>
    </div>
  );
};
export default Home;
