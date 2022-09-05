import './App.css';
import Navbar from './components/header/Navbar';
import { Routes, Route } from "react-router-dom";
import Signin from './components/signup_sign/Signin';
import Signup from './components/signup_sign/Signup';
import Home from './components/home/Home';


function App() {

  return (
    <>

      <Routes>
        <Route exact path="/" element={<Navbar />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/home" element={<Home/>}/>
      </Routes>
    </>

  );
}

export default App;
