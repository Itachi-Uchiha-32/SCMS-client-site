import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../component/Loading';

const ManageMembers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');

  const { data: members = [], isLoading } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const res = await axiosSecure.get('members');
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (email) => {
      const res = await axiosSecure.delete(`members/${email}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('Deleted!', 'Member has been removed.', 'success');
      queryClient.invalidateQueries(['members']);
    },
    onError: () => {
      Swal.fire('Error', 'Failed to delete member', 'error');
    },
  });

  const handleDelete = async (email) => {
    const confirm = await Swal.fire({
      title: 'Delete Member?',
      text: `Are you sure you want to remove ${email}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirm.isConfirmed) deleteMutation.mutate(email);
  };

  const filteredMembers = members.filter((member) =>
    member.name?.toLowerCase().includes(search.toLowerCase()) ||
    member.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <Loading/>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Manage Members</h2>

      <input
        type="text"
        placeholder="Search by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-bordered w-full mb-4"
      />

      {filteredMembers.length === 0 ? (
        <p>No members found.</p>
      ) : (
        <div data-aos="fade-up" className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member, index) => (
                <tr key={member._id}>
                  <td>{index + 1}</td>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>
                    <img src={member.photo} alt={member.name} className="w-10 h-10 rounded-full" />
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-error text-white rounded-full"
                      onClick={() => handleDelete(member.email)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageMembers;
