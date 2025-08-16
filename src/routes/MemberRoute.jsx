import React from 'react';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import { Navigate } from 'react-router';

const MemberRoute = ({children}) => {
    const {user, loading} = useAuth();
    const {role, roleLoading} = useUserRole();


    if(loading || roleLoading) return <span className='loading loading-spinner loading-xl'></span>

    if(!user || role !== 'member'){
        return <Navigate state={{from: location.pathname}} to="/forbidden"/>
    }
    return children;
};

export default MemberRoute;