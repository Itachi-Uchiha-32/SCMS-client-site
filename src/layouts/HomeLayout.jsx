import React from 'react';
import { Outlet } from 'react-router';

const HomeLayout = () => {
    return (
        <div className='p-12 bg-[#fff8f6]'>
            <Outlet/>
        </div>
    );
};

export default HomeLayout;