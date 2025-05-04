import React, { useState, useEffect } from 'react';
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

const Contact: React.FC = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    try {
      emailjs.init(process.env.VITE_EMAILJS_PUBLIC_KEY || 'AJH9lTR28X2cI5Lre');
    } catch (error) {
      console.error('Failed to initialize EmailJS:', error);
      setSubmitStatus('error');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Send email using emailjs
      await emailjs.send(
        process.env.VITE_EMAILJS_SERVICE_ID || 'service_pczntgr',
        process.env.VITE_EMAILJS_TEMPLATE_ID || 'template_cubxa37',
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }
      );

      // Reset form
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
      setSubmitStatus('error');
      console.error('Form submission error:', error);
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
    <section id="contact" className="section bg-background-light relative">
      <div className="absolute top-0 left-0 w-full h-40 pointer-events-none overflow-hidden">
        <div className="w-96 h-96 rounded-full bg-neon-green opacity-10 blur-3xl absolute -top-64 -left-20"></div>
        <div className="w-96 h-96 rounded-full bg-neon-pink opacity-10 blur-3xl absolute -top-64 -right-20"></div>
      </div>
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="mb-4">Get In <span className="glow-text-pink">Touch</span></h2>
          <p className="text-neutral-300 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold mb-8">Contact Information</h3>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start">
                <div className="p-3 bg-background rounded-full mr-4">
                  <Mail className="h-5 w-5 text-neon-green" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Email</h4>
                  <a href="mailto:aminafreenm20@gmail.com" className="text-neutral-300 hover:text-neon-green transition-colors duration-300">
                    aminafreenm20@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-3 bg-background rounded-full mr-4">
                  <MapPin className="h-5 w-5 text-neon-green" />
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-1">Location</h4>
                  <p className="text-neutral-300">
                    Chennai, India
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-10">
              <h4 className="text-lg font-medium mb-4">Connect With Me</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/in/amina-afreen-m/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-background rounded-full text-neutral-400 hover:text-neon-green hover:shadow-neon-green transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="https://github.com/Amina-Afreen-M" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-background rounded-full text-neutral-400 hover:text-neon-green hover:shadow-neon-green transition-all duration-300"
                  aria-label="Github"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
            
           
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold mb-8">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="Project Inquiry"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="input-field resize-none"
                  placeholder="Hello, I'd like to discuss a project..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn btn-primary w-full flex justify-center items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <Send className={`h-4 w-4 ml-2 ${isSubmitting ? 'animate-pulse' : ''}`} />
              </button>

              {submitStatus === 'success' && (
                <div className="mt-4 p-3 bg-green-500/20 border border-green-500/50 rounded-md text-green-400 text-sm">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-md text-red-400 text-sm">
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