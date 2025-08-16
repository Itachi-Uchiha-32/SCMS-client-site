import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useParams, useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Loading from '../component/Loading';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { bookingId } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [applying, setApplying] = useState(false);

  const { data: booking = {}, isPending } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${bookingId}`);
      return res.data;
    },
  });

  const originalAmount = booking.price || 0;
  const finalAmount = originalAmount - (originalAmount * discount) / 100;
  const amountInCents = Math.round(finalAmount * 100);

  const applyCoupon = async () => {
    if (!coupon) return;
    try {
      setApplying(true);
      const res = await axiosSecure.post('/validate-coupon', { couponCode: coupon });
      if (res.data.valid) {
        setDiscount(res.data.discountPercentage);
        Swal.fire('Success', `Coupon applied! ${res.data.discountPercentage}% off.`, 'success');
      } else {
        setDiscount(0);
        Swal.fire('Invalid', 'Invalid or expired coupon.', 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'Failed to validate coupon.', 'error');
    } finally {
      setApplying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: cardError } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (cardError) {
      setError(cardError.message);
      return;
    }

    const intentRes = await axiosSecure.post('/create-payment-intent', {
      amount: amountInCents,
    });

    const clientSecret = intentRes.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user?.displayName || 'Anonymous',
          email: user?.email || 'unknown',
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else if (result.paymentIntent.status === 'succeeded') {
      setError('');
      const paymentData = {
        bookingId,
        userEmail: user.email,
        amountPaid: finalAmount,
        couponUsed: coupon || null,
        paymentIntentId: result.paymentIntent.id,
      };

      const saveRes = await axiosSecure.post('/payments', paymentData);
      if (saveRes.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Payment Successful ',
          html: `<b>Transaction ID:</b> ${result.paymentIntent.id}`,
          confirmButtonText: 'Go to Confirmed Bookings',
        }).then(() => navigate('/dashboard/confirmed'));
      }
    }
  };

  if (isPending) return <Loading/>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-2">Payment Form</h2>
      <p className="text-gray-500 mb-6">Complete your payment below</p>

      {/* Booking Summary */}
      <div className="mb-6 border-t pt-4">
        <h3 className="font-semibold mb-3">Booking Summary</h3>
        <ul className="space-y-1 text-sm">
          <li><strong>Court Type:</strong> {booking.courtType}</li>
          <li><strong>Date:</strong> {booking.date}</li>
          <li><strong>Slot:</strong> {booking.slot}</li>
          <li><strong>Original Price:</strong> ৳{originalAmount}</li>
          {discount > 0 && (
            <li className="text-green-600"><strong>Discount:</strong> {discount}%</li>
          )}
          <li className="text-lg font-semibold mt-2">
            Final Amount: ৳{finalAmount}
          </li>
        </ul>
      </div>

      {/* Coupon Code */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter coupon code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          className="input input-bordered w-full"
        />
        <button
          type="button"
          className="btn btn-outline btn-info"
          onClick={applyCoupon}
          disabled={applying}
        >
          Apply
        </button>
      </div>

      {/* Card Payment */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <CardElement className="p-3 border rounded-md" />
        </div>
        <button
          type="submit"
          className="btn btn-success w-full"
          disabled={!stripe || !elements}
        >
          Pay ৳{finalAmount}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
