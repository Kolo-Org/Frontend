import { InviteConfirm } from "@/components/groups/InviteConfirm";

// In Next.js 16, dynamic route `params` is a Promise and must be awaited.
export default async function InvitePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  return <InviteConfirm code={code} />;
}
