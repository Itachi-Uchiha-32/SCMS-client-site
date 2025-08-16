import React from 'react';
import { Link } from 'react-router';
import { FaBan } from 'react-icons/fa';

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center p-6 my-6 rounded-xl">
      <FaBan className="text-red-600 text-6xl mb-4" />
      <h1 className="text-4xl font-bold text-error mb-2">403 - Forbidden</h1>
      <p className="text-lg text-gray-500 mb-6">
        Sorry, you don’t have permission to access this page.
      </p>
      <Link to="/" className="btn btn-primary text-black">
        Go to Home
      </Link>
    </div>
  );
};

export default Forbidden;
