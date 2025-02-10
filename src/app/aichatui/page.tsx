'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const AIChatUI = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Add initial greeting
    setMessages([{
      text: "Hi! I'm Sankritya. Feel free to ask me about my work, projects, or anything else!",
      sender: 'bot',
      timestamp: new Date()
    }]);
  }, []);

  const handleSend = async (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();

    if (input.trim()) {
      const userMessage = { text: input.trim(), sender: 'user', timestamp: new Date() };
      setMessages(prev => [...prev, userMessage]);
      const currentInput = input.trim();
      setInput('');
      setIsTyping(true);

      try {
        // Convert chat messages to API format including the new message
        const apiMessages: Message[] = messages
          .filter(msg => msg.sender !== 'system')
          .map(msg => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text
          }));

        // Add the current message
        apiMessages.push({ role: 'user', content: currentInput });

        console.log('Sending messages to API:', JSON.stringify({ messages: apiMessages }, null, 2));

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ messages: apiMessages }),
        });

        const responseData = await response.json();

        if (!response.ok) {
          console.error('API Error Response:', {
            status: response.status,
            statusText: response.statusText,
            data: responseData
          });
          throw new Error(responseData.error || 'Failed to get response');
        }

        console.log('API Success Response:', responseData);
        
        const botResponse = {
          text: responseData.content,
          sender: 'bot',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botResponse]);
      } catch (error) {
        console.error('Chat Error:', error);
        const errorMessage = {
          text: error instanceof Error ? error.message : 'Sorry, I encountered an error. Please try again.',
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      className="w-full max-w-3xl h-[70vh] bg-gradient-to-br from-gray-900 to-blue-800 flex flex-col justify-between p-6 rounded-2xl mx-auto overflow-hidden shadow-xl"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      {/* Messages */}
      <motion.div
        className="flex-1 overflow-y-auto pr-2 mb-4 space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {messages.map((message, index) => (
          <motion.div
            key={index}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`max-w-[80%] p-4 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white ml-4'
                  : 'bg-gray-800 text-white mr-4'
              }`}
            >
              <p className="text-sm md:text-base whitespace-pre-wrap">{message.text}</p>
              <p className="text-xs mt-1 opacity-50">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-gray-800 text-white p-4 rounded-2xl mr-4">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </motion.div>

      {/* Input */}
      <form onSubmit={handleSend} className="flex gap-2 mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-4 rounded-xl bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          className={`p-4 rounded-xl ${
            !input.trim() || isTyping
              ? 'bg-gray-700 text-gray-400'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          } transition-colors duration-200`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default AIChatUI;