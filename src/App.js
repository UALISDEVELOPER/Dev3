import React, { useEffect, useState } from 'react';
import { Link, Routes, Route, useNavigate} from "react-router-dom"

//COMPONENTS
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import Home from './components/layout/Home';


//style
import "./style/app.scss"


const App = () => {

  const Navigate = useNavigate();

  useEffect(()=>{
    console.log(localStorage);
    if(localStorage.length){
      console.log("already logedin")
    }else(
      Navigate("/login", {replace : true})
    )
  },[])

  return (
    <div className='App-components'>
      <Routes>
        <Route path="/login/" element={<Login/>}/>
        <Route path="/signup/" element={<Signup/>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>
  );
};

export default App;
