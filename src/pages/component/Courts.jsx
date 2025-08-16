// src/pages/Courts.jsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import CourtCard from './CourtCard';
import Navbar from './Navbar';
import Loading from './Loading';
import Footer from './Footer';
import useTitle from '../../hooks/useTitle';



const Courts = () => {
  const axiosSecure = useAxiosSecure();
   useTitle('Courts');
  const [page, setPage] = useState(1);
  const size = 6;

  const { data, isLoading, error } = useQuery({
    queryKey: ['courts', page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/courts?page=${page}&size=${size}`);
      return res.data;
    }
  });

  if (isLoading) return <Loading/>;
  if (error) return <div className="text-red-500">Error loading courts</div>;

  const { courts, totalPages } = data;

  return (
    <div>
      <Navbar/>
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h2 className="text-3xl font-bold text-center mb-6">All Courts</h2>

          <div data-aos="fade-up" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {courts.map((court) => (
              <CourtCard key={court._id} court={court} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`mx-1 px-3 py-1 rounded-lg ${
                  page === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Courts;
