import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Mail, 
  MapPin, 
  Linkedin, 
  Github, 
  Send
} from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Use hardcoded values for now to ensure it works
      const serviceId = 'service_96vcwn1';
      const templateId = 'template_2a9drb7';
      const publicKey = 'AJH9lTR28X2cI5Lre'; 
      
      // Make sure EmailJS is initialized
      if (!emailjs.init) {
        emailjs.init(publicKey);
      }
      
      console.log('Sending email with EmailJS...');
      console.log('Service ID:', serviceId);
      console.log('Template ID:', templateId);
      
      // Send the email directly with parameters instead of using form
      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          reply_to: formData.email,
          subject: formData.subject,
          message: formData.message
        },
        publicKey
      );

      // Reset form on success
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setSubmitStatus('success');

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="contact" className="py-12 md:py-16 bg-background-light relative">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-40 pointer-events-none overflow-hidden">
        <div className="w-48 h-48 rounded-full bg-green-500 opacity-10 blur-3xl absolute -top-24 -left-12"></div>
        <div className="w-48 h-48 rounded-full bg-pink-500 opacity-10 blur-3xl absolute -top-24 -right-12"></div>
      </div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Get In <span className="text-green-400">Touch</span></h2>
          <p className="text-neutral-300 max-w-2xl mx-auto text-sm md:text-base">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="bg-gray-900/50 p-6 rounded-lg">
            <h3 className="text-lg md:text-xl font-semibold mb-4">Contact Information</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start">
                <div className="p-2 bg-gray-800 rounded-full mr-3">
                  <Mail className="h-4 w-4 md:h-5 md:w-5 text-green-400" />
                </div>
                <div>
                  <h4 className="text-sm md:text-base font-medium mb-0.5">Email</h4>
                  <a href="mailto:aminafreenm20@gmail.com" className="text-xs md:text-sm text-neutral-300 hover:text-green-400 transition-colors duration-300">
                    aminafreenm20@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-2 bg-gray-800 rounded-full mr-3">
                  <MapPin className="h-4 w-4 md:h-5 md:w-5 text-green-400" />
                </div>
                <div>
                  <h4 className="text-sm md:text-base font-medium mb-0.5">Location</h4>
                  <p className="text-xs md:text-sm text-neutral-300">
                    Chennai, India
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm md:text-base font-medium mb-2">Connect With Me</h4>
              <div className="flex space-x-3">
                <a 
                  href="https://www.linkedin.com/in/amina-afreen-m/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-full text-neutral-400 hover:text-green-400 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
                </a>
                <a 
                  href="https://github.com/Amina-Afreen-M" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-full text-neutral-400 hover:text-green-400 transition-all duration-300"
                  aria-label="Github"
                >
                  <Github className="h-4 w-4 md:h-5 md:w-5" />
                </a>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div variants={itemVariants} className="bg-gray-900/50 p-6 rounded-lg">
            <h3 className="text-lg md:text-xl font-semibold mb-4">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-neutral-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-neutral-300 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-xs font-medium text-neutral-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  placeholder="Project Inquiry"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-xs font-medium text-neutral-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 resize-none"
                  placeholder="Hello, I'd like to discuss a project..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md flex justify-center items-center transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <span className="text-sm">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <Send className={`h-4 w-4 ml-2 ${isSubmitting ? 'animate-pulse' : ''}`} />
              </button>

              {submitStatus === 'success' && (
                <div className="mt-3 p-2 bg-green-500/20 border border-green-500/50 rounded-md text-green-400 text-xs">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mt-3 p-2 bg-red-500/20 border border-red-500/50 rounded-md text-red-400 text-xs">
                  Failed to send message. Please try again later.
                </div>
              )}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;