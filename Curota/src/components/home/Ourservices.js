import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ title, icon, image }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    // Navigate to services page
    navigate('/services');

    // Use setTimeout to ensure navigation completes before scrolling
    setTimeout(() => {
      let sectionId = '';
      if (title === 'Image Annotation') {
        sectionId = 'image-annotation';
      } else if (title === 'Video Annotation') {
        sectionId = 'video-annotation';
      }

      if (sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 100);
  };
  
  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden w-full h-auto flex flex-col cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div
        className="relative w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${isHovered ? '/img/hoverimg.png' : image})`,
          paddingTop: '54%' // 16:9 Aspect Ratio (h/w = 9/16 = 0.5625)
        }}
      >
        <div className="absolute md:top-6 md:left-6 top-4 left-4">
          <div className="md:w-[65px] md:h-[65px] w-[45px] h-[45px] bg-[#e5f5f3] rounded-xl flex items-center justify-center md:p-2 p-1">
            <div className="w-full h-full bg-[#203e40] rounded-lg flex items-center justify-center">
              <img src={icon} className='p-2' alt={title} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 sm:p-5 md:p-6 text-center relative">
        <div className="flex items-center justify-center">
          <h3 className={`text-xl font-bold text-[#203e40] ${isHovered ? 'underline' : ''} transition-all duration-300 inline`}>
            {title}
            {isHovered && (
              <div className="absolute right-4 sm:right-5 md:right-6 top-1/2 -translate-y-1/2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 6H6C4.89543 6 4 6.89543 4 8V18C4 19.1046 4.89543 20 6 20H16C17.1046 20 18 19.1046 18 18V14M14 4H20M20 4V10M20 4L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </h3>
        </div>
      </div>
    </div>
  );
};

const ServicesGrid = () => {
  const services = [
    {
      title: "Image Annotation",
      icon: "/img/vid.svg",
      image: "/img/original.png"
    },
    {
      title: "Video Annotation",
      icon: "/img/atext.svg",
      image: "/img/original.png"
    }
  ];

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="our-services">
      <div className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-[46px] bg-[url('../public/img/background-image-0.png')] bg-cover bg-center min-h-[49vh] pb-[83px]">
        <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto ">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.5, 
              ease: "easeOut"
            }}
            className="text-3xl xs:text-3xl md:text-5xl font-bold text-[#203e40] text-center mb-8 xs:mb-10 md:mb-14"
          >
            Our Services
          </motion.h1>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10"
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={itemVariants} className="flex justify-center">
                <div className="w-full">
                  <ServiceCard {...service} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;