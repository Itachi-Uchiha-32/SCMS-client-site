import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Loading from '../component/Loading';

const ManageBookingsApproval = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all pending bookings
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['pendingBookings'],
    queryFn: async () => {
      const res = await axiosSecure.get('bookings/pending');
      return res.data;
    },
  });

  // Approve mutation
  const approveMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`bookings/approve/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      Swal.fire('Approved!', data.message || 'Booking approved.', 'success');
      queryClient.invalidateQueries(['pendingBookings']);
    },
    onError: () => {
      Swal.fire('Error', 'Failed to approve booking', 'error');
    },
  });

  // Reject mutation
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`bookings/${id}`);
    },
    onSuccess: () => {
      Swal.fire('Rejected!', 'Booking has been removed.', 'success');
      queryClient.invalidateQueries(['pendingBookings']);
    },
    onError: () => {
      Swal.fire('Error', 'Failed to reject booking', 'error');
    },
  });

  const handleApprove = async (id) => {
    const confirm = await Swal.fire({
      title: 'Approve Booking?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Approve',
    });

    if (confirm.isConfirmed) {
      approveMutation.mutate(id);
    }
  };

  const handleReject = async (id) => {
    const confirm = await Swal.fire({
      title: 'Reject Booking?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Reject',
    });

    if (confirm.isConfirmed) {
      rejectMutation.mutate(id);
    }
  };

  if (isLoading) return <Loading/>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Manage Booking Approvals</h2>

      {bookings.length === 0 ? (
        <p>No pending bookings found.</p>
      ) : (
        <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Court Type</th>
                <th>Slot</th>
                <th>Date</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id} className="hover">
                  <td>{index + 1}</td>
                  <td>{booking.userEmail}</td>
                  <td>{booking.courtType}</td>
                  <td>{booking.slot}</td>
                  <td>{booking.date}</td>
                  <td>৳{booking.price}</td>
                  <td>
                    <span className="badge badge-warning capitalize">{booking.status}</span>
                  </td>
                  <td className="flex flex-col lg:flex-row items-center gap-2">
                    <button
                      className="btn btn-sm btn-success text-white rounded-full"
                      onClick={() => handleApprove(booking._id)}
                    >
                      <FaCheckCircle /> Approve
                    </button>
                    <button
                      className="btn btn-sm btn-error text-white rounded-full"
                      onClick={() => handleReject(booking._id)}
                    >
                      <FaTimesCircle /> Reject
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

export default ManageBookingsApproval;
