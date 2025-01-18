import React from 'react';
import Navabar from '../SharedComponents/Navabar';
import { Outlet } from 'react-router-dom';
import DashNav from '../Pages/Dashboard/DashNav';

const Dashboard = () => {
    return (
        <div>
            <Navabar></Navabar>
            <div className='mt-10 flex max-w-[1440px] mx-auto px-4 md:px-[30px]'>
                <div><DashNav></DashNav></div>
                <div className='flex-1'><Outlet></Outlet></div>
            </div>
        </div>
    );
};

export default Dashboard;