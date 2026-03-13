'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { promoteTeamToFinal } from '@/actions/teams';

const DOMAIN_COLORS: Record<string, string> = {
  AI: 'bg-purple-500',
  Vibeathon: 'bg-green-500',
  'UI/UX': 'bg-blue-500',
};

interface LeaderboardEntry {
  teamId: string;
  teamName: string;
  domain: string;
  labId: string;
  labName: string;
  totalMarks: number;
  judgeCount: number;
}

export default function PromotePage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [teams, setTeams] = useState<{ id: string; inFinal: boolean }[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [lbRes, teamsRes] = await Promise.all([
        fetch('/api/admin/judge-portal/leaderboard?round=lab'),
        fetch('/api/admin/judge-portal/teams'),
      ]);
      if (lbRes.ok) {
        const lb = await lbRes.json();
        setLeaderboard(lb);
      }
      if (teamsRes.ok) {
        const t = await teamsRes.json();
        setTeams(t);
      }
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const teamInFinal = (id: string) =>
    teams.find((t) => t.id === id)?.inFinal ?? false;

  const handlePromote = async (teamId: string, inFinal: boolean) => {
    const r = await promoteTeamToFinal(teamId, inFinal);
    if (r.success) {
      toast.success(inFinal ? 'Promoted!' : 'Removed from final');
      fetchData();
    } else {
      toast.error(r.error);
    }
  };

  const handlePromoteTop5 = async (domain: string) => {
    const top5 = leaderboard
      .filter((e) => e.domain === domain)
      .slice(0, 5)
      .map((e) => e.teamId);
    for (const id of top5) {
      await promoteTeamToFinal(id, true);
    }
    toast.success(`Promoted top 5 for ${domain}`);
    fetchData();
  };

  const byDomain = leaderboard.reduce<Record<string, LeaderboardEntry[]>>(
    (acc, e) => {
      if (!acc[e.domain]) acc[e.domain] = [];
      acc[e.domain].push(e);
      return acc;
    },
    {}
  );

  const domains = ['AI', 'Vibeathon', 'UI/UX'] as const;

  if (loading) {
    return (
      <div className="min-h-screen bg-white halftone-bg p-6 flex items-center justify-center">
        <p className="font-manga-marker">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white halftone-bg p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href="/admin/judge-portal">
            <Button variant="ghost" className="font-manga-marker">
              ← Back
            </Button>
          </Link>
          <h1 className="text-3xl font-manga-title font-bold action-text-red -skew-x-12">
            Promote to Final
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {domains.map((domain) => {
            const domainTeams = byDomain[domain] ?? [];
            const domainColor = DOMAIN_COLORS[domain] ?? 'bg-gray-500';

            return (
              <div
                key={domain}
                className="manga-panel border-4 border-black p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2
                    className={`font-manga-title font-bold px-2 py-1 text-white ${domainColor}`}
                  >
                    {domain}
                  </h2>
                  <Button
                    size="sm"
                    onClick={() => handlePromoteTop5(domain)}
                    className="font-manga-marker"
                  >
                    Promote Top 5
                  </Button>
                </div>
                <div className="space-y-2">
                  {domainTeams.map((entry, idx) => {
                    const inFinal = teamInFinal(entry.teamId);
                    const isTop5 = idx < 5;

                    return (
                      <div
                        key={entry.teamId}
                        className={`flex items-center justify-between p-2 border border-black ${
                          isTop5 ? 'bg-amber-50' : ''
                        }`}
                      >
                        <div>
                          <span className="font-manga-marker text-sm">
                            {idx + 1}.{' '}
                          </span>
                          <span className="font-manga-title text-sm">
                            {entry.teamName}
                          </span>
                          <span className="text-xs text-muted-foreground ml-1">
                            ({entry.totalMarks} total)
                          </span>
                        </div>
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={inFinal}
                            onChange={(e) =>
                              handlePromote(entry.teamId, e.target.checked)
                            }
                          />
                          <span className="text-xs font-manga-marker">
                            In Final
                          </span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
