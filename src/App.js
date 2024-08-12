import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './Pages/LandingPage';
import Register from './Pages/Signup';
import Profile from './Pages/Profile';
import Home from './Pages/Home';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage/>}></Route>
          <Route path="/signup" element={<Register />}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/homepage" element={<Home/>}></Route>
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
