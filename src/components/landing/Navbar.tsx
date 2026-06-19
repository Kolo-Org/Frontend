"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#how-it-works", label: "How it Works" },
    { href: "#features", label: "Features" },
    { href: "#testimonials", label: "Community" },
    { href: "#faq", label: "Help" },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
              <svg
                viewBox="0 0 20 20"
                className="w-4 h-4 text-white fill-white"
              >
                <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm.75 4.5v3.75h3.75a.75.75 0 010 1.5h-3.75V15.5a.75.75 0 01-1.5 0v-3.75H5.5a.75.75 0 010-1.5h3.75V6.5a.75.75 0 011.5 0z" />
              </svg>
            </div>
            <span className="font-display font-bold text-xl text-slate-900">
              Kolo
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors"
            >
              Get Started
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? (
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-1">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="block px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-100 mt-2 flex flex-col gap-2">
            <Link
              href="/login"
              className="block px-3 py-2.5 text-sm font-medium text-slate-700 rounded-lg text-center"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="block px-3 py-2.5 rounded-lg bg-emerald-500 text-white text-sm font-semibold text-center"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
