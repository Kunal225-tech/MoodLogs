import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const calmQuotes = [
  "Peace comes from within.",
  "Breathe in strength, breathe out stress.",
  "Let go of what you can't control.",
  "Every storm runs out of rain.",
  "Focus on this moment."
];

const angryQuotes = [
  "Let the anger flow through and out of you.",
  "Your peace is more important than this moment.",
  "Breathe in calm, exhale the fire.",
  "This feeling is temporary.",
  "Choose your response, protect your peace."
];

function Calm() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAngry = location.state?.mood === 'angry';
  const activeQuotes = isAngry ? angryQuotes : calmQuotes;

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const [circles] = useState(() => Array.from({ length: 25 }).map(() => ({
    size: Math.random() * 40 + 15,    left: Math.random() * 100,    animationDuration: Math.random() * 20 + 15,    animationDelay: Math.random() * -30,
    opacity: Math.random() * 0.4 + 0.2  })));

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % activeQuotes.length);
        setFade(true);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeQuotes.length]);

  return (
    <div
      className={`fixed inset-0 z-[40] flex flex-col items-center justify-center pt-24 pb-10 overflow-y-auto font-sans px-6 transition-all duration-1000 bg-[length:400%_400%] ${
        isAngry 
          ? 'bg-gradient-to-br from-[#fcf7f7] via-[#f7e6e6] to-[#f9ecec] dark:from-[#2a1717] dark:via-[#1c0f0f] dark:to-[#0c0a09]' 
          : 'bg-gradient-to-br from-[#fdfcfb] via-[#f3f6f5] to-[#e8efec] dark:from-[#1c1917] dark:via-[#141210] dark:to-[#0c0a09]'
      }`}
      style={{ animation: 'gradient-xy 15s ease infinite' }}
    >
      <style>{`
        @keyframes gradient-xy {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes floatUp {
          0% { transform: translateY(0) scale(0.9); opacity: 0; }
          10% { opacity: var(--circle-op); }
          90% { opacity: var(--circle-op); }
          100% { transform: translateY(-120vh) scale(1.1); opacity: 0; }
        }
      `}</style>

      {}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {circles.map((circle, i) => (
          <div 
            key={i} 
            className={`absolute rounded-full transition-colors duration-1000 ${isAngry ? 'bg-red-300 dark:bg-red-900/60' : 'bg-orange-300 dark:bg-orange-800'}`}
            style={{
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              left: `${circle.left}%`,
              bottom: `-80px`,
              '--circle-op': circle.opacity,
              animation: `floatUp ${circle.animationDuration}s ease-in ${circle.animationDelay}s infinite`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl w-full flex flex-col md:flex-row items-center gap-10 md:gap-16 mt-auto mb-auto">

        {}
        <div className="w-full md:w-1/2 flex items-center justify-center mb-6 md:mb-0">
          <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 bg-[#fbd5c8] dark:bg-[#7c2d12] rounded-full animate-ping opacity-20" style={{ animationDuration: '4s' }}></div>
            <div className="absolute inset-4 bg-[#f97316] dark:bg-[#ea580c] rounded-full animate-ping opacity-20" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
            <div className="relative w-28 h-28 md:w-32 md:h-32 bg-[#1c1917] dark:bg-[#f7f4ee] rounded-full shadow-xl flex items-center justify-center z-10">
              <span className="text-[#f7f4ee] dark:text-[#1c1917] font-serif italic text-xl md:text-2xl">breathe.</span>
            </div>
          </div>
        </div>

        {}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="font-serif text-3xl md:text-[46px] leading-tight text-[#1c1917] dark:text-[#f7f4ee] mb-6 transition-all duration-500">
            {isAngry ? "Release the tension." : "Take a moment."}
          </h1>

          <p className="text-[16px] md:text-[18px] text-[#57534e] dark:text-[#a8a29e] mb-10 leading-relaxed max-w-md mx-auto md:mx-0 transition-all duration-500">
            {isAngry 
              ? "Anger is a natural emotion. Take deep, slow breaths to lower your heart rate and regain control of your nervous system."
              : "It's okay to feel overwhelmed. Drop your shoulders, unclench your jaw, and let go of your worries for just 60 seconds."}
          </p>

          {}
          <div className="flex flex-col mb-10 text-left bg-white/50 dark:bg-[#292524]/50 p-6 rounded-2xl border border-[#e7e5e0] dark:border-[#44403c] max-w-md mx-auto md:mx-0 shadow-sm">
            <span className="text-[11px] font-medium tracking-[0.09em] uppercase text-[#a8a29e] dark:text-[#78716c] mb-4 block md:text-left text-center">Helpful Resources</span>
            <div className="flex flex-col gap-4">
              <a
                href="https://youtu.be/YRJ6xoiRcpQ?si=MOf8zkgYIY3tAe9x"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] md:text-[15px] text-[#57534e] dark:text-[#a8a29e] hover:text-[#f97316] dark:hover:text-[#fed7aa] transition-colors flex items-center justify-start px-2 gap-3 group"
              >
                <span className="text-xl">🎵</span>
                <span>Listen to calming Lo-Fi radio</span>
              </a>
              <a
                href="https://findahelpline.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] md:text-[15px] text-[#57534e] dark:text-[#a8a29e] hover:text-[#f97316] dark:hover:text-[#fed7aa] transition-colors flex items-center justify-start px-2 gap-3 group"
              >
                <span className="text-xl">🛟</span>
                <span>Find a global mental health helpline</span>
              </a>
            </div>
          </div>

          <div className="pt-6 md:pt-8 md:border-t-0 border-t border-[#e7e5e0] dark:border-[#292524] flex justify-center md:justify-start">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3.5 bg-transparent border-[1.5px] border-[#d6d3d1] dark:border-[#44403c] text-[#57534e] dark:text-[#a8a29e] rounded-xl font-medium text-[15px] tracking-wide hover:bg-[#f5f5f4] dark:hover:bg-[#292524] hover:border-[#1c1917] dark:hover:border-[#f7f4ee] transition-all duration-300 shadow-sm"
            >
              Return to Dashboard
            </button>
          </div>
        </div>

      </div>

      {}
      <div className="relative z-10 mt-auto pt-10 pb-2 text-center px-6 min-h-[60px] flex items-center justify-center w-full">
        <p className={`text-[16px] md:text-[18px] italic font-serif tracking-wide text-[#78716c] dark:text-[#a8a29e] transition-opacity duration-1000 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          "{activeQuotes[quoteIndex]}"
        </p>
      </div>

    </div>
  );
}

export default Calm;