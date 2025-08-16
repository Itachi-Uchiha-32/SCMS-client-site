import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaCreditCard, FaMoneyCheckAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import Loading from '../component/Loading';
import { format } from 'date-fns';

const ApprovedBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();

  const {
    data: bookings = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['approvedBookings', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`bookings/approved/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`bookings/${id}`);
          Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
          refetch();
        } catch (error) {
          Swal.fire('Error!', 'Failed to cancel booking.', 'error');
        }
      }
    });
  };

  const handlePayment = (id) => {
    console.log('Proceed to payment for booking:', id);
    // You can redirect to a payment route here
    navigate(`/dashboard/payment/${id}`)

  };

  if (isLoading) return <Loading/>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-6">Approved Bookings</h2>
      {bookings.length === 0 ? (
        <p>No approved bookings found.</p>
      ) : (
        <div className='overflow-x-auto'>
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-base">
              <tr>
                <th>#</th>
                <th>Court Type</th>
                <th>Booked Date</th>
                <th>Time Slot</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id} className="hover">
                  <td>{index + 1}</td>
                  <td>{booking.courtType}</td>
                  <td>{new Date(booking.createdDate).toLocaleString()}</td>
                  <td>{booking.slot}</td>
                  <td>৳{booking.price}</td>
                  <td><span className="badge badge-success capitalize">{booking.status}</span></td>
                  <td className="flex flex-col lg:flex-row gap-2 items-center">
                    <button
                      className="btn btn-error btn-xs"
                      title="Cancel"
                      onClick={() => handleCancel(booking._id)}
                    >
                      <FaTrashAlt />
                    </button>
                    {booking.paymentStatus === 'unpaid' && (
                      <button
                      className="btn btn-xs btn-success text-white"
                      onClick={() => handlePayment(booking._id)}
                      disabled={booking.paymentStatus === 'paid'}
                      >
                        <FaMoneyCheckAlt />
                      </button>
                    )}
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

export default ApprovedBookings;
