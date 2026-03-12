'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { problemStatements, type Domain } from '@/lib/problemStatements';

interface TeamData {
  teamName: string;
  domain: Domain;
}

export default function ProblemStatementReveal() {
  const router = useRouter();
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [countdown, setCountdown] = useState(3);
  const [showStatement, setShowStatement] = useState(false);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  useEffect(() => {
    // Get team data from sessionStorage
    const stored = sessionStorage.getItem('tbz_team');
    if (!stored) {
      router.push('/problem-statement');
      return;
    }
    
    const data = JSON.parse(stored) as TeamData;
    
    // Start countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowStatement(true);
          triggerConfetti();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Defer team data setting to next tick to avoid cascading renders
    setTimeout(() => setTeamData(data), 0);

    return () => clearInterval(timer);
  }, [router]);

  if (!teamData) {
    return (
      <div className="min-h-screen bg-white text-black font-sans halftone-bg flex items-center justify-center">
        <div className="text-black font-manga-marker">Loading...</div>
      </div>
    );
  }

  const problemStatement = problemStatements[teamData.domain];

  return (
    <div className="min-h-screen bg-white text-black font-sans halftone-bg flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Indicator */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
            <div className="w-16 h-1 bg-green-600"></div>
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
            <div className="w-16 h-1 bg-green-600"></div>
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
          </div>
          <p className="text-gray-600 text-sm">Step 3 of 3: Problem Statement</p>
        </div>

        {/* Countdown or Problem Statement */}
        {!showStatement ? (
          <div className="text-center">
            <h2 className="text-2xl font-manga-marker mb-8">Revealing your challenge...</h2>
            <div className="text-9xl font-bold text-[#6c47ff] animate-pulse">
              {countdown}
            </div>
          </div>
        ) : (
          <div className="animate-in slide-in-from-bottom duration-1000">
            {/* Success Message */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold font-manga-title mb-4 action-text-red">
                Good luck! 🚀
              </h1>
              <p className="font-manga-marker text-lg">
                Team: <span className="font-manga-action">{teamData.teamName}</span>
              </p>
            </div>

            {/* Problem Statement Card */}
            <div className="manga-panel p-8 shadow-manga-lg">
              {/* Title */}
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold bg-linear-to-r from-[#6c47ff] to-[#00d4ff] bg-clip-text text-transparent mb-4">
                  {problemStatement.title}
                </h2>
                <div className="flex items-center justify-center space-x-4 font-manga-marker">
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {problemStatement.timeLimit}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {teamData.domain}
                  </span>
                </div>
              </div>

              {/* Statement */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold font-manga-title mb-4">Challenge Statement</h3>
                <p className="font-manga-marker leading-relaxed text-lg">
                  {problemStatement.statement}
                </p>
              </div>

              {/* Requirements */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold font-manga-title mb-4">Requirements</h3>
                <ul className="space-y-3">
                  {problemStatement.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="shrink-0 w-6 h-6 bg-[#6c47ff] rounded-full flex items-center justify-center text-white text-xs font-bold mr-3 mt-0.5">
                        ✓
                      </div>
                      <span className="font-manga-marker">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call to Action */}
              <div className="text-center pt-6 border-t-2 border-black">
                <p className="font-manga-marker mb-4">
                  Your challenge begins now. Make something amazing! 💪
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href={teamData.domain === 'uiux' ? 'https://www.figma.com/' : 'https://github.com/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 manga-panel font-manga-action text-lg action-text-red hover:shadow-manga-red transition-all duration-300"
                  >
                    {teamData.domain === 'uiux' ? 'Open Figma' : 'Open GitHub'}
                  </a>
                  <button
                    onClick={() => router.push('/certificates')}
                    className="px-6 py-3 manga-panel font-manga-marker hover:shadow-manga-red transition-all duration-300"
                  >
                    View Certificates
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
