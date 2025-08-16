import React from 'react';
import logo from "../../assets/pngtree-soccer-ball-icon-abstract-logo-with-black-stars-image_324853-removebg-preview.png"
import { Link } from 'react-router';
const Logo = () => {
    return (
        <Link to="/">
            <div className='flex items-center'>
                <img className='w-8 h-8 sm:w-10 sm:h-10 object-contain' src={logo} alt="" />
                <p className='text-3xl -ml-2 font-bold'>EA Sports</p>
            </div>
        </Link>
    );
};

export default Logo;