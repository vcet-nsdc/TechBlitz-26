'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function JudgeLoginPage() {
  const router = useRouter();
  const [judgeName, setJudgeName] = useState('');
  const [passcode, setPasscode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!judgeName.trim() || !passcode) {
      toast.error('Please enter your name and passcode');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/judge-portal/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ judgeName: judgeName.trim(), passcode }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Login failed');
        return;
      }

      toast.success('Welcome, Judge!');
      router.push('/judge-portal/lab');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans halftone-bg flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        <div className="manga-panel p-6 sm:p-8 shadow-manga-lg border-4 border-black">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold font-manga-title mb-3 sm:mb-4 action-text-red -skew-x-12">
              Judge Portal
            </h1>
            <p className="font-manga-marker text-base sm:text-lg">TechBlitz26 Scoring</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block font-manga-marker text-sm mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={judgeName}
                onChange={(e) => setJudgeName(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-black font-manga-marker text-black placeholder-gray-500 focus:outline-none focus:border-red-500 transition-all text-sm sm:text-base"
                placeholder="Enter your name"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label className="block font-manga-marker text-sm mb-2">
                Passcode
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-black font-manga-marker text-black placeholder-gray-500 focus:outline-none focus:border-red-500 transition-all text-sm sm:text-base"
                placeholder="Enter passcode"
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 sm:py-4 manga-panel font-manga-action text-xl sm:text-2xl action-text-red hover:shadow-manga-red transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Signing in...' : 'Enter Portal'}
            </button>
          </form>

          <div className="mt-4 sm:mt-6 text-center">
            <Link
              href="/"
              className="font-manga-marker hover:font-manga-action transition-all text-xs sm:text-sm"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
