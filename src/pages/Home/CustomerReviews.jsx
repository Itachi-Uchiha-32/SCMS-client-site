import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../component/Loading";

const CustomerReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosSecure.get("/reviews?limit=10"); // fetch some reviews
        const data = Array.isArray(res.data) ? res.data : res.data.reviews || [];
        setReviews(data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [axiosSecure]);

  // Auto slide every 3s
  useEffect(() => {
    if (!reviews.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  if (loading) return <Loading />;

  // Helper to get the visible 3 cards
  const getVisibleIndices = () => {
    if (reviews.length <= 3) return reviews.map((_, i) => i);
    const left = (currentIndex - 1 + reviews.length) % reviews.length;
    const center = currentIndex;
    const right = (currentIndex + 1) % reviews.length;
    return [left, center, right];
  };

  const visibleIndices = getVisibleIndices();

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Customer Reviews</h2>

      <div className="relative flex justify-center items-center gap-6 overflow-hidden h-[300px]">
        {reviews.map((review, idx) => {
          const position = visibleIndices.indexOf(idx);
          let translate = "translate-x-[200%] opacity-0 scale-90"; // default: hidden right

          if (position === 0) translate = "-translate-x-full opacity-50 scale-90"; // left
          if (position === 1) translate = "translate-x-0 opacity-100 scale-105 z-10"; // center
          if (position === 2) translate = "translate-x-full opacity-50 scale-90"; // right

          return (
            <div
              key={review._id}
              className={`absolute w-72 bg-base-100 shadow-lg rounded-xl p-6 text-center transform transition-all duration-700 ease-in-out ${translate}`}
            >
              <img
                src={review.avatar || "https://i.ibb.co/2FsfXqM/placeholder.png"}
                alt={review.name}
                className="w-16 h-16 rounded-full mx-auto mb-3 object-cover border border-gray-200"
              />
              <h3 className="font-semibold mb-1">{review.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-3">
                {review.comment}
              </p>
              <p className="font-bold text-yellow-400">
                {"★".repeat(review.rating)}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CustomerReviews;
