"use client";

import { motion } from "framer-motion";
import { CheckCircle, Share2, Download, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { use, useEffect, useState } from "react";

export default function TransactionReceipt({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const mockTransaction = {
    id: unwrappedParams.id || "tx_892348923h4k2j",
    amount: "150.00",
    currency: "USDC",
    status: "Success",
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }),
    from: "GBX43...9L2M",
    to: "GABC1...Z9X1",
    networkFee: "0.00001 XLM",
    network: "Stellar Public Network",
    hash: "f4a8b...19c2"
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden"
      >
        <div className="p-8 text-center border-b border-zinc-200/50 dark:border-zinc-800/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600" />
          
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-20 h-20 mx-auto bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          >
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2"
          >
            Payment Successful
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-zinc-500 dark:text-zinc-400 font-medium"
          >
            Your transaction has been processed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <span className="text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
              {mockTransaction.amount}
            </span>
            <span className="text-xl font-bold text-emerald-500 ml-2">
              {mockTransaction.currency}
            </span>
          </motion.div>
        </div>

        <div className="p-8 space-y-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-500 dark:text-zinc-400">Date</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">{mockTransaction.date}</span>
            </div>
            
            <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-500 dark:text-zinc-400">From</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-100 font-mono">{mockTransaction.from}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-500 dark:text-zinc-400">To</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-100 font-mono">{mockTransaction.to}</span>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-500 dark:text-zinc-400">Network Fee</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">{mockTransaction.networkFee}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-500 dark:text-zinc-400">Transaction ID</span>
              <div className="flex items-center gap-1.5 text-blue-500 hover:text-blue-600 transition-colors cursor-pointer group">
                <span className="font-medium font-mono">{mockTransaction.hash}</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex gap-4 pt-4"
          >
            <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold transition-colors">
              <Download className="w-4 h-4" />
              PDF
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold transition-colors">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8"
      >
        <Link 
          href="/dashboard"
          className="flex items-center gap-2 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors group font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>
      </motion.div>
    </div>
  );
}
