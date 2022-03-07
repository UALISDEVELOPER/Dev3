import React from 'react';
import { Link, Routes, Route} from "react-router-dom"

//COMPONENTS
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import Home from './components/layout/Home';

//style
import "./style/app.scss"

const App = () => {
  return (
    <div className='App-components'>
      <div>
        <Link to="/login">login</Link>
        <Link to="/signup">signup</Link>
      </div>
      <Routes>
        <Route path="/login/" element={<Login/>}/>
        <Route path="/signup/" element={<Signup/>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  );
};

export default App;
