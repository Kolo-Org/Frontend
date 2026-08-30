"use client";

import React from "react";
import { Send, Plus, TrendingUp, TrendingDown } from "lucide-react";

interface BalanceCardProps {
  balance?: number;
  currency?: string;
  trendPercentage?: number;
  isLoading?: boolean;
}

export function BalanceCard({
  balance = 0,
  currency = "USDC",
  trendPercentage = 0,
  isLoading = false,
}: BalanceCardProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between w-full h-36 animate-pulse">
        <div className="space-y-4">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-10 w-48 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
        <div className="flex gap-3 mt-4 sm:mt-0">
          <div className="h-10 w-24 bg-gray-200 rounded-full"></div>
          <div className="h-10 w-28 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    );
  }

  const formattedBalance = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(balance);

  const isPositiveTrend = trendPercentage >= 0;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between w-full">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-wider">
          Total Balance
        </p>
        <div className="flex items-baseline gap-2 mb-2">
          <h2 className="text-4xl font-bold text-gray-900">
            {formattedBalance}
          </h2>
          <span className="text-lg font-medium text-emerald-600">
            {currency}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-sm">
          {isPositiveTrend ? (
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span
            className={`${isPositiveTrend ? "text-emerald-600" : "text-red-500"} font-medium`}
          >
            {isPositiveTrend ? "+" : ""}
            {trendPercentage}%
          </span>
          <span className="text-gray-500">from last month</span>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-6 sm:mt-0">
        <button className="flex items-center justify-center gap-2 bg-[#006C4C] hover:bg-[#005A3F] text-white px-5 py-2.5 rounded-full font-medium transition-colors">
          <Send className="w-4 h-4" />
          Send
        </button>
        <button className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#006C4C] border border-gray-200 px-5 py-2.5 rounded-full font-medium transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          Deposit
        </button>
      </div>
    </div>
  );
}
