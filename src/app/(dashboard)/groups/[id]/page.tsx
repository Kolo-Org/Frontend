"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { groupsService } from "../../../../services/api/groups";
import type { Group } from "../../../../types/group";
import { GroupHeader } from "../../../../components/groups/GroupHeader";
import { NextMilestone } from "../../../../components/groups/NextMilestone";
import { RecentDeposits } from "../../../../components/groups/RecentDeposits";
import { MembersList, Member } from "../../../../components/groups/MembersList";
import { GroupStats } from "../../../../components/groups/GroupStats";
import { HelpCard } from "../../../../components/groups/HelpCard";
import { InviteMemberModal } from "../../../../components/groups/InviteMemberModal";

export default function GroupDetails() {
  const params = useParams<{ id: string }>();
  const [group, setGroup] = useState<Group | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchGroup = async () => {
      if (!params?.id) {
        if (mounted) setIsLoading(false);
        return;
      }
      const fetched = await groupsService.getGroup(params.id);
      if (mounted) {
        setGroup(fetched);
        setIsLoading(false);
      }
    };
    fetchGroup();
    return () => {
      mounted = false;
    };
  }, [params?.id]);

  // Mock data to match the Figma design
  const members: Member[] = [
    {
      id: "1",
      name: "Segun Arinze",
      role: "ADMIN",
      status: "CONTRIBUTED",
      avatarUrl: "https://i.pravatar.cc/150?u=1",
    },
    {
      id: "2",
      name: "Titi Balogun",
      role: "CONTRIBUTOR",
      status: "CONTRIBUTED",
      avatarUrl: "https://i.pravatar.cc/150?u=2",
    },
    {
      id: "3",
      name: "Daniel K.",
      role: "PENDING",
      status: "WAITING",
      avatarUrl: "https://i.pravatar.cc/150?u=3",
    },
    {
      id: "4",
      name: "Mama Funke",
      role: "CONTRIBUTOR",
      status: "CONTRIBUTED",
      avatarUrl: "https://i.pravatar.cc/150?u=4",
    },
  ];

  const deposits = [
    {
      id: "d1",
      name: "Uncle Segun",
      time: "TODAY, 10:45 AM",
      amount: 25000,
      avatarUrl: "https://i.pravatar.cc/150?u=1",
      isCurrentUser: false,
    },
    {
      id: "d2",
      name: "Aunty Titi",
      time: "YESTERDAY",
      amount: 15000,
      avatarUrl: "https://i.pravatar.cc/150?u=2",
      isCurrentUser: true,
    },
  ];

  const handleInvite = (emailOrPhone: string) => {
    console.log("Inviting:", emailOrPhone);
    setIsInviteModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-8 bg-[#f4f7f5] min-h-screen flex justify-center items-center">
        <p className="text-gray-500">Loading group...</p>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-8 bg-[#f4f7f5] min-h-screen flex justify-center items-center">
        <p className="text-gray-500">Group not found or unavailable.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-[#f4f7f5] min-h-screen">
      <GroupHeader
        title={group.name}
        totalSavings={480000}
        activeMembers={group.memberCount || 8}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="flex-1">
            <NextMilestone
              milestoneName="Term Fees"
              progressPercentage={75}
              amountLeft={120000}
              targetPayout={
                group.contributionAmount && group.memberCount
                  ? group.contributionAmount * group.memberCount
                  : 600000
              }
              dueDate="Sept 15"
              onContribute={() => console.log("Contribute clicked")}
            />
          </div>
          <RecentDeposits deposits={deposits} />
        </div>

        {/* Sidebar Content Area */}
        <div className="flex flex-col">
          <MembersList
            members={members}
            onInvite={() => setIsInviteModalOpen(true)}
          />
          <GroupStats efficiency={94.2} streak={12} />
          <HelpCard />
        </div>
      </div>

      <InviteMemberModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInvite={handleInvite}
      />
    </div>
  );
}
