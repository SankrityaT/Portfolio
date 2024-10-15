'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';
import Image from 'next/image';

type Inputs = {
  fullName: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true);
    try {
      await emailjs.send(
        'service_katxnpl',
        'template_hd5kdxd',
        {
          user_name: data.fullName,
          user_email: data.email,
          message: data.message,
        },
        'ANwnJms1t2WiSmQ0P'
      );
      
      toast({
        title: "Message sent!",
        description: "Thank you for your message. We'll get back to you soon.",
        variant: "default", 
      });
      

      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto p-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl shadow-xl flex flex-col md:flex-row items-center"
      style={{
        fontFamily: "'Nunito', sans-serif",  // Applying Nunito font
      }}
    >
      {/* Contact Form Section */}
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-3xl font-bold mb-6 text-center md:text-left text-white">Get in Touch</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-white mb-2">
              Full Name
            </label>
            <Input
              id="fullName"
              {...register('fullName', { required: 'Full name is required' })}
              className={`w-full px-4 py-2 border rounded-md transition duration-300 ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400 text-white`}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className={`w-full px-4 py-2 border rounded-md transition duration-300 ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400 text-white`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
              Message
            </label>
            <Textarea
              id="message"
              {...register('message', { required: 'Message is required' })}
              className={`w-full px-4 py-2 border rounded-md transition duration-300 ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400 text-white`}
              rows={5}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition duration-300 transform hover:-translate-y-1"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </div>

      {/* Divider Line for Separation */}
      <div className="hidden md:block w-px bg-gray-400 h-96 mx-4"></div>

      {/* Illustration Image Section */}
      <div className="w-full md:w-1/2 p-4 flex justify-center">
      <Image
  src="/illus.png"
  alt="Contact Illustration"
  width={400}
  height={400}
  className="shadow-lg border-4 border-transparent ring-4 ring-blue-500"
/>


      </div>
    </motion.div>
  );
}
