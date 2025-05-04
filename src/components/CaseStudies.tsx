import React from 'react';
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

  const caseStudies: CaseStudy[] = [
    {
      id: 1,
      title: "AccessNow – Accessible Navigation Web App",
      context: "Individuals with disabilities encounter significant friction navigating public spaces due to the lack of inclusive design and assistive interaction modes in mainstream mapping applications.",
      problem: "Conventional navigation tools neglect inclusive interaction models and omit critical accessibility metadata, impeding independent mobility for users with physical impairments.",
      solution: "Developed an inclusive navigation system integrating OpenStreetMap with assistive features like voice-controlled search and step-by-step auditory guidance. The interface surfaces real-time contextual cards for nearby places, showcasing dynamic content (images, ratings, accessibility indicators) using responsive design principles. Applied accessibility affordances via standardized icons, an onboarding flow to guide new users, and user preference settings (e.g., accessibility filters). The A* algorithm computes optimal accessible paths, and usability testing ensured alignment with accessibility heuristics and real-world behavior.",
      image: "https://images.unsplash.com/photo-1586449480537-3a22cf98b04c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z29vZ2xlJTIwbWFwfGVufDB8MHwwfHx8MA%3D%3D"
    },
    {
      id: 2,
      title: "Financial Message Converter Interface",
      context: "Legacy financial systems require a seamless transition from MT202 to ISO 20022 standards, yet current workflows lack real-time feedback and intuitive control for message transformation.",
      problem: "The manual conversion and monitoring process creates cognitive load, error-prone workflows, and operational inefficiencies, failing to support user mental models and decision support.",
      solution: "Designed a real-time, rule-based transformation dashboard optimized for rapid comprehension and minimal friction. Applied interaction design principles to surface validation feedback inline, using visual hierarchy and status indicators. Introduced progressive onboarding, customizable widgets, and consistent error prevention affordances with contextual prompts. The dashboard prioritizes information architecture clarity, enabling operations teams to interact confidently with complex data in a scalable system.",
      image: "/src/assets/projects/Message Converter/img4.jpg"
    },
    {
      id: 3,
      title: "OZON – Ecommerce App UX Audit & Redesign",
      context: "Users faced drop-offs and task failures during the shopping journey due to inconsistent UI patterns, inefficient task flows, and limited personalization.",
      problem: "Poor information architecture, redundant sign-up flows, and unscalable product layouts disrupted the shopping user journey, causing low engagement and conversion.",
      solution: "Redesigned core user flows with simplified navigation, personalized recommendations, and streamlined checkout process. Implemented consistent design patterns, improved information hierarchy, and enhanced product discovery features. The redesign resulted in a 35% increase in user engagement and a 22% improvement in conversion rates.",
      image: "/src/assets/projects/E-commerce Web Design/E-commerce web_page-0001.jpg"
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
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex overflow-x-auto hide-scrollbar pb-8 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none' }}
          >
            {caseStudies.map((study) => (
              <motion.div 
                key={study.id}
                variants={itemVariants}
                className="flex-shrink-0 w-full snap-center mx-4 first:ml-0 last:mr-0"
              >
                <div className="bg-background-lighter rounded-lg overflow-hidden shadow-lg h-full border border-neutral-800 hover:border-neon-pink transition-colors duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
                    <div className="relative h-96 lg:h-auto overflow-hidden lg:col-span-1">
                      <img 
                        src={study.image} 
                        alt={study.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background-lighter via-transparent to-transparent opacity-70"></div>
                    </div>
                    
                    <div className="p-6 lg:p-8 flex flex-col lg:col-span-2">
                      <div className="flex items-center mb-4">
                        <FileText className="h-5 w-5 text-neon-pink mr-2" />
                        <h4 className="text-xl font-semibold">{study.title}</h4>
                      </div>
                      
                      <div className="space-y-4 flex-grow">
                        <div>
                          <h5 className="text-lg font-semibold mb-2 flex items-center">
                            <div className="p-1 mr-2 bg-background-lighter rounded-full border-2 border-neon-pink shadow-neon-pink inline-flex">
                              <Users className="h-4 w-4 text-neon-pink" />
                            </div>
                            Context
                          </h5>
                          <p className="text-neutral-300 text-sm">{study.context}</p>
                        </div>
                        
                        <div>
                          <h5 className="text-lg font-semibold mb-2 flex items-center">
                            <div className="p-1 mr-2 bg-background-lighter rounded-full border-2 border-neon-pink shadow-neon-pink inline-flex">
                              <Lightbulb className="h-4 w-4 text-neon-pink" />
                            </div>
                            Problem
                          </h5>
                          <p className="text-neutral-300 text-sm">{study.problem}</p>
                        </div>
                        
                        <div>
                          <h5 className="text-lg font-semibold mb-2 flex items-center">
                            <div className="p-1 mr-2 bg-background-lighter rounded-full border-2 border-neon-green shadow-neon-green inline-flex">
                              <LayoutGrid className="h-4 w-4 text-neon-green" />
                            </div>
                            UX Case Study Solution
                          </h5>
                          <p className="text-neutral-300 text-sm">{study.solution}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Navigation Arrows */}
          <button
            onClick={() => {
              const container = document.querySelector('.snap-x');
              if (container) {
                container.scrollBy({ left: -container.clientWidth, behavior: 'smooth' });
              }
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background bg-opacity-70 p-3 rounded-full text-white hover:bg-neon-pink hover:bg-opacity-80 transition-colors z-10"
            aria-label="Previous case study"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => {
              const container = document.querySelector('.snap-x');
              if (container) {
                container.scrollBy({ left: container.clientWidth, behavior: 'smooth' });
              }
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background bg-opacity-70 p-3 rounded-full text-white hover:bg-neon-pink hover:bg-opacity-80 transition-colors z-10"
            aria-label="Next case study"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          {/* Scroll indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {caseStudies.map((_, index) => (
              <div 
                key={index} 
                className={`h-2 rounded-full transition-all duration-300 ${index === 0 ? 'w-8 bg-neon-pink' : 'w-2 bg-neutral-700'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;