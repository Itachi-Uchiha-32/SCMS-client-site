import React from 'react';
import { NavLink, Outlet } from 'react-router';
import Logo from '../pages/shared/Logo';
import { FaBullhorn, FaCheck, FaClock, FaCogs, FaCreditCard, FaHistory, FaTicketAlt, FaUser, FaUserCheck, FaUsers } from 'react-icons/fa';
import { MdDashboardCustomize } from 'react-icons/md';
import useUserRole from '../hooks/useUserRole';
import Loading from '../pages/component/Loading';
import useTitle from '../hooks/useTitle';

const Dashboard = () => {
     useTitle('Dashboard');
    const commonLinks = (
        <>
        <NavLink to="/dashboard/profile" className={({ isActive }) =>
            `dashboard-link flex items-center gap-2 ${isActive ? ' text-base-400 font-semibold rounded-md' : 'hover:bg-base-300'}`
        }>
            <FaUser size={20} /> My Profile
        </NavLink>
        <NavLink to="/dashboard/pending" className={({ isActive }) =>
            `dashboard-link flex items-center gap-2 ${isActive ? ' text-white font-semibold rounded-md' : 'hover:bg-base-300'}`
        }>
            <FaClock size={20} /> Pending Bookings
        </NavLink>
        <NavLink to="/dashboard/announcements" className={({ isActive }) =>
            `dashboard-link flex items-center gap-2 ${isActive ? ' text-white font-semibold rounded-md' : 'hover:bg-base-300'}`
        }>
            <FaBullhorn size={20} /> Announcements
        </NavLink>
        </>
    );

    const memberLinks = (
        <>
        <NavLink to="/dashboard/approved" className={({ isActive }) =>
            `dashboard-link flex items-center gap-2 ${isActive ? ' text-white font-semibold rounded-md' : 'hover:bg-base-300'}`
        }>
            <FaCheck size={20} /> Approved Bookings
        </NavLink>
        <NavLink to="/dashboard/confirmed" className={({ isActive }) =>
            `dashboard-link flex items-center gap-2 ${isActive ? ' text-white font-semibold rounded-md' : 'hover:bg-base-300'}`
        }>
            <MdDashboardCustomize /> Confirmed Bookings
        </NavLink>
        <NavLink to="/dashboard/history" className={({ isActive }) =>
            `dashboard-link flex items-center gap-2 ${isActive ? ' text-white font-semibold rounded-md' : 'hover:bg-base-300'}`
        }>
            <FaHistory size={20} /> Payment History
        </NavLink>
        </>
    );

    const adminLinks = (
        <>
        <NavLink to="/dashboard/manageBookingsApproval" className={({ isActive }) =>
            `dashboard-link flex items-center gap-2 ${isActive ? ' text-white font-semibold rounded-md' : 'hover:bg-base-300'}`
        }>
            <FaCheck size={20} /> Manage Bookings Approval
        </NavLink>
        <NavLink to="/dashboard/manageBookings" className={({ isActive }) =>
            `dashboard-link flex items-center gap-2 ${isActive ? ' text-white font-semibold rounded-md' : 'hover:bg-base-300'}`
        }>
            <FaClock size={20} /> Manage Bookings 
        </NavLink>
        <NavLink to="/dashboard/manageMembers" className={({ isActive }) =>
            `dashboard-link flex items-center gap-2 ${isActive ? ' text-white font-semibold rounded-md' : 'hover:bg-base-300'}`
        }>
            <FaUserCheck size={20} /> Manage Members
        </NavLink>
        <NavLink to="/dashboard/manageUsers" className={({ isActive }) =>
            `dashboard-link flex items-center gap-2 ${isActive ? ' text-white font-semibold rounded-md' : 'hover:bg-base-300'}`
        }>
            <FaUsers size={20} /> Manage Users
        </NavLink>
        <NavLink to="/dashboard/manageCourts" className={({ isActive }) =>
            `dashboard-link flex items-center gap-2 ${isActive ? ' text-white font-semibold rounded-md' : 'hover:bg-base-300'}`
        }>
            <FaCogs size={20} /> Manage Courts
        </NavLink>
        <NavLink to="/dashboard/manageCoupons" className={({ isActive }) =>
            `dashboard-link flex items-center gap-2 ${isActive ? ' text-white font-semibold rounded-md' : 'hover:bg-base-300'}`
        }>
            <FaTicketAlt size={20} /> Manage Coupons
        </NavLink>
        <NavLink to="/dashboard/announcementsAdmin" className={({ isActive }) =>
            `dashboard-link flex items-center gap-2 ${isActive ? ' text-white font-semibold rounded-md' : 'hover:bg-base-300'}`
        }>
            <FaBullhorn size={20} /> Admin Announcements
        </NavLink>
        </>
    );

    const { role, roleLoading } = useUserRole();

    if (roleLoading) {
    return <div className="text-center py-20 text-xl"><Loading/></div>;
    }


    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                    <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none ">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-6 w-6 stroke-current"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2">Dashboard</div>
                    </div>
                    {/* Page content here */}
                    
                    <h1 className='pt-4 text-3xl font-medium'>Dashboard</h1>

                    <Outlet/>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <Logo/>

                <div className='space-y-3 px-15'>
                    {commonLinks}
                    {role === 'member' && memberLinks}
                    {role === 'admin' && adminLinks}
                </div>
                </ul>
            </div>
        </div>
        
    );
};

export default Dashboard;