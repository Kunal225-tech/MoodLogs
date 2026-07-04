import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Calm from './Calm'
import API_BASE_URL from '../api'

function AddMood({ refresh }) {
  const navigate = useNavigate()
  const [mood, setMood] = React.useState('')
  const [note, setNote] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedTags, setSelectedTags] = React.useState([])

  const moods = [
    'Happy 😀',
    'Calm 😌',
    'Stressed 😖',
    'Sad 😞',
    'Angry 😠',
    'Tired 😩',
    'Bored 😒',
    'Loved 🥰'
  ]

  const availableTags = ['Work 💻', 'Exercise 🏃', 'Sleep 😴', 'Family ❤️', 'Friends 🤝', 'Health 🏥', 'Weather 🌧️']

  const [energy, setEnergy] = React.useState(10);
  const handleEnergyChange = (e) => {
    setEnergy(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mood.trim()) return;

    setIsLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/mood/add`, {
        mood, note, tags: selectedTags, energy: Number(energy)
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (mood == "Stressed 😖") {
        navigate('/calm', { state: { mood: 'stressed' } });
      }
      else if (mood == "Angry 😠") {
        navigate('/calm', { state: { mood: 'angry' } });
      }
      else if (mood == "Bored 😒") {
        navigate('/bored');
      }
      else if (["Happy 😀", "Loved 🥰"].includes(mood)) {
        navigate('/celebrate');
      }
      else if (["Sad 😞", "Tired 😩"].includes(mood)) {
        navigate('/comfort', { state: { mood: mood.split(' ')[0].toLowerCase() } });
      }
      setMood('')
      setNote('')
      setSelectedTags([])
      import('react-hot-toast').then(module => module.toast.success("Mood logged."));
      refresh();
    } catch (err) {
      import('react-hot-toast').then(module => module.toast.error("Failed to add mood."));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="font-sans w-full">
      <div className="flex flex-col sm:flex-row border-[1.5px] border-[#d6d3d1] dark:border-white/[0.12] rounded-lg bg-white dark:bg-[#141413] transition-colors duration-200 items-stretch focus-within:border-[#1c1917] dark:focus-within:border-white/[0.3]">
        <div className="relative flex-1 w-full sm:w-[220px] shrink-0">
          <button
            type="button"
            aria-label="Select Mood"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full px-4 py-[14px] bg-transparent border-none font-sans text-[16px] outline-none cursor-pointer flex items-center justify-between ${mood === '' ? 'text-[#78716c] dark:text-[#a8a29e]' : 'text-[#1c1917] dark:text-[#f7f4ee]'}`}
            disabled={isLoading}
          >
            <span className="truncate">{mood || "Select Mood"}</span>
            <div className="text-[#78716c] dark:text-[#a8a29e] shrink-0 ml-2">
              <svg className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </button>

          {isOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
              <div className="absolute left-0 top-[calc(100%+8px)] w-full sm:w-[280px] max-h-[280px] overflow-y-auto bg-white dark:bg-[#1c1b18] border border-[#e7e5e0] dark:border-white/[0.1] rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-20 p-2 grid grid-cols-2 gap-1 custom-scrollbar">
                {moods.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => {
                      setMood(m);
                      setIsOpen(false);
                    }}
                    className={`px-3 py-[10px] text-left rounded-lg text-[14.5px] transition-colors duration-150 flex items-center justify-between ${mood === m ? 'bg-[#f5f5f4] dark:bg-white/15 font-medium text-[#1c1917] dark:text-white' : 'hover:bg-[#fafaf9] dark:hover:bg-white/[0.06] text-[#57534e] dark:text-[#d6d3d1]'}`}
                  >
                    <span>{m.split(' ')[0]}</span>
                    <span className="text-[18px]">{m.split(' ')[1] || ''}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="w-full h-px sm:w-px sm:h-auto bg-[#e7e5e0] dark:bg-white/[0.1] shrink-0" />
        <input
          type="text"
          aria-label="Add a note"
          placeholder="Add a note…"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="px-4 py-[14px] bg-transparent border-none font-sans text-[16px] text-[#1c1917] dark:text-[#f7f4ee] outline-none w-full flex-1 placeholder-[#78716c] dark:placeholder-[#a8a29e]"
          disabled={isLoading}
        />
      </div>

      <div className="mt-5">
        <span className="block text-[11px] font-semibold tracking-[0.08em] uppercase text-[#57534e] dark:text-[#d6d3d1] mb-2.5">What affected your mood? (Optional)</span>
        <div className="flex flex-wrap gap-2">
          {availableTags.map(tag => (
            <button
              key={tag}
              type="button"
              disabled={isLoading}
              onClick={() => {
                if (selectedTags.includes(tag)) {
                  setSelectedTags(selectedTags.filter(t => t !== tag));
                } else {
                  setSelectedTags([...selectedTags, tag]);
                }
              }}
              className={`px-3.5 py-1.5 rounded-full text-[13.5px] font-medium transition-all duration-150 border-[1.5px] cursor-pointer ${selectedTags.includes(tag) ? 'bg-[#1c1917] dark:bg-white text-white dark:text-[#1c1917] border-[#1c1917] dark:border-white shadow-sm' : 'bg-transparent text-[#57534e] dark:text-[#d6d3d1] border-[#d6d3d1] dark:border-white/20 hover:border-[#8a8581] dark:hover:border-white/40'}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-[#f5f5f4] dark:border-[#292524] flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="flex-1 w-full sm:max-w-xs">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-[#57534e] dark:text-[#d6d3d1]">Energy Level</span>
            <span className="text-[13px] font-medium text-[#1c1917] dark:text-[#f7f4ee] bg-[#f5f5f4] dark:bg-[#292524] px-2 py-0.5 rounded border border-[#e7e5e0] dark:border-[#44403c]">{energy}/10</span>
          </div>
          <input
            type="range"
            aria-label="Energy Level Slider"
            min="1"
            max="10"
            value={energy}
            onChange={handleEnergyChange}
            className="w-full h-1.5 bg-[#d6d3d1] dark:bg-[#44403c] rounded-lg appearance-none cursor-pointer accent-[#1c1917] dark:accent-[#f7f4ee]"
            disabled={isLoading}
          />
          <div className="flex justify-between mt-1.5 px-0.5">
            <span className="text-[11px] text-[#a8a29e] dark:text-[#78716c]">Exhausted</span>
            <span className="text-[11px] text-[#a8a29e] dark:text-[#78716c]">Vibrant</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-7 py-3.5 bg-[#1c1917] dark:bg-[#f7f4ee] text-[#f7f4ee] dark:text-[#1c1917] border-none font-sans text-[14.5px] font-medium tracking-[0.02em] cursor-pointer rounded-lg flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 active:scale-[0.98] shadow-sm disabled:opacity-50 shrink-0"
          disabled={isLoading || !mood.trim()}
        >
          {isLoading ? "Logging..." : "Log Check-in"}
          {!isLoading && (
            <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>

    </form>
  )
}

export default AddMood