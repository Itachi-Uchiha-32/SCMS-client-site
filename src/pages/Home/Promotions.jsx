import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaTag } from 'react-icons/fa';
import { MdDiscount } from 'react-icons/md';
import Loading from '../component/Loading';

const Promotions = () => {
  const axiosSecure = useAxiosSecure();

  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ['coupons'],
    queryFn: async () => {
      const res = await axiosSecure.get('coupons');
      return res.data;
    },
  });

  if (isLoading) return <Loading/>;

  return (
    <section data-aos="fade-up" className="my-12 px-4 md:px-16">
      <h2 className="text-3xl font-bold text-center mb-6"> Promotions & Coupons</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <div
            key={coupon._id}
            className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl p-6 shadow-lg hover:scale-105 duration-300"
          >
            <div className="flex justify-between items-center mb-3">
              <FaTag className="text-2xl" />
              <span className="bg-black bg-opacity-20 px-3 py-1 rounded-full text-sm uppercase">
                {coupon.status}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-1">Coupon: <span className="text-yellow-300">{coupon.code}</span></h3>
            <p className="flex items-center gap-2 text-lg">
              <MdDiscount /> <span>{coupon.discountPercentage}% Off</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Promotions;
