import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Bored() {
  const navigate = useNavigate();
  const movies = [
    { title: "Avengers: Endgame", genre: "Action / Sci-Fi", desc: "The epic conclusion to the Infinity Saga. A massive, emotional, and visually stunning blockbuster that is impossible to be bored by.", link: "https://www.youtube.com/watch?v=TcMBFSGVi1c" },
    { title: "Knives Out", genre: "Mystery / Comedy", desc: "A brilliant, hilarious, and fast-paced whodunit. Every single scene is packed with clues and incredible acting.", link: "https://www.youtube.com/watch?v=qGqiHJTsRkQ" },
    { title: "Mad Max: Fury Road", genre: "Action / Sci-Fi", desc: "Essentially a spectacular two-hour car chase. The ultimate adrenaline rush movie with zero dull moments.", link: "https://www.youtube.com/watch?v=hEJnMQG9ev8" },
    { title: "Inception", genre: "Sci-Fi / Thriller", desc: "A mind-bending heist movie set inside dreams. It demands your full attention from the very first frame.", link: "https://www.youtube.com/watch?v=YoHD9XEInc0" },
    { title: "Everything Everywhere All at Once", genre: "Sci-Fi / Adventure", desc: "Pure cinematic chaos in the best way possible. A hilarious, overwhelming, and deeply emotional multiverse adventure.", link: "https://www.youtube.com/watch?v=wxN1T1uxQ2g" }
  ];

  const [movie, setMovie] = useState(() => movies[Math.floor(Math.random() * movies.length)]);

  const createParticles = () => {
    return Array.from({ length: 40 }).map(() => {
      const size = Math.random() * 8 + 3;      const left = Math.random() * 100;      const animationDuration = Math.random() * 15 + 10;      const animationDelay = Math.random() * -20;
      return { size, left, animationDuration, animationDelay };
    });
  };

  const getMovie = () => {
    const random = Math.floor(Math.random() * movies.length);
    setMovie(movies[random]);
  };

  const [particles] = useState(() => createParticles());

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center font-sans px-6 transition-all duration-1000 bg-gradient-to-br from-[#fdfbf7] via-[#fed7aa] to-[#fecdd3] dark:from-[#1c1917] dark:via-[#141210] dark:to-[#0c0a09]">
      
      {}
      <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
        {particles.map((particle, i) => {
          return (
            <div 
              key={i} 
              className="absolute bg-orange-400 dark:bg-orange-500 rounded-full blur-[1px]"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.left}%`,
                bottom: `-20px`,
                animation: `floatUp ${particle.animationDuration}s ease-in ${particle.animationDelay}s infinite`
              }}
            />
          );
        })}
        <style>{`
          @keyframes floatUp {
            0% { transform: translateY(0) scale(0.8); opacity: 0; }
            10% { opacity: 0.6; }
            90% { opacity: 0.6; }
            100% { transform: translateY(-120vh) scale(1.2); opacity: 0; }
          }
        `}</style>
      </div>
      
      <div className="relative z-10 max-w-4xl w-full bg-white/80 dark:bg-[#1c1917]/80 backdrop-blur-xl md:border-[1.5px] border-[#e7e5e0] dark:border-[#44403c]/50 rounded-2xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-10 items-center">
        
        <div className="md:w-5/12 text-center md:text-left flex flex-col justify-center">
          <h1 className="font-serif text-4xl md:text-[46px] leading-[1.1] text-[#1c1917] dark:text-[#f7f4ee] mb-4">
            Bored?<br/>Watch this.
          </h1>
          <p className="text-[12px] text-[#a8a29e] dark:text-[#78716c] mb-10 uppercase tracking-[0.15em] font-medium">
            The ultimate boredom cure
          </p>

          <div className="hidden md:flex flex-col gap-4">
            <button 
              onClick={getMovie}
              className="px-6 py-3.5 bg-[#1c1917] dark:bg-[#f7f4ee] text-[#f7f4ee] dark:text-[#1c1917] rounded-xl font-medium text-[15px] hover:bg-[#292524] dark:hover:bg-[#e7e5e0] transition-all shadow-sm"
            >
              Give me another
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3.5 bg-transparent border-[1.5px] border-[#d6d3d1] dark:border-[#44403c] text-[#57534e] dark:text-[#a8a29e] rounded-xl font-medium text-[15px] hover:bg-[#f5f5f4] dark:hover:bg-[#292524] hover:border-[#1c1917] dark:hover:border-[#f7f4ee] transition-all"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
        
        <div className="md:w-7/12 w-full">
          {movie && (
            <div className="text-left bg-[#fdf8f6] dark:bg-[#292524] p-8 md:p-10 rounded-2xl border border-[#fbd5c8] dark:border-[#44403c] shadow-sm">
              <span className="inline-block px-3 py-1.5 bg-[#1c1917] dark:bg-[#f7f4ee] text-[#f7f4ee] dark:text-[#1c1917] text-[11px] uppercase tracking-wider font-bold rounded-md mb-5">
                {movie.genre}
              </span>
              <h2 className="font-serif text-[32px] text-[#1c1917] dark:text-[#f7f4ee] mb-4 leading-tight">
                {movie.title}
              </h2>
              <p className="text-[16px] text-[#57534e] dark:text-[#a8a29e] leading-relaxed mb-8">
                {movie.desc}
              </p>
              <a 
                href={movie.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-4 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-xl font-medium text-[16px] transition-colors shadow-sm"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                Watch Trailer
              </a>
            </div>
          )}

          <div className="flex md:hidden flex-col sm:flex-row gap-4 justify-center mt-8">
            <button 
              onClick={getMovie}
              className="px-6 py-3 bg-[#1c1917] dark:bg-[#f7f4ee] text-[#f7f4ee] dark:text-[#1c1917] rounded-xl font-medium text-[14px] hover:bg-[#292524] dark:hover:bg-[#e7e5e0] transition-all"
            >
              Give me another
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-transparent border-[1.5px] border-[#d6d3d1] dark:border-[#44403c] text-[#57534e] dark:text-[#a8a29e] rounded-xl font-medium text-[14px] hover:bg-[#f5f5f4] dark:hover:bg-[#292524] transition-all"
            >
              Return
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Bored;