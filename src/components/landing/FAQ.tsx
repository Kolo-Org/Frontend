"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Is my money safe?",
    answer:
      "Yes. Your funds are held in self-custodial Stellar wallets — only you hold the keys. Payouts are governed by Soroban smart contracts, so no single person can access or redirect your savings.",
  },
  {
    question: "Do I need a bank account?",
    answer:
      "No. Kolo runs entirely on the Stellar blockchain. All you need is a phone with WhatsApp. Your Stellar wallet is created automatically when you sign up.",
  },
  {
    question: "What are the fees?",
    answer:
      "Kolo charges no platform fees on savings. Stellar network fees are less than $0.01 per transaction — among the lowest of any blockchain.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-[#f9f8f7] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Got Questions?
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map(({ question, answer }, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden"
              style={{
                boxShadow:
                  "4px 4px 12px rgba(0,0,0,0.05), -2px -2px 8px rgba(255,255,255,0.9)",
              }}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="text-slate-900 font-medium text-sm sm:text-base">
                  {question}
                </span>
                <svg
                  className={`w-5 h-5 text-slate-400 shrink-0 ml-4 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
