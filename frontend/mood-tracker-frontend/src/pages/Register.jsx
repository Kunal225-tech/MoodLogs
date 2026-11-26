import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import API_BASE_URL from '../api'

const backgroundImages = [
  "https://images.unsplash.com/photo-1505820013142-f86a3439c5b2?q=80&w=2071&auto=format&fit=crop",  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071&auto=format&fit=crop",  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop",  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",  "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?q=80&w=2070&auto=format&fit=crop",  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1887&auto=format&fit=crop"];

function Register() {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate()

  const [bgImage] = useState(() => backgroundImages[Math.floor(Math.random() * backgroundImages.length)]);

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

  const toggleTheme = () => setIsDark(!isDark);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        name, email, password
      })
      import('react-hot-toast').then(module => module.toast.success("Registered successfully! Please sign in."));
      navigate('/login')
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Registration failed. Please try again.";
      import('react-hot-toast').then(module => module.toast.error(msg));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2 font-sans bg-transparent">

      {}
      <div className="flex flex-col justify-center py-12 px-7 md:p-16 lg:px-20 bg-[#fafaf9] dark:bg-[#1c1917] order-1 relative">
        
        {}
        <button 
          onClick={toggleTheme} 
          className="absolute top-6 right-6 md:top-8 md:right-8 p-2 rounded-full text-[#78716c] hover:bg-[#e7e5e0] dark:hover:bg-[#292524] dark:text-[#a8a29e] transition-colors"
          aria-label="Toggle Dark Mode"
        >
          {isDark ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          )}
        </button>
        <div className="mb-10">
          <span className="inline-block text-[11px] font-bold tracking-[0.1em] uppercase text-[#f97316] mb-4">Create account</span>
          <h1 className="font-serif text-[38px] leading-[1.1] tracking-[-0.02em] text-[#1c1917] dark:text-[#f7f4ee]">Start tracking<br /><span className="italic text-[#78716c] dark:text-[#a8a29e]">your mood.</span></h1>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          <div>
            <label className="block text-[12.5px] font-semibold tracking-[0.05em] uppercase text-[#78716c] dark:text-[#a8a29e] mb-2">Name</label>
            <input
              className="block w-full px-4 py-3.5 bg-white dark:bg-[#292524] border-[1.5px] border-[#e7e5e0] dark:border-[#44403c] font-sans text-[15px] text-[#1c1917] dark:text-[#f7f4ee] outline-none transition-all duration-200 rounded-xl focus:border-[#f97316] dark:focus:border-[#ea580c] focus:ring-[3px] focus:ring-[#f97316]/15 dark:focus:ring-[#ea580c]/20 placeholder-[#c4bfbb] dark:placeholder-[#57534e]"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold tracking-[0.05em] uppercase text-[#78716c] dark:text-[#a8a29e] mb-2">Email</label>
            <input
              className="block w-full px-4 py-3.5 bg-white dark:bg-[#292524] border-[1.5px] border-[#e7e5e0] dark:border-[#44403c] font-sans text-[15px] text-[#1c1917] dark:text-[#f7f4ee] outline-none transition-all duration-200 rounded-xl focus:border-[#f97316] dark:focus:border-[#ea580c] focus:ring-[3px] focus:ring-[#f97316]/15 dark:focus:ring-[#ea580c]/20 placeholder-[#c4bfbb] dark:placeholder-[#57534e]"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-[12.5px] font-semibold tracking-[0.05em] uppercase text-[#78716c] dark:text-[#a8a29e] mb-2">Password</label>
            <div className="relative">
              <input
                className="block w-full pl-4 pr-12 py-3.5 bg-white dark:bg-[#292524] border-[1.5px] border-[#e7e5e0] dark:border-[#44403c] font-sans text-[15px] text-[#1c1917] dark:text-[#f7f4ee] outline-none transition-all duration-200 rounded-xl focus:border-[#f97316] dark:focus:border-[#ea580c] focus:ring-[3px] focus:ring-[#f97316]/15 dark:focus:ring-[#ea580c]/20 placeholder-[#c4bfbb] dark:placeholder-[#57534e]"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#a8a29e] hover:text-[#57534e] dark:hover:text-[#d6d3d1] transition-colors focus:outline-none rounded-md"
                tabIndex="-1"
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                )}
              </button>
            </div>
          </div>

          <button 
            disabled={isLoading}
            className="w-full p-[15px] bg-gradient-to-r from-[#1c1917] to-[#44403c] dark:from-[#ea580c] dark:to-[#f97316] text-[#f7f4ee] dark:text-white border-none rounded-xl font-sans text-[15px] font-medium tracking-[0.02em] cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 mt-4 hover:scale-[1.015] hover:shadow-[0_8px_20px_rgba(28,25,23,0.15)] dark:hover:shadow-[0_8px_20px_rgba(234,88,12,0.25)] active:scale-[0.985] disabled:opacity-70 disabled:cursor-not-allowed group" 
            type="submit"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                Create account
                <svg className="transition-transform duration-300 group-hover:translate-x-[4px]" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>
        </form>

        <div className="flex items-center gap-[14px] my-7 text-[#c4bfbb] dark:text-[#57534e] text-[12px] tracking-[0.04em] before:content-[''] before:flex-1 before:h-[1px] before:bg-[#e7e5e0] dark:before:bg-[#292524] after:content-[''] after:flex-1 after:h-[1px] after:bg-[#e7e5e0] dark:after:bg-[#292524]">or</div>
        <p className="text-center text-[13.5px] text-[#a8a29e] dark:text-[#78716c]">
          Already have an account?{' '}
          <a onClick={(e) => { e.preventDefault(); navigate('/login'); }} href="#" className="text-[#f97316] dark:text-[#ea580c] font-semibold no-underline transition-colors duration-150 hover:text-[#ea580c] dark:hover:text-[#f97316]">Sign in</a>
        </p>
      </div>

      {}
      <div 
        className="hidden md:flex flex-col justify-between p-12 relative overflow-hidden order-2 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(28, 25, 23, 0.4), rgba(28, 25, 23, 0.85)), url('${bgImage}')` }}
      >
        <div className="flex items-center gap-2.5 relative z-10 drop-shadow-md transition-transform duration-700 hover:scale-[1.02]">
          <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
          </div>
          <div className="font-serif text-[24px] font-medium text-white tracking-[-0.01em]">MoodLog</div>
        </div>
        
        <div className="relative z-10">
          <span className="block text-[11px] font-medium tracking-[0.09em] uppercase text-white opacity-80 mb-5 drop-shadow-sm">How it works</span>
          <div className="flex flex-col gap-0">
            <div className="flex items-start gap-4 py-4 border-b border-white/20">
              <span className="font-serif text-[13px] italic text-white opacity-60 min-w-[18px] pt-[1px]">01</span>
              <p className="text-[14px] text-white opacity-90 leading-relaxed font-light drop-shadow-sm"><strong className="text-white font-medium">Check in daily.</strong> Takes under a minute — just pick how you're feeling.</p>
            </div>
            <div className="flex items-start gap-4 py-4 border-b border-white/20">
              <span className="font-serif text-[13px] italic text-white opacity-60 min-w-[18px] pt-[1px]">02</span>
              <p className="text-[14px] text-white opacity-90 leading-relaxed font-light drop-shadow-sm"><strong className="text-white font-medium">See patterns.</strong> Your mood history surfaces trends you wouldn't notice otherwise.</p>
            </div>
            <div className="flex items-start gap-4 py-4">
              <span className="font-serif text-[13px] italic text-white opacity-60 min-w-[18px] pt-[1px]">03</span>
              <p className="text-[14px] text-white opacity-90 leading-relaxed font-light drop-shadow-sm"><strong className="text-white font-medium">Understand yourself.</strong> Correlate moods with sleep, work, or whatever matters to you.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Register