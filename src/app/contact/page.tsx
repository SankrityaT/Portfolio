'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiMapPin } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import emailjs from '@emailjs/browser';

const socialLinks = [
  {
    name: 'GitHub',
    icon: FiGithub,
    url: 'https://github.com/SankrityaT',
  },
  {
    name: 'LinkedIn',
    icon: FiLinkedin,
    url: 'https://linkedin.com/in/sankrityat',
  }
];

const contactInfo = [
  {
    icon: FiMail,
    text: 'sthaku20@asu.edu',
    href: 'mailto:sthaku20@asu.edu',
  },
  {
    icon: FiMapPin,
    text: 'Phoenix, Arizona',
  },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init(process.env.NEXT_PUBLIC_PUBLIC_KEY || '');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Sankritya',
      };

      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_TEMPLATE_ID || '',
        templateParams
      );

      if (response.status === 200) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error: any) {
      console.error('Contact form error:', error);
      toast.error(error?.text || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      id="contact"
      className="max-w-5xl mx-auto p-8 bg-white/10 backdrop-blur-md rounded-2xl"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 font-nunito">Get in Touch</h2>
        <p className="text-gray-300 max-w-2xl mx-auto font-nunito">
          Have a question or want to work together? Feel free to reach out!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors text-white placeholder-gray-400"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors text-white placeholder-gray-400"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors text-white placeholder-gray-400"
                placeholder="Your message..."
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium transition-all duration-200 transform hover:translate-y-[-2px] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                isSubmitting ? 'animate-pulse' : ''
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold mb-4 font-nunito">Contact Information</h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-white/10">
                    <info.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-gray-300 hover:text-purple-400 transition-colors"
                    >
                      {info.text}
                    </a>
                  ) : (
                    <span className="text-gray-300">{info.text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 font-nunito">Connect With Me</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors group"
                >
                  <link.icon className="w-5 h-5 text-white group-hover:text-purple-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
