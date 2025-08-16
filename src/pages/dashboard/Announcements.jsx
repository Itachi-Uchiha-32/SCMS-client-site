import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { format } from 'date-fns';
import { FaBullhorn } from 'react-icons/fa';
import Loading from '../component/Loading';

const Announcements = () => {
  const axiosSecure = useAxiosSecure();

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const res = await axiosSecure.get('/announcements');
      return res.data;
    },
  });

  if (isLoading) return <Loading/>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FaBullhorn className="text-yellow-500" /> Club Announcements
      </h2>

      {announcements.length === 0 ? (
        <p>No announcements found.</p>
      ) : (
        <div data-aos="fade-up" className="space-y-4">
          {announcements.map((announcement) => (
            <div
              key={announcement._id}
              className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-md shadow"
            >
              <h3 className="text-lg font-semibold text-blue-800">{announcement.title}</h3>
              <p className="text-sm text-gray-700 mt-1">{announcement.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                Posted by {announcement.author || 'Admin'} on{' '}
                {format(new Date(announcement.date), 'PPP p')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcements;
