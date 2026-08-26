import React from "react";
import { GraduationCap, PlusCircle } from "lucide-react";

interface NextMilestoneProps {
  milestoneName: string;
  progressPercentage: number;
  amountLeft: number;
  targetPayout: number;
  dueDate: string;
  onContribute: () => void;
}

export const NextMilestone: React.FC<NextMilestoneProps> = ({
  milestoneName,
  progressPercentage,
  amountLeft,
  targetPayout,
  dueDate,
  onContribute,
}) => {
  const circleRadius = 70;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset =
    circleCircumference - (progressPercentage / 100) * circleCircumference;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-[0_12px_40px_rgba(0,0,0,0.08)] relative overflow-hidden h-full flex flex-col">
      <div className="absolute top-4 right-4 text-gray-200">
        <GraduationCap size={80} strokeWidth={1} />
      </div>

      <div className="text-center mb-8 relative z-10">
        <h2 className="text-xl font-semibold text-gray-700">
          Next Milestone: {milestoneName}
        </h2>
      </div>

      <div className="flex justify-center mb-8 relative z-10">
        <div className="relative w-48 h-48">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 160 160"
          >
            <circle
              cx="80"
              cy="80"
              r={circleRadius}
              fill="transparent"
              stroke="#e5e7eb"
              strokeWidth="12"
            />
            <circle
              cx="80"
              cy="80"
              r={circleRadius}
              fill="transparent"
              stroke="#047857"
              strokeWidth="12"
              strokeDasharray={circleCircumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
            <span className="text-xl font-semibold text-gray-800">
              {progressPercentage}%
            </span>
            <span className="text-sm text-gray-500">
              ₦{amountLeft.toLocaleString()} left
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
        <div className="bg-[#f4f7f5] rounded-xl p-4 text-center shadow-[inset_4px_4px_8px_rgba(0,0,0,0.04),inset_-4px_-4px_8px_rgba(255,255,255,1)] border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Target Payout</p>
          <p className="text-lg font-semibold text-gray-900">
            ₦{targetPayout.toLocaleString()}
          </p>
        </div>
        <div className="bg-[#f4f7f5] rounded-xl p-4 text-center shadow-[inset_4px_4px_8px_rgba(0,0,0,0.04),inset_-4px_-4px_8px_rgba(255,255,255,1)]">
          <p className="text-sm text-gray-500 mb-1">Due Date</p>
          <p className="text-lg font-semibold text-gray-900">{dueDate}</p>
        </div>
      </div>

      <div className="mt-auto relative z-10">
        <button
          onClick={onContribute}
          className="w-full bg-[#047857] hover:bg-[#065f46] text-white py-4 rounded-xl flex items-center justify-center font-medium transition-colors"
        >
          <PlusCircle className="mr-2" size={20} />
          Contribute Now
        </button>
      </div>
    </div>
  );
};
