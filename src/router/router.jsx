import AuthLayout from "../layouts/AuthLayout";
import HomeLayout from "../layouts/HomeLayout";

import {
  createBrowserRouter,
} from "react-router";
import Register from "../pages/Authentication/Register";
import Login from "../pages/Authentication/Login";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/dashboard/Profile";
import PendingBookings from "../pages/dashboard/PendingBookings";
import Announcements from "../pages/dashboard/Announcements";
import ApprovedBookings from "../pages/dashboard/ApprovedBookings";
import ConfirmedBookings from "../pages/dashboard/ConfirmedBookings";
import Payments from "../pages/dashboard/Payments";
import Courts from "../pages/component/Courts";
import PaymentHistory from "../pages/dashboard/PaymentHistory";
import ManageBookings from "../pages/dashboard/ManageBookings";
import ManageBookingsApproval from "../pages/dashboard/ManageBookings";
import ManageMembers from "../pages/dashboard/ManageMembers";
import ManageUsers from "../pages/dashboard/ManageUsers";
import ManageCourts from "../pages/dashboard/ManageCourts";
import ManageConfirmedBookings from "../pages/dashboard/ManageConfirmedBookings";
import ManageCoupons from "../pages/dashboard/ManageCoupons";
import AdminAnnouncements from "../pages/dashboard/AdminAnnouncements";
import Forbidden from "../pages/component/Forbidden";
import HomePage from "../pages/Home/HomePage";
import PrivateRoute from "../routes/PrivateRoute";
import MemberRoute from "../routes/MemberRoute";
import AdminRoute from "../routes/AdminRoute";



const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        children: [
            {
                index: true,
                path: "/",
                Component: HomePage,
            },
            {
                path: 'courts',
                Component: Courts
            },
            {
                path: 'forbidden',
                Component: Forbidden,
            },
        ]
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: "register",
                Component: Register
            },
            {
                path: "login",
                Component: Login
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <Dashboard/>
        </PrivateRoute>,
        children: [
            {
                path: 'profile',
                Component: Profile
            },
            {
                path: 'pending',
                Component: PendingBookings
            },
            {
                path: 'announcements',
                Component: Announcements
            },
            {
                path: 'approved',
                element: <MemberRoute>
                    <ApprovedBookings/>
                </MemberRoute>
            },
            {
                path: 'confirmed',
                element: <MemberRoute>
                    <ConfirmedBookings/>
                </MemberRoute>
            },
            {
                path: 'payment/:bookingId',
                Component: Payments
            },
            {
                path: 'history',
                element: <MemberRoute>
                    <PaymentHistory/>
                </MemberRoute>
            },
            {
                path: 'manageBookingsApproval',
                element: <AdminRoute>
                    <ManageBookings/>
                </AdminRoute>,
            },
            {
                path: 'manageBookings',
                element: <AdminRoute>
                    <ManageConfirmedBookings/>
                </AdminRoute>,
            },
            {
                path: 'manageMembers',
               element: <AdminRoute>
                <ManageMembers/>
               </AdminRoute>,
            },
            {
                path: 'manageUsers',
                element: <AdminRoute>
                    <ManageUsers/>
                </AdminRoute>
            },
            {
                path: 'manageCourts',
                element: <AdminRoute>
                    <ManageCourts/>
                </AdminRoute>
            },
            {
                path: 'manageCoupons',
                element: <AdminRoute>
                    <ManageCoupons/>
                </AdminRoute>
            },
            {
                path: 'announcementsAdmin',
                element: <AdminRoute>
                    <AdminAnnouncements/>
                </AdminRoute>
            },
        ]
    }

])

export default  router;