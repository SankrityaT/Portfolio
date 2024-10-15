"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type PredefinedResponses = {
  [key: string]: string;
};

type Buzzwords = {
  [key: string]: string[];
};

const predefinedResponses: PredefinedResponses = {
  "about yourself": "I am Sankritya Thakur, a driven and detail-oriented full-stack developer with hands-on experience in building modern web applications. My passion lies in developing impactful solutions using a blend of creativity and technical skills.",
  "educational background": "I am currently pursuing a Bachelor of Science in Computer Science at Arizona State University, with an expected graduation in May 2025. My academic focus is on software engineering, AI development, and web technologies.",
  "technical skills": "I am skilled in Full-Stack Development, Web Design, Java, C/C++, Python, JavaScript, TypeScript, React, Node.js, SwiftUI, TailwindCSS, Firebase, MongoDB, and Docker. I focus on building scalable, maintainable codebases.",
  "Soft skills": "My soft skills include Leadership, Project Management, Problem-Solving, Effective Communication, and Collaboration in team environments.",
  "experience at hcl tech": "As a Frontend Developer Intern at HCL Tech, I developed a responsive real estate website, led the redesign of the client's web application, and collaborated with teams to implement SEO strategies and UX improvements.",
  "fairshare project": "FairShare is a SwiftUI-based iOS app I built, allowing users to easily split bills and track expenses in real-time. The app features secure authentication and data synchronization using Firebase and CoreData.",
  "real estate website project": "I created a responsive real estate web application using HTML, CSS, React, Node.js, and MongoDB. The app offers advanced property search features and seamless payment processing.",
  "ai product research assistant": "This project utilizes Groq AI to provide personalized product recommendations, leveraging AI to streamline the product research process.",
  "wag meet project": "Wag Meet is a SwiftUI app that enables dog owners to connect and organize playdates for their pets. The app allows users to set up profiles and events for socializing.",
  "projects": "I have worked on projects including FairShare, a real estate website, CryptoTracker, AI Product Research Assistant, and Wag Meet. Check out the projects section of my portfolio for more.",
  "contact": "For further questions or to reach out, visit the contact section of my portfolio: [Contact Me](#contact).",
  "positive response": "Thank you for reaching out! I'm excited to assist you. What can I help you with today?",
  "greeting": "Hello! How can I assist you today?",
  "well-being": "I'm doing well, thank you! How about you?"
};


const buzzwords: Buzzwords = {
  "about yourself": ["about yourself", "who are you", "introduce yourself"],
  "educational background": ["educational background", "education", "academic", "study"],
  "technical skills": ["technical skills", "skills", "coding", "development"],
  "soft skills": ["soft skills", "communication", "leadership", "teamwork"],
  "experience at hcl tech": ["experience at hcl", "internship", "hcl tech", "work experience"],
  "fairshare project": ["fairshare", "split bills app", "fairshare project"],
  "real estate website project": ["real estate", "property app", "real estate website"],
  "ai product research assistant": ["product research", "ai research", "ai product recommendation"],
  "wag meet project": ["wag meet", "dog social app", "dog meet app"],
  "projects": ["projects", "portfolio", "work"],
  "contact": ["contact", "reach out", "get in touch"],
  "positive response": ["thank you", "thanks", "appreciate"],
  "greeting": ["hello", "hi", "hey"],
  "well-being": ["how are you", "how's it going", "how have you been"]
};

const AIChatUI = () => {
  const [messages, setMessages] = useState([
    { text: 'Hi! How can I help you today?', sender: 'bot', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponse = (message: string): string => {
    const lowerCaseMessage = message.toLowerCase();
    for (const key in buzzwords) {
      if (buzzwords[key].some(buzzword => lowerCaseMessage.includes(buzzword))) {
        return predefinedResponses[key];
      }
    }
    return "I can only provide information about Sankritya Thakur...";
  };

  const handleSend = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();

    if (input.trim()) {
      const userMessage = { text: input, sender: 'user', timestamp: new Date() };
      setMessages([...messages, userMessage]);
      setInput('');

      setIsTyping(true);
      setTimeout(() => {
        const botResponse = { text: getResponse(input), sender: 'bot', timestamp: new Date() };
        setMessages(prevMessages => [...prevMessages, botResponse]);
        setIsTyping(false);
      }, 1000);
    }
  };

  return (
    <div
      className="w-full max-w-3xl h-[70vh] bg-gradient-to-br from-gray-900 to-blue-800 flex flex-col justify-between p-6 rounded-2xl mx-auto overflow-hidden shadow-xl"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      {/* Messages */}
      <motion.div
        className="flex-1 overflow-y-auto pr-2 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            className={`flex items-end mb-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {msg.sender === 'bot' && (
              <Image src="/memoji2.png" alt="AI Icon" width={40} height={40} className="rounded-full" />
            )}
            <p
              className={`max-w-[70%] px-4 py-2 rounded-lg m-2 text-sm ${
                msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
              }`}
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: '1rem',
              }}
            >
              {msg.text}
            </p>
            {msg.sender === 'user' && (
              <Image src="/user-icon.png" alt="User Icon" width={40} height={40} className="rounded-full" />
            )}
          </motion.div>
        ))}
        {isTyping && (
          <motion.div
            className="flex items-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex space-x-2">
              <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </motion.div>

      {/* Suggested Responses */}
      <motion.div
        className="flex flex-wrap gap-2 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {Object.keys(predefinedResponses).map((key, index) => (
          <motion.button
            key={index}
            onClick={() => setInput(key)}
            className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-600 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              fontFamily: "'Nunito', sans-serif",
            }}
          >
            {key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}
          </motion.button>
        ))}
      </motion.div>

      {/* Input Bar */}
      <motion.form
        className="flex items-center p-2 border-t border-gray-700"
        onSubmit={handleSend}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded-full bg-gray-800 text-white border-none outline-none"
          whileFocus={{ scale: 1.02 }}
          style={{
            fontFamily: "'Nunito', sans-serif",
          }}
        />
        <motion.button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded-full ml-2 hover:bg-blue-600 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          Send
        </motion.button>
      </motion.form>
    </div>
  );
};
  
  export default AIChatUI;  