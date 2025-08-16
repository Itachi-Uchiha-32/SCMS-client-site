import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router';
import { FaMoon, FaSun } from 'react-icons/fa';
import Logo from '../shared/Logo';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const handleLogOut = () => {
    logOut()
      .then(() => navigate('/'))
      .catch((error) => console.log(error));
  };

  // Update DaisyUI theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const loggedOutLinks = [
    { to: '/', label: 'Home' },
    { to: '/courts', label: 'Courts' },
    { to: '/about', label: 'About' },
  ];

  const loggedInLinks = [
    { to: '/', label: 'Home' },
    { to: '/courts', label: 'Courts' },
    { to: '/profile', label: 'Profile' },
    { to: '/my-bookings', label: 'My Bookings' },
    { to: '/contact', label: 'Contact' },
  ];

  const links = user ? loggedInLinks : loggedOutLinks;

  return (
    <nav className="navbar bg-base-100 text-base-content shadow-sm fixed top-0 left-0 w-full z-50 px-4 lg:px-8">
      {/* Navbar start */}
      <div className="navbar-start flex items-center gap-2">
        {/* Mobile menu button */}
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <Logo />
      </div>

      {/* Navbar center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-sm">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="hover:text-primary transition-colors"
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Navbar end */}
      <div className="navbar-end flex items-center gap-2">
        {/* Theme toggle button */}
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="btn btn-ghost btn-sm"
        >
          {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
        </button>

        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar btn-sm"
            >
              <div className="w-8 rounded-full">
                <img
                  src={user.photoURL || 'https://i.ibb.co/2FsfXqM/placeholder.png'}
                  alt="User avatar"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-44"
            >
              <li className="text-sm text-center pointer-events-none">
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
          <Link
            to="/login"
            className="btn btn-sm btn-primary rounded-full text-white"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="lg:hidden absolute top-[72px] left-0 w-full bg-base-100 shadow-md rounded-b-xl z-40">
          <ul className="menu flex flex-col items-center py-4 space-y-4">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
