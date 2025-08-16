import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../component/Loading';

const ManageConfirmedBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState('');

  const { data: bookings = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['confirmedBookings', search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/confirmed?search=${search}`);
      return res.data;
    },
  });

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    refetch();
  };

  return (
    <div className="p-4 w-11/12 mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Manage Confirmed Bookings</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by court type..."
          value={search}
          onChange={handleSearchChange}
          className="input input-bordered w-full max-w-md"
        />
      </div>

      {isLoading ? (
        <Loading/>
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : bookings.length === 0 ? (
        <p>No confirmed bookings found.</p>
      ) : (
        <div data-aos="fade-up" className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Court Type</th>
                <th>User Email</th>
                <th>Slot</th>
                <th>Price</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover">
                  <td>{booking.courtType}</td>
                  <td>{booking.userEmail}</td>
                  <td>{booking.slot}</td>
                  <td>৳{booking.price}</td>
                  <td><span className='badge badge-success capitalize'>{booking.status}</span></td>
                  <td>{new Date(booking.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageConfirmedBookings;
