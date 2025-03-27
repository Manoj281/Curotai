import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_STRAPI_URL}/api/case-studies?populate[Metrics][populate]=*`);
        const result = await response.json();
        
        if (result && result.data) {
          const formattedCaseStudies = result.data.slice(0, 3).map(study => ({
            title: study.Title,
            slug: study.Slug
          }));
          setCaseStudies(formattedCaseStudies);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching case studies:", error);
        setCaseStudies([
          { title: "Case Study 1", slug: "case-study-1" },
          { title: "Case Study 2", slug: "case-study-2" },
          { title: "Case Study 3", slug: "case-study-3" }
        ]);
        
        setLoading(false);
      }
    };
    
    fetchCaseStudies();
  }, []);

  const handleContactUsClick = () => {
    // Check if currently on home page
    if (window.location.pathname === '/') {
      // Scroll to contact section on home page
      const contactSection = document.getElementById('contactUS');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If not on home page, navigate to home and scroll to contact section
      window.location.href = '/#contact-us';
    }
  };

  return (
    <div className="footer-container-2">
      <footer className="bg-[#203e40] flex flex-col overflow-hidden px-12 sm:px-5 sm:pb-0 items-center justify-end relative">
        <div className="flex w-full max-w-[1133px] flex-col relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
            <div className="flex flex-col">
              <Link to="/">
                <img 
                  src="/img/logo-big.svg" 
                  className="aspect-square object-contain w-28"
                  alt="Company logo" 
                />
              </Link>
            </div>

            <div className="flex flex-col font-helvetica text-white">
              <h2 className="text-xl font-medium mb-6">Learn More</h2>
              <ul className="space-y-3">
                <li><Link to="/about" className="hover:opacity-80 transition-opacity">About Us</Link></li>
                <li><a href="https://yourcompany.com/press-releases" className="hover:opacity-80 transition-opacity">Press Releases</a></li>
                <li><a href="https://yourcompany.com/press-releases" className="hover:opacity-80 transition-opacity">Environment</a></li>
                <li><a href="https://yourcompany.com/press-releases" className="hover:opacity-80 transition-opacity">Jobs</a></li>
                <li><a href="https://yourcompany.com/press-releases" className="hover:opacity-80 transition-opacity">Privacy Policy</a></li>
                <li>
                  <div 
                    onClick={handleContactUsClick} 
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    Contact Us
                  </div>
                </li>
              </ul>
            </div>

            <div className="flex flex-col font-helvetica text-white">
              <h2 className="text-xl font-medium mb-6">Blogs</h2>
              <ul className="space-y-3">
                {loading ? (
                  <li className="text-white/50">Loading case studies...</li>
                ) : (
                  caseStudies.map((study, index) => (
                    <li key={index}>
                      <Link 
                        to={`/mainblogs/case-study/${study.slug}`} 
                        className="hover:opacity-80 transition-opacity"
                      >
                        {study.title}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>

            <div className="flex flex-col space-y-8">
              <div className="flex flex-col font-helvetica text-white">
                <h2 className="text-xl font-medium mb-6">Contact Us</h2>
                <div className="space-y-3">
                  <div className="flex gap-4">
                    <span className="text-white/70 min-w-[120px]">Phone Number</span>
                    <span className="font-medium">+91 7563069397</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-white/70 min-w-[120px]">Email ID:</span>
                    <span className="font-medium">hello@curota.ai</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col text-white font-helvetica text-lg font-medium">
                <h2 className="mb-4">Social</h2>
                <div className="flex space-x-4">
                  <a 
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 bg-white rounded-full w-10 h-10 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#203e40" className="w-5 h-5">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 bg-white rounded-full w-10 h-10 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#203e40" className="w-5 h-5">
                      <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153.509.5.902 1.105 1.153 1.772.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.5.508-1.105.902-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428.247-.66.599-1.225 1.153-1.772A4.904 4.904 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.333a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.17 1.17 0 100 2.34 1.17 1.17 0 000-2.34z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 bg-white rounded-full w-10 h-10 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#203e40" className="w-5 h-5">
                      <path d="M22 5.8a8.49 8.49 0 01-2.36.64 4.13 4.13 0 001.81-2.27 8.21 8.21 0 01-2.61 1 4.1 4.1 0 00-7 3.74 11.64 11.64 0 01-8.45-4.29 4.16 4.16 0 00-.55 2.07 4.09 4.09 0 001.82 3.41 4.05 4.05 0 01-1.86-.51v.05a4.1 4.1 0 003.3 4 3.93 3.93 0 01-1.1.17 4 4 0 01-.77-.07 4.11 4.11 0 003.83 2.84A8.22 8.22 0 012 18.28a11.57 11.57 0 006.29 1.85A11.59 11.59 0 0020 8.45v-.53a8.43 8.43 0 002-2.12z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.linkedin.com/company/curota-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 bg-white rounded-full w-10 h-10 flex items-center justify-center"
                  >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="#203e40" 
                    className="w-5 h-5"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright text positioned above the line */}
          <div className="relative mt-16 mb-6">
            <p className="absolute right-0 -top-6 text-white opacity-75 text-sm font-helvetica font-normal">
              ©2024 Indusconnect Inc. | All Rights Reserved
            </p>
            <hr className="border-none h-0.5 bg-white/15 w-full" />
          </div>
        </div>

        {/* Large Curota.ai logo with lower opacity - smaller size */}
        <div className="bottom-0 left-0 right-0 flex justify-center overflow-hidden">
          <div className="w-full max-w-[800px] px-4">
            <img 
              src="/img/wordmark1.png" 
              alt="Curota.ai watermark"
              className="w-full opacity-15 object-fit object-center h-17 md:h-27"
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;