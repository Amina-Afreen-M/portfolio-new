import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FileText, ChevronRight, ChevronLeft, Users, Lightbulb, LayoutGrid } from 'lucide-react';

interface CaseStudy {
  id: number;
  title: string;
  context: string;
  problem: string;
  solution: string;
  image: string;
}

const CaseStudies: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  // Create a ref for the carousel container
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const [expandedSolutions, setExpandedSolutions] = useState<Record<number, boolean>>({});
  
  const toggleSolution = (id: number) => {
    setExpandedSolutions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const caseStudies: CaseStudy[] = [
    {
      id: 1,
      title: "AccessNow – Accessible Navigation Web App",
      context: "Individuals with disabilities encounter significant friction navigating public spaces due to the lack of inclusive design and assistive interaction modes in mainstream mapping applications.",
      problem: "Conventional navigation tools neglect inclusive interaction models and omit critical accessibility metadata, impeding independent mobility for users with physical impairments.",
      solution: "Along with my team,developed an inclusive navigation system integrating OpenStreetMap with assistive features like voice-controlled search and step-by-step auditory guidance.The interface surfaces real-time contextual cards for nearby places, showcasing dynamic content (images, ratings, accessibility indicators) using responsive design principles. Applied accessibility affordances via standardized icons, an onboarding flow to guide new users, and user preference settings (e.g., accessibility filters). The A* algorithm computes optimal accessible paths, and usability testing ensured alignment with accessibility heuristics and real-world behavior.",
      image: "https://images.unsplash.com/photo-1586449480537-3a22cf98b04c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z29vZ2xlJTIwbWFwfGVufDB8MHwwfHx8MA%3D%3D"
    },
    {
      id: 2,
      title: "COPD Care Companion App",
      context: "COPD patients require consistent symptom tracking, medication adherence, and lifestyle adjustments. However, existing tools lack personalization, real-time insights, and user-friendly interfaces for chronic disease self-management.",
      problem: "Patients face cognitive overload from managing multiple medications, symptoms, and clinical visits. The absence of proactive alerts, intuitive interfaces, and integrated data leads to missed interventions and deteriorating health outcomes.",
      solution: "Along with my team, I designed a mobile-first COPD management app focusing on simplicity, clarity, and accessibility. We analyzed common COPD patient needs through secondary research and aligned our design to support daily symptom tracking, medication reminders, and health trend monitoring. We prioritized a calm and reassuring interface, using large touch targets, voice support, and minimal screens to reduce cognitive load for elderly users. Through iterative prototyping and usability testing, we refined the experience to ensure it was intuitive, supportive, and empowering for long-term self-care.",
      image: "https://images.unsplash.com/photo-1603539947678-cd3954ed515d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 3,
      title: "OZON – Ecommerce App UX Audit & Redesign",
      context: "Users faced drop-offs and task failures during the shopping journey due to inconsistent UI patterns, inefficient task flows, and limited personalization.",
      problem: "Poor information architecture, redundant sign-up flows, and unscalable product layouts disrupted the shopping user journey, causing low engagement and conversion.",
      solution: "Redesigned core user flows with simplified navigation, personalized recommendations, and streamlined checkout process. Implemented consistent design patterns, improved information hierarchy, and enhanced product discovery features. The redesign resulted in a 35% increase in user engagement and a 22% improvement in conversion rates.",
      image: "/projects/E-commerce Web Design/1.jpg"
    }
  ];

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
    <section id="case-studies" className="section bg-background-light">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="mb-4">Case <span className="glow-text-pink">Studies</span></h2>
          <p className="text-neutral-300 max-w-2xl mx-auto">
            Deep dive into selected projects to understand my design process, 
            challenges faced, and solutions delivered.
          </p>
        </motion.div>

        {/* Horizontally scrollable carousel */}
        <div className="relative">
          <motion.div
            ref={(el) => {
              // @ts-ignore - This is a valid assignment
              carouselRef.current = el;
              ref(el);
            }}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: 'none' }}
          >
            {caseStudies.map((study) => (
              <motion.div 
                key={study.id}
                variants={itemVariants}
                // Make card slightly narrower on smallest screens, full width on sm and up
                className="flex-shrink-0 w-[90%] sm:w-full snap-center mx-2 sm:mx-4 first:ml-0 last:mr-0"
              >
                <div className="bg-background-lighter rounded-lg overflow-hidden shadow-lg h-full border border-neutral-800 hover:border-neon-pink transition-colors duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
                    {/* Adjust image height for different screen sizes */}
                    <div className="relative h-64 sm:h-80 lg:h-auto overflow-hidden lg:col-span-1">
                      <img 
                        src={study.image} 
                        alt={study.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background-lighter via-transparent to-transparent opacity-70"></div>
                    </div>
                    
                    {/* Adjust padding for different screen sizes */}
                    <div className="p-4 sm:p-6 lg:p-8 flex flex-col lg:col-span-2">
                      <div className="flex items-center mb-3 sm:mb-4">
                        <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-neon-pink mr-2" />
                        {/* Adjust title font size */}
                        <h4 className="text-lg sm:text-xl font-semibold">{study.title}</h4>
                      </div>
                      
                      <div className="space-y-3 sm:space-y-4 flex-grow">
                        <div>
                          {/* Adjust heading font size */}
                          <h5 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 flex items-center">
                            <div className="p-1 mr-2 bg-background-lighter rounded-full border-2 border-neon-pink shadow-neon-pink inline-flex">
                              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-neon-pink" />
                            </div>
                            Context
                          </h5>
                          {/* Adjust paragraph font size */}
                          <p className="text-neutral-300 text-xs sm:text-sm">{study.context}</p>
                        </div>
                        
                        <div>
                          {/* Adjust heading font size */}
                          <h5 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 flex items-center">
                            <div className="p-1 mr-2 bg-background-lighter rounded-full border-2 border-neon-pink shadow-neon-pink inline-flex">
                              <Lightbulb className="h-3 w-3 sm:h-4 sm:w-4 text-neon-pink" />
                            </div>
                            Problem
                          </h5>
                          {/* Adjust paragraph font size */}
                          <p className="text-neutral-300 text-xs sm:text-sm">{study.problem}</p>
                        </div>
                        
                        <div>
                          {/* Adjust heading font size */}
                          <h5 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 flex items-center">
                            <div className="p-1 mr-2 bg-background-lighter rounded-full border-2 border-neon-green shadow-neon-green inline-flex">
                              <LayoutGrid className="h-3 w-3 sm:h-4 sm:w-4 text-neon-green" />
                            </div>
                            UX Case Study Solution
                          </h5>
                          {study.solution.length > 150 ? (
                            <div>
                              {/* Adjust paragraph font size */}
                              <p className="text-neutral-300 text-xs sm:text-sm">
                                {expandedSolutions[study.id] ? study.solution : `${study.solution.substring(0, 150)}...`}
                              </p>
                              <button 
                                onClick={() => toggleSolution(study.id)}
                                className="text-neon-green text-xs mt-2 hover:underline focus:outline-none"
                              >
                                {expandedSolutions[study.id] ? 'View Less' : 'View More'}
                              </button>
                            </div>
                          ) : (
                            /* Adjust paragraph font size */
                            <p className="text-neutral-300 text-xs sm:text-sm">{study.solution}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Navigation Arrows - Positioned relative to the Case Studies section */}
          <button
            onClick={() => {
              if (carouselRef.current) {
                const scrollAmount = window.innerWidth <= 640 ? carouselRef.current.clientWidth * 0.8 : carouselRef.current.clientWidth;
                carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
              }
            }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-2 sm:p-3 rounded-full text-white hover:text-neon-pink border border-neutral-700 transition-all duration-300 shadow-lg hover:bg-background/90 z-10"
            aria-label="Previous case study"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <button
            onClick={() => {
              if (carouselRef.current) {
                const scrollAmount = window.innerWidth <= 640 ? carouselRef.current.clientWidth * 0.8 : carouselRef.current.clientWidth;
                carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
              }
            }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-2 sm:p-3 rounded-full text-white hover:text-neon-pink border border-neutral-700 transition-all duration-300 shadow-lg hover:bg-background/90 z-10"
            aria-label="Next case study"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          
          {/* Scroll indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {caseStudies.map((_, index) => {
              // Determine which card is most in view
              let active = false;
              if (carouselRef.current) {
                const scrollLeft = carouselRef.current.scrollLeft;
                const cardWidth = carouselRef.current.scrollWidth / caseStudies.length;
                const activeIndex = Math.round(scrollLeft / cardWidth);
                active = index === activeIndex;
              } else {
                active = index === 0;
              }
              return (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${active ? 'w-8 bg-neon-pink' : 'w-2 bg-neutral-700'}`}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;