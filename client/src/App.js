import logo from './logo.svg';
import './App.css';
// import Chart from '../../server/Components/chart.js'
// import Calculate from '../../server/Components/calculate.js'
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import Landing from "./Components/landing.js";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        
      </Routes>
    </div>
  );
}

export default App;
