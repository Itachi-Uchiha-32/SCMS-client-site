import React from 'react';
import useAuth from '../../hooks/useAuth';
import useUserRole from '../../hooks/useUserRole';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Profile = () => {
  const { user } = useAuth();
  const { role } = useUserRole();
  const axiosSecure = useAxiosSecure();

  
  const { data: stats = {}, isLoading: statsLoading } = useQuery({
    queryKey: ['admin-stats'],
    enabled: role === 'admin',
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/stats');
      return res.data;
    }
  });

  
  const { data: membership = {}, isLoading: memberLoading } = useQuery({
    queryKey: ['member-info'],
    enabled: role === 'member',
    queryFn: async () => {
      const res = await axiosSecure.get(`/members/${user.email}`);
      return res.data;
    }
  });

  const joinedDate = new Date(user?.metadata?.creationTime).toLocaleDateString();

  return (
    <div data-aos="fade-up" className="p-4 md:p-8">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6 text-center">
        <img
          src={user?.photoURL || '/default-avatar.png'}
          alt="User"
          className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-blue-300"
        />
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">{user?.displayName}</h2>
        <p className="text-gray-600">{user?.email}</p>

        <p className="mt-2 px-4 py-1 inline-block bg-blue-100 text-blue-600 rounded-full text-sm capitalize">
          Role: {role}
        </p>

        {/* Role-based info */}
        {role === 'admin' && !statsLoading && (
          <div className="mt-6 space-y-2 text-gray-700">
            <p><strong>Total Courts:</strong> {stats.totalCourts}</p>
            <p><strong>Total Users:</strong> {stats.totalUsers}</p>
            <p><strong>Total Members:</strong> {stats.totalMembers}</p>
          </div>
        )}

        {role === 'member' && !memberLoading && (
          <div className="mt-6 text-gray-700">
            {console.log("Date value:", membership.membershipGrantedDate)}

            <p><strong>Membership Granted:</strong> {new Date(membership.membershipGrantedDate).toLocaleDateString()}</p>
          </div>
        )}

        {role === 'user' && (
          <div className="mt-6 text-gray-700">
            <p><strong>Registered On:</strong> {joinedDate}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
