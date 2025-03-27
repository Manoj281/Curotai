// src/components/MobileNav.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ArrowLeft, ExternalLink } from 'lucide-react';

const MobileNav = ({ navItems, caseStudyItems, servicesItems, loadingDropdowns }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const location = useLocation();

  // Close menu when location changes
  useEffect(() => {
    setIsOpen(false);
    setExpandedSection(null);
  }, [location]);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const isActive = (path) => {
    return location.pathname === path || 
           (location.pathname.startsWith(path) && path !== '/');
  };

  // Default items if not provided
  const fullNavItems = [
    { text: "Home", to: "/" },
    { text: "Blogs", to: "/mainblogs", hasDropdown: true },
    { text: "Services", to: "/services", hasDropdown: true },
    { text: "About Us", to: "/about" }
  ];

  // Combine with provided navItems if available
  const navigationItems = navItems || fullNavItems;

  // Use provided service items or define defaults
  const serviceDropdownItems = servicesItems || [
    { text: "Computer Vision", to: "/services/computer-vision", hasExternalLink: true },
    { text: "Text Recognition & NLP", to: "/servicesnlp", hasExternalLink: true },
  ];
  
  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-[#2d5254] transition-colors duration-300"
        aria-label="Toggle navigation menu"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-[#203e40] z-50 flex flex-col"
          >
            <div className="flex-1 overflow-y-auto p-4 pt-6 flex flex-col">
              {/* Go Back Button - Updated styling to match image */}
              <div className="mb-12 flex justify-between">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 bg-[#d1e5e1] text-[#203e40] px-6 py-3 rounded-full font-medium"
                >
                  <ArrowLeft className="w-5 h-5 text-[#203e40]" />
                  <span>Go Back</span>
                </button>
                
                {/* Logo in top right as shown in image */}
                <div className="w-10 h-10 overflow-hidden bg-[#304d4f] rounded-md">
                  <img src="/img/Curota_logo_Dark.svg" alt="Logo" className="w-full h-full object-contain opacity-60" />
                </div>
              </div>

              {/* "Get in touch" title with wider divider lines */}
              <div className="flex items-center justify-center mt-[100px] px-4">
                <div className="h-px flex-grow bg-gradient-to-r from-transparent to-gray-400"></div>
                <h2 className="text-gray-300 text-xl px-6">Get in touch</h2>
                <div className="h-px flex-grow bg-gradient-to-l from-transparent to-gray-400"></div>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col mt-8">
                {navigationItems.map((item, index) => (
                  <div key={index} className="mb-6">
                    <div className="flex items-center relative">
                      {/* Vertical active indicator on left */}
                      {(isActive(item.to) || 
                        (item.text === "Services" && location.pathname.startsWith("/services")) ||
                        (item.text === "Blogs" && location.pathname.startsWith("/mainblogs"))
                       ) && (
                        <div className="absolute -left-4 top-0 w-2 h-full bg-white rounded-r-full" />
                      )}
                      
                      {item.hasDropdown ? (
                        <div className="flex items-center w-full">
                          {item.text === "Services" ? (
                            <button
                              onClick={(e) => {
                                if (location.pathname === '/') {
                                  e.preventDefault();
                                  setIsOpen(false);
                                  // Scroll to services section on home page
                                  const servicesSection = document.getElementById('our-services');
                                  if (servicesSection) {
                                    servicesSection.scrollIntoView({ behavior: 'smooth' });
                                  }
                                } else if (expandedSection === "Services") {
                                  // Navigate to services page
                                  setIsOpen(false);
                                } else {
                                  // Toggle dropdown
                                  toggleSection("Services");
                                }
                              }}
                              className="text-white text-3xl flex items-center relative pl-6 py-1 text-left"
                              style={{
                                textShadow: isActive(item.to) ? '0 0 15px rgba(255, 255, 255, 0.5)' : 'none'
                              }}
                            >
                              {item.text}
                            </button>
                          ) : expandedSection === item.text ? (
                            // When dropdown is already open, link works normally
                            <Link
                              to={item.to}
                              className="text-white text-3xl flex items-center relative pl-6 py-1"
                              style={{
                                textShadow: isActive(item.to) ? '0 0 15px rgba(255, 255, 255, 0.5)' : 'none'
                              }}
                            >
                              {item.text}
                            </Link>
                          ) : (
                            // When dropdown is closed, clicking text also opens the dropdown
                            <button
                              onClick={() => toggleSection(item.text)}
                              className="text-white text-3xl flex items-center relative pl-6 py-1 text-left"
                              style={{
                                textShadow: isActive(item.to) ? '0 0 15px rgba(255, 255, 255, 0.5)' : 'none'
                              }}
                            >
                              {item.text}
                            </button>
                          )}
                          <button
                            onClick={() => toggleSection(item.text)}
                            className="ml-2 p-2"
                            aria-label={`Toggle ${item.text} dropdown`}
                          >
                            <svg 
                              width="24" 
                              height="24" 
                              viewBox="0 0 24 24" 
                              className="opacity-70"
                              style={{
                                transform: expandedSection === item.text ? 'rotate(45deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease'
                              }}
                            >
                              <path 
                                d="M7 17L17 7M17 7H7M17 7V17" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                fill="none"
                              />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <Link
                          to={item.to}
                          className="text-white text-3xl flex items-center relative pl-6"
                          style={{
                            textShadow: isActive(item.to) ? '0 0 15px rgba(255, 255, 255, 0.5)' : 'none'
                          }}
                        >
                          <span className="py-1">{item.text}</span>
                        </Link>
                      )}
                    </div>
                    
                    {/* Dropdown items for Services */}
                    {item.text === "Services" && expandedSection === "Services" && (
                      <div className="ml-6 pl-4 mt-4 border-l border-[#2a4749] space-y-3">
                        {serviceDropdownItems.map((service, idx) => (
                          <div key={idx} className="flex items-center">
                            <span className="w-2 h-2 bg-white rounded-full mr-3 shrink-0"></span>
                            <Link 
                              to={service.to} 
                              className="text-white text-xl flex items-center"
                              style={{
                                textShadow: isActive(service.to) ? '0 0 15px rgba(255, 255, 255, 0.5)' : 'none'
                              }}
                              onClick={(e) => {
                                // Close the mobile menu
                                setIsOpen(false);
                                
                                // Use setTimeout to ensure navigation happens first
                                setTimeout(() => {
                                  if (service.text === 'Image Annotation') {
                                    const section = document.getElementById('image-annotation');
                                    if (section) {
                                      section.scrollIntoView({ behavior: 'smooth' });
                                    }
                                  }
                                  else if (service.text === 'Video Annotation') {
                                    const section = document.getElementById('video-annotation');
                                    if (section) {
                                      section.scrollIntoView({ behavior: 'smooth' });
                                    }
                                  }
                                  else if (service.text === 'GIS') {
                                    const section = document.getElementById('GIS');
                                    if (section) {
                                      section.scrollIntoView({ behavior: 'smooth' });
                                    }
                                  }
                                }, 100);
                              }}
                            >
                              {service.text}
                              {service.hasExternalLink && (
                                <ExternalLink className="w-4 h-4 ml-2 text-gray-400" />
                              )}
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Dropdown items for Blogs */}
                    {item.text === "Blogs" && expandedSection === "Blogs" && (
                      <div className="ml-6 pl-4 mt-4 border-l border-[#2a4749] space-y-3">
                        {loadingDropdowns ? (
                          <div className="text-white text-lg">Loading blogs...</div>
                        ) : caseStudyItems && caseStudyItems.length > 0 ? (
                          caseStudyItems.map((blog, idx) => (
                            <div key={idx} className="flex items-center">
                              <span className="w-2 h-2 bg-white rounded-full mr-3 shrink-0"></span>
                              <Link 
                                to={blog.to} 
                                className="text-white text-xl"
                                style={{
                                  textShadow: isActive(blog.to) ? '0 0 15px rgba(255, 255, 255, 0.5)' : 'none'
                                }}
                              >
                                {blog.text}
                              </Link>
                            </div>
                          ))
                        ) : (
                          <div className="text-white text-lg">No blogs available</div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Get in touch button */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  // Scroll to contact section
                  const contactSection = document.getElementById('contactUS');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-white text-[#203e40] text-lg font-medium rounded-[16px] px-6 py-3 mt-8 mx-auto
                         shadow-[0_0_10px_rgba(255,255,255,0.2)] 
                         hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]
                         transition-all duration-300"
              >
                GET IN TOUCH!
              </button>

              {/* Social Media Links */}
              <div className="flex justify-center gap-6 mt-20 mb-8">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#1e3536] hover:bg-[#2a4749] transition-colors text-white px-4 py-3 rounded-md flex items-center gap-2"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
                  </svg>
                  <span>Linkedin</span>
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#1e3536] hover:bg-[#2a4749] transition-colors text-white px-4 py-3 rounded-md flex items-center gap-2"
                >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                  </svg>
                  <span>Instagram</span>
                </a>
              </div>
              
              {/* Logo placement at the bottom */}
              <div className="w-full max-w-[500px] bottom-0 px-4 mx-auto mt-auto">
                <img 
                  src="/img/wordmark1.png" 
                  alt="Curota.ai watermark"
                  className="w-full opacity-15 object-fit object-center h-17 md:h-27"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
