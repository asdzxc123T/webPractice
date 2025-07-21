import "./App.css";
import LjwBtns from "./ljwBtns/ljwBtns";
import LjwH1 from "./ljwH1/ljwH1";
import LjwTest from "./ljwTest/ljwTest";

// yarn add @reduxjs/toolkit react-redux
function App() {
    return (
        <>
            <LjwTest />
            <hr />
            <LjwBtns />
            <LjwH1 />
        </>
    );
}

export default App;
