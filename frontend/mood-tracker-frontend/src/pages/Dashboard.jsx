import React, { useState } from "react";
import ListMood from "../components/ListMood";
import AiCompanion from "../components/AiCompanion";

function Dashboard() {
  const [showAiModal, setShowAiModal] = useState(false);
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-transparent font-sans relative">
      <main className="max-w-[1400px] mx-auto py-9 px-6 md:py-14 md:px-12">
        <span className="block text-[12px] font-medium tracking-[0.09em] uppercase text-[#a8a29e] dark:text-[#78716c] mb-3.5">Overview · {today}</span>
        <h1 className="font-serif text-[34px] md:text-[44px] leading-[1.1] tracking-[-0.02em] text-[#1c1917] dark:text-[#f7f4ee]">Your mood <span className="italic text-[#78716c] dark:text-[#a8a29e]">tracker.</span></h1>

        <div className="w-full h-px bg-[#e7e5e0] dark:bg-[#292524] my-9" />

        <div className="w-full">
          <ListMood />
        </div>
      </main>

      {}
      {!showAiModal && (
        <button
          onClick={() => setShowAiModal(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#1c1917] dark:bg-white text-white dark:text-[#1c1917] hover:bg-black dark:hover:bg-gray-100 px-4 py-3 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.18)] border border-white/10 dark:border-black/10 transition-all duration-300 hover:scale-105 flex items-center gap-2.5 cursor-pointer group"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold tracking-wide">Ask Mindful AI</span>
        </button>
      )}

      {}
      {showAiModal && (
        <AiCompanion isModal={true} onClose={() => setShowAiModal(false)} />
      )}
    </div>
  );
}

export default Dashboard;