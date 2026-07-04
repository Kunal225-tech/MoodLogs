import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Comfort() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialMood = location.state?.mood || 'tired';

  const [ambiance, setAmbiance] = useState('rain');  const [releaseText, setReleaseText] = useState('');
  const [isReleasing, setIsReleasing] = useState(false);
  const [releasedCount, setReleasedCount] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    { text: "Rest is not productive or unproductive. It is simply essential.", author: "Recharge Reminder" },
    { text: "You don’t have to carry the weight of the whole world today. Just breathe.", author: "Gentle Truth" },
    { text: "It is okay to pause. The journey will still be waiting for you tomorrow.", author: "Comfort Room" },
    { text: "Sadness is just your heart asking for a little extra kindness and patience.", author: "Inner Peace" },
    { text: "Even the darkest night will end and the sun will rise.", author: "Hope" }
  ];

  const handleRelease = (e) => {
    e.preventDefault();
    if (!releaseText.trim() || isReleasing) return;
    setIsReleasing(true);
    setTimeout(() => {
      setReleaseText('');
      setIsReleasing(false);
      setReleasedCount(prev => prev + 1);
    }, 1500);
  };

  const [particles] = useState(() => Array.from({ length: 35 }).map((_, idx) => ({
    id: idx,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
    size: Math.random() * 6 + 2
  })));

  const getAmbianceBg = () => {
    if (ambiance === 'rain') return 'from-[#cbd5e1] via-[#e2e8f0] to-[#cbd5e1] dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a]';
    if (ambiance === 'fire') return 'from-[#431407] via-[#7c2d12] to-[#2d1810] dark:from-[#1a100c] dark:via-[#2d1810] dark:to-[#140a07]';
    return 'from-[#1e1b4b] via-[#312e81] to-[#0f172a] dark:from-[#0d1117] dark:via-[#161b22] dark:to-[#090c10]';
  };

  const isDarkAmbiance = ambiance === 'fire' || ambiance === 'stars';

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getAmbianceBg()} ${isDarkAmbiance ? 'text-[#f7f4ee]' : 'text-[#1c1917] dark:text-[#f7f4ee]'} relative overflow-hidden font-sans flex flex-col items-center justify-between p-6 transition-colors duration-700`}>
      
      {}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map(p => {
          if (ambiance === 'rain') {
            return (
              <div
                key={p.id}
                className="absolute w-[1.5px] bg-blue-600/50 dark:bg-blue-300/30 rounded-full"
                style={{
                  left: `${p.left}%`,
                  top: `-20px`,
                  height: `${p.size * 5}px`,
                  animation: `rainFall ${p.duration * 0.5}s linear ${p.delay}s infinite`
                }}
              />
            );
          }
          if (ambiance === 'fire') {
            return (
              <div
                key={p.id}
                className="absolute rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24] blur-[0.5px]"
                style={{
                  left: `${p.left}%`,
                  bottom: `-10px`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  animation: `emberRise ${p.duration * 1.5}s ease-out ${p.delay}s infinite`
                }}
              />
            );
          }
          return (
            <div
              key={p.id}
              className="absolute rounded-full bg-white shadow-[0_0_8px_#ffffff]"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: `${p.size * 0.6}px`,
                height: `${p.size * 0.6}px`,
                animation: `starTwinkle ${p.duration * 1.2}s ease-in-out ${p.delay}s infinite alternate`
              }}
            />
          );
        })}
      </div>

      <style>{`
        @keyframes rainFall {
          0% { transform: translateY(0); opacity: 0; }
          30% { opacity: 0.6; }
          100% { transform: translateY(105vh); opacity: 0; }
        }
        @keyframes emberRise {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateY(-90vh) translateX(${Math.random() * 40 - 20}px) scale(0); opacity: 0; }
        }
        @keyframes starTwinkle {
          0% { opacity: 0.1; transform: scale(0.8); }
          100% { opacity: 0.9; transform: scale(1.3); }
        }
        @keyframes burnAway {
          0% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
          50% { opacity: 0.5; transform: scale(1.05) translateY(-15px); filter: blur(3px); color: #f59e0b; }
          100% { opacity: 0; transform: scale(1.1) translateY(-35px); filter: blur(8px); }
        }
      `}</style>

      {}
      <header className="w-full max-w-4xl flex items-center justify-between z-10 pt-2">
        <div>
          <h1 className={`font-serif text-2xl md:text-3xl tracking-wide font-normal flex items-center gap-2.5 ${isDarkAmbiance ? 'text-white' : 'text-[#1c1917] dark:text-white'}`}>
            <span>{ambiance === 'rain' ? '🌧️' : ambiance === 'fire' ? '🔥' : '✨'}</span>
            Comfort & Recharge Sanctuary
          </h1>
          <p className={`text-sm mt-1 ${isDarkAmbiance ? 'text-gray-300' : 'text-[#57534e] dark:text-gray-400'}`}>A quiet space to rest your mind and release heavy thoughts.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 text-xs font-medium uppercase tracking-wider border cursor-pointer shadow-sm ${isDarkAmbiance ? 'bg-white/10 hover:bg-white/20 text-white border-white/15' : 'bg-white/70 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 text-[#1c1917] dark:text-white border-[#d6d3d1] dark:border-white/15'}`}
          >
            <span className="text-sm">←</span>
            <span>Return to Dashboard</span>
          </button>
        </div>
      </header>

      {}
      <div className={`flex p-1.5 rounded-2xl border z-10 mt-6 backdrop-blur-md shadow-sm ${isDarkAmbiance ? 'bg-white/10 border-white/15' : 'bg-white/60 dark:bg-white/5 border-[#d6d3d1] dark:border-white/10'}`}>
        {[
          { id: 'rain', label: 'Gentle Rain', emoji: '🌧️' },
          { id: 'fire', label: 'Campfire Embers', emoji: '🔥' },
          { id: 'stars', label: 'Starlight Sky', emoji: '✨' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setAmbiance(item.id)}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${ambiance === item.id ? (isDarkAmbiance ? 'bg-white/20 text-white shadow-sm' : 'bg-[#1c1917] text-white dark:bg-white/20 dark:text-white shadow-sm') : (isDarkAmbiance ? 'text-gray-300 hover:text-white' : 'text-[#57534e] dark:text-gray-400 hover:text-[#1c1917] dark:hover:text-white')}`}
          >
            <span>{item.emoji}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 my-auto py-8 z-10">
        
        {}
        <div className={`border rounded-3xl p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between shadow-xl relative overflow-hidden transition-colors ${isDarkAmbiance ? 'bg-black/30 border-white/15 text-white' : 'bg-white/80 dark:bg-white/[0.06] border-[#e7e5e4] dark:border-white/10'}`}>
          <div>
            <span className={`text-[11px] font-semibold uppercase tracking-[0.15em] block mb-2 ${isDarkAmbiance ? 'text-amber-400' : 'text-amber-600 dark:text-amber-400'}`}>Release Heavy Thoughts</span>
            <h3 className={`font-serif text-xl mb-2 ${isDarkAmbiance ? 'text-white' : 'text-[#1c1917] dark:text-white'}`}>What is draining your energy today?</h3>
            <p className={`text-xs leading-relaxed mb-5 ${isDarkAmbiance ? 'text-gray-300' : 'text-[#57534e] dark:text-gray-300'}`}>
              Write down whatever feels heavy, stressful, or tiring. When you release it, let it dissolve away.
            </p>

            <form onSubmit={handleRelease}>
              <textarea
                rows="4"
                value={releaseText}
                onChange={(e) => setReleaseText(e.target.value)}
                placeholder="Type your worries, tiredness, or sad thoughts here..."
                disabled={isReleasing}
                className={`w-full p-4 rounded-2xl border text-sm focus:outline-none resize-none transition-all shadow-inner ${isDarkAmbiance ? 'bg-black/40 border-white/15 text-gray-100 placeholder-gray-400 focus:border-white/30' : 'bg-white dark:bg-black/30 border-[#d6d3d1] dark:border-white/10 text-[#1c1917] dark:text-gray-100 placeholder-[#a8a29e] dark:placeholder-gray-500 focus:border-[#1c1917] dark:focus:border-white/30'} ${isReleasing ? 'animate-[burnAway_1.5s_ease-in-out_forwards]' : ''}`}
              />

              <button
                type="submit"
                disabled={!releaseText.trim() || isReleasing}
                className="mt-4 w-full py-3.5 bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-500/80 dark:to-orange-600/80 hover:from-amber-500 hover:to-orange-500 text-white rounded-xl font-medium text-sm transition-all disabled:opacity-40 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                {isReleasing ? (
                  <span>Letting go & dissolving... ✨</span>
                ) : (
                  <span>Release & Burn Away 🔥</span>
                )}
              </button>
            </form>
          </div>

          {releasedCount > 0 && (
            <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-medium ${isDarkAmbiance ? 'border-white/15 text-emerald-400' : 'border-[#e7e5e4] dark:border-white/10 text-emerald-600 dark:text-emerald-400'}`}>
              <span>✨ You have released {releasedCount} heavy {releasedCount === 1 ? 'thought' : 'thoughts'} today.</span>
            </div>
          )}
        </div>

        {}
        <div className={`border rounded-3xl p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between shadow-xl text-center relative transition-colors ${isDarkAmbiance ? 'bg-black/30 border-white/15 text-white' : 'bg-white/80 dark:bg-white/[0.06] border-[#e7e5e4] dark:border-white/10'}`}>
          <div className="my-auto py-6">
            <span className={`text-[11px] font-semibold uppercase tracking-[0.15em] block mb-6 ${isDarkAmbiance ? 'text-blue-300' : 'text-blue-600 dark:text-blue-300'}`}>Gentle Affirmation</span>
            <p className={`font-serif italic text-xl sm:text-2xl leading-relaxed mb-6 px-4 ${isDarkAmbiance ? 'text-white' : 'text-[#1c1917] dark:text-white'}`}>
              "{quotes[quoteIndex].text}"
            </p>
            <span className={`text-xs font-medium ${isDarkAmbiance ? 'text-gray-300' : 'text-[#57534e] dark:text-gray-400'}`}>— {quotes[quoteIndex].author}</span>
          </div>

          <div className={`pt-6 border-t flex items-center justify-between ${isDarkAmbiance ? 'border-white/15' : 'border-[#e7e5e4] dark:border-white/10'}`}>
            <button
              onClick={() => setQuoteIndex((prev) => (prev - 1 + quotes.length) % quotes.length)}
              className={`px-4 py-2 rounded-xl transition-colors cursor-pointer font-medium text-xs ${isDarkAmbiance ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[#1c1917] dark:text-gray-300'}`}
            >
              ← Previous
            </button>
            <span className={`text-xs font-medium ${isDarkAmbiance ? 'text-gray-400' : 'text-[#78716c] dark:text-gray-500'}`}>{quoteIndex + 1} / {quotes.length}</span>
            <button
              onClick={() => setQuoteIndex((prev) => (prev + 1) % quotes.length)}
              className={`px-4 py-2 rounded-xl transition-colors cursor-pointer font-medium text-xs ${isDarkAmbiance ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[#1c1917] dark:text-gray-300'}`}
            >
              Next Comfort →
            </button>
          </div>
        </div>

      </div>

      {}
      <footer className={`z-10 text-center text-xs pb-2 ${isDarkAmbiance ? 'text-gray-400' : 'text-[#78716c] dark:text-gray-500'}`}>
        Take all the time you need. Your mood tracker will be ready whenever you feel recharged.
      </footer>

    </div>
  );
}

export default Comfort;
