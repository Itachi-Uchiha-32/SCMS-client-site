import { useState } from 'react';
import axios from 'axios';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);   // { type: 'success' | 'error', text: string }

  const BASE_URL = import.meta.env.VITE_API_URL || ''; // e.g. http://localhost:3000

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    // quick client validation
    const trimmed = email.trim().toLowerCase();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!re.test(trimmed)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    try {
      setSubmitting(true);
      const res = await axios.post(`${BASE_URL}/newsletter/subscribe`, { email: trimmed });
      setMessage({ type: 'success', text: res.data?.message || 'Subscribed successfully!' });
      setEmail('');
    } catch (err) {
      const text =
        err?.response?.data?.message ||
        (err?.response?.status === 409 ? 'You are already subscribed.' : 'Subscription failed. Please try again.');
      setMessage({ type: 'error', text });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-base-100 border border-base-200 rounded-2xl p-8 md:p-10 shadow-sm">
        <h2 className="text-3xl font-bold text-center mb-3">Subscribe to Our Newsletter</h2>
        <p className="text-center text-base-content/70 mb-8">
          Get event updates, exclusive offers, and training tips from the club.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="input input-bordered flex-1"
            required
          />
          <button
            type="submit"
            className={`btn btn-primary ${submitting ? 'btn-disabled' : ''}`}
            disabled={submitting}
          >
            {submitting ? 'Subscribing…' : 'Subscribe'}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 alert ${message.type === 'success' ? 'alert-success' : 'alert-error'} shadow`}
            role="alert"
          >
            <span>{message.text}</span>
          </div>
        )}

        <p className="mt-4 text-center text-xs text-base-content/60">
          We care about your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSignup;
