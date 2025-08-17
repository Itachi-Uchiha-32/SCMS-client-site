import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../component/Loading";

const UpcomingEvents = () => {
  const axiosSecure = useAxiosSecure();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axiosSecure.get("/events?limit=10");
        const data = Array.isArray(res.data) ? res.data : res.data.events || [];
        setEvents(data);
      } catch (err) {
        console.error("Failed to fetch events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [axiosSecure]);

  // Auto slide every 4s
  useEffect(() => {
    if (!events.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [events.length]);

  if (loading) return <Loading />;

  // Get 3 visible indices (left, center, right)
  const getVisibleIndices = () => {
    if (events.length <= 3) return events.map((_, i) => i);
    const left = (currentIndex - 1 + events.length) % events.length;
    const center = currentIndex;
    const right = (currentIndex + 1) % events.length;
    return [left, center, right];
  };

  const visibleIndices = getVisibleIndices();

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Upcoming Events</h2>

      <div className="relative flex justify-center items-center gap-6 overflow-hidden h-[400px]">
        {events.map((event, idx) => {
          const position = visibleIndices.indexOf(idx);
          let translate = "translate-x-[200%] opacity-0 scale-90"; // hidden right by default

          if (position === 0) translate = "-translate-x-full opacity-50 scale-90"; // left
          if (position === 1) translate = "translate-x-0 opacity-100 scale-105 z-10"; // center
          if (position === 2) translate = "translate-x-full opacity-50 scale-90"; // right

          return (
            <div
              key={event._id}
              className={`absolute w-80 bg-base-100 shadow-lg rounded-xl p-6 text-center transform transition-all duration-700 ease-in-out ${translate}`}
            >
              <img
                src={event.image || "https://i.ibb.co/2FsfXqM/placeholder.png"}
                alt={event.name}
                className="w-full h-40 rounded-lg mb-3 object-cover border border-gray-200"
              />
              <h3 className="font-semibold text-lg mb-1">{event.name}</h3>
              <p className="text-sm text-gray-400 mb-2 line-clamp-3">
                {event.description}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                📅 {event.date} | 📍 {event.venue}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                🏆 {event.organizer}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default UpcomingEvents;
