import React from 'react';
import { Link } from 'react-router-dom';
//MUI Icons
import TableChartIcon from '@mui/icons-material/TableChart';
import AppsIcon from '@mui/icons-material/Apps';
import HomeIcon from '@mui/icons-material/Home';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PersonIcon from '@mui/icons-material/Person';


//styles
import "./style/mobileNav.css"

const MobileNav = () => {

    const list = document.querySelectorAll('.list');
    function activeLink(){
        list.forEach((item) => item.classList.remove('active'));
        this.classList.add('active')
    }
    list.forEach((item) => item.addEventListener('click',activeLink));

    return (
        <div class="navigation">
            <ul>
                <li class="list active">
                    <Link to="/home/">
                        <span class="icon"><HomeIcon fontSize="large" color="primary" /></span>
                        <span class="text">خانه</span>
                    </Link>
                </li>
                <li class="list">
                    <Link to="/home/applog/">
                        <span class="icon"><AppsIcon fontSize="large" color="primary" /></span>
                        <span class="text">برنامه ها</span>
                    </Link>
                </li>
                <li class="list">
                    <Link to="/home/userlog/">
                        <span class="icon"><TableChartIcon fontSize="large" color="primary" /></span>
                        <span class="text">لاگ کاربران</span>
                    </Link>
                </li>
                <li class="list">
                    <Link to="/home/createApp/">
                        <span class="icon"><AppRegistrationIcon fontSize="large" color="primary" /></span>
                        <span class="text">ایجاد برنامه</span>
                    </Link>
                </li>
                <li class="list">
                    <Link to="#">
                        <span class="icon"><PersonIcon fontSize="large" color="primary" /></span>
                        <span class="text">پروفایل</span>
                    </Link>
                </li>
                <div class="indicatior"></div>
            </ul>
        </div>
    );
};

export default MobileNav;