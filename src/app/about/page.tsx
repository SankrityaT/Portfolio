'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const recommendedQuestions = [
  "What are your technical skills?",
  "Tell me about your recent projects",
  "What's your experience with AI/ML?",
  "What are your career goals?",
  "Where have you worked before?",
];

export default function About() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m Sankritya\'s AI assistant. Feel free to ask me anything about his background, projects, or interests!'
    }
  ]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage('');
    setIsLoading(true);

    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...chatMessages, { role: 'user', content: userMessage }]
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error) {
      console.error('Error:', error);
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.2 },
    },
  };

  return (
    <div className="relative min-h-screen py-20" ref={ref}>
      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="container mx-auto px-4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[calc(100vh-10rem)]">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* About Me Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 hover:bg-white/10 transition-all duration-300 border border-purple-500/20">
              <h3 className="text-2xl font-bold font-nunito text-white mb-4">About Me</h3>
              <p className="text-gray-300 font-nunito leading-relaxed">
                I'm a passionate Software Developer and AI enthusiast, currently pursuing my BS in Computer Science at Arizona State University. 
                With a strong foundation in full-stack development and a keen interest in AI/ML, I love building innovative solutions that make a difference.
              </p>
              <p className="text-gray-300 font-nunito leading-relaxed mt-4">
                My journey spans from developing iOS applications to creating AI-powered web solutions. I'm particularly excited about the intersection of mobile development, 
                artificial intelligence, and user experience design.
              </p>
              {/* Resume Preview Toggle */}
              <div className="mt-6">
                <button
                  onClick={() => setShowPdfPreview(true)}
                  className="inline-flex items-center px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-200 font-medium text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Preview Resume
                </button>
              </div>
            </div>

            {/* Education Section */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 hover:bg-white/10 transition-all duration-300 border border-blue-500/20">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-16 h-16 relative flex-shrink-0 bg-white/10 rounded-xl p-2">
                  <Image
                    src="/asu-logo.png"
                    alt="Arizona State University"
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-nunito text-white">Arizona State University</h3>
                  <p className="text-xl text-blue-400 font-nunito">BS in Computer Science</p>
                  <p className="text-gray-400 font-nunito mt-1">2021 - Present</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <p className="text-gray-300 font-nunito">GPA: 4.01 | 7x Dean's List</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <p className="text-gray-300 font-nunito">Focus: AI/ML, Software Engineering</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <p className="text-gray-300 font-nunito">Active in tech communities and research</p>
                </div>
              </div>
            </div>

            {/* Two Column Grid for Skills and Interests */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-cyan-500/20">
                <h3 className="text-xl font-bold font-nunito text-white mb-3">Core Strengths</h3>
                <ul className="space-y-2 text-gray-300 font-nunito">
                  <li>• Full Stack Development</li>
                  <li>• iOS & Mobile Development</li>
                  <li>• AI/ML Integration</li>
                  <li>• System Architecture</li>
                </ul>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-emerald-500/20">
                <h3 className="text-xl font-bold font-nunito text-white mb-3">Interests</h3>
                <ul className="space-y-2 text-gray-300 font-nunito">
                  <li>• AI/ML Research</li>
                  <li>• Open Source</li>
                  <li>• Tech Innovation</li>
                  <li>• UI/UX Design</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Chat UI */}
          <div className="lg:col-span-5 h-full">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-purple-500/20 flex flex-col h-full lg:sticky lg:top-20">
              {/* Chat Header */}
              <div className="p-4 border-b border-purple-500/20">
                <h2 className="text-xl font-bold font-nunito text-white flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10">
                    <Image
                      src="/memoji1_e.png"
                      alt="Sankritya AI"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  Chat with My AI
                </h2>
              </div>

              {/* Chat Messages */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-6 space-y-4"
                style={{ maxHeight: 'calc(100% - 180px)' }}
              >
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-end gap-2 ${
                      msg.role === 'assistant' ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-white/10">
                        <Image
                          src="/memoji1_e.png"
                          alt="Sankritya AI"
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-xl p-4 ${
                        msg.role === 'assistant'
                          ? 'bg-purple-500/20 text-white rounded-bl-none'
                          : 'bg-blue-500/20 text-white rounded-br-none'
                      }`}
                    >
                      <p className="text-sm font-nunito">{msg.content}</p>
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-blue-500/20">
                        <Image
                          src="/user-avatar.png"
                          alt="User"
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-end gap-2 justify-start">
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-white/10">
                      <Image
                        src="/memoji1_e.png"
                        alt="Sankritya AI"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="bg-purple-500/20 max-w-[80%] rounded-xl rounded-bl-none p-4">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Recommended Questions */}
              {chatMessages.length === 1 && (
                <div className="px-4 py-2 border-t border-purple-500/20">
                  <div className="flex flex-wrap gap-2">
                    {recommendedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setMessage(question);
                          handleSendMessage(new Event('submit') as any);
                        }}
                        className="bg-white/10 hover:bg-white/20 text-white text-sm rounded-full px-4 py-2 transition-all duration-200"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Input */}
              <div className="p-4 border-t border-purple-500/20">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* PDF Preview Modal */}
      <AnimatePresence>
        {showPdfPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowPdfPreview(false);
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 max-w-4xl w-full max-h-[90vh] relative"
            >
              <button
                onClick={() => setShowPdfPreview(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="w-full h-[80vh] mt-2">
                <iframe
                  src="/Sankritya_Thakur_Resume.pdf"
                  className="w-full h-full rounded-lg bg-white"
                  title="Resume Preview"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
