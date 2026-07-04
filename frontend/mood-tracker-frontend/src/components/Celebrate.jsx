import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../api';

function Celebrate() {
  const navigate = useNavigate();
  const [thoughts, setThoughts] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [confetti, setConfetti] = useState([]);
  
  const colors = [
    'bg-yellow-400', 'bg-pink-400', 'bg-cyan-400', 'bg-orange-400', 'bg-emerald-400', 'bg-purple-400'
  ];

  const [ribbons] = useState(() => Array.from({ length: 20 }).map(() => ({
    id: Math.random(),
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: Math.random() * 6 + 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    width: Math.random() * 8 + 6,
    height: Math.random() * 50 + 50
  })));

  useEffect(() => {
    const fetchGratitudes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await axios.get(`${API_BASE_URL}/api/gratitude/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const formatted = res.data.map(item => ({
          id: item._id || Date.now() + Math.random(),
          text: item.text,
          date: item.date ? new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Today',
          color: item.color || colors[Math.floor(Math.random() * colors.length)],
          xOffset: item.xOffset || (Math.random() * 40 - 20),
          rotation: item.rotation || (Math.random() * 16 - 8)
        }));
        setThoughts(formatted);
      } catch (err) {
        console.error("Failed to fetch saved gratitudes:", err);
      }
    };
    fetchGratitudes();
  }, []);

  const handleAddThought = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const chosenColor = colors[Math.floor(Math.random() * colors.length)];
    const chosenXOffset = Math.random() * 40 - 20;
    const chosenRotation = Math.random() * 16 - 8;

    const newThought = {
      id: Date.now(),
      text: inputValue,
      date: 'Just now',
      color: chosenColor,
      xOffset: chosenXOffset,
      rotation: chosenRotation
    };

    setThoughts(prev => [...prev, newThought]);
    setInputValue('');
    triggerConfetti();

    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.post(`${API_BASE_URL}/api/gratitude/add`, {
          text: newThought.text,
          color: newThought.color,
          xOffset: newThought.xOffset,
          rotation: newThought.rotation
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (err) {
      console.error("Failed to save gratitude to database:", err);
    }
  };

  const triggerConfetti = () => {
    const newConfetti = Array.from({ length: 40 }).map((_, i) => ({
      id: Date.now() + i,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: 50, 
      top: 30,      tx: (Math.random() - 0.5) * 400,      ty: (Math.random() - 1) * 400,      rotation: Math.random() * 720,
      scale: Math.random() * 0.6 + 0.4
    }));
    setConfetti(newConfetti);
    
    setTimeout(() => {
      setConfetti([]);
    }, 3000);
  };

  return (
    <div 
      className="fixed inset-0 z-[40] flex flex-col items-center justify-center pt-20 pb-10 overflow-y-auto font-sans px-6 transition-all duration-1000 bg-[length:400%_400%] bg-gradient-to-br from-[#fef08a] via-[#fbcfe8] to-[#67e8f9] dark:from-[#4c1d95] dark:via-[#be185d] dark:to-[#0f172a]"
      style={{ animation: 'gradient-xy 15s ease infinite' }}
    >
      <style>{`
        @keyframes gradient-xy {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes dropIn {
          0% { transform: translateY(-400px) scale(0.5); opacity: 0; }
          50% { transform: translateY(30px) scale(1.1); opacity: 1; }
          70% { transform: translateY(-15px) scale(0.95); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes popOut {
          0% { transform: translate(0,0) scale(0); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)) scale(var(--s)); opacity: 0; }
        }
        @keyframes fallRibbon {
          0% { transform: translateY(-150px) rotate(-15deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(120vh) rotate(15deg); opacity: 0; }
        }
        .jar-scroll::-webkit-scrollbar {
          width: 0px;
        }
      `}</style>

      {}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40 dark:opacity-60">
        {ribbons.map(r => (
          <div 
            key={r.id}
            className={`absolute top-[-150px] rounded-sm shadow-sm ${r.color}`}
            style={{
              left: `${r.left}%`,
              width: `${r.width}px`,
              height: `${r.height}px`,
              animation: `fallRibbon ${r.duration}s linear ${r.delay}s infinite`
            }}
          />
        ))}
      </div>

      {}
      <button 
        onClick={() => navigate('/dashboard')}
        className="absolute top-6 right-6 md:top-10 md:right-10 z-50 p-2 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-md text-[#1c1917] dark:text-[#f7f4ee] hover:bg-white/50 dark:hover:bg-black/50 transition-colors shadow-sm"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 w-full max-w-[1100px] z-10 relative mt-10">
        
        {}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-1/2">
          {}
          <div className="mb-10">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[64px] leading-tight text-[#1c1917] dark:text-[#f7f4ee] mb-4 drop-shadow-sm transition-colors duration-1000">
              The Gratitude Jar
            </h1>
            <p className="text-[#57534e] dark:text-[#d6d3d1] max-w-md mx-auto lg:mx-0 text-[16px] md:text-[18px]">
              Capture this good feeling. What is making you smile right now?
            </p>
          </div>

          {}
          <form onSubmit={handleAddThought} className="w-full max-w-md flex flex-col sm:flex-row gap-3 relative z-20">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="I am grateful for..."
              className="flex-1 px-5 py-4 rounded-full bg-white/40 dark:bg-black/40 backdrop-blur-xl border-[1.5px] border-white/60 dark:border-white/10 outline-none focus:bg-white/60 dark:focus:bg-black/60 focus:border-white dark:focus:border-white/30 transition-all text-[#1c1917] dark:text-[#f7f4ee] placeholder-[#78716c] dark:placeholder-[#a8a29e] shadow-xl text-[16px]"
              maxLength={60}
              autoFocus
            />
            <button 
              type="submit"
              disabled={!inputValue.trim()}
              className="px-8 py-4 rounded-full bg-[#1c1917] text-[#f7f4ee] dark:bg-[#f7f4ee] dark:text-[#1c1917] font-medium hover:scale-105 transition-transform shadow-xl disabled:opacity-50 disabled:hover:scale-100 whitespace-nowrap"
            >
              Drop in
            </button>
          </form>
        </div>

        {}
        <div className="flex items-center justify-center w-full lg:w-1/2 mt-8 lg:mt-0">
          <div className="relative z-10 w-[280px] h-[360px] md:w-[340px] md:h-[420px]">
            {}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-[160px] h-8 bg-white/30 dark:bg-white/10 backdrop-blur-md border border-white/50 dark:border-white/20 rounded-t-xl z-20"></div>
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-[180px] h-5 bg-white/40 dark:bg-white/20 backdrop-blur-md border-[1.5px] border-white/50 dark:border-white/20 rounded-full z-20 shadow-md"></div>

            {}
            <div 
              className="w-full h-full bg-white/20 dark:bg-black/20 backdrop-blur-xl border-2 border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.15)] rounded-b-[40px] rounded-t-[10px] relative overflow-hidden flex flex-col justify-end p-4 pb-8 jar-scroll"
            >
              {}
              <div className="absolute top-2 left-4 w-6 h-[80%] bg-white/30 dark:bg-white/5 rounded-full blur-[4px]"></div>
              <div className="absolute bottom-4 right-6 w-12 h-6 bg-white/20 dark:bg-white/5 rounded-full blur-[6px] rotate-[-20deg]"></div>

              {}
              <div className="flex flex-col-reverse gap-3 items-center overflow-y-auto jar-scroll pt-10 z-10 h-full">
                {thoughts.slice().reverse().map((thought) => (
                  <div 
                    key={thought.id}
                    className="px-4 py-3 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-white/80 dark:border-white/20 bg-white/95 dark:bg-[#292524]/95 backdrop-blur-md max-w-[92%] w-[230px] text-left z-10 flex flex-col gap-1.5 transition-all hover:scale-105"
                    style={{ 
                      animation: 'dropIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
                      marginLeft: `${thought.xOffset}px`, 
                      transform: `rotate(${thought.rotation}deg)` 
                    }}
                  >
                    <div className="flex items-center justify-between border-b border-[#f5f5f4] dark:border-[#44403c] pb-1.5">
                      <div className={`w-2.5 h-2.5 rounded-full ${thought.color ? thought.color.split(' ')[0] : 'bg-yellow-400'}`} />
                      <span className="text-[11px] font-sans font-medium uppercase tracking-wider text-[#a8a29e] dark:text-[#78716c]">
                        {thought.date || 'Today'}
                      </span>
                    </div>
                    <p className="font-serif italic text-[15px] leading-snug text-[#1c1917] dark:text-[#f7f4ee] break-words">
                      "{thought.text}"
                    </p>
                  </div>
                ))}
                
                {thoughts.length === 0 && (
                  <div className="h-full flex items-center justify-center text-center opacity-60">
                    <p className="text-[#57534e] dark:text-[#d6d3d1] italic text-[15px]">The jar is waiting for<br/>your good moments...</p>
                  </div>
                )}
              </div>
            </div>

            {}
            {confetti.map((c) => (
              <div 
                key={c.id}
                className={`absolute w-3 h-3 ${c.color} rounded-full z-30 pointer-events-none shadow-sm`}
                style={{
                  left: `${c.left}%`,
                  top: `${c.top}%`,
                  '--tx': `${c.tx}px`,
                  '--ty': `${c.ty}px`,
                  '--rot': `${c.rotation}deg`,
                  '--s': c.scale,
                  animation: 'popOut 2.5s cubic-bezier(0.25, 1, 0.5, 1) forwards'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Celebrate;
