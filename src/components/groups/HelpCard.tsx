import React from "react";
import { MessageCircle } from "lucide-react";

export const HelpCard: React.FC = () => {
  return (
    <div className="bg-[#f4f7f5] rounded-2xl p-6 shadow-[inset_4px_4px_8px_rgba(0,0,0,0.04),inset_-4px_-4px_8px_rgba(255,255,255,1)] border border-gray-100 mb-6">
      <h3 className="text-sm font-semibold text-gray-800 mb-2">Need Help?</h3>
      <p className="text-xs text-gray-500 mb-4 leading-relaxed">
        Chat with your group assistant on WhatsApp
      </p>
      <button className="flex items-center text-sm font-semibold text-green-700 hover:text-green-800 transition-colors">
        <MessageCircle size={16} className="mr-2" />
        Open WhatsApp
      </button>
    </div>
  );
};
