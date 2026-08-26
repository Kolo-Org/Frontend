import React from "react";
import { Home, PiggyBank, Users, CreditCard, Settings } from "lucide-react";

export const Sidebar = () => {
  const navItems = [
    { name: "Home", icon: Home, active: false },
    { name: "Savings", icon: PiggyBank, active: false },
    { name: "Groups", icon: Users, active: true },
    { name: "Payments", icon: CreditCard, active: false },
    { name: "Settings", icon: Settings, active: false },
  ];

  return (
    <aside className="w-64 bg-[#f8faf9] border-r border-gray-200 flex flex-col h-full h-[calc(100vh-4rem)]">
      <div className="p-6">
        <p className="text-sm font-medium text-gray-500 mb-8">
          Your vault is growing
        </p>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href="#"
                className={`flex items-center px-4 py-3 rounded-xl transition-colors ${
                  item.active
                    ? "bg-[#5fe3a1] text-gray-900 font-semibold shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} className="mr-3" />
                {item.name}
              </a>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto p-6">
        <button className="w-full bg-[#047857] hover:bg-[#065f46] text-white py-3 rounded-xl font-medium transition-colors">
          Start New Goal
        </button>
      </div>
    </aside>
  );
};
