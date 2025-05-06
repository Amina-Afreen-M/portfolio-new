import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Layers, Layout, Code, Database } from 'lucide-react';
import ProjectModal from './ProjectModal';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  tools: string[];
  images?: string[];
  folder?: string;
  githubLink?: string;
}

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [activeFilter, setActiveFilter] = useState('data');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [visibleProjects, setVisibleProjects] = useState(2);

  // Define projects array first
  const projects: Project[] = [
    // UX Projects
    {
      id: 1,
      title: "E-commerce Web Design",
      category: "ux",
      description: "A comprehensive e-commerce website design with a focus on user experience and conversion optimization.",
      thumbnail: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      tools: ["Figma", "Web Design", "User-Centered Design"],
      folder: "E-commerce Web Design",
      images: [
        "./projects/E-commerce Web Design/1.jpg",
        "./projects/E-commerce Web Design/3.jpg",
        "./projects/E-commerce Web Design/4.jpg",
        "./projects/E-commerce Web Design/5.jpg",
        "./projects/E-commerce Web Design/6.jpg",
        "./projects/E-commerce Web Design/7.jpg",
        "./projects/E-commerce Web Design/8.jpg",
        "./projects/E-commerce Web Design/9.jpg",
        "./projects/E-commerce Web Design/10.jpg",
        "./projects/E-commerce Web Design/Products page.jpg",
        "./projects/E-commerce Web Design/Products page-1.jpg"
      ]
    },
    {
      id: 2,
      title: "AI Travel Planner",
      category: "ux",
      description: "An AI-powered travel planning app that creates personalized itineraries based on user preferences.",
      thumbnail: "https://images.unsplash.com/photo-1650884229262-130712cc13c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRyYXZlbCUyMHBsYW5uZXIlMjBhcHB8ZW58MHx8MHx8fDA%3D",
      tools: ["Figma", "Concept Design", "Miro"],
      folder: "Ai Travel Planner",
      images: [
        "./projects/Ai Travel Planner/img4.jpg",
        "./projects/Ai Travel Planner/img7.jpg",
        "./projects/Ai Travel Planner/img10.jpg",
        "./projects/Ai Travel Planner/img13.jpg",
        "./projects/Ai Travel Planner/img16.jpg",
        "./projects/Ai Travel Planner/img19.jpg",
        "./projects/Ai Travel Planner/img22.jpg"
      ]
    },
    {
      id: 3,
      title: "Internal Attendance Web-app",
      category: "ux",
      description: "An internal attendance tracking web application designed for corporate environments.",
      thumbnail: "https://plus.unsplash.com/premium_photo-1661497478048-47a247328fd7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGF0dGVuZGFuY2V8ZW58MHx8MHx8fDA%3D",
      tools: ["Figma", "Web Design", "Material UI"],
      folder: "Internal Attendance Web-app",
      images: [
        "./projects/Internal Attendance Web-app/img4.jpg",
        "./projects/Internal Attendance Web-app/img7.jpg",
        "./projects/Internal Attendance Web-app/img10.jpg",
        "./projects/Internal Attendance Web-app/img13.jpg",
        "./projects/Internal Attendance Web-app/img16.jpg",
        "./projects/Internal Attendance Web-app/img19.jpg",
        "./projects/Internal Attendance Web-app/img22.jpg",
        "./projects/Internal Attendance Web-app/img25.jpg"
      ]
    },
    {
      id: 4,
      title: "Language Learning App",
      category: "ux",
      description: "An innovative language learning application designed to make language acquisition engaging and effective.",
      thumbnail: "https://images.unsplash.com/photo-1489945052260-4f21c52268b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGxhbmd1YWdlJTIwbGVhcm5pbmd8ZW58MHwwfDB8fHww",
      tools: ["Figma", "User Research", "Interaction Design", "Prototyping"],
      folder: "Language Learning App",
      images: [
        "./projects/Learning App/iPhone 14 Pro Max - 1.png",
        "./projects/Learning App/iPhone 14 Pro Max - 10.png",
        "./projects/Learning App/iPhone 14 Pro Max - 2.png",
        "./projects/Learning App/iPhone 14 Pro Max - 5.png",
        "./projects/Learning App/iPhone 14 Pro Max - 3.png",
        "./projects/Learning App/iPhone 14 Pro Max - 9.png",
        "./projects/Learning App/iPhone 14 Pro Max - 7.png"
      ]
    },
    {
      id: 5,
      title: "Entertainment App",
      category: "ux",
      description: "A mobile entertainment app design with intuitive navigation and personalized content recommendations.",
      thumbnail: "https://images.unsplash.com/photo-1619462729239-ca28ab216892?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tools: ["Figma", "Mobile App","User Flows"],
      folder: "Entertainment app",
      images: [
        "./projects/Entertainment app/img4.jpg",
        "./projects/Entertainment app/img7.jpg",
        "./projects/Entertainment app/img10.jpg",
        "./projects/Entertainment app/img13.jpg",
        "./projects/Entertainment app/img16.jpg",
        "./projects/Entertainment app/img19.jpg",
        "./projects/Entertainment app/img22.jpg"
      ]
    },
    {
      id: 6,
      title: "Message Converter Interface",
      category: "ux",
      description: "A financial message converter interface designed for efficient transformation of financial data formats.",
      thumbnail: "https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      tools: ["Figma", "Wireframing", "Technical Constraints","Material UI"],
      folder: "Message Converter",
      images: [
        "./projects/Message Converter/img4.jpg",
        "./projects/Message Converter/img7.jpg",
        "./projects/Message Converter/img10.jpg",
        "./projects/Message Converter/img13.jpg",
        "./projects/Message Converter/img16.jpg",
        "./projects/Message Converter/img19.jpg",
        "./projects/Message Converter/img22.jpg"
      ]
    },
    {
      id: 7,
      title: "Charity App",
      category: "ux",
      description: "A charity donation app designed to simplify the giving process and increase donor engagement.",
      thumbnail: "https://plus.unsplash.com/premium_photo-1683140538884-07fb31428ca6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      tools: ["Figma", "Wireframing", "Prototyping"],
      folder: "Charity App",
      images: [
        "./projects/Charity App/img4.jpg",
        "./projects/Charity App/img7.jpg",
        "./projects/Charity App/img10.jpg"
      ]
    },
    
    // Backend Projects
    {
      id: 8,
      title: "SchedulEase – Smart Task Manager",
      category: "backend",
      description: "SchedulEase is a smart task management system designed to help users prioritize and manage tasks efficiently.",
      thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGFza3xlbnwwfDB8MHx8fDA%3D",
      tools: ["Java", "Spring Boot", "MySQL"],
      githubLink: "https://github.com/Amina-Afreen-M/SchedulEase-Task-manager"
    },
    {
      id: 9,
      title: "Employee Management System (EMS)",
      category: "backend",
      description: "A full-stack Employee Management System built with Spring Boot and React, featuring role-based access control.",
      thumbnail: "https://images.unsplash.com/photo-1700241956197-0b13f96fd69e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzQzfHxlbXBsb3llZSUyMG1hbmFnZW1lbnR8ZW58MHwwfDB8fHww",
      tools: ["Spring Boot", "React", "MySQL"],
      githubLink: "https://github.com/Amina-Afreen-M/Employee-Management-System-EMS"
    },
    
    // Data Projects
    {
      id: 10,
      title: "Weather Data Analysis",
      category: "data",
      description: "A beginner-friendly Exploratory Data Analysis (EDA) of historical weather data using Python.",
      thumbnail: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      tools: ["Python", "Pandas", "NumPy"],
      githubLink: "https://github.com/Amina-Afreen-M/Data-Analysis"
    },
    {
      id: 11,
      title: "Air Quality Analysis Dashboard",
      category: "data",
      description: "A comprehensive air quality analysis and forecasting system using time series methodologies.",
      thumbnail: "https://plus.unsplash.com/premium_photo-1673240845240-2fce9077a6e9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFpciUyMHF1YWxpdHl8ZW58MHwwfDB8fHww",
      tools: ["Python", "Pandas", "Scikit-learn", "Plotly"],
      githubLink: "https://github.com/Amina-Afreen-M/Time-Series-Analysis-AirQuality"
    },
    {
      id: 12,
      title: "COPD Patient Management App",
      category: "ux",
      description: "A healthcare application designed specifically for COPD patients to monitor and manage their condition.",
      thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      tools: ["Figma", "Healthcare UX", "Accessibility Design", "User Research"],
      folder: "COPD Management App",
      images: [
        "./projects/Medical App/Android Large - 2.png",
        "./projects/Medical App/Android Large - 3.png",
        "./projects/Medical App/Android Large - 4.png"
      ]
    }
  ];

  // Define filteredProjects before any useEffect hooks that use it
  const filteredProjects = projects.filter(project => project.category === activeFilter);
  
  // Update visible projects count based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1536) {
        setVisibleProjects(3);
      } else if (window.innerWidth >= 1024) {
        setVisibleProjects(2);
      } else if (window.innerWidth >= 768) {
        setVisibleProjects(2);
      } else {
        setVisibleProjects(1);
      }
    };

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Check if scrolling is needed
  const [isScrollable, setIsScrollable] = useState(false);
  
  useEffect(() => {
    const checkScrollable = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        setIsScrollable(container.scrollWidth > container.clientWidth);
      }
    };
    
    checkScrollable();
    // Add resize event listener to recheck when window size changes
    window.addEventListener('resize', checkScrollable);
    return () => window.removeEventListener('resize', checkScrollable);
  }, [filteredProjects, visibleProjects]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.clientWidth / visibleProjects;
      const scrollAmount = cardWidth;
      
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);
      
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      setScrollPosition(newPosition);
    }
  };
  
  // Function to open the modal with the selected project
  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  
  // Function to handle project view
  const handleViewProject = (project: Project) => {
    if (project.githubLink) {
      window.open(project.githubLink, '_blank');
    } else if (project.images && project.images.length > 0) {
      openProjectModal(project);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="projects" className="section py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Featured <span className="glow-text-green">Projects</span></h2>
          <p className="text-neutral-300 max-w-2xl mx-auto">
            A collection of my work showcasing my skills in data analysis, backend development, and UX design.
          </p>
        </motion.div>

        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="flex gap-1.5 sm:gap-4 overflow-x-auto hide-scrollbar">
            <button 
              onClick={() => setActiveFilter('data')}
              className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-full transition-all duration-300 flex items-center text-xs sm:text-sm ${
                activeFilter === 'data' 
                  ? 'bg-neon-green text-background font-semibold' 
                  : 'bg-background-lighter text-neutral-300 hover:text-white'
              }`}
            >
              <Database className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Data Projects
            </button>
            <button 
              onClick={() => setActiveFilter('backend')}
              className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-full transition-all duration-300 flex items-center text-xs sm:text-sm ${
                activeFilter === 'backend' 
                  ? 'bg-neon-green text-background font-semibold' 
                  : 'bg-background-lighter text-neutral-300 hover:text-white'
              }`}
            >
              <Code className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Backend Projects
            </button>
            <button 
              onClick={() => setActiveFilter('ux')}
              className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-full transition-all duration-300 flex items-center text-xs sm:text-sm ${
                activeFilter === 'ux' 
                  ? 'bg-neon-green text-background font-semibold' 
                  : 'bg-background-lighter text-neutral-300 hover:text-white'
              }`}
            >
              <Layout className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              UX Projects
            </button>
          </div>
        </div>

        <div className="relative">
          {isScrollable && (
            <>
              <button 
                onClick={() => handleScroll('left')} 
                className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 p-3 bg-background/40 backdrop-blur-sm rounded-full text-white hover:text-neon-green transition-all duration-300 shadow-lg hover:bg-background/60 ${scrollPosition <= 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-80 hover:opacity-100'}`}
                disabled={scrollPosition <= 0}
                aria-label="Scroll left"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              
              <button 
                onClick={() => handleScroll('right')} 
                className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 p-3 bg-background/40 backdrop-blur-sm rounded-full text-white hover:text-neon-green transition-all duration-300 shadow-lg hover:bg-background/60 opacity-80 hover:opacity-100`}
                aria-label="Scroll right"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </>
          )}
          
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative overflow-hidden"
          >
            <div 
              ref={scrollContainerRef}
              className="flex gap-3 sm:gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-6 relative"
              onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
            >
              {filteredProjects.map((project) => (
                <motion.div 
                  key={project.id}
                  variants={itemVariants}
                  className="bg-background-lighter rounded-lg overflow-hidden group relative flex flex-col snap-start h-full min-w-[220px] w-[75vw] sm:w-[45vw] md:w-[40vw] lg:w-[calc(100%/var(--visible-projects,1))] flex-shrink-0"
                  style={{ '--visible-projects': visibleProjects } as React.CSSProperties}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.thumbnail} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-lighter via-transparent to-transparent opacity-60"></div>
                  </div>
                  
                  <div className="p-3 sm:p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2 line-clamp-1">{project.title}</h3>
                      <p className="text-neutral-400 mb-2 sm:mb-4 line-clamp-2 text-xs sm:text-sm">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-4">
                        {project.tools.slice(0, 3).map((tool, index) => (
                          <span 
                            key={index}
                            className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-background text-[10px] sm:text-xs text-neutral-300 rounded-full"
                          >
                            {tool}
                          </span>
                        ))}
                        {project.tools.length > 3 && 
                          <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-background text-[10px] sm:text-xs text-neutral-300 rounded-full">
                            +{project.tools.length - 3}
                          </span>
                        }
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2 sm:mt-4">
                      <span className="text-[10px] sm:text-xs text-neutral-400 capitalize">
                        {project.category === 'ux' ? 'UX Design' : 
                         project.category === 'backend' ? 'Backend' : 'Data'}
                      </span>
                      <button 
                        onClick={() => handleViewProject(project)}
                        className="flex items-center text-neon-green hover:text-white transition-colors duration-300 text-[10px] sm:text-xs md:text-sm"
                      >
                        <span className="mr-1">View Project</span>
                        <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 left-4 bg-neon-pink text-white text-xs font-bold px-3 py-1 rounded-full shadow-neon-pink">
                    {project.category === 'ux' ? (
                      <div className="flex items-center">
                        <Layout className="h-3 w-3 mr-1" />
                        <span>UX</span>
                      </div>
                    ) : project.category === 'backend' ? (
                      <div className="flex items-center">
                        <Code className="h-3 w-3 mr-1" />
                        <span>Backend</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Database className="h-3 w-3 mr-1" />
                        <span>Data</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Pagination indicators */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: Math.ceil(filteredProjects.length / visibleProjects) }).map((_, index) => {
            const startPosition = index * visibleProjects;
            const isActive = scrollPosition >= startPosition * (scrollContainerRef.current?.clientWidth || 0) / filteredProjects.length * visibleProjects &&
                          scrollPosition < (startPosition + visibleProjects) * (scrollContainerRef.current?.clientWidth || 0) / filteredProjects.length * visibleProjects;
            
            return (
              <button
                key={index}
                className={`w-2 h-2 rounded-full mx-1 transition-all duration-300 ${
                  isActive ? 'bg-neon-green w-6' : 'bg-neutral-600 hover:bg-neutral-400'
                }`}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const newPosition = (scrollContainerRef.current.scrollWidth / filteredProjects.length) * startPosition;
                    scrollContainerRef.current.scrollTo({
                      left: newPosition,
                      behavior: 'smooth'
                    });
                    setScrollPosition(newPosition);
                  }
                }}
                aria-label={`Page ${index + 1}`}
              />
            );
          })}
        </div>
      </div>
      
      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          projectTitle={selectedProject.title}
          projectFolder={selectedProject.folder || ''}
          projectDescription={selectedProject.description}
          projectImages={selectedProject.images || []}
        />
      )}
    </section>
  );
};

export default Projects;
