import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaEye, FaTimes } from 'react-icons/fa';
import Loading from '../component/Loading';
import { format } from 'date-fns';

const ConfirmedBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], refetch, isLoading } = useQuery({
        queryKey: ['confirmedBookings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`bookings/confirmed/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

  const [selectedBooking, setSelectedBooking] = useState(null);

  const openModal = (booking) => {
    setSelectedBooking(booking);
  };

  const closeModal = () => {
    setSelectedBooking(null);
  };

  const handleCancel = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to cancel this booking?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`bookings/${id}`);
          Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
          refetch();
          closeModal();
        } catch (error) {
          Swal.fire('Error!', 'Failed to cancel booking.', 'error');
        }
      }
    });
  };

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Confirmed Bookings</h2>

      {bookings.length === 0 && <p>No confirmed bookings found.</p>}

     <div className="overflow-x-auto">
         <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Court Type</th>
              <th>Booked Date</th>
              <th>Slot</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.courtType}</td>
                <td>{new Date(booking.createdDate).toLocaleString()}</td>
                <td>{booking.slot}</td>
                <td>৳{booking.price}</td>
                <td>
                  <span className="badge badge-success">{booking.status}</span>
                </td>
                <td className="flex flex-col lg:flex-row gap-2 items-center">
                  <button
                    className="btn bg-blue-400 btn-sm flex items-center gap-1 text-white rounded-full"
                    onClick={() => openModal(booking)}
                  >
                    <FaEye /> View
                  </button>
                  <button
                    className="btn btn-error btn-sm text-white rounded-full"
                    onClick={() => handleCancel(booking._id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
     </div>

      {/* Modal */}
      {selectedBooking && (
        
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center z-50 shadow-xl">
          <div className="bg-white p-6 rounded-lg w-96 relative shadow-2xl">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
            <h3 className="text-xl font-bold mb-4">Booking Details</h3>
            <p><strong>Court Type:</strong> {selectedBooking.courtType}</p>
            <p><strong>Date:</strong> {selectedBooking.date}</p>
            <p><strong>Slot:</strong> {selectedBooking.slot}</p>
            <p><strong>Price:</strong> ৳{selectedBooking.price}</p>
            <p><strong>Status:</strong> {selectedBooking.status}</p>
            {/* Add any other details you want here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmedBookings;
