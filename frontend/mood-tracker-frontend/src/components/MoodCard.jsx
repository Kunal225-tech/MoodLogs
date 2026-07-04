

import React from 'react';
import axios from 'axios';
import API_BASE_URL from '../api';

function MoodCard({ mood, refresh }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/api/mood/${mood._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      });
      import('react-hot-toast').then(module => module.toast.success("Mood deleted"));
      refresh();
    } catch (err) {
      import('react-hot-toast').then(module => module.toast.error("Failed to delete mood"));
    }
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  return (
    <div className="flex justify-between bg-white dark:bg-transparent border-[1.5px] border-[#e7e5e0] dark:border-[#44403c] rounded-lg overflow-hidden font-sans transition-colors duration-200 hover:border-[#d6d3d1] dark:hover:border-[#78716c] group h-full">
      <div className="p-4 sm:px-5 sm:py-4 flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2 mb-0.5">
          <span className="text-[16px] font-semibold text-[#1c1917] dark:text-[#f7f4ee]">{mood.mood}</span>
          {mood.energy && (
            <span className="flex items-center gap-1 text-[12px] font-medium text-[#1c1917] dark:text-[#fed7aa] bg-[#fdf8f6] dark:bg-[#431407] px-2 py-[2px] rounded-md border border-[#fbd5c8] dark:border-[#7c2d12] ml-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#f97316" stroke="none" className="text-[#f97316]">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
              {mood.energy}/10
            </span>
          )}
          {mood.tags && mood.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 ml-1">
              {mood.tags.map(tag => (
                <span key={tag} className="px-2 py-[2px] bg-[#f5f5f4] dark:bg-[#292524] text-[#57534e] dark:text-[#a8a29e] rounded-md text-[12px] font-medium border border-[#e7e5e0] dark:border-[#44403c]">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {mood.note && <span className="text-[15px] text-[#57534e] dark:text-[#d6d3d1] leading-relaxed mb-1">{mood.note}</span>}
        <span className="text-[12px] text-[#a8a29e] dark:text-[#78716c]">{formatDate(mood.date)}</span>
      </div>
      <button 
        onClick={handleDelete} 
        className="bg-transparent text-[#a8a29e] dark:text-[#78716c] border-none px-4 cursor-pointer transition-colors duration-200 flex items-center justify-center opacity-50 group-hover:opacity-100 hover:!text-[#ef4444] hover:!bg-[#fef2f2] dark:hover:!bg-[#450a0a]" 
        aria-label="Delete"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </button>
    </div>
  );
}

export default MoodCard;