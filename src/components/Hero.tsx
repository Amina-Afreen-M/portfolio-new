import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';

const Hero: React.FC = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const roles = ["Visual Storyteller", "A Developer in Progress","Problem Solver", "Exploring the World of AI"];

  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: i * 0.05,
        duration: 0.5
      }
    })
  };

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-20">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "grab",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 140,
                lineLinked: {
                  opacity: 0.5,
                  color: "#00FF94"
                }
              }
            },
          },
          particles: {
            color: {
              value: ["#00FF94", "#FF00F5"],
            },
            links: {
              color: "#00FF94",
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 60,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 -z-10"
      />
      
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="mb-6">
            <motion.span 
              className="block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Hello, I'm
            </motion.span>
            
            <motion.span 
              className="glow-text-green"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {roles[currentTextIndex]}
            </motion.span>
          </h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-neutral-300 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            I’m on a journey growing into design, data, & dev  — building skills to create smarter, meaningful digital experiences.

          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <Link 
              to="projects" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={500}
              className="btn btn-primary"
            >
              View Projects
            </Link>
            
            <Link 
              to="contact" 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={500}
              className="btn btn-outline"
            >
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 1.2, 
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 0.5
          }}
        >
          <Link 
            to="about" 
            spy={true} 
            smooth={true} 
            offset={-70} 
            duration={500}
            className="text-white flex flex-col items-center cursor-pointer"
          >
            <span className="text-sm mb-2">Scroll Down</span>
            <ArrowDown className="h-5 w-5 animate-bounce" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;