import React, {useState, useEffect} from 'react';

import TextField from '@mui/material/TextField';

//NavBars
import LargeNav from './LargeNav';
import MobileNav from './MobileNav';


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
                    <br/><br/><br/><br/><br/>
                </div>
                :
                <div>
                    <br/>
                    <MobileNav/>
                </div>
            }
        </div>
    );
};

export default Home;