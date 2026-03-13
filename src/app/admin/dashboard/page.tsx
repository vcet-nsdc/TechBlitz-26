'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import type { Domain } from '@/lib/problemStatements';

interface Team {
  _id: string;
  teamName: string;
  leaderName: string;
  member2: string;
  member3?: string;
  domain: Domain;
  submissionUrl: string;
  createdAt: string;
  certificates: Array<{
    participantName: string;
    certificateDataUrl: string;
    generatedAt: string;
  }>;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [teams, setTeams] = useState<Team[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [domainFilter, setDomainFilter] = useState<Domain | 'all'>('all');

  useEffect(() => {
    fetchTeams();
  }, []);

  useEffect(() => {
    filterTeams();
  }, [teams, searchTerm, domainFilter]);

  const fetchTeams = async () => {
    try {
      const response = await fetch('/api/teams');
      if (!response.ok) {
        if (response.status === 401) {
          router.push('/admin');
          return;
        }
        throw new Error('Failed to fetch teams');
      }
      const data = await response.json();
      setTeams(data);
    } catch {
      toast.error('Failed to fetch teams');
    } finally {
      setLoading(false);
    }
  };

  const filterTeams = () => {
    let filtered = teams;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(team =>
        team.teamName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by domain
    if (domainFilter !== 'all') {
      filtered = filtered.filter(team => team.domain === domainFilter);
    }

    setFilteredTeams(filtered);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin');
    } catch {
      toast.error('Logout failed');
    }
  };

  const getDomainStats = () => {
    const stats = {
      total: teams.length,
      vibecoding: teams.filter(t => t.domain === 'vibecoding').length,
      agenticai: teams.filter(t => t.domain === 'agenticai').length,
      uiux: teams.filter(t => t.domain === 'uiux').length,
    };
    return stats;
  };

  const getDomainBadgeColor = (domain: Domain) => {
    switch (domain) {
      case 'vibecoding':
        return 'bg-purple-600';
      case 'agenticai':
        return 'bg-blue-600';
      case 'uiux':
        return 'bg-pink-600';
      default:
        return 'bg-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const stats = getDomainStats();

  return (
    <div className="min-h-screen bg-[#0a0a0f] p-3 sm:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">TechBlitz26 — Registered Teams</h1>
            <p className="text-sm sm:text-base text-gray-400">Manage and view all registered teams</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <a
              href="/admin/judge-portal"
              className="px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base"
            >
              Judge Portal
            </a>
            <button
              onClick={handleLogout}
              className="px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-[#13131a] border border-[#ffffff10] rounded-lg p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-xs sm:text-sm text-gray-400">Total Teams</div>
          </div>
          <div className="bg-[#13131a] border border-[#ffffff10] rounded-lg p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-purple-400">{stats.vibecoding}</div>
            <div className="text-xs sm:text-sm text-gray-400">Vibe Coding</div>
          </div>
          <div className="bg-[#13131a] border border-[#ffffff10] rounded-lg p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-blue-400">{stats.agenticai}</div>
            <div className="text-xs sm:text-sm text-gray-400">Agentic AI</div>
          </div>
          <div className="bg-[#13131a] border border-[#ffffff10] rounded-lg p-3 sm:p-4">
            <div className="text-xl sm:text-2xl font-bold text-pink-400">{stats.uiux}</div>
            <div className="text-xs sm:text-sm text-gray-400">UI/UX</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
          <input
            type="text"
            placeholder="Search by team name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-3 sm:px-4 py-2 bg-[#13131a] border border-[#ffffff20] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#6c47ff] text-sm sm:text-base"
          />
          <select
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value as Domain | 'all')}
            className="px-3 sm:px-4 py-2 bg-[#13131a] border border-[#ffffff20] rounded-lg text-white focus:outline-none focus:border-[#6c47ff] text-sm sm:text-base"
          >
            <option value="all">All Domains</option>
            <option value="vibecoding">Vibe Coding</option>
            <option value="agenticai">Agentic AI</option>
            <option value="uiux">UI/UX</option>
          </select>
        </div>

        {/* Teams Table */}
        <div className="bg-[#13131a] border border-[#ffffff10] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-[#0a0a0f] border-b border-[#ffffff10]">
                <tr>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">#</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Team Name</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell">Leader</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell">Member 2</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden lg:table-cell">Member 3</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Domain</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell">Submission</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ffffff10]">
                {filteredTeams.map((team, index) => (
                  <tr key={team._id} className="hover:bg-[#0a0a0f] transition-colors">
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-300">{index + 1}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-white">{team.teamName}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-300 hidden sm:table-cell">{team.leaderName}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-300 hidden md:table-cell">{team.member2}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-300 hidden lg:table-cell">{team.member3 || '-'}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3">
                      <span className={`px-1 sm:px-2 py-1 text-xs font-medium text-white rounded-full ${getDomainBadgeColor(team.domain)}`}>
                        {team.domain}
                      </span>
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm hidden sm:table-cell">
                      <a
                        href={team.submissionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#6c47ff] hover:text-[#7c57ff] transition-colors truncate block max-w-20 sm:max-w-30 md:max-w-40 lg:max-w-50"
                      >
                        {team.submissionUrl}
                      </a>
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-300 hidden md:table-cell">
                      {new Date(team.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTeams.length === 0 && (
            <div className="text-center py-6 sm:py-8 text-gray-400 text-sm sm:text-base">
              {teams.length === 0 ? 'No teams registered yet' : 'No teams match your filters'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
