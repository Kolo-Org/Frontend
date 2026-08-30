"use client";

import React from "react";
import { ArrowDown, ArrowUp, Users } from "lucide-react";
import type { Transaction } from "@/hooks/usePayments";

interface TransactionListProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

export function TransactionList({
  transactions,
  isLoading = false,
}: TransactionListProps) {
  if (isLoading) {
    return (
      <div className="w-full">
        <div className="h-6 w-32 bg-gray-200 rounded mb-4 animate-pulse"></div>
        <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex justify-between items-center p-4 border-b border-gray-50 last:border-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-200"></div>
                <div>
                  <div className="h-5 w-40 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 w-24 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="text-right">
                <div className="h-5 w-24 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-16 bg-gray-200 rounded ml-auto"></div>
              </div>
            </div>
          ))}
          <div className="p-4 border-t border-gray-50 flex justify-center">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDown className="w-5 h-5 text-emerald-600" />;
      case "contribution":
        return <Users className="w-5 h-5 text-emerald-600" />;
      case "send":
        return <ArrowUp className="w-5 h-5 text-emerald-600" />;
      default:
        return <ArrowDown className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Recent Activity
      </h3>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex flex-col">
          {transactions.map((tx, idx) => {
            const isPositive = tx.amount > 0;
            const formattedAmount = `${isPositive ? "+" : ""}${tx.amount.toFixed(2)} ${tx.currency}`;

            return (
              <div
                key={tx.id}
                className={`flex justify-between items-center p-5 ${
                  idx !== transactions.length - 1
                    ? "border-b border-gray-50"
                    : ""
                } hover:bg-gray-50/50 transition-colors`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                    {getIcon(tx.type)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm mb-0.5">
                      {tx.title}
                    </p>
                    <p className="text-xs font-medium text-gray-500">
                      {tx.date} • {tx.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-medium text-sm mb-0.5 ${isPositive ? "text-emerald-600" : "text-gray-900"}`}
                  >
                    {formattedAmount}
                  </p>
                  <p className="text-xs font-medium text-gray-500">
                    {tx.status}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-50 flex justify-center">
          <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
            Download Statement
          </button>
        </div>
      </div>
    </div>
  );
}
