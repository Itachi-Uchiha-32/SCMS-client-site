import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { format } from 'date-fns';
import Loading from '../component/Loading';


const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [view, setView] = useState('table'); 

  const { data: payments = [], isPending } = useQuery({
    queryKey: ['paymentHistory', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isPending) return <Loading/>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Payment History</h2>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => setView(view === 'table' ? 'card' : 'table')}
        >
          Switch to {view === 'table' ? 'Card' : 'Table'} View
        </button>
      </div>

      {/* Table View */}
      {view === 'table' && (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Court</th>
                <th>Amount</th>
                <th>Coupon</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pay, index) => (
                <tr key={pay._id}>
                  <td>{index + 1}</td>
                  <td className="text-xs break-all">{pay.paymentIntentId}</td>
                  <td>{pay.bookingId.slice(-4)}</td> 
                  <td>৳{pay.amountPaid}</td>
                  <td>{pay.couponUsed || 'N/A'}</td>
                  <td>
                    <span className="badge badge-success capitalize">{pay.status}</span>
                  </td>
                  <td>{format(new Date(pay.date), 'PPpp')}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Card View */}
      {view === 'card' && (
        <div className="grid md:grid-cols-2 gap-4">
          {payments.map((pay) => (
            <div key={pay._id} className="bg-white p-4 rounded-lg shadow-xl ">
              <p><span className='font-medium'>Txn ID: </span> <span className="text-sm break-all">{pay.paymentIntentId}</span></p>
              <p><span className='font-medium'>Court Ref: </span> {pay.bookingId.slice(-4)}</p>
              <p><span className='font-medium'>Amount Paid: </span> ৳{pay.amountPaid}</p>
              <p><span className='font-medium'>Coupon: </span> {pay.couponUsed || 'N/A'}</p>
              <p><span className='font-medium'>Status: </span> <span className="badge badge-success">{pay.status}</span></p>
              <p><span className='font-medium'>Date: </span> {format(new Date(pay.date), 'PPpp')}</p>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
