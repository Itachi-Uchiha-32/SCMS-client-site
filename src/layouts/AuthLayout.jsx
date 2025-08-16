import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../pages/shared/Logo';

const AuthLayout = () => {
    return (
        <div className="p-12 bg-gradient-to-br from-blue-100 to-blue-300 ">
            <Logo/>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='flex-1'>
                    <img
                    src="https://i.postimg.cc/sDzn1XTh/sports-tools-53876-138077.avif"
                    className="max-w-full rounded-lg shadow-2xl"
                    />
                </div>
                <div className='flex-1 '>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;