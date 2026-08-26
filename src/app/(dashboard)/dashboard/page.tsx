'use client';

import React from 'react';
import { BalanceCard } from '@/components/dashboard/BalanceCard';
import { SavingsCircles } from '@/components/dashboard/SavingsCircles';
import { TransactionList } from '@/components/dashboard/TransactionList';
import { useWallet } from '@/hooks/useWallet';
import { useGroups } from '@/hooks/useGroups';
import { usePayments } from '@/hooks/usePayments';

export default function Dashboard() {
  const { data: walletData, isLoading: isWalletLoading, error: walletError } = useWallet();
  const { data: groupsData, isLoading: isGroupsLoading, error: groupsError } = useGroups();
  const { data: paymentsData, isLoading: isPaymentsLoading, error: paymentsError } = usePayments();

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* 
        Using CSS Grid to gracefully collapse from multi-column layout 
        into a single column on smaller screens. 
        Actually, a single column of full-width rows works perfectly for this layout,
        as defined in the Figma.
      */}
      <div className="grid grid-cols-1 gap-8 md:gap-12">
        {/* Balance Card Section */}
        <section>
          {walletError ? (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl">Error loading wallet data</div>
          ) : (
            <BalanceCard 
              balance={walletData?.balance} 
              currency={walletData?.currency} 
              trendPercentage={walletData?.trendPercentage} 
              isLoading={isWalletLoading} 
            />
          )}
        </section>

        {/* Savings Circles Section */}
        <section>
          {groupsError ? (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl">Error loading savings groups</div>
          ) : (
            <SavingsCircles 
              groups={groupsData || []} 
              isLoading={isGroupsLoading} 
            />
          )}
        </section>

        {/* Recent Activity Section */}
        <section>
          {paymentsError ? (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl">Error loading transactions</div>
          ) : (
            <TransactionList 
              transactions={paymentsData || []} 
              isLoading={isPaymentsLoading} 
            />
          )}
        </section>
      </div>
    </div>
  );
}
