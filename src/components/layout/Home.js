import React, {useState, useEffect} from 'react';

import { Route, Routes } from "react-router-dom"

//NavBars
import LargeNav from './LargeNav';
import MobileNav from './MobileNav';

//components
import AppLog from '../util/AppLog';
import UserLog from '../util/UserLog';


const Home = () => {

    const [screenWidth , setScreenWidth] = useState(true);

    useEffect(()=>{
        setScreenWidth(window.innerWidth);
    },[])


    return (
        <div className='home-component'>
            {
                screenWidth > 600 ?
                <div>
                    <LargeNav/>
                    <br/><br/><br/>
                </div>
                :
                <div>
                    <MobileNav/>
                </div>
            }
            <Routes>
                <Route path="/applog/" element={<AppLog/>}/>
                <Route path="/userlog/" element={<UserLog/>}/>
            </Routes>
        </div>
    );
};

export default Home;