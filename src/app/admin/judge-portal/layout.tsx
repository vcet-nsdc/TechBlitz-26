/**
 * Admin Judge Portal layout — protected by middleware (admin auth).
 * All /admin/judge-portal/* routes require admin login.
 */
export default function AdminJudgePortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
