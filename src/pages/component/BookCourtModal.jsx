import { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { format } from 'date-fns';
import useAuth from '../../hooks/useAuth';

const BookCourtModal = ({ court, closeModal }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedSlot, setSelectedSlot] = useState(court.slots?.[0] || '');
  const [date, setDate] = useState('');

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!selectedSlot || !date) {
      return Swal.fire('Missing info', 'Please select slot and date', 'warning');
    }

    const bookingData = {
      userEmail: user.email,
      courtType: court.courtType,
      slot: selectedSlot,
      price: court.price,
      createdDate: new Date().toISOString(),
      date: format(new Date(date), 'yyyy-MM-dd'),
      status: 'pending',
      paymentStatus: 'unpaid'
    };

    try {
      await axiosSecure.post('/bookings', bookingData);
      Swal.fire('Booked!', 'Your booking is now pending approval.', 'success');
      closeModal();
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to book court. Try again.', 'error');
    }
  };

  return (
    <div data-aos="fade-up" className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-base-100 rounded-lg p-6 w-full max-w-md relative shadow-2xl">
        <button
          className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-red-600 cursor-pointer"
          onClick={closeModal}
        >
          ×
        </button>

        <h3 className="text-xl font-semibold mb-4">Book {court.courtType} Court</h3>

        <form onSubmit={handleBooking} className="space-y-4">
          <div>
            <label className="label">Email</label>
            <input
              type="text"
              value={user.email}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Court Type</label>
            <input
              type="text"
              value={court.courtType}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Slot</label>
            <select
              className="select select-bordered w-full"
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
            >
              {court.slots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Date</label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div>
            <label className="label">Price</label>
            <input
              type="text"
              value={`৳${court.price}`}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          <button className="btn btn-primary w-full rounded-full " type="submit">
            Submit Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookCourtModal;
