'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getLeaderboard } from '@/actions/scores';
import type { LeaderboardEntry } from '@/actions/scores';

interface LeaderboardProps {
  round: 'lab' | 'final';
  initialData: LeaderboardEntry[];
}

export function Leaderboard({ round, initialData }: LeaderboardProps) {
  const router = useRouter();
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(async () => {
      const fresh = await getLeaderboard(round);
      setData(fresh);
      router.refresh();
    }, 30000);
    return () => clearInterval(interval);
  }, [round, router]);

  const byDomain = data.reduce<Record<string, LeaderboardEntry[]>>((acc, entry) => {
    if (!acc[entry.domain]) acc[entry.domain] = [];
    acc[entry.domain].push(entry);
    return acc;
  }, {});

  const domains = ['AI', 'Vibeathon', 'UI/UX'] as const;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {domains.map((domain) => (
        <div key={domain} className="manga-panel border-4 border-black overflow-hidden">
          <div className="border-b-2 border-black p-3 bg-muted">
            <h2 className="font-manga-title font-bold">{domain}</h2>
            <p className="text-xs text-muted-foreground">
              {round === 'lab' ? 'Lab round' : 'Final round'}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="p-2 font-manga-marker">#</th>
                  <th className="p-2 font-manga-marker">Team</th>
                  <th className="p-2 font-manga-marker">Lab</th>
                  <th className="p-2 font-manga-marker">Total</th>
                  <th className="p-2 font-manga-marker">Judges</th>
                </tr>
              </thead>
              <tbody>
                {(byDomain[domain] ?? []).map((entry, idx) => {
                  const rank = idx + 1;
                  const top5 = rank <= 5;
                  const rankClass =
                    rank === 1
                      ? 'text-yellow-600'
                      : rank === 2
                        ? 'text-gray-500'
                        : rank === 3
                          ? 'text-amber-700'
                          : '';

                  return (
                    <tr
                      key={entry.teamId}
                      className={`border-b border-black ${top5 ? 'bg-amber-50' : ''}`}
                    >
                      <td className={`p-2 font-manga-action ${rankClass}`}>
                        {rank <= 5 ? '⭐' : ''} {rank}
                      </td>
                      <td className="p-2 font-manga-title">{entry.teamName}</td>
                      <td className="p-2 text-xs">{entry.labName}</td>
                      <td className="p-2 font-manga-marker">{entry.totalMarks}</td>
                      <td className="p-2 text-xs">{entry.judgeCount}</td>
                    </tr>
                  );
                })}
                {(byDomain[domain] ?? []).length === 0 && (
                  <tr>
                    <td className="p-3 text-sm text-muted-foreground" colSpan={5}>
                      No scores yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
