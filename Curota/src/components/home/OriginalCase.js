// src/components/CaseStudies.js
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Helper function to get Strapi media URL
const getStrapiMediaUrl = (imagePath) => {
  if (!imagePath) return null;
  
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  return `${process.env.REACT_APP_STRAPI_URL}${imagePath}`;
};

const CaseStudies = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  
  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        // Using the populate deep parameter to get all nested relations
        const response = await fetch(`${process.env.REACT_APP_STRAPI_URL}/api/case-studies?populate[Metrics][populate]=Items`);
        const result = await response.json();
        
        if (result && result.data) {
          setCaseStudies(result.data);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching case studies:', err);
        setError('Failed to load case studies');
        setLoading(false);
      }
    };
    
    fetchCaseStudies();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const scrollWidth = container.scrollWidth - container.clientWidth;
        
        // Prevent division by zero
        if (scrollWidth <= 0) {
          setScrollProgress(0);
          return;
        }
        
        const scrollLeft = container.scrollLeft;
        const progress = Math.min(100, Math.max(0, (scrollLeft / scrollWidth) * 100));
        
        setScrollProgress(progress);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      
      // Call once to initialize
      handleScroll();
      
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [caseStudies]); // Re-run when caseStudies change as it affects scrollWidth

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  // Helper function to extract text content from rich text fields
  const getContentText = (content) => {
    if (!content || !Array.isArray(content)) return '';
    
    let text = '';
    content.forEach(block => {
      if (block.children && Array.isArray(block.children)) {
        block.children.forEach(child => {
          if (child.text) {
            text += child.text + ' ';
          }
        });
      }
    });
    
    return text.trim();
  };

  if (loading) return <div className="text-center py-20">Loading case studies...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (caseStudies.length === 0) return null;

  return (
    <div className="bg-cover bg-[url('../public/img/background-image-0.png')] bg-center pb-20 relative">
      <div className="relative mx-auto px-4 min-h-[48vh] pt-[7vh]">
        <h2 className="text-4xl md:text-5xl font-bold text-black text-center mb-[60px]">Blogs</h2>
        
        <div className="relative">
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-[37px] flex justify-center items-center bg-white/90 border-[1.5px] border-gray-300 rounded-2xl p-3 px-5 shadow-lg"
            aria-label="Previous case study"
          >
            <span className="sr-only">Previous</span>
            <div><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="22px" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path></svg></div>
          </button>

          <div 
            ref={containerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar mb-12 px-10"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none'
            }}
          >
            {caseStudies.map((study, index) => (
              <div 
                key={study.id}
                className="min-w-[300px] md:min-w-[350px] flex-none snap-center"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Card */}
                <div className="rounded-3xl overflow-hidden h-48 md:h-56 relative">
                  {/* Default state - with logo and title band at bottom */}
                  {hoveredIndex !== index && (
                    <div className="h-full bg-[#dbe7e7] flex flex-col">
                      {/* Logo container - 75% height */}
                      <div className="h-[75%] flex items-center justify-center">
                        <img
                          src="/img/Curota_logo_Dark.svg" 
                          alt="Logo"
                          className="w-16 h-16 opacity-20"
                        />
                      </div>
                      
                      {/* Title band - 25% height */}
                      <div 
                        className={`h-[25%] w-full flex items-center justify-center`}
                        style={{ backgroundColor: study.BannerColor || '#f0e0a2' }}
                      >
                        <h3 
                          className={`text-base md:text-lg font-medium px-4 text-center`}
                          style={{ color: study.TextColor || '#c97948' }}
                        >
                          {study.Title}
                        </h3>
                      </div>
                    </div>
                  )}
                  
                  {/* Hover state - content */}
                  {hoveredIndex === index && (
                    <div 
                      className={`p-7 h-full`}
                      style={{ backgroundColor: study.HoverColor || '#f0e0a2' }}
                    >
                      <h3 
                        className={`text-2xl font-semibold mb-4`}
                        style={{ color: study.TextColor || '#c97948' }}
                      >
                        {study.Title}
                      </h3>
                      <ul 
                        className={`list-disc pl-5 `}
                        style={{ color: study.TextColor || '#c97948' }}
                      >
                        {study.BulletPoints && study.BulletPoints.map((point, i) => (
                          <li key={i} className="mb-2">{point.Text}</li>
                        ))}
                        
                        {/* If no bullet points, show metrics items as bullets */}
                        {(!study.BulletPoints || study.BulletPoints.length === 0) && 
                         study.Metrics && study.Metrics.Items && (
                          study.Metrics.Items
                            .filter(item => item.Title && item.Value) // Filter out null items
                            .map((item, i) => (
                              <li key={i} className="mb-2 text-lg">
                                {item.Title}: {item.Value}
                              </li>
                            ))
                        )}
                      </ul>
                      
                      {/* Arrow button */}
                      <Link to={`/mainblogs/case-study/${study.Slug}`}>
                        <div 
                          className={`absolute bottom-4 right-4 bg-white/20 rounded-full p-2`}
                          style={{ color: study.TextColor || '#c97948' }}
                        >
                          <svg width="24" height="26" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z" />
                          </svg>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-[37px] flex justify-center items-center bg-white/90 border-[1.5px] border-gray-300 rounded-2xl p-3 px-5 shadow-lg"
            aria-label="Next case study"
          >
            <span className="sr-only">Next</span>
            <div><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="22px" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path></svg></div>
          </button>
        </div>

        
        {/* Scroll-bar style progress indicator */}
        <div className="mt-8 w-48 h-2 mx-auto bg-gray-200 rounded-full relative">
          <div 
            className="h-full w-[25px] bg-teal-400 rounded-full absolute transition-all duration-300"
            style={{ 
              left: `calc(${scrollProgress}% - 25px * ${scrollProgress / 100})`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;