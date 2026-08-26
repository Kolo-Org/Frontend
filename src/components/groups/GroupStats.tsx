import React from "react";
import { TrendingUp, Clock } from "lucide-react";

interface GroupStatsProps {
  efficiency: number;
  streak: number;
}

export const GroupStats: React.FC<GroupStatsProps> = ({
  efficiency,
  streak,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-white rounded-2xl p-5 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
        <div className="text-green-600 mb-2">
          <TrendingUp size={20} />
        </div>
        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1">
          Efficiency
        </p>
        <p className="text-xl font-bold text-gray-900">{efficiency}%</p>
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
        <div className="text-green-600 mb-2">
          <Clock size={20} />
        </div>
        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-1">
          Streak
        </p>
        <p className="text-xl font-bold text-gray-900">{streak} Mos</p>
      </div>
    </div>
  );
};
