import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainNavbar from './Components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';


function App() {
  return (
    <div className='App'>
     <Router>
      <MainNavbar />
      <Routes>
        <Route path='/home' element={<Home />} ></Route>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
      </Routes>
     </Router>
    </div>
   
  );
}

export default App;
