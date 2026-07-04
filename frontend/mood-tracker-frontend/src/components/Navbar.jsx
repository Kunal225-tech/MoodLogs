

import { Link, useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem('token');
    const [isScrolled, setIsScrolled] = useState(false);
    const [streak, setStreak] = useState(() => parseInt(localStorage.getItem('dailyStreak')) || 0);
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 20);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleStreakUpdate = () => {
            setStreak(parseInt(localStorage.getItem('dailyStreak')) || 0);
        };
        window.addEventListener('streakUpdated', handleStreakUpdate);
        return () => window.removeEventListener('streakUpdated', handleStreakUpdate);
    }, []);
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('dailyStreak');
        setStreak(0);
        navigate('/login');
    };

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
    if (isAuthPage) return null;

    return (
        <nav 
            className={`flex justify-between items-center py-4 px-7 md:py-5 md:px-14 font-sans sticky top-0 z-[100] bg-[#f7f4ee] dark:bg-[#1c1917] border-b border-transparent transition-all duration-300 ${isScrolled ? 'shadow-[0_4px_24px_rgba(28,25,23,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)]' : ''}`}
        >
            <Link to="/" className="font-serif text-[26px] text-[#1c1917] dark:text-[#f7f4ee] no-underline tracking-[-0.01em]">MoodLogs</Link>

            <div className="flex items-center gap-6 md:gap-8">
                
                {token && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#fff7ed] dark:bg-[#431407]/40 border border-[#ffedd5] dark:border-[#7f1d1d]/40 rounded-full shadow-sm" title={`${streak} Day Streak`}>
                        <span className="text-[14px]">🔥</span>
                        <span className="text-[14px] font-bold text-[#ea580c] dark:text-[#f97316]">{streak}</span>
                    </div>
                )}

                <button 
                    onClick={toggleTheme} 
                    className="p-2.5 rounded-full text-[#78716c] hover:bg-[#e7e5e0] dark:hover:bg-[#292524] dark:text-[#a8a29e] transition-all duration-300 transform active:scale-75 hover:rotate-12 cursor-pointer shadow-sm hover:shadow"
                    aria-label="Toggle Dark Mode"
                >
                    {isDark ? (
                        <svg className="transition-all duration-500 transform rotate-0 hover:rotate-180 text-amber-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                    ) : (
                        <svg className="transition-all duration-500 transform rotate-0 hover:-rotate-90 text-slate-700 dark:text-slate-200" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    )}
                </button>

                <Link to="/" className="hidden md:block text-[14.5px] font-medium text-[#78716c] dark:text-[#a8a29e] no-underline transition-colors duration-200 hover:text-[#1c1917] dark:hover:text-[#f7f4ee]">Home</Link>

                {!token ? (
                    <>
                        <Link to="/login" className="text-[14.5px] font-medium text-[#78716c] dark:text-[#a8a29e] no-underline transition-colors duration-200 hover:text-[#1c1917] dark:hover:text-[#f7f4ee]">Login</Link>
                        <Link to="/register" className="px-5 py-2.5 bg-[#1c1917] dark:bg-[#f7f4ee] text-[#f7f4ee] dark:text-[#1c1917] rounded-md font-sans text-[14.5px] font-medium tracking-[0.02em] no-underline transition-all duration-200 hover:bg-[#292524] dark:hover:bg-[#e7e5e0] active:scale-[0.985]">Register</Link>
                    </>
                ) : (
                    <>
                        <Link to="/dashboard" className="text-[14.5px] font-medium text-[#78716c] dark:text-[#a8a29e] no-underline transition-colors duration-200 hover:text-[#1c1917] dark:hover:text-[#f7f4ee]">Dashboard</Link>
                        <button onClick={handleLogout} className="px-5 py-2.5 bg-[#1c1917] dark:bg-[#f7f4ee] text-[#f7f4ee] dark:text-[#1c1917] border-none rounded-md font-sans text-[14.5px] font-medium tracking-[0.02em] cursor-pointer transition-all duration-200 hover:bg-[#292524] dark:hover:bg-[#e7e5e0] active:scale-[0.985]">Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;

