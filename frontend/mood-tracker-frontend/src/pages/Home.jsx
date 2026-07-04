import React from "react";
import { Link } from "react-router-dom";

const moodDots = [
  '#fca5a5', '#fdba74', '#fde68a',
  '#86efac', '#6ee7b7', '#93c5fd', '#c4b5fd'
];

function Home() {
  const token = localStorage.getItem('token');

  return (
    <div className="min-h-screen bg-[#f7f4ee] dark:bg-[#1c1917] font-sans text-[#1c1917] dark:text-[#f7f4ee] flex flex-col items-center pt-20 px-6 md:pt-28 md:px-12 relative overflow-hidden">
      
      {}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] dark:invert" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'n\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'0.75\\\' numOctaves=\\\'4\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23n)\\\'/%3E%3C/svg%3E")' }}
      />

      {}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-amber-500/10 via-rose-500/10 to-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      {}
      <div className="max-w-3xl text-center relative z-10 flex flex-col items-center">
        <div className="flex gap-2 items-center justify-center mb-6 px-4 py-1.5 rounded-full bg-white/60 dark:bg-white/[0.05] border border-[#e7e5e0] dark:border-[#292524] shadow-2xs">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-[#78716c] dark:text-[#a8a29e] mr-1">Mood Spectrum</span>
          {moodDots.map((color, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: color, animationDelay: `${i * 150}ms` }} />
          ))}
        </div>
        
        <h1 className="font-serif text-5xl sm:text-6xl md:text-[76px] leading-[1.03] tracking-[-0.03em] text-[#1c1917] dark:text-[#f7f4ee] mb-6">
          Name what you feel.<br/>
          <span className="italic font-normal text-[#78716c] dark:text-[#a8a29e]">Master your mind.</span>
        </h1>
        
        <p className="text-base sm:text-lg leading-relaxed text-[#78716c] dark:text-[#a8a29e] font-normal max-w-xl mx-auto mb-10">
          An intelligent mental sanctuary engineered with Google Gemini 2.5 CBT synthesis, clinical-grade medical reporting, and 24/7 background mood schedulers.
        </p>

        <div className="flex items-center justify-center w-full sm:w-auto">
          <Link 
            to={token ? "/dashboard" : "/register"} 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#1c1917] dark:bg-white text-white dark:text-[#1c1917] rounded-xl font-sans text-sm font-semibold tracking-wide no-underline transition-all duration-200 hover:opacity-90 shadow-lg shadow-black/5 dark:shadow-none group"
          >
            <span>{token ? "Go to Your Dashboard" : "Start Tracking Free"}</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      {}
      <div className="w-full max-w-4xl mt-16 relative z-10">
        <div className="rounded-2xl border border-[#e7e5e0] dark:border-[#292524] bg-white/70 dark:bg-[#1c1c1a]/80 backdrop-blur-xl p-4 sm:p-6 shadow-2xl shadow-black/5 dark:shadow-black/40">
          <div className="flex items-center justify-between border-b border-[#f5f5f4] dark:border-[#292524] pb-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <span className="text-[11px] font-mono text-[#a8a29e] tracking-wider uppercase">Live Sanctuary Preview</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400">Gemini 2.5 AI</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center text-left">
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#f7f4ee] dark:bg-[#1c1917] border border-[#e7e5e0] dark:border-[#292524]">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span>Smart Mood Summary</span>
                  <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">Feeling Great 🌟</span>
                </div>
                <p className="text-xs text-[#78716c] dark:text-[#a8a29e] leading-relaxed">
                  "You feel happiest and calmest on days when you get 8+ hours of sleep and exercise in the morning."
                </p>
              </div>

              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">🔥 7-Day Streak</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20">🏃 Exercise Tag</span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">📑 PDF Export</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#1c1917] text-white space-y-3 shadow-lg">
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span>Daily Mindful Tip</span>
                <span>AI Assistant</span>
              </div>
              <p className="text-sm font-serif italic text-stone-200">
                "Feeling overwhelmed by work? Take 3 deep breaths before replying. Small pauses reset your mental focus."
              </p>
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="max-w-5xl w-full mt-28 relative z-10 border-t border-[#e7e5e0] dark:border-[#292524] pt-20 mb-20 text-left">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-purple-600 dark:text-purple-400 mb-2 block">Simple & Powerful</span>
          <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-[#1c1917] dark:text-[#f7f4ee]">
            Everything you need for emotional clarity.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white/50 dark:bg-[#1c1c1a]/50 border border-[#e7e5e0] dark:border-[#292524] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center text-xl">✨</div>
            <h3 className="font-semibold text-base text-[#1c1917] dark:text-[#f7f4ee]">AI Pattern Insights</h3>
            <p className="text-xs text-[#78716c] dark:text-[#a8a29e] leading-relaxed">
              Our smart AI gently reviews your check-ins to spot hidden habits—helping you understand what truly boosts your mood.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/50 dark:bg-[#1c1c1a]/50 border border-[#e7e5e0] dark:border-[#292524] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center text-xl">📑</div>
            <h3 className="font-semibold text-base text-[#1c1917] dark:text-[#f7f4ee]">Doctor & Therapy PDF Reports</h3>
            <p className="text-xs text-[#78716c] dark:text-[#a8a29e] leading-relaxed">
              Print or download clean 1-click PDF summaries of your emotional journey to share during doctor or therapy appointments.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/50 dark:bg-[#1c1c1a]/50 border border-[#e7e5e0] dark:border-[#292524] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-xl">🌙</div>
            <h3 className="font-semibold text-base text-[#1c1917] dark:text-[#f7f4ee]">Gentle Evening Reminders</h3>
            <p className="text-xs text-[#78716c] dark:text-[#a8a29e] leading-relaxed">
              Never break your streak! Our server sends friendly, automated evening email check-ins at 8:00 PM if you forgot to log.
            </p>
          </div>
        </div>
      </div>

      {}
      <div className="w-full max-w-3xl text-center py-16 border-t border-[#e7e5e0] dark:border-[#292524] relative z-10">
        <h3 className="font-serif text-3xl mb-4">Start your mindful journey today.</h3>
        <p className="text-sm text-[#78716c] dark:text-[#a8a29e] mb-8">No ads. Complete privacy. Built with elite full-stack engineering standards.</p>
        <Link 
          to={token ? "/dashboard" : "/register"}
          className="px-8 py-3.5 rounded-xl bg-[#1c1917] dark:bg-white text-white dark:text-[#1c1917] text-sm font-semibold no-underline hover:opacity-90 transition-all inline-block"
        >
          {token ? "Return to Dashboard" : "Create Free Account →"}
        </Link>
      </div>
      
    </div>
  );
}

export default Home;