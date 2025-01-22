import React from 'react';
import Navabar from '../SharedComponents/Navabar';
import { Outlet } from 'react-router-dom';
import DashNav from '../Pages/Dashboard/DashNav';
import Footer from '../SharedComponents/Footer';

const Dashboard = () => {
    return (
        <div>
            <Navabar></Navabar>
            <div className='mt-10 flex max-w-[1440px] mx-auto px-4 md:px-[30px]'>
                <div><DashNav></DashNav></div>
                <div className='flex-1 overflow-auto px-10'><Outlet></Outlet></div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;