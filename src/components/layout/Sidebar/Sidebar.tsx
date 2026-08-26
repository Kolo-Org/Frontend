"use client";

import React, { useState } from "react";
import {
  Home,
  PiggyBank,
  Users,
  CreditCard,
  Settings,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", icon: Home, href: "/dashboard" },
    { name: "Savings", icon: PiggyBank, href: "/savings" },
    { name: "Groups", icon: Users, href: "/groups" },
    { name: "Payments", icon: CreditCard, href: "/payments" },
    { name: "Settings", icon: Settings, href: "/profile" },
  ];

  return (
    <>
      <button
        className="md:hidden fixed bottom-6 right-6 z-50 bg-[#047857] text-white p-3 rounded-full shadow-xl"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-[#f8faf9] border-r border-gray-200 flex flex-col h-full md:h-[calc(100vh-4rem)] shadow-2xl md:shadow-none`}
      >
        <div className="p-6">
          <p className="text-sm font-medium text-gray-500 mb-8">
            Your vault is growing
          </p>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? "bg-[#5fe3a1] text-gray-900 font-semibold shadow-sm"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={20} className="mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-6">
          <Link
            href="/groups/new"
            className="block text-center w-full bg-[#047857] hover:bg-[#065f46] text-white py-3 rounded-xl font-medium transition-colors"
          >
            Start New Goal
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
