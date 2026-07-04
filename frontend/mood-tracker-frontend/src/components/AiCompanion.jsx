import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../api';

function AiCompanion({ isModal = false, onClose }) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hi there. I'm your Mindful AI space—here to listen, untangle thoughts, or guide you through a quick grounding reset whenever you need."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const token = localStorage.getItem('token');

  const quickPrompts = [
    "Overwhelmed by workload today.",
    "Help reframe a stressful thought.",
    "Quick 2-minute grounding reset."
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend) => {
    const messageContent = textToSend || input;
    if (!messageContent.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: messageContent
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/ai/chat`,
        { message: messageContent, history: messages },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const aiReply = {
        id: Date.now() + 1,
        sender: 'ai',
        text: response.data.reply
      };
      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      console.error('AI chat error:', err);
      const fallbackReply = {
        id: Date.now() + 1,
        sender: 'ai',
        text: "I hear you. Take things one slow breath at a time right now. You don't have to carry or solve everything today."
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`${isModal ? 'fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 animate-[fadeIn_0.15s_ease-out]' : 'min-h-screen bg-[#fafaf9] dark:bg-[#0c0a09] text-[#1c1917] dark:text-[#f5f5f4] p-6 flex flex-col items-center justify-center font-sans'}`}
    >
      <div
        className={`bg-white dark:bg-[#141413] border border-[#e7e5e4] dark:border-white/[0.08] rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col transition-shadow ${isModal ? 'w-[360px] sm:w-[400px] h-[450px] max-h-[75vh]' : 'w-full max-w-2xl h-[720px] max-h-[85vh]'}`}
      >
        {}
        <div
          className="bg-white dark:bg-[#141413] px-6 py-4 border-b border-[#f5f5f4] dark:border-white/[0.06] flex items-center justify-between shrink-0"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#f5f5f4] dark:bg-white/[0.06] text-[#1c1917] dark:text-white font-medium text-sm shadow-2xs">
              ✨
            </div>
            <div className="flex items-center gap-2.5">
              <h3 className="font-sans font-semibold text-base text-[#1c1917] dark:text-[#f5f5f4] tracking-tight">
                Mindful Assistant
              </h3>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Online
              </span>
            </div>
          </div>

          {isModal ? (
            <button
              onClick={onClose}
              className="text-[#a8a29e] hover:text-[#1c1917] dark:hover:text-white p-2 rounded-xl hover:bg-[#f5f5f4] dark:hover:bg-white/[0.06] transition-all cursor-pointer text-sm"
              title="Close"
            >
              ✕
            </button>
          ) : (
            <button
              onClick={() => navigate('/dashboard')}
              className="px-3.5 py-1.5 rounded-xl bg-[#f5f5f4] dark:bg-white/[0.06] hover:bg-[#e7e5e4] dark:hover:bg-white/10 text-xs font-medium transition-colors cursor-pointer text-[#57534e] dark:text-gray-300"
            >
              ← Dashboard
            </button>
          )}
        </div>

        {}
        <div className="bg-[#fafaf9] dark:bg-[#111110] px-6 py-3 border-b border-[#f5f5f4] dark:border-white/[0.05] flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] shrink-0">
          <span className="text-xs font-medium text-[#a8a29e] dark:text-[#78716c] shrink-0 mr-1">Try asking:</span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              disabled={isLoading}
              className="text-xs bg-white dark:bg-white/[0.04] hover:bg-[#f5f5f4] dark:hover:bg-white/[0.08] text-[#57534e] dark:text-[#d6d3d1] px-3 py-1.5 rounded-xl border border-[#e7e5e4] dark:border-white/[0.06] shrink-0 transition-all cursor-pointer font-sans shadow-2xs"
            >
              {prompt}
            </button>
          ))}
        </div>

        {}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 bg-white dark:bg-[#141413] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line font-sans ${
                  msg.sender === 'user'
                    ? 'bg-[#1c1917] dark:bg-white text-white dark:text-[#1c1917] rounded-br-xs font-medium shadow-sm'
                    : 'bg-[#f5f5f4] dark:bg-white/[0.05] text-[#292524] dark:text-[#e7e5e4] border border-[#e7e5e4]/60 dark:border-white/[0.05] rounded-bl-xs'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2.5 px-4 py-3 bg-[#f5f5f4] dark:bg-white/[0.05] border border-[#e7e5e4]/60 dark:border-white/[0.05] rounded-2xl rounded-bl-xs w-fit text-sm text-[#78716c] dark:text-[#a8a29e]">
              <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
              <span>Mindful AI is writing...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {}
        <div className="px-6 py-4 bg-white dark:bg-[#141413] border-t border-[#f5f5f4] dark:border-white/[0.06] shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 relative"
          >
            <input
              type="text"
              aria-label="Message assistant"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Message assistant..."
              disabled={isLoading}
              className="w-full pl-4 pr-12 py-3 rounded-2xl bg-[#f5f5f4] dark:bg-[#1c1c1a] border border-transparent focus:border-[#d6d3d1] dark:focus:border-white/15 text-sm text-[#1c1917] dark:text-[#f5f5f4] placeholder-[#78716c] dark:placeholder-[#a8a29e] focus:outline-none transition-all font-sans"
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-2 bg-[#1c1917] dark:bg-white hover:opacity-85 disabled:opacity-20 text-white dark:text-[#1c1917] rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center h-8 w-8"
              title="Send"
            >
              ↑
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default AiCompanion;
