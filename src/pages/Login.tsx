import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Music, Mail, Lock } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // For demo purposes, let's simulate a successful login
    if (email && password) {
      onLogin(); // Call the login handler
      navigate('/'); // Navigate to home page
    }
  };

  return (
    <div className="min-h-screen login-gradient flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md backdrop-blur-lg bg-black/30 p-8 rounded-2xl shadow-2xl">
        <div className="flex justify-center mb-8 group">
          <div className="p-4 rounded-full bg-green-500 bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300">
            <Music className="h-16 w-16 text-green-500 group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>

        <h2 className="text-center text-3xl font-bold text-white mb-8">
          Log in to Spotify
        </h2>

        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full py-3 bg-neutral-800/50 text-white rounded-lg border border-neutral-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors duration-200"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full py-3 bg-neutral-800/50 text-white rounded-lg border border-neutral-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors duration-200"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-full font-medium text-black bg-green-500 hover:bg-green-400 focus:bg-green-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Log In
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link 
            to="/forgot-password" 
            className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
          >
            Forgot your password?
          </Link>
        </div>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-gray-400">Don't have an account?</span>
            </div>
          </div>

          <div className="mt-6">
            <Link
              to="/signup"
              className="w-full flex justify-center py-3 px-4 rounded-full text-white border border-neutral-700 hover:border-white hover:bg-white/5 transition-all duration-200"
            >
              Sign up for Spotify
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;