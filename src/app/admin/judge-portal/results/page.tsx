'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface ScoreRow {
  teamId: string;
  teamName: string;
  domain: string;
  labName: string;
  judgeName: string;
  round: string;
  innovation: number;
  execution: number;
  presentation: number;
  impact: number;
  feasibility: number;
  scalability: number;
  total: number;
}

export default function ResultsPage() {
  const [rows, setRows] = useState<ScoreRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [domainFilter, setDomainFilter] = useState<string>('all');
  const [roundFilter, setRoundFilter] = useState<string>('all');

  useEffect(() => {
    fetch('/api/admin/judge-portal/export?format=json')
      .then((r) => (r.ok ? r.json() : []))
      .then(setRows)
      .catch(() => toast.error('Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = rows.filter((r) => {
    if (domainFilter !== 'all' && r.domain !== domainFilter) return false;
    if (roundFilter !== 'all' && r.round !== roundFilter) return false;
    return true;
  });

  const exportCSV = () => {
    const headers = [
      'teamId',
      'teamName',
      'domain',
      'labName',
      'judgeName',
      'round',
      'innovation',
      'execution',
      'presentation',
      'impact',
      'feasibility',
      'scalability',
      'total',
    ];
    const csv =
      headers.join(',') +
      '\n' +
      filtered
        .map((r) =>
          headers
            .map((h) => {
              const v = (r as unknown as Record<string, unknown>)[h];
              const s = String(v ?? '');
              return s.includes(',') ? `"${s}"` : s;
            })
            .join(',')
        )
        .join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `judge-scores-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV downloaded');
  };

  const domains = [...new Set(rows.map((r) => r.domain))];

  if (loading) {
    return (
      <div className="min-h-screen bg-white halftone-bg p-6 flex items-center justify-center">
        <p className="font-manga-marker">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white halftone-bg p-6">
      <div className="max-w-7xl mx-auto overflow-x-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/admin/judge-portal">
            <Button variant="ghost" className="font-manga-marker">
              ← Back
            </Button>
          </Link>
          <h1 className="text-2xl font-manga-title font-bold action-text-red -skew-x-12">
            Results Export
          </h1>
          <Button
            onClick={exportCSV}
            className="font-manga-marker manga-panel"
          >
            Export CSV
          </Button>
        </div>

        <div className="flex gap-4 mb-4">
          <select
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
            className="px-3 py-2 border-2 border-black font-manga-marker"
          >
            <option value="all">All Domains</option>
            {domains.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <select
            value={roundFilter}
            onChange={(e) => setRoundFilter(e.target.value)}
            className="px-3 py-2 border-2 border-black font-manga-marker"
          >
            <option value="all">All Rounds</option>
            <option value="lab">Lab</option>
            <option value="final">Final</option>
          </select>
        </div>

        <div className="manga-panel border-4 border-black overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b-2 border-black bg-muted">
                <th className="p-2 font-manga-marker">Team</th>
                <th className="p-2 font-manga-marker">Domain</th>
                <th className="p-2 font-manga-marker">Lab</th>
                <th className="p-2 font-manga-marker">Judge</th>
                <th className="p-2 font-manga-marker">Round</th>
                <th className="p-2 font-manga-marker">Innovation</th>
                <th className="p-2 font-manga-marker">Execution</th>
                <th className="p-2 font-manga-marker">Presentation</th>
                <th className="p-2 font-manga-marker">Impact</th>
                <th className="p-2 font-manga-marker">Feasibility</th>
                <th className="p-2 font-manga-marker">Scalability</th>
                <th className="p-2 font-manga-marker">Total</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={i} className="border-b border-black">
                  <td className="p-2">{r.teamName}</td>
                  <td className="p-2">{r.domain}</td>
                  <td className="p-2">{r.labName}</td>
                  <td className="p-2">{r.judgeName}</td>
                  <td className="p-2">{r.round}</td>
                  <td className="p-2">{r.innovation}</td>
                  <td className="p-2">{r.execution}</td>
                  <td className="p-2">{r.presentation}</td>
                  <td className="p-2">{r.impact}</td>
                  <td className="p-2">{r.feasibility}</td>
                  <td className="p-2">{r.scalability}</td>
                  <td className="p-2 font-manga-marker">{r.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <p className="text-center font-manga-marker text-muted-foreground py-8">
            No scores to display
          </p>
        )}
      </div>
    </div>
  );
}
