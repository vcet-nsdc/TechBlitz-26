import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isJudgeAuthenticated } from '@/lib/judgeAuth';
import { LogoutButton } from '@/components/judge/LogoutButton';
import { Button } from '@/components/ui/button';

export default async function JudgePortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await isJudgeAuthenticated();
  if (!session) {
    redirect('/judge-portal');
  }
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b-2 border-black manga-panel p-2 sm:p-3 flex flex-col sm:flex-row items-center justify-between bg-white gap-2">
        <div className="flex gap-1 sm:gap-2 flex-wrap">
          <Link href="/judge-portal/lab">
            <Button variant="ghost" size="sm" className="font-manga-marker text-xs sm:text-sm">
              Labs
            </Button>
          </Link>
          <Link href="/judge-portal/leaderboard">
            <Button variant="ghost" size="sm" className="font-manga-marker text-xs sm:text-sm">
              Leaderboard
            </Button>
          </Link>
          <Link href="/judge-portal/final">
            <Button variant="ghost" size="sm" className="font-manga-marker text-xs sm:text-sm">
              Final
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-manga-marker text-muted-foreground truncate max-w-[100px] sm:max-w-none">
            {session.name}
          </span>
          <LogoutButton />
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
