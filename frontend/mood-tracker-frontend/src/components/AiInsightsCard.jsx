import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ExportReportModal from './ExportReportModal';
import API_BASE_URL from '../api';

function AiInsightsCard({ moods = [] }) {
  const [showModal, setShowModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [insights, setInsights] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token');

  const fetchInsights = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/ai/insights`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInsights(response.data);
    } catch (err) {
      console.error('Error fetching AI insights:', err);
      setInsights({
        summary: "Mindful AI is observing your check-ins. Keep logging your daily moods to generate deeper historical insights.",
        trend: "Active",
        keyTrigger: "Consistent daily logging helps identify energy dips.",
        brightSpot: "You are actively prioritizing your emotional well-being.",
        recommendation: "Take a 3-minute breathing reset whenever tension surfaces.",
        source: "fallback"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTrendStyle = (trendText) => {
    if (!trendText) return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    const lower = trendText.toLowerCase();
    if (lower.includes('fluctuat') || lower.includes('variab') || lower.includes('mixed') || lower.includes('shift')) {
      return 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20';
    }
    if (lower.includes('declin') || lower.includes('stress') || lower.includes('tens') || lower.includes('low')) {
      return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20';
    }
    return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20';
  };

  const handleOpenModal = () => {
    setShowModal(true);
    if (!insights) {
      fetchInsights();
    }
  };

  return (
    <div className="font-sans w-full">
      {}
      <div className="bg-white dark:bg-[#141413] border border-[#e7e5e4] dark:border-white/[0.08] rounded-2xl p-4 sm:p-5 flex flex-col gap-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all hover:border-[#d6d3d1] dark:hover:border-white/15">
        
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#f5f5f4] dark:bg-white/[0.06] flex items-center justify-center text-base shrink-0 shadow-2xs">
            ✨
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1.5 flex-wrap">
              <h2 className="font-serif font-semibold text-[15px] text-[#1c1917] dark:text-[#f5f5f4] tracking-tight">
                AI Pattern Audit
              </h2>
              <span className="text-[9.5px] bg-purple-500/10 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-full font-medium tracking-wide uppercase shrink-0">
                Gemini 2.5
              </span>
            </div>
            <p className="text-[11.5px] text-[#78716c] dark:text-[#a8a29e] mt-0.5 leading-snug truncate">
              Synthesize emotional correlations & triggers.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenModal}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#1c1917] dark:bg-white text-white dark:text-[#1c1917] hover:opacity-90 text-[12px] font-semibold tracking-wide transition-all cursor-pointer shadow-2xs flex items-center justify-center gap-2 group shrink-0"
          >
            <span>Generate Insights Report</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </button>

          <button
            onClick={() => setShowExportModal(true)}
            title="Export Clinical Report (PDF/CSV)"
            className="py-2.5 px-3.5 rounded-xl bg-[#f5f5f4] dark:bg-white/[0.08] text-[#1c1917] dark:text-white hover:bg-[#e7e5e4] dark:hover:bg-white/15 text-[12px] font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
          >
            <span>📄</span>
            <span>Export</span>
          </button>
        </div>
      </div>

      {}
      {showModal && ReactDOM.createPortal(
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/75 backdrop-blur-md p-4 sm:p-6 md:p-10 animate-[fadeIn_0.2s_ease-out]">
          
          <div className="w-full max-w-3xl bg-white dark:bg-[#141413] border border-[#e7e5e4] dark:border-white/[0.1] rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.6)] overflow-hidden max-h-[85vh] my-auto flex flex-col relative z-[1000000]">
            
            {}
            <div className="bg-white dark:bg-[#141413] px-6 sm:px-8 py-5 border-b border-[#f5f5f4] dark:border-white/[0.06] flex items-center justify-between shrink-0 gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-2xl bg-[#f5f5f4] dark:bg-white/[0.06] flex items-center justify-center text-lg shrink-0 shadow-2xs">
                  📊
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="font-serif font-semibold text-lg text-[#1c1917] dark:text-[#f5f5f4] tracking-tight truncate">
                      Executive Mood & Correlation Audit
                    </h2>
                    {insights?.trend && (
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider font-sans shrink-0 ${getTrendStyle(insights.trend)}`}>
                        {insights.trend}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#78716c] dark:text-[#a8a29e] mt-0.5 truncate">
                    AI-driven synthesis of your historical check-in data
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={fetchInsights}
                  disabled={isLoading}
                  className="px-3.5 py-2 rounded-xl bg-[#f5f5f4] dark:bg-white/[0.06] hover:bg-[#e7e5e4] dark:hover:bg-white/10 text-xs font-medium text-[#1c1917] dark:text-gray-200 transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  title="Re-run AI Analysis"
                >
                  <span className={isLoading ? 'animate-spin inline-block' : ''}>↻</span>
                  <span className="hidden sm:inline">Re-Audit</span>
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2.5 rounded-xl text-[#a8a29e] hover:text-[#1c1917] dark:hover:text-white hover:bg-[#f5f5f4] dark:hover:bg-white/[0.06] transition-all cursor-pointer text-sm"
                  title="Close Report"
                >
                  ✕
                </button>
              </div>
            </div>

            {}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-white dark:bg-[#141413] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full relative z-[102]">
              {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-10 h-10 border-2 border-[#1c1917] dark:border-white border-t-transparent rounded-full animate-spin"></div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-[#1c1917] dark:text-[#f5f5f4]">Synthesizing behavioral patterns...</p>
                    <p className="text-xs text-[#78716c] dark:text-[#a8a29e]">Connecting mood frequencies, energy notes, and triggers via Gemini 2.5</p>
                  </div>
                </div>
              ) : (
                <>
                  {}
                  <div className="bg-[#fafaf9] dark:bg-[#181816] p-6 rounded-2xl border border-[#e7e5e4] dark:border-white/[0.06] shadow-2xs space-y-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#a8a29e] dark:text-[#78716c] block">
                      Executive Synthesis
                    </span>
                    <p className="text-sm sm:text-[15px] text-[#292524] dark:text-[#e7e5e4] leading-relaxed font-normal">
                      {insights?.summary}
                    </p>
                  </div>

                  {}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    
                    <div className="p-6 rounded-2xl bg-[#fafaf9] dark:bg-[#181816] border border-[#e7e5e4]/80 dark:border-white/[0.06] flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2.5">
                          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                            Trigger Correlation
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#57534e] dark:text-[#d6d3d1] leading-relaxed">
                          {insights?.keyTrigger}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#fafaf9] dark:bg-[#181816] border border-[#e7e5e4]/80 dark:border-white/[0.06] flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                            Bright Spot Observation
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#57534e] dark:text-[#d6d3d1] leading-relaxed">
                          {insights?.brightSpot}
                        </p>
                      </div>
                    </div>

                  </div>

                  {}
                  <div className="p-6 rounded-2xl bg-[#1c1917] dark:bg-white text-white dark:text-[#1c1917] space-y-2.5 shadow-md relative overflow-hidden">
                    <div className="flex items-center gap-2 opacity-80">
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        🎯 Tailored Action Plan
                      </span>
                    </div>
                    <p className="text-sm sm:text-base font-medium leading-relaxed">
                      {insights?.recommendation}
                    </p>
                  </div>
                </>
              )}
            </div>

            {}
            <div className="px-6 sm:px-8 py-4 bg-[#fafaf9] dark:bg-[#111110] border-t border-[#f5f5f4] dark:border-white/[0.06] flex items-center justify-between shrink-0 relative z-[102]">
              <span className="text-xs text-[#a8a29e] dark:text-[#78716c]">
                Report generated by Mindful AI · {new Date().toLocaleDateString()}
              </span>
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-xl bg-[#1c1917] dark:bg-white text-white dark:text-[#1c1917] hover:opacity-85 text-xs font-semibold transition-all cursor-pointer shadow-sm"
              >
                Done
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}

      {}
      <ExportReportModal
        moods={moods}
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
    </div>
  );
}

export default AiInsightsCard;
