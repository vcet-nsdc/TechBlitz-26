'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import CertificateCanvas from '@/components/CertificateCanvas';
import type { Domain } from '@/lib/problemStatements';

interface Team {
  teamName: string;
  leaderName: string;
  member2: string;
  member3?: string;
  domain: Domain;
  certificates: Array<{
    participantName: string;
    certificateDataUrl: string;
    generatedAt: string;
  }>;
}

export default function Certificates() {
  const [teamName, setTeamName] = useState('');
  const [teamData, setTeamData] = useState<Team | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!teamName.trim()) {
      toast.error('Please enter a team name');
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch(`/api/team/${encodeURIComponent(teamName)}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          toast.error('Team not found');
          setTeamData(null);
          return;
        }
        throw new Error('Failed to fetch team');
      }

      const data = await response.json();
      setTeamData(data);
      toast.success('Team found!');
    } catch {
      toast.error('Failed to fetch team data');
      setTeamData(null);
    } finally {
      setLoading(false);
    }
  };

  const getParticipants = () => {
    if (!teamData) return [];
    
    const participants = [
      { name: teamData.leaderName, role: 'Team Leader' },
      { name: teamData.member2, role: 'Member 2' },
    ];
    
    if (teamData.member3) {
      participants.push({ name: teamData.member3, role: 'Member 3' });
    }
    
    return participants;
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans halftone-bg p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-manga-title mb-4 action-text-red">
            TechBlitz26 Certificates
          </h1>
          <p className="font-manga-marker text-lg">Look up and download your participation certificates</p>
        </div>

        {/* Search Form */}
        <div className="manga-panel p-8 shadow-manga-lg mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label className="block font-manga-marker text-sm mb-2">
                Team Name
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full px-4 py-3 bg-white border-2 border-black font-manga-marker text-black placeholder-gray-500 focus:outline-none focus:border-red-500 transition-all"
                placeholder="Enter your team name"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 manga-panel font-manga-action text-2xl action-text-red hover:shadow-manga-red transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Searching...' : 'Find Team'}
            </button>
          </form>
        </div>

        {/* Results */}
        {searched && (
          <div className="animate-in slide-in-from-bottom duration-500">
            {teamData ? (
              <div className="space-y-8">
                {/* Team Info */}
                <div className="bg-[#13131a] border border-[#ffffff10] rounded-2xl p-6 shadow-2xl">
                  <h2 className="text-2xl font-bold text-white mb-4">Team Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                    <div>
                      <span className="text-gray-500">Team Name:</span>
                      <span className="ml-2 text-white font-semibold">{teamData.teamName}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Domain:</span>
                      <span className="ml-2 text-white font-semibold capitalize">{teamData.domain}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Team Leader:</span>
                      <span className="ml-2 text-white">{teamData.leaderName}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Member 2:</span>
                      <span className="ml-2 text-white">{teamData.member2}</span>
                    </div>
                    {teamData.member3 && (
                      <div>
                        <span className="text-gray-500">Member 3:</span>
                        <span className="ml-2 text-white">{teamData.member3}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Certificates */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">Certificates</h2>
                  <p className="text-gray-400">
                    Download certificates for each team member below
                  </p>
                  
                  {getParticipants().map((participant, index) => (
                    <div key={index} className="bg-[#13131a] border border-[#ffffff10] rounded-2xl p-6 shadow-2xl">
                      <h3 className="text-xl font-semibold text-white mb-4">
                        {participant.name} - {participant.role}
                      </h3>
                      <CertificateCanvas
                        participantName={participant.name}
                        teamName={teamData.teamName}
                        domain={teamData.domain}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-[#13131a] border border-[#ffffff10] rounded-2xl p-8 shadow-2xl text-center">
                <div className="text-gray-400">
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                  </svg>
                  <p className="text-lg">No team found with that name</p>
                  <p className="text-sm mt-2">Please check the team name and try again</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
