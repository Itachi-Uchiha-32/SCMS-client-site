import React from 'react';

import Swal from 'sweetalert2';
import usePendingBookings from '../../hooks/usePendingBookings';
import Loading from '../component/Loading';

const PendingBookings = () => {
  const { data: bookings, isLoading, refetch } = usePendingBookings();

  if (isLoading) {
    return <Loading/>;
  }

  const handleCancel = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This booking will be removed!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`https://scmc-server.vercel.app/${id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
              refetch();
            }
          });
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Bookings</h2>
      {bookings.length === 0 ? (
        <p>No pending bookings found.</p>
      ) : (
        <div data-aos="fade-up" className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Court</th>
                <th>Slot</th>
                <th>Booking for Date</th>
                <th>Price</th>
                <th>Status</th>
                <th>Cancel</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, idx) => (
                <tr key={booking._id}>
                  <td>{idx + 1}</td>
                  <td>{booking.courtType}</td>
                  <td>{booking.slot}</td>
                  <td>{booking.date}</td>
                  <td>৳{booking.price}</td>
                  <td className="text-yellow-600 capitalize">{booking.status}</td>
                  <td>
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="btn btn-sm btn-error text-white rounded-full"
                    >
                      Cancel
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

export default PendingBookings;
