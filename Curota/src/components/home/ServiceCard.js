import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ServiceCard = ({ title, title2, image, index, onReadMore }) => {
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleInteraction = () => {
    if (isMobile) {
      setIsActive(!isActive);
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.9,
      rotate: -2
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
        delay: index * 0.1
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.2 + index * 0.1,
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      whileHover={!isMobile ? { y: -10 } : {}}
      onHoverStart={() => !isMobile && setIsActive(true)}
      onHoverEnd={() => !isMobile && setIsActive(false)}
      onClick={handleInteraction}
      className="w-full sm:w-[240px] md:w-[260px] lg:w-[20vw] lg:min-w-[220px] xl:w-[290px] md:min-h-[350px] min-h-[220px] lg:min-h-[390px] xl:min-h-[420px] bg-white rounded-[24px] shadow-lg transform transition-all duration-300 hover:shadow-2xl relative overflow-hidden cursor-pointer"
    >
      {/* Default State */}
      <motion.div
        animate={{ opacity: isActive ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="md:p-6 md:py-6 p-3 py-6 flex flex-col justify-between h-full bg-gradient-to-b from-[#e8f4f3] to-white"
      >
        <motion.h3 
          variants={contentVariants}
          className="text-center text-xl md:text-xl lg:text-2xl font-bold text-[#203e40] mb-3"
        >
          {title}
        </motion.h3>
        <motion.div 
          variants={contentVariants}
          className="flex-grow flex items-center justify-center px-4 "
        >
          <div 
            style={{ backgroundImage: `url(${image})` }} 
            className="w-full h-[160px] md:h-[140px] lg:h-[160px] bg-contain bg-no-repeat bg-center"
          />
        </motion.div>
        <motion.p 
          variants={contentVariants}
          className="text-[14px] md:text-base lg:text-lg text-center font-semibold font-sans text-[#9b9e9e] mt-4"
        >
          {title2}
        </motion.p>
      </motion.div>

      {/* Active State (Hover on Desktop, Click on Mobile) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-[#e8f4f3] rounded-[24px] flex flex-col items-center justify-between sm:p-6 p-3 lg:pt-8 pt-5"
      >
        <div className="text-center">
          <h3 className="sm:text-xl md:text-2xl text-lg font-semibold text-[#8e8e8e] mb-4">Specialised Expertise</h3>
          <p className="text-[#5d7574] sm:text-base leading-relaxed text-center sm:mb-4 mb-2 text-[13px]">
            Our annotators focus on specific use cases and perfect their craft. This ensures greater accuracy and deeper understanding for every project.
          </p>
        </div>
        <div className="w-full sm:mt-4 mt-1">
          <div className="bg-[#c5d3d1] rounded-2xl py-2 sm:py-4 md:py-3 xl:py-4 text-center">
            {onReadMore ? (
              <div 
                onClick={onReadMore} 
                className="text-[#203e40] font-medium sm:text-lg text-sm inline-flex items-center hover:underline transition-all duration-300 cursor-pointer"
              >
                Read More 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            ) : (
              <Link to="/services" className="text-[#203e40] font-medium sm:text-lg text-sm inline-flex items-center hover:underline transition-all duration-300">
                Read More 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ServiceCard;