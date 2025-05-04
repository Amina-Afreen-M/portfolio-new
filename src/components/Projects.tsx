import React, { useState } from 'react';
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
        "/src/assets/projects/E-commerce Web Design/E-commerce web_page-0001.jpg",
        "/src/assets/projects/E-commerce Web Design/E-commerce web_page-0003.jpg",
        "/src/assets/projects/E-commerce Web Design/E-commerce web_page-0004.jpg",
        "/src/assets/projects/E-commerce Web Design/E-commerce web_page-0005.jpg",
        "/src/assets/projects/E-commerce Web Design/E-commerce web_page-0006.jpg",
        "/src/assets/projects/E-commerce Web Design/E-commerce web_page-0007.jpg",
        "/src/assets/projects/E-commerce Web Design/E-commerce web_page-0008.jpg",
        "/src/assets/projects/E-commerce Web Design/E-commerce web_page-0009.jpg",
        "/src/assets/projects/E-commerce Web Design/E-commerce web_page-0010.jpg",
        "/src/assets/projects/E-commerce Web Design/E-commerce web_page-0013.jpg",
        "/src/assets/projects/E-commerce Web Design/E-commerce web_page-0014.jpg"
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
        "/src/assets/projects/Ai Travel Planner/img4.jpg",
        "/src/assets/projects/Ai Travel Planner/img7.jpg",
        "/src/assets/projects/Ai Travel Planner/img10.jpg",
        "/src/assets/projects/Ai Travel Planner/img13.jpg",
        "/src/assets/projects/Ai Travel Planner/img16.jpg",
        "/src/assets/projects/Ai Travel Planner/img19.jpg",
        "/src/assets/projects/Ai Travel Planner/img22.jpg"
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
        "/src/assets/projects/Internal Attendance Web-app/img4.jpg",
        "/src/assets/projects/Internal Attendance Web-app/img7.jpg",
        "/src/assets/projects/Internal Attendance Web-app/img10.jpg",
        "/src/assets/projects/Internal Attendance Web-app/img13.jpg",
        "/src/assets/projects/Internal Attendance Web-app/img16.jpg",
        "/src/assets/projects/Internal Attendance Web-app/img19.jpg",
        "/src/assets/projects/Internal Attendance Web-app/img22.jpg",
        "/src/assets/projects/Internal Attendance Web-app/img25.jpg"
      ]
    },
    {
      id: 4,
      title: "Language Learning App",
      category: "ux",
      description: "An innovative language learning application designed to make language acquisition engaging and effective. Features include interactive lessons, real-time pronunciation feedback, personalized learning paths, and social learning components.",
      thumbnail: "https://images.unsplash.com/photo-1489945052260-4f21c52268b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGxhbmd1YWdlJTIwbGVhcm5pbmd8ZW58MHwwfDB8fHww",
      tools: ["Figma", "User Research", "Interaction Design", "Prototyping"],
      folder: "Language Learning App",
      images: [
        "/src/assets/projects/Learning App/iPhone 14 Pro Max - 1.png",
        "/src/assets/projects/Learning App/iPhone 14 Pro Max - 10.png",
        "/src/assets/projects/Learning App/iPhone 14 Pro Max - 2.png",
        "/src/assets/projects/Learning App/iPhone 14 Pro Max - 5.png",
        "/src/assets/projects/Learning App/iPhone 14 Pro Max - 3.png",
        "/src/assets/projects/Learning App/iPhone 14 Pro Max - 9.png",
        "/src/assets/projects/Learning App/iPhone 14 Pro Max - 7.png"
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
        "/src/assets/projects/Entertainment app/img4.jpg",
        "/src/assets/projects/Entertainment app/img7.jpg",
        "/src/assets/projects/Entertainment app/img10.jpg",
        "/src/assets/projects/Entertainment app/img13.jpg",
        "/src/assets/projects/Entertainment app/img16.jpg",
        "/src/assets/projects/Entertainment app/img19.jpg",
        "/src/assets/projects/Entertainment app/img22.jpg"
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
        "/src/assets/projects/Message Converter/img4.jpg",
        "/src/assets/projects/Message Converter/img7.jpg",
        "/src/assets/projects/Message Converter/img10.jpg",
        "/src/assets/projects/Message Converter/img13.jpg",
        "/src/assets/projects/Message Converter/img16.jpg",
        "/src/assets/projects/Message Converter/img19.jpg",
        "/src/assets/projects/Message Converter/img22.jpg"
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
        "/src/assets/projects/Charity App/img4.jpg",
        "/src/assets/projects/Charity App/img7.jpg",
        "/src/assets/projects/Charity App/img10.jpg",
        "/src/assets/projects/Charity App/img13.jpg",
        "/src/assets/projects/Charity App/img16.jpg",
        "/src/assets/projects/Charity App/img22.jpg",
        "/src/assets/projects/Charity App/img25.jpg",
        "/src/assets/projects/Charity App/img28.jpg",
        "/src/assets/projects/Charity App/img31.jpg",
        "/src/assets/projects/Charity App/img34.jpg",
        "/src/assets/projects/Charity App/img37.jpg",
        "/src/assets/projects/Charity App/img40.jpg",
        "/src/assets/projects/Charity App/img43.jpg",
        "/src/assets/projects/Charity App/img46.jpg",
        "/src/assets/projects/Charity App/img49.jpg",
        "/src/assets/projects/Charity App/img52.jpg",
        "/src/assets/projects/Charity App/img55.jpg",
        "/src/assets/projects/Charity App/img58.jpg",
        "/src/assets/projects/Charity App/img61.jpg",
        "/src/assets/projects/Charity App/img64.jpg",
        "/src/assets/projects/Charity App/img69.jpg",
        "/src/assets/projects/Charity App/img72.jpg"
      ]
    },
    
    // Backend Projects
    {
      id: 7,
      title: "SchedulEase – Smart Task Manager",
      category: "backend",
      description: "SchedulEase is a smart task management system designed to help users prioritize, schedule, and manage tasks efficiently. With features like auto-scheduling, prioritization, and daily summaries, SchedulEase optimizes productivity by ensuring that the most critical tasks are completed first.",
      thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGFza3xlbnwwfDB8MHx8fDA%3D",
      tools: ["Java", "Spring Boot", "MySQL"],
      githubLink: "https://github.com/Amina-Afreen-M/SchedulEase-Task-manager"
    },
    {
      id: 8,
      title: "Employee Management System (EMS)",
      category: "backend",
      description: "A full-stack Employee Management System built with Spring Boot and React, featuring role-based access control, employee management, department organization, leave tracking, and timesheet management.",
      thumbnail: "https://images.unsplash.com/photo-1700241956197-0b13f96fd69e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzQzfHxlbXBsb3llZSUyMG1hbmFnZW1lbnR8ZW58MHwwfDB8fHww",
      tools: ["Spring Boot", "React", "MySQL"],
      githubLink: "https://github.com/Amina-Afreen-M/Employee-Management-System-EMS"
    },
    
    // Data Projects
    {
      id: 9,
      title: "Weather Data Analysis",
      category: "data",
      description: "This project is a beginner-friendly Exploratory Data Analysis (EDA) of historical weather data using Python. The goal was to clean and understand the dataset, perform statistical analysis, and answer specific weather-related queries without any data visualization.",
      thumbnail: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      tools: ["Python", "Pandas", "NumPy"],
      githubLink: "https://github.com/Amina-Afreen-M/Data-Analysis"
    },
    {
      id: 10,
      title: "Air Quality Analysis and Forecasting Dashboard",
      category: "data",
      description: "This project implements a comprehensive air quality analysis and forecasting system using time series methodologies. It provides an interactive dashboard for visualizing air quality data, analyzing temporal patterns, and generating forecasts using different models.",
      thumbnail: "https://plus.unsplash.com/premium_photo-1673240845240-2fce9077a6e9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFpciUyMHF1YWxpdHl8ZW58MHwwfDB8fHww",
      tools: ["Python", "Pandas", "Scikit-learn", "Plotly"],
      githubLink: "https://github.com/Amina-Afreen-M/Time-Series-Analysis-AirQuality"
    },
    {
      id: 11,
      title: "COPD Patient Management App",
      category: "ux",
      description: "A comprehensive healthcare application designed specifically for COPD patients to monitor and manage their condition. Features include symptom tracking, medication reminders, breathing exercise guides, environmental alerts, and direct communication with healthcare providers.",
      thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      tools: ["Figma", "Healthcare UX", "Accessibility Design", "User Research"],
      folder: "COPD Management App",
      images: [
        "/src/assets/projects/Medical App/Android Large - 2.png",
        "/src/assets/projects/Medical App/Android Large - 3.png",
        "/src/assets/projects/Medical App/Android Large - 4.png",
        "/src/assets/projects/Medical App/Android Large - 5.png",
        "/src/assets/projects/Medical App/Android Large - 6.png",
        "/src/assets/projects/Medical App/Android Large - 7.png",
        "/src/assets/projects/Medical App/Android Large - 12.png",
        "/src/assets/projects/Medical App/Android Large - 15.png",
        "/src/assets/projects/Medical App/Android Large - 16.png",
        "/src/assets/projects/Medical App/Home Screen.png",
        "/src/assets/projects/Medical App/Home page of medicines.png",
        "/src/assets/projects/Medical App/settings.png"
      ]
    }
  ];

  const filteredProjects = projects.filter(project => project.category === activeFilter);
  
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
    <section id="projects" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="mb-4">My <span className="glow-text-green">Projects</span></h2>
          <p className="text-neutral-300 max-w-2xl mx-auto">
            Explore my latest design work across various platforms and industries.
            Each project represents a unique challenge and solution.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <button 
            onClick={() => setActiveFilter('data')}
            className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center ${
              activeFilter === 'data' 
                ? 'bg-neon-green text-background font-semibold' 
                : 'bg-background-lighter text-neutral-300 hover:text-white'
            }`}
          >
            <Database className="h-4 w-4 mr-2" />
            Data Projects
          </button>
          <button 
            onClick={() => setActiveFilter('backend')}
            className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center ${
              activeFilter === 'backend' 
                ? 'bg-neon-green text-background font-semibold' 
                : 'bg-background-lighter text-neutral-300 hover:text-white'
            }`}
          >
            <Code className="h-4 w-4 mr-2" />
            Backend Projects
          </button>
          <button 
            onClick={() => setActiveFilter('ux')}
            className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center ${
              activeFilter === 'ux' 
                ? 'bg-neon-green text-background font-semibold' 
                : 'bg-background-lighter text-neutral-300 hover:text-white'
            }`}
          >
            <Layout className="h-4 w-4 mr-2" />
            UX Projects
          </button>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div 
              key={project.id}
              variants={itemVariants}
              className="bg-background-lighter rounded-lg overflow-hidden group relative flex flex-col h-full"
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={project.thumbnail} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-lighter via-transparent to-transparent opacity-60"></div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-neutral-400 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tools.map((tool, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-background text-sm text-neutral-300 rounded-full"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-sm text-neutral-400 capitalize">
                    {project.category === 'ux' ? 'UX Design' : 
                     project.category === 'backend' ? 'Backend' : 'Data'}
                  </span>
                  <button 
                    onClick={() => handleViewProject(project)}
                    className="flex items-center text-neon-green hover:text-white transition-colors duration-300"
                  >
                    <span className="mr-1">View Project</span>
                    <ExternalLink className="h-4 w-4" />
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
        </motion.div>
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