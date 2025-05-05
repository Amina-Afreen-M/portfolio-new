import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

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
    <section id="about" className="section bg-background-light">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <motion.div 
            variants={itemVariants}
            className="order-2 md:order-1"
          >
            <h2 className="mb-6">About <span className="glow-text-pink">Me</span></h2>
            
            <motion.div 
              variants={containerVariants}
              className="space-y-4 text-neutral-300"
            >
              <motion.p variants={itemVariants} className="text-xs sm:text-sm md:text-base">
              🌟Hey there! I'm Amina Afreen👋🏻
              </motion.p>

              <motion.p variants={itemVariants} className="text-xs sm:text-sm md:text-base">
  — a Computer Science Grad!
</motion.p>

<motion.p variants={itemVariants} className="text-xs sm:text-sm md:text-base">
  During my time as a <span className="glow-text-pink font-semibold">UX Design</span> intern at Brainvault Technologies, I tackled real-world product challenges using tools like <span className="glow-text-green font-semibold">Figma</span> and <span className="glow-text-pink font-semibold">Canva</span>, learning to think deeply about users, structure, and clarity.
</motion.p>

<motion.p variants={itemVariants} className="text-xs sm:text-sm md:text-base">
  But my curiosity didn't stop at the interface. I've been actively learning about how intelligent systems work behind the scenes — exploring <span className="glow-text-green font-semibold">data analysis</span>, <span className="glow-text-pink font-semibold">machine learning models</span>, <span className="glow-text-green font-semibold">Java</span>, and how <span className="glow-text-green font-semibold">AI</span> can enhance user experiences.
</motion.p>

<motion.p variants={itemVariants} className="text-xs sm:text-sm md:text-base">
  
    I'm excited to grow in roles where <span className="glow-text-green font-semibold">data</span> meets<span className="glow-text-pink font-semibold"> design</span>  — and where I can help shape technology that truly understands and supports people.
</motion.p>
<motion.p variants={itemVariants} className="text-xs sm:text-sm md:text-base">
  <span style={{  fontStyle: 'italic' }}>
  Let's team up and build something that feels just right — smart, seamless, and truly user-first.
  </span>
</motion.p>

              
              
             
            </motion.div>
          </motion.div>
          
          <motion.div 
  variants={itemVariants}
  className="order-1 md:order-2 flex justify-center"
>
  <div className="relative w-36 h-36 sm:w-56 sm:h-56 md:w-80 md:h-80 rounded-full overflow-hidden">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 rounded-full neon-border neon-border-green overflow-hidden"
    >
      <img 
        src="/profile.jpeg"
        alt="Professional headshot" 
        className="w-full h-full object-cover rounded-full"
      />
    </motion.div>
    <motion.div
      initial={{ width: '0%' }}
      animate={{ width: '100%' }}
      transition={{ duration: 1, ease: 'easeInOut', delay: 0.5 }}
      className="absolute bottom-0 left-0 h-1 bg-neon-green"
    ></motion.div>
  </div>
</motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default About;