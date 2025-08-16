import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router';
import Logo from '../shared/Logo';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // For mobile drawer toggle

  const handleLogOut = () => {
    logOut()
      .then(() => navigate('/'))
      .catch((error) => console.log(error));
  };

  const links = (
    <>
      <li><NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink></li>
      <li><NavLink to="/courts" onClick={() => setIsOpen(false)}>Courts</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm rounded-2xl mb-5 mt-3 p-2 py-5 relative">
      
      {/* Navbar start: Logo and Menu toggle for mobile */}
      <div className="navbar-start flex items-center gap-2">
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn btn-ghost btn-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <Logo />
      </div>

      {/* Navbar center: desktop menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-sm">
          {links}
        </ul>
      </div>

      {/* Navbar end: login or user dropdown */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar btn-sm">
              <div className="w-8 rounded-full">
                <img src={user.photoURL || 'https://i.ibb.co/2FsfXqM/placeholder.png'} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-44"
            >
              <li className="text-sm text-center text-gray-500 pointer-events-none">
                {user.displayName || user.email}
              </li>
              <li className="text-center">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button
                  onClick={handleLogOut}
                  className="btn btn-sm btn-primary w-full rounded-full mt-1"
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-sm btn-primary rounded-full text-white">
            Login
          </Link>
        )}
      </div>

      {/* Mobile drawer for menu links only */}
      {isOpen && (
        <div className="absolute top-[72px] left-0 w-full bg-base-100 shadow-md rounded-b-xl z-40 lg:hidden">
          <ul className="menu px-4 py-2 text-sm space-y-2">
            {links}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
