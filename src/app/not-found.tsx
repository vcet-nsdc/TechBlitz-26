'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="bg-[#13131a] border border-[#ffffff10] rounded-2xl p-8 shadow-2xl">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-4 bg-[#6c47ff] rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">404</h1>
            <h2 className="text-xl font-semibold text-gray-300 mb-4">Page Not Found</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-400">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-6 py-3 bg-gradient-to-r from-[#6c47ff] to-[#00d4ff] text-white font-semibold rounded-lg hover:from-[#7c57ff] hover:to-[#10e4ff] transition-all duration-300 shadow-lg"
              >
                Go Home
              </Link>
              <Link
                href="/problem-statement"
                className="px-6 py-3 border border-[#ffffff20] text-white font-semibold rounded-lg hover:bg-[#ffffff10] transition-all duration-300"
              >
                Register Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
