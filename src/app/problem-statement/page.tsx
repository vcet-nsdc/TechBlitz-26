'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { Domain } from '@/lib/problemStatements';

interface RegistrationData {
  teamName: string;
  leaderName: string;
  member2: string;
  member3: string;
  domain: Domain | null;
}

const domains: { id: Domain; name: string; icon: string; description: string }[] = [
  {
    id: 'vibecoding',
    name: 'Vibe Coding',
    icon: '💻',
    description: 'Build amazing apps with AI assistance'
  },
  {
    id: 'agenticai',
    name: 'Agentic AI',
    icon: '🤖',
    description: 'Create autonomous AI agents'
  },
  {
    id: 'uiux',
    name: 'UI/UX',
    icon: '🎨',
    description: 'Design beautiful user experiences'
  }
];

export default function TeamRegistration() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegistrationData>({
    teamName: '',
    leaderName: '',
    member2: '',
    member3: '',
    domain: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDomainSelect = (domain: Domain) => {
    setFormData(prev => ({ ...prev, domain }));
  };

  const validateForm = (): boolean => {
    if (!formData.teamName.trim()) {
      toast.error('Team name is required');
      return false;
    }
    if (!formData.leaderName.trim()) {
      toast.error('Leader name is required');
      return false;
    }
    if (!formData.member2.trim()) {
      toast.error('Member 2 name is required');
      return false;
    }
    if (!formData.domain) {
      toast.error('Please select a domain');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Store in sessionStorage
      sessionStorage.setItem('tbz_registration', JSON.stringify(formData));
      
      // Navigate to submission page
      router.push('/problem-statement/submit');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans halftone-bg flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Indicator */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-[#6c47ff] rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
            <div className="w-16 h-1 bg-[#6c47ff]"></div>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-bold">2</div>
            <div className="w-16 h-1 bg-gray-300"></div>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm font-bold">3</div>
          </div>
          <p className="text-gray-600 text-sm">Step 1 of 3: Team Registration</p>
        </div>

        {/* Registration Form */}
        <div className="manga-panel p-8 shadow-manga-lg">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-manga-title mb-4 action-text-red">
              TechBlitz26 Registration
            </h1>
            <p className="font-manga-marker text-lg">Register your team for the ultimate tech challenge</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Team Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Name *
              </label>
              <input
                type="text"
                name="teamName"
                value={formData.teamName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border-2 border-black text-black placeholder-gray-500 focus:outline-none focus:border-red-500 transition-all"
                placeholder="Enter your team name"
                disabled={isSubmitting}
              />
            </div>

            {/* Leader Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Leader Name *
              </label>
              <input
                type="text"
                name="leaderName"
                value={formData.leaderName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border-2 border-black text-black placeholder-gray-500 focus:outline-none focus:border-red-500 transition-all"
                placeholder="Enter team leader name"
                disabled={isSubmitting}
              />
            </div>

            {/* Member 2 Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Member 2 Name *
              </label>
              <input
                type="text"
                name="member2"
                value={formData.member2}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border-2 border-black text-black placeholder-gray-500 focus:outline-none focus:border-red-500 transition-all"
                placeholder="Enter member 2 name"
                disabled={isSubmitting}
              />
            </div>

            {/* Member 3 Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Member 3 Name (Optional)
              </label>
              <input
                type="text"
                name="member3"
                value={formData.member3}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white border-2 border-black text-black placeholder-gray-500 focus:outline-none focus:border-red-500 transition-all"
                placeholder="Enter member 3 name"
                disabled={isSubmitting}
              />
            </div>

            {/* Domain Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Select Your Domain *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {domains.map((domain) => (
                  <button
                    key={domain.id}
                    type="button"
                    onClick={() => handleDomainSelect(domain.id)}
                    className={`manga-panel p-4 transition-all duration-300 hover:scale-105 ${
                      formData.domain === domain.id
                        ? 'shadow-manga-red border-red-500'
                        : 'hover:shadow-manga-red'
                    }`}
                    disabled={isSubmitting}
                  >
                    <div className="text-3xl mb-2">{domain.icon}</div>
                    <h3 className="text-black font-semibold mb-1">{domain.name}</h3>
                    <p className="text-gray-600 text-xs">{domain.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 manga-panel font-manga-action text-2xl action-text-red hover:shadow-manga-red transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : 'Continue to Submission'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
