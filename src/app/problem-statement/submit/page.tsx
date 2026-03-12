'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { Domain } from '@/lib/problemStatements';

interface RegistrationData {
  teamName: string;
  leaderName: string;
  member2: string;
  member3: string;
  domain: Domain;
}

export default function Submission() {
  const router = useRouter();
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [urlError, setUrlError] = useState('');

  useEffect(() => {
    // Get registration data from sessionStorage
    const stored = sessionStorage.getItem('tbz_registration');
    if (!stored) {
      router.push('/problem-statement');
      return;
    }
    
    const data = JSON.parse(stored) as RegistrationData;
    setRegistrationData(data);
  }, [router]);

  const validateUrl = (url: string, domain: Domain): string => {
    if (!url.trim()) {
      return 'Submission URL is required';
    }

    if (domain === 'vibecoding' || domain === 'agenticai') {
      // GitHub URL validation
      if (!url.toLowerCase().includes('github.com')) {
        return 'Please enter a valid GitHub repository URL';
      }
    } else if (domain === 'uiux') {
      // Figma URL validation
      if (!url.startsWith('https://www.figma.com/')) {
        return 'Please enter a valid Figma file URL';
      }
    }

    return '';
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setSubmissionUrl(url);
    
    if (registrationData) {
      const error = validateUrl(url, registrationData.domain);
      setUrlError(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registrationData) {
      toast.error('Registration data not found. Please start over.');
      router.push('/problem-statement');
      return;
    }

    const error = validateUrl(submissionUrl, registrationData.domain);
    if (error) {
      setUrlError(error);
      return;
    }

    setIsSubmitting(true);

    try {
      // Call registration API
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...registrationData,
          submissionUrl,
        }),
      });

      if (response.status === 409) {
        toast.error('Team name already exists. Please use a different team name.');
        router.push('/problem-statement');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || 'Registration failed');
        return;
      }

      const teamData = await response.json();
      
      // Save team data to sessionStorage
      sessionStorage.setItem('tbz_team', JSON.stringify(teamData));
      
      toast.success('Registration successful!');
      
      // Navigate to reveal page
      router.push('/problem-statement/reveal');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!registrationData) {
    return (
      <div className="min-h-screen bg-white text-black font-sans halftone-bg flex items-center justify-center">
        <div className="text-black font-manga-marker">Loading...</div>
      </div>
    );
  }

  const isGitHubDomain = registrationData.domain === 'vibecoding' || registrationData.domain === 'agenticai';

  return (
    <div className="min-h-screen bg-white text-black font-sans halftone-bg flex items-center justify-center px-3 py-6 sm:p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-6 sm:mb-8 text-center">
          <div className="flex items-center justify-center space-x-1 sm:space-x-2 mb-3 sm:mb-4">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">✓</div>
            <div className="w-8 sm:w-16 h-1 bg-[#6c47ff]"></div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#6c47ff] rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">2</div>
            <div className="w-8 sm:w-16 h-1 bg-gray-300"></div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs sm:text-sm font-bold">3</div>
          </div>
          <p className="text-gray-600 text-xs sm:text-sm">Step 2 of 3: Submit Your Work</p>
        </div>

        {/* Submission Form */}
        <div className="manga-panel p-4 sm:p-8 shadow-manga-lg">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold font-manga-title mb-3 sm:mb-4 action-text-red">
              Submit Your Work
            </h1>
            <p className="font-manga-marker text-sm sm:text-lg text-black">
              Team: <span className="text-md">{registrationData.teamName}</span> | 
              Domain: <span className="text-md">{registrationData.domain}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* URL Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isGitHubDomain ? 'GitHub Repository URL' : 'Figma File URL'} *
              </label>
              <input
                type="url"
                value={submissionUrl}
                onChange={handleUrlChange}
                className={`w-full px-4 py-3 bg-white border-2 border-black  text-black placeholder-gray-500 focus:outline-none focus:border-red-500 transition-all ${
                  urlError 
                    ? 'border-red-500' 
                    : ''
                }`}
                placeholder={
                  isGitHubDomain 
                    ? 'https://github.com/username/your-repo'
                    : 'https://www.figma.com/file/...'
                }
                disabled={isSubmitting}
              />
              
              {urlError && (
                <p className="mt-2 text-sm font-manga-marker text-red-600">{urlError}</p>
              )}
              
              {/* Format Hint */}
              <div className="mt-3 p-2 sm:p-3 manga-panel">
                <p className=" text-xs sm:text-sm text-black">
                  <span className="font-manga-action">Format required:</span><br/>
                  {isGitHubDomain ? (
                    'GitHub repository URL(e.g.,https://github.com/username/TECHBLITZ26_TEAMNAME)'
                  ) : (
                    'Must start with https://www.figma.com/'
                  )}
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 sm:py-4 manga-panel font-manga-action text-xl sm:text-2xl action-text-red hover:shadow-manga-red transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Complete Registration'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
