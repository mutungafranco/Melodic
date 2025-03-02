import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Music } from 'lucide-react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Handle password reset logic here
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Music className="h-16 w-16 text-green-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-white">
          Password Reset
        </h2>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md bg-neutral-800 border-transparent focus:border-green-500 focus:ring-0 text-white"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-black bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Send reset link
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-8 text-center">
            <p className="text-white mb-4">
              If an account exists for {email}, you will receive a password reset email shortly.
            </p>
            <Link
              to="/login"
              className="text-green-500 hover:text-green-400"
            >
              Return to login
            </Link>
          </div>
        )}

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-gray-400">or</span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              to="/login"
              className="w-full flex justify-center py-2 px-4 border border-gray-800 rounded-full shadow-sm text-sm font-medium text-white hover:bg-neutral-800"
            >
              Return to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;