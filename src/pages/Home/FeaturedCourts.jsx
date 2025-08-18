import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';


import CourtCard from '../component/CourtCard';
import Loading from '../component/Loading';

const FeaturedCourts = () => {
  const axiosSecure = useAxiosSecure();

  const { data: courts, isLoading, error } = useQuery({
    queryKey: ['featuredCourts'],
    queryFn: async () => {
      const res = await axiosSecure.get('/courts/featured');
      return res.data; 
    }
  });

  if (isLoading) return <Loading />;
  if (error) {
    return <div className="text-red-500">Error loading featured courts</div>;
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10" data-aos="fade-up">
      <h2 className="text-3xl font-bold text-center mb-6">Featured Courts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courts.map(court => (
          <CourtCard key={court._id} court={court} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedCourts;
