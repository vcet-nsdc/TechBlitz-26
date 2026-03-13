'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { submitScore } from '@/actions/scores';
import type { IScore } from '@/lib/models/Score';

const DOMAIN_COLORS: Record<string, string> = {
  AI: 'bg-purple-500',
  Vibeathon: 'bg-green-500',
  'UI/UX': 'bg-blue-500',
};

interface ScoringFormProps {
  team: { id: string; name: string; domain: string; labId: string; labName: string; members: string[] };
  existingScore?: IScore | null;
  round: 'lab' | 'final';
  judgeName: string;
}

export function ScoringForm({
  team,
  existingScore,
  round,
  judgeName,
}: ScoringFormProps) {
  const router = useRouter();
  const [innovation, setInnovation] = useState(existingScore?.criteria?.innovation ?? 5);
  const [execution, setExecution] = useState(existingScore?.criteria?.execution ?? 5);
  const [presentation, setPresentation] = useState(
    existingScore?.criteria?.presentation ?? 5
  );
  const [impact, setImpact] = useState(existingScore?.criteria?.impact ?? 5);
  const [feasibility, setFeasibility] = useState(existingScore?.criteria?.feasibility ?? 5);
  const [scalability, setScalability] = useState(existingScore?.criteria?.scalability ?? 5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total =
    innovation + execution + presentation + impact + feasibility + (round === 'final' ? scalability : 0);
  const maxTotal = round === 'lab' ? 50 : 60;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await submitScore({
      teamId: team.id,
      judgeName,
      round,
      criteria: { innovation, execution, presentation, impact, feasibility, scalability },
    });

    if (result.success) {
      toast.success('Score submitted!');
      if (round === 'lab') {
        router.push(`/judge-portal/lab/${team.labId}`);
      } else {
        router.push('/judge-portal/final');
      }
    } else {
      toast.error(result.error || 'Failed to submit');
    }
    setIsSubmitting(false);
  };

  const domainColor = DOMAIN_COLORS[team.domain] || 'bg-gray-500';

  return (
    <div className="min-h-screen bg-white halftone-bg p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="manga-panel p-4 sm:p-6 shadow-manga-lg border-4 border-black mb-4 sm:mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-2 py-0.5 text-white text-xs font-bold rounded ${domainColor}`}
            >
              {team.domain}
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground">{team.labName}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold -skew-x-12">
            {team.name}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            {team.members.join(' • ')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 manga-panel p-4 sm:p-6 shadow-manga-lg border-4 border-black">
          <div>
            <label className="flex items-center gap-2 mb-2 text-sm sm:text-base">
              🔥 Innovation (0–10)
            </label>
            <Input
              type="number"
              min="0"
              max="10"
              value={innovation}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 0;
                setInnovation(Math.min(10, Math.max(0, val)));
              }}
              className="w-full manga-panel border-2 border-black text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 mb-2 text-sm sm:text-base">
              ⚙️ Execution (0–10)
            </label>
            <Input
              type="number"
              min="0"
              max="10"
              value={execution}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 0;
                setExecution(Math.min(10, Math.max(0, val)));
              }}
              className="w-full manga-panel border-2 border-black text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 mb-2 text-sm sm:text-base">
              🎤 Presentation (0–10)
            </label>
            <Input
              type="number"
              min="0"
              max="10"
              value={presentation}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 0;
                setPresentation(Math.min(10, Math.max(0, val)));
              }}
              className="w-full manga-panel border-2 border-black text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 mb-2 text-sm sm:text-base">
              🌍 Impact (0–10)
            </label>
            <Input
              type="number"
              min="0"
              max="10"
              value={impact}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 0;
                setImpact(Math.min(10, Math.max(0, val)));
              }}
              className="w-full manga-panel border-2 border-black text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 mb-2 text-sm sm:text-base">
              🧩 Feasibility (0–10)
            </label>
            <Input
              type="number"
              min="0"
              max="10"
              value={feasibility}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 0;
                setFeasibility(Math.min(10, Math.max(0, val)));
              }}
              className="w-full manga-panel border-2 border-black text-sm sm:text-base"
            />
          </div>

          {round === 'final' && (
            <div>
              <label className="flex items-center gap-2 mb-2 text-sm sm:text-base">
                📈 Scalability (0–10)
              </label>
              <Input
                type="number"
                min="0"
                max="10"
                value={scalability}
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0;
                  setScalability(Math.min(10, Math.max(0, val)));
                }}
                className="w-full manga-panel border-2 border-black text-sm sm:text-base"
              />
            </div>
          )}

          <div className="pt-4 border-t-2 border-black">
            <p className="text-lg sm:text-xl text-red-600">
              Total: {total} / {maxTotal}
            </p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 sm:py-4 text-lg sm:text-xl manga-panel text-black"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Score'}
          </Button>
        </form>
      </div>
    </div>
  );
}
