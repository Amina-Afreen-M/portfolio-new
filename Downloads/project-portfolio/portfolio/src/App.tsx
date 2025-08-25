import React, { useState, useRef, useEffect } from 'react';
import { Element } from 'react-scroll';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import CaseStudies from './components/CaseStudies';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

function App() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative">
      <CustomCursor cursorPosition={cursorPosition} />
      <Navbar />
      
      <main>
        <Element name="home">
          <Hero />
        </Element>
        
        <Element name="about">
          <About />
        </Element>
        
        <Element name="projects">
          <Projects />
        </Element>
        
        <Element name="case-studies">
          <CaseStudies />
        </Element>
        
        <Element name="skills">
          <Skills />
        </Element>
        
        <Element name="contact">
          <Contact />
        </Element>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;