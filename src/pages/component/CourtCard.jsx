import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import BookCourtModal from './BookCourtModal';
import useAuth from '../../hooks/useAuth';

const CourtCard = ({ court }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const handleBookNow = () => {
    if (!user) {
      navigate('/login');
    } else {
      setOpenModal(true);
    }
  };

  return (
    <div className="bg-base-100 shadow-xl rounded-xl p-4">
      <img
        src={court.image}
        alt={court.courtType}
        className="rounded-md w-full h-44 object-cover mb-3"
      />
      <h3 className="text-xl font-semibold mb-1">{court.courtType} Court</h3>
      <p className="text-gray-600 mb-1">Price per session: ৳{court.price}</p>
      <p className="text-sm text-gray-500 mb-2">Available Slots: {court.slots.length}</p>

      <button
        className="btn btn-primary btn-sm w-full rounded-full"
        onClick={handleBookNow}
      >
        Book Now
      </button>

      {openModal && (
        <BookCourtModal
          court={court}
          closeModal={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

export default CourtCard;
