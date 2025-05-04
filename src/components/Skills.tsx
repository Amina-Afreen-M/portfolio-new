import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Figma, Code, Trello, Briefcase, PenTool, Users, Layout, Database, GitBranch, FileCode, Palette, Layers } from 'lucide-react';

interface Skill {
  name: string;
  category: 'design' | 'technical' | 'soft';
  icon: React.ReactNode;
}

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const skills: Skill[] = [
    { name: 'UI/UX Design', category: 'design', icon: <Layout className="h-5 w-5" /> },
    { name: 'Figma', category: 'design', icon: <Figma className="h-5 w-5" /> },
    { name: 'Canva', category: 'design', icon: <Palette className="h-5 w-5" /> },
    { name: 'Wireframing', category: 'design', icon: <Layers className="h-5 w-5" /> },
    { name: 'Information Architecture', category: 'design', icon: <Layout className="h-5 w-5" /> },
    { name: 'Interaction Design', category: 'design', icon: <PenTool className="h-5 w-5" /> },
    { name: 'User Research', category: 'design', icon: <Users className="h-5 w-5" /> },
    { name: 'Python', category: 'technical', icon: <FileCode className="h-5 w-5" /> },
    { name: 'Java', category: 'technical', icon: <FileCode className="h-5 w-5" /> },
    { name: 'SQL', category: 'technical', icon: <Database className="h-5 w-5" /> },
    { name: 'Git', category: 'technical', icon: <GitBranch className="h-5 w-5" /> },
    { name: 'HTML/CSS', category: 'technical', icon: <Code className="h-5 w-5" /> },
    { name: 'Project Management', category: 'soft', icon: <Trello className="h-5 w-5" /> },
    { name: 'Communication', category: 'soft', icon: <Users className="h-5 w-5" /> },
    { name: 'Teamwork', category: 'soft', icon: <Users className="h-5 w-5" /> },
    { name: 'Adaptability', category: 'soft', icon: <Users className="h-5 w-5" /> },
    { name: 'Problem Solving', category: 'soft', icon: <Briefcase className="h-5 w-5" /> },
    { name: 'Agile', category: 'soft', icon: <Trello className="h-5 w-5" /> },
  ];

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
    <section id="skills" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="mb-4">Skills & <span className="glow-text-green">Tools</span></h2>
          <p className="text-neutral-300 max-w-2xl mx-auto">
            My toolkit and expertise that I bring to every project, focusing on creating innovative and intuitive user experiences through design and technology.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div 
            variants={itemVariants}
            className="bg-background-lighter rounded-lg p-6"
          >
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-full bg-neon-pink bg-opacity-20 mr-3">
                <PenTool className="h-6 w-6 text-neon-pink" />
              </div>
              <h3 className="text-xl font-semibold">Design</h3>
            </div>
            
            <div className="space-y-6">
              {skills
                .filter(skill => skill.category === 'design')
                .map((skill, index) => (
                  <div key={index}>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {skill.icon}
                        <span className="ml-4">{skill.name}</span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={inView ? { width: 
                          skill.name === 'UI/UX Design' ? '75%' :
                          skill.name === 'Figma' ? '80%' :
                          skill.name === 'Canva' ? '70%' :
                          skill.name === 'Wireframing' ? '62%' :
                          skill.name === 'Information Architecture' ? '50%' :
                          skill.name === 'Interaction Design' ? '55%' :
                          '65%'
                        } : { width: 0 }}
                        transition={{ duration: 1 }}
                        className="h-full bg-neon-pink rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                ))
              }
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="bg-background-lighter rounded-lg p-6"
          >
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-full bg-neon-green bg-opacity-20 mr-3">
                <Code className="h-6 w-6 text-neon-green" />
              </div>
              <h3 className="text-xl font-semibold">Technical</h3>
            </div>
            
            <div className="space-y-6">
              {skills
                .filter(skill => skill.category === 'technical')
                .map((skill, index) => (
                  <div key={index}>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {skill.icon}
                        <span className="ml-4">{skill.name}</span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={inView ? { width: 
                          skill.name === 'Python' ? '75%' :
                          skill.name === 'Java' ? '70%' :
                          skill.name === 'SQL' ? '65%' :
                          skill.name === 'Git' ? '45%' :
                          '50%'
                        } : { width: 0 }}
                        transition={{ duration: 1 }}
                        className="h-full bg-neon-green rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                ))
              }
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="bg-background-lighter rounded-lg p-6"
          >
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-full bg-neon-pink bg-opacity-20 mr-3">
                <Users className="h-6 w-6 text-neon-pink" />
              </div>
              <h3 className="text-xl font-semibold">Soft Skills</h3>
            </div>
            
            <div className="space-y-6">
              {skills
                .filter(skill => skill.category === 'soft')
                .map((skill, index) => (
                  <div key={index}>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {skill.icon}
                        <span className="ml-4">{skill.name}</span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={inView ? { width: 
                          skill.name === 'Communication' ? '90%' :
                          skill.name === 'Teamwork' ? '85%' :
                          skill.name === 'Adaptability' ? '80%' :
                          skill.name === 'Problem Solving' ? '75%' :
                          skill.name === 'Project Management' ? '65%' :
                          skill.name === 'Agile' ? '60%' :
                          '70%'
                        } : { width: 0 }}
                        transition={{ duration: 1 }}
                        className="h-full bg-neon-pink rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                ))
              }
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16 bg-background-lighter rounded-lg p-8"
        >
          <motion.h3 
            variants={itemVariants}
            className="text-xl font-semibold mb-8 text-center"
          >
            Tools I Use
          </motion.h3>
          
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-2 sm:grid-cols-3 gap-6"
          >
            {[
              { name: 'Figma', icon: <Figma className="h-10 w-10" /> },
              { name: 'Canva', icon: <Palette className="h-10 w-10" /> },
              { name: 'Python & Libraries', icon: <FileCode className="h-10 w-10" /> },
              { name: 'Java', icon: <FileCode className="h-10 w-10" /> },
              { name: 'SQL', icon: <Database className="h-10 w-10" /> },
              { name: 'Git', icon: <GitBranch className="h-10 w-10" /> },
            ].map((tool, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="flex flex-col items-center justify-center p-6 bg-background rounded-lg text-center"
              >
                <div className="text-neon-green mb-3">
                  {tool.icon}
                </div>
                <p className="text-sm">{tool.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;