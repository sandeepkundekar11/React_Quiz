import HardMode from "./Components/HardMode";
import History from "./Components/History";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Preview from "./Components/Preview";
import SimpleMode from "./Components/SimpleMode";
import ContextProvider from "./context/ContextProvider";
import {BrowserRouter,Route,Routes,HashRouter} from "react-router-dom"
const App = () => {
  return (
    <ContextProvider>
      <HashRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/simpleMode" element={<SimpleMode/>}/>
        <Route path="/hardMode" element={<HardMode/>}/>
        <Route path="/preview" element={<Preview/>}/>
        <Route path="/history" element={<History/>}/>
      </Routes>
      </HashRouter>
    </ContextProvider>
  );
};
export default App;
