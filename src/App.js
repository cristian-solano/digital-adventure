import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './Pages/LandingPage';
import Register from './Pages/Register';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage/>}></Route>
          <Route path="/registro" element={<Register />}></Route>
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
