import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  projectFolder: string;
  projectDescription: string;
  projectImages: string[];
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  projectTitle,
  projectFolder,
  projectDescription,
  projectImages
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, currentImageIndex, projectImages.length]);
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? projectImages.length - 1 : prev - 1
    );
  };
  
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === projectImages.length - 1 ? 0 : prev + 1
    );
  };
  
  // Scroll to the current image
  useEffect(() => {
    if (scrollRef.current && isOpen) {
      const scrollContainer = scrollRef.current;
      const selectedImage = scrollContainer.children[currentImageIndex] as HTMLElement;
      
      if (selectedImage) {
        selectedImage.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [currentImageIndex, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-background bg-opacity-90 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="relative bg-background-lighter w-full max-w-4xl rounded-lg shadow-lg overflow-hidden max-h-[90vh] text-sm sm:text-base"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-3 sm:p-4 border-b border-neutral-800">
              <h3 className="text-lg sm:text-xl font-semibold">{projectTitle}</h3>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-neutral-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Project Description */}
            <div className="p-3 sm:p-4 border-b border-neutral-800">
              <p className="text-neutral-300">{projectDescription}</p>
            </div>
            
            {/* Image Gallery */}
            <div className="relative">
              {/* Main Image Display */}
              <div className="h-[50vh] sm:h-[60vh] md:h-[70vh] flex items-center justify-center bg-background p-2 sm:p-4">
                {projectImages.length > 0 && (
                  <img
                    src={projectImages[currentImageIndex]}
                    alt={`${projectTitle} - Image ${currentImageIndex + 1}`}
                    className="max-h-full max-w-full object-contain rounded-md shadow-lg"
                  />
                )}
              </div>
              
              {/* Navigation Arrows */}
              {projectImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-background bg-opacity-70 p-1 sm:p-2 rounded-full text-white"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-background bg-opacity-70 p-1 sm:p-2 rounded-full text-white"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
                  </button>
                </>
              )}
              
              {/* Thumbnail Navigation */}
              <div 
                ref={scrollRef}
                className="flex overflow-x-auto hide-scrollbar gap-2 p-2 sm:p-4 bg-background-light"
              >
                {projectImages.map((src, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 h-14 sm:h-20 w-auto rounded-md overflow-hidden transition-all ${currentImageIndex === index ? 'ring-2 ring-neon-green scale-105' : 'opacity-70 hover:opacity-100'}`}
                  >
                    <img
                      src={src}
                      alt={`${projectTitle} thumbnail ${index + 1}`}
                      className="h-full w-auto object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;