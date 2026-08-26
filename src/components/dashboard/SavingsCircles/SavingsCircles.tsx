'use client';

import React from 'react';
import { Home, Plane, Plus, ChevronRight } from 'lucide-react';
import type { SavingsGroup } from '@/hooks/useGroups';

interface SavingsCirclesProps {
  groups: SavingsGroup[];
  isLoading?: boolean;
}

export function SavingsCircles({ groups, isLoading = false }: SavingsCirclesProps) {
  if (isLoading) {
    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-48 animate-pulse">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
              </div>
              <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-2 w-full bg-gray-200 rounded-full mb-6"></div>
              <div className="flex justify-between items-center">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-900">My Savings Circles</h3>
        <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center">
          View All <ChevronRight className="w-4 h-4 ml-0.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => {
          const progress = Math.min((group.saved / group.target) * 100, 100);
          
          // Helper to get icon based on tag
          const getIcon = () => {
            if (group.tag.includes('HOME')) return <Home className="w-5 h-5 text-emerald-700" />;
            if (group.tag.includes('TRAVEL')) return <Plane className="w-5 h-5 text-emerald-700" />;
            return <Home className="w-5 h-5 text-emerald-700" />;
          };

          return (
            <div key={group.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                    {getIcon()}
                  </div>
                  <span className="text-[10px] font-bold tracking-wider text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full uppercase">
                    {group.tag}
                  </span>
                </div>
                
                <h4 className="text-lg font-bold text-gray-900 mb-1">{group.name}</h4>
                <div className="flex justify-between items-end mb-2 text-sm">
                  <span className="text-gray-500 font-medium">${group.saved.toLocaleString()} saved</span>
                  <span className="text-gray-500 font-medium">{Math.round(progress)}%</span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mb-5">
                  <div 
                    className="h-full bg-emerald-400 rounded-full" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs font-medium text-gray-500">
                <span>Next: {group.nextDate}</span>
                <div className="flex -space-x-1.5">
                  {group.avatars.map((avatar, idx) => (
                    avatar.startsWith('+') ? (
                      <div key={idx} className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-600 z-10">
                        {avatar}
                      </div>
                    ) : (
                      <img key={idx} src={avatar} alt="Member" className="w-6 h-6 rounded-full border-2 border-white object-cover z-20" />
                    )
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {/* New Circle Card */}
        <button className="bg-gray-50/50 rounded-2xl p-5 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center h-full min-h-[200px] hover:bg-gray-50 hover:border-gray-300 transition-colors group">
          <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Plus className="w-6 h-6 text-emerald-600" />
          </div>
          <h4 className="text-lg font-bold text-gray-900 mb-1">New Circle</h4>
          <p className="text-xs text-gray-500 font-medium">Start a community savings plan with friends.</p>
        </button>
      </div>
    </div>
  );
}
