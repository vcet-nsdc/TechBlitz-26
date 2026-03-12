'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function AdminLogin() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.username.trim() || !credentials.password.trim()) {
      toast.error('Please enter both username and password');
      return;
    }

    setIsSubmitting(true);

    try {
      // Call login API
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || 'Login failed');
        return;
      }

      toast.success('Login successful!');
      
      // Redirect to dashboard
      router.push('/admin/dashboard');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans halftone-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="manga-panel p-8 shadow-manga-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-manga-title mb-4 action-text-red">
              Admin Login
            </h1>
            <p className="font-manga-marker text-lg">TechBlitz26 Administration</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label className="block font-manga-marker text-sm mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border-2 border-black font-manga-marker text-black placeholder-gray-500 focus:outline-none focus:border-red-500 transition-all"
                placeholder="Enter username"
                disabled={isSubmitting}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-manga-marker text-sm mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border-2 border-black font-manga-marker text-black placeholder-gray-500 focus:outline-none focus:border-red-500 transition-all"
                placeholder="Enter password"
                disabled={isSubmitting}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 manga-panel font-manga-action text-2xl action-text-red hover:shadow-manga-red transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/')}
              className="font-manga-marker hover:font-manga-action transition-all text-sm"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
