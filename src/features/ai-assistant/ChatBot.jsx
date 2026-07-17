import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aiModel } from '@/config/aiConfig';
import { useDebounce } from '@/hooks/useDebounce';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ZapIcon, CloseIcon, SparklesIcon } from '@/assets/icons';

/**
 * @module ChatBot
 * @description Cinema-grade AI shopping assistant - Production Optimized
 * @author Principal Full-Stack Engineer
 * @version 3.1.0
 */

// 🔒 Extraction of static layout configurations to avoid re-renders
const BUTTON_VARIANTS = {
  hover: { scale: 1.05, boxShadow: "0 0 30px rgba(212,175,55,0.4)" },
  tap: { scale: 0.95 }
};

const CONTAINER_VARIANTS = {
  initial: { opacity: 0, scale: 0.85, y: 60 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 26 } },
  exit: { opacity: 0, scale: 0.85, y: 60, transition: { duration: 0.2 } }
};

const MESSAGE_VARIANTS = {
  initial: (role) => ({ opacity: 0, x: role === 'user' ? 15 : -15 }),
  animate: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } }
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useLocalStorage('ai_chat_history', [
    { role: 'assistant', content: 'Welcome to the Global Auction VIP lounge. How can I assist your luxury acquisition today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  // 🔥 Activation of the ghost hook: tracking user typing cadence safely
  const debouncedInput = useDebounce(input, 300);

  // ⚡ Memoized Message Stream Renderer to prevent heavy DOM repaints
  const renderedMessages = useMemo(() => {
    return messages.map((msg, idx) => (
      <motion.div
        custom={msg.role}
        variants={MESSAGE_VARIANTS}
        initial="initial"
        animate="animate"
        key={`${idx}-${msg.role}`}
        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
      >
        <div className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed tracking-wide selection:bg-black/10 ${
          msg.role === 'user' 
            ? 'bg-gold text-black font-semibold rounded-tr-none shadow-lg shadow-gold/10' 
            : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5 backdrop-blur-md'
        }`}>
          {msg.content}
        </div>
      </motion.div>
    ));
  }, [messages]);

  // 🧠 Resilient non-blocking execution block for internal auto-scrolling
  useEffect(() => {
    if (!isOpen) return;
    
    const scrollFrame = requestAnimationFrame(() => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    return () => cancelAnimationFrame(scrollFrame);
  }, [messages, isOpen]);

  // 🏎️ Memoized submission engine to guard the asynchronous lifecycle
  const handleSendMessage = useCallback(async (e) => {
    e.preventDefault();
    const cleanInput = input.trim();
    if (!cleanInput || isLoading) return;

    const userMessage = { role: 'user', content: cleanInput };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await aiModel.sendMessage(cleanInput);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Apologies, my neural link is temporarily offline. Please try again shortly.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, setMessages]);

  const clearHistory = useCallback(() => {
    setMessages([{ 
      role: 'assistant', 
      content: 'System reset. How can I assist you fresh today?' 
    }]);
  }, [setMessages]);

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans antialiased select-none">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* 💎 SYSTEM FLOATING ACCELERATOR BUTTON */
          <motion.button
            layoutId="chat-core-wrapper"
            variants={BUTTON_VARIANTS}
            whileHover="hover"
            whileTap="tap"
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full bg-black border border-gold/30 flex items-center justify-center shadow-2xl transition-shadow shadow-gold/10"
          >
            <SparklesIcon className="w-7 h-7 text-gold animate-pulse" />
          </motion.button>
        ) : (
          /* 🔒 REINFORCED CONCIERGE STREAM PANELS */
          <motion.div
            layoutId="chat-core-wrapper"
            variants={CONTAINER_VARIANTS}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-[380px] h-[550px] bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl flex flex-col shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden select-text"
          >
            {/* Header Area */}
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-white uppercase select-none">Global AI Concierge</span>
              </div>
              <div className="flex gap-4 items-center select-none">
                <button 
                  onClick={clearHistory} 
                  className="text-[10px] font-mono text-gray-500 hover:text-gold uppercase tracking-wider transition-colors"
                >
                  Reset
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="text-gray-400 hover:text-white transition-all transform hover:scale-115"
                >
                  <CloseIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Core Messages Stream Context */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]">
              {renderedMessages}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-3 rounded-xl rounded-tl-none flex gap-1.5 items-center border border-white/5">
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-duration:0.7s]" />
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-duration:0.7s] [animation-delay:0.15s]" />
                    <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce [animation-duration:0.7s] [animation-delay:0.3s]" />
                  </div>
                </div>
              )}
              <div ref={scrollRef} className="h-1" />
            </div>

            {/* Input Form Pipeline */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white/5 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Inquire about luxury assets..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold/50 transition-all placeholder:text-gray-600 font-light"
              />
              <button 
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-11 h-11 bg-gold text-black rounded-lg flex items-center justify-center hover:bg-yellow-500 transition-all active:scale-90 disabled:opacity-20 disabled:grayscale disabled:scale-100"
              >
                <ZapIcon className="w-4 h-4 fill-current" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;