// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import MobileNav from './MobileNav';

// Modified NavButton to accept onClick
const NavButton = ({ text, to, currentPath, onClick }) => {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={`text-white text-[18px] font-medium relative hover:drop-shadow-white z-20 ${
        currentPath === to || 
        (to !== '/' && currentPath.startsWith(to)) 
          ? 'text-opacity-100' 
          : 'text-opacity-70 hover:text-opacity-100'
      }`}
    >
      {text}
    </Link>
  );
};

const Header = () => {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showCaseStudyDropdown, setShowCaseStudyDropdown] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [isInteractingWithDropdown, setIsInteractingWithDropdown] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [caseStudyItems, setCaseStudyItems] = useState([]);
  const [loadingDropdowns, setLoadingDropdowns] = useState(true);
  const location = useLocation();
  
  const vh = typeof window !== 'undefined' ? window.innerHeight : 0;

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(40, 74, 78, 0.95)', 'rgba(40, 74, 78, 1)']
  );

  // Predefined service items from the image
  const servicesItems = [
    { text: "Image Annotation", to: "/services", hasExternalLink: true },
    { text: "Video Annotation", to: "/services", hasExternalLink: true },
    { text: "GIS", to: "/services", hasExternalLink: true },
  ];

  // Fetch dropdown content
  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        // Fetch case studies directly from Strapi
        const response = await fetch(`${process.env.REACT_APP_STRAPI_URL}/api/case-studies?populate[Metrics][populate]=*`);
        const result = await response.json();
        
        if (result && result.data) {
          const formattedCaseStudies = result.data.map(study => ({
            text: study.Title,
            to: `/mainblogs/case-study/${study.Slug}`
          }));
          setCaseStudyItems(formattedCaseStudies);
        }
        
        setLoadingDropdowns(false);
      } catch (error) {
        console.error("Error fetching case studies:", error);
        // Set fallback items if fetch fails
        setCaseStudyItems([
          { text: "Case Study 1", to: "/mainblogs/case-study/case-study-1" },
          { text: "Case Study 2", to: "/mainblogs/case-study/case-study-2" }
        ]);
        
        setLoadingDropdowns(false);
      }
    };
    
    fetchCaseStudies();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY + 170;
      if (currentScrollY >= vh) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, vh]);

  const navItems = [
    { text: "Home", to: "/" },
    { text: "Blogs", to: "/mainblogs", hasDropdown: true },
    { text: "Services", to: "/services", hasDropdown: true },
    { text: "About Us", to: "/about" }
  ];

  // Manual positions for each nav item
  const getNavItemPosition = (index) => {
    const positions = [
      0, // Home position (%)
      21.5, // Case Study position (%)
      50, // Services position (%)
      80.5  // About Us position (%)
    ];
    
    return positions[index] || 0;
  };

  // Get widths for each button
  const getButtonWidth = (index) => {
    const widths = [
      50, // Home width (px)
      79, // Case Study width (px)
      73, // Services width (px)
      78  // About Us width (px)
    ];
    
    return widths[index] || 70;
  };

  const getActiveIndex = () => {
    if (location.pathname === '/') return 0;
    
    const activeItemIndex = navItems.findIndex(item => item.to === location.pathname);
    if (activeItemIndex !== -1) return activeItemIndex;
    
    if (location.pathname.startsWith('/mainblogs/')) return 1;
    if (location.pathname.startsWith('/services')) return 2;
    if (location.pathname.startsWith('/about')) return 3;
    
    return 0;
  };

  const handleNavItemHover = (index) => {
    setHoveredItem(index);
    
    if (index === 1) {
      setShowCaseStudyDropdown(true);
      setShowServicesDropdown(false);
      setActiveDropdown('case-study');
    } else if (index === 2) {
      setShowServicesDropdown(true);
      setShowCaseStudyDropdown(false);
      setActiveDropdown('services');
    } else {
      setShowCaseStudyDropdown(false);
      setShowServicesDropdown(false);
      setActiveDropdown(null);
    }
  };

  const handleNavItemLeave = () => {
    if (!isInteractingWithDropdown) {
      setHoveredItem(null);
      setShowCaseStudyDropdown(false);
      setShowServicesDropdown(false);
      setActiveDropdown(null);
    }
  };

  const handleDropdownHover = (type) => {
    setIsInteractingWithDropdown(true);
    
    if (type === 'case-study') {
      setHoveredItem(1);
      setActiveDropdown('case-study');
    } else if (type === 'services') {
      setHoveredItem(2);
      setActiveDropdown('services');
    }
  };
  
  const handleDropdownLeave = () => {
    setIsInteractingWithDropdown(false);
    setHoveredItem(null);
    setShowCaseStudyDropdown(false);
    setShowServicesDropdown(false);
    setActiveDropdown(null);
  };

  const handleIndicatorHover = () => {
    // Don't change the hovered item when the cursor is on the indicator
  };

  // Dropdown variants for animation
  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2
      }
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className="fixed top-5 w-full z-50"
        >
          <nav className="flex justify-center w-full">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-[90%] max-w-[1300px] rounded-[40px] px-5 bg-[#284A4E]"
              style={{ backgroundColor }}
            >
              <div className="flex justify-between items-center">
                <Link to="/">
                  <motion.div
                    className="flex items-center gap-4 md:gap-6 "
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  > 
                    <div className="bg-[url('../public/img/Curota_logo_Dark.svg')] bg-cover bg-center h-6 w-6 md:h-8 md:w-8 ml-2 md:ml-4"></div>
                    <div className="bg-[url('../public/img/curota-name-icon.png')] bg-cover bg-center h-5 w-[130px] md:h-6 md:w-[165px]  m-5 ml-0 "></div>
                  </motion.div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center h-[84px]">
                  <div className="flex items-center justify-between h-full relative w-[400px]">
                    {navItems.map((item, index) => (
                      <div 
                        key={item.to}
                        className="h-full flex items-center justify-center relative"
                        onMouseEnter={() => handleNavItemHover(index)}
                        onMouseLeave={handleNavItemLeave}
                      >
                        <NavButton 
                          text={item.text} 
                          to={item.to} 
                          currentPath={location.pathname}
                          onClick={(e) => {
                            // Special handling for Services button
                            if (item.text === 'Services') {
                              // If on services page, do nothing
                              if (location.pathname === '/services') return;
                                // If on home page, scroll to services
                                if (location.pathname === '/') {
                                  e.preventDefault();
                                  const servicesSection = document.getElementById('our-services');
                                  if (servicesSection) {
                                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                                  }
                                }
                              }}
                            }
                        />
                        
                        {/* Case Study Dropdown */}
                        {item.hasDropdown && index === 1 && showCaseStudyDropdown && !loadingDropdowns && (
                          <div
                            className="absolute top-full left-1/2 transform -translate-x-1/2 z-50 w-52"
                            onMouseEnter={() => handleDropdownHover('case-study')}
                            onMouseLeave={handleDropdownLeave}
                          >
                            <AnimatePresence>
                              <motion.div
                                className="bg-white rounded-xl shadow-lg overflow-hidden w-full z-50"
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={dropdownVariants}
                              >
                                <div 
                                  className="bg-[#284A4E] h-[10px] rounded-b-lg mx-auto"
                                  style={{ width: '80px' }}
                                ></div>
                                
                                {caseStudyItems.map((dropdownItem, idx) => (
                                  <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    className="border-b border-gray-100 last:border-b-0"
                                  >
                                    <Link 
                                      to={dropdownItem.to}
                                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#203e40] transition-colors duration-200 text-sm font-medium"
                                    >
                                      {dropdownItem.text}
                                    </Link>
                                  </motion.div>
                                ))}
                              </motion.div>
                            </AnimatePresence>
                          </div>
                        )}
                        
                        {/* Services Dropdown */}
                        {item.hasDropdown && index === 2 && showServicesDropdown && (
                          <div
                            className="absolute top-full left-1/2 transform -translate-x-1/2 z-50 w-64"
                            onMouseEnter={() => handleDropdownHover('services')}
                            onMouseLeave={handleDropdownLeave}
                          >
                            <AnimatePresence>
                              <motion.div
                                className="bg-white rounded-xl shadow-lg overflow-hidden w-full z-50"
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={dropdownVariants}
                              >
                                <div 
                                  className="bg-[#284A4E] h-[10px] rounded-b-lg mx-auto"
                                  style={{ width: '73px' }}
                                ></div>
                                
                                {servicesItems.map((dropdownItem, idx) => (
                                  <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    className="border-b border-gray-100 last:border-b-0 group"
                                  >
                                    <div className="flex items-center">
                                      <Link 
                                        to="/services"
                                        className="block w-full px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#203e40] transition-colors duration-200 text-sm font-medium flex items-center justify-between"
                                        onClick={() => {
                                          // Use setTimeout to ensure navigation happens first
                                          setTimeout(() => {
                                            if (dropdownItem.text === 'Image Annotation') {
                                              const imageAnnotationSection = document.getElementById('image-annotation');
                                              if (imageAnnotationSection) {
                                                imageAnnotationSection.scrollIntoView({ behavior: 'smooth' });
                                              }
                                            }
                                            if (dropdownItem.text === 'GIS') {
                                              const imageAnnotationSection = document.getElementById('GIS');
                                              if (imageAnnotationSection) {
                                                imageAnnotationSection.scrollIntoView({ behavior: 'smooth' });
                                              }
                                            }
                                            else if (dropdownItem.text === 'Video Annotation') {
                                              const videoAnnotationSection = document.getElementById('video-annotation');
                                              if (videoAnnotationSection) {
                                                videoAnnotationSection.scrollIntoView({ behavior: 'smooth' });
                                              }
                                            }
                                          }, 100);
                                        }}
                                      >
                                        {dropdownItem.text}
                                      </Link>
                                      {dropdownItem.hasExternalLink && (
                                        <div className="pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path 
                                              strokeLinecap="round" 
                                              strokeLinejoin="round" 
                                              strokeWidth={2} 
                                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                                            />
                                          </svg>
                                        </div>
                                      )}
                                    </div>
                                  </motion.div>
                                ))}
                              </motion.div>
                            </AnimatePresence>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Animated indicator bar with manual positions and widths */}
                    <motion.div
                      className="absolute h-[10px] bg-white rounded-t-lg bottom-[-0px] pointer-events-none"
                      animate={{ 
                        left: `${getNavItemPosition(hoveredItem !== null ? hoveredItem : getActiveIndex())}%`,
                        width: `${getButtonWidth(hoveredItem !== null ? hoveredItem : getActiveIndex())}px`
                      }}
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      onMouseEnter={handleIndicatorHover}
                    />
                  </div>
                  
                  <motion.a
                    href="#contactUS"
                    className="bg-white text-[#203e40] text-lg font-medium rounded-[16px] px-6 py-2.5 ml-8 
                             shadow-[0_0_10px_rgba(255,255,255,0.2)] 
                             hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]
                             transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    GET IN TOUCH!
                  </motion.a>
                </div>

                {/* Mobile Navigation */}
                <MobileNav 
                  navItems={navItems} 
                  caseStudyItems={caseStudyItems} 
                  servicesItems={servicesItems}
                  loadingDropdowns={loadingDropdowns}
                />
              </div>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Header;