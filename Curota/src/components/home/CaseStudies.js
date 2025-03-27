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
  const [hoveredCaseStudy, setHoveredCaseStudy] = useState(null);
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  
  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        // Updated to include CarouselHover in the populate parameter
        const response = await fetch(`${process.env.REACT_APP_STRAPI_URL}/api/case-studies?populate[MainImage][populate]=*&populate[CarouselImg][populate]=*&populate[CarouselHover][populate]=*&populate[Metrics][populate]=*`);
        const result = await response.json();
        
        if (result && result.data) {
          // Log the first case study to debug
          if (result.data.length > 0) {
            console.log("Debug - First Case Study:", result.data[0]);
          }
          
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

  // Helper function to get ONLY CarouselImg URL
  const getCarouselImageUrl = (caseStudy) => {
    // Only check for CarouselImg - do not fall back to MainImage
    if (caseStudy.CarouselImg) {
      // Use the base URL if available
      if (caseStudy.CarouselImg.url) {
        return getStrapiMediaUrl(caseStudy.CarouselImg.url);
      }
      
      // Check for formats if main URL isn't working
      if (caseStudy.CarouselImg.formats) {
        // Try small format first
        if (caseStudy.CarouselImg.formats.small && caseStudy.CarouselImg.formats.small.url) {
          return getStrapiMediaUrl(caseStudy.CarouselImg.formats.small.url);
        }
        
        // Then try thumbnail
        if (caseStudy.CarouselImg.formats.thumbnail && caseStudy.CarouselImg.formats.thumbnail.url) {
          return getStrapiMediaUrl(caseStudy.CarouselImg.formats.thumbnail.url);
        }
      }
    }
    
    // Return null if CarouselImg not found, do NOT use MainImage
    return null;
  };

  // Helper function to get carousel hover image URL - copied from Mainblogs.js
  const getCarouselHoverUrl = (caseStudy) => {
    if (!caseStudy || !caseStudy.CarouselHover || !Array.isArray(caseStudy.CarouselHover) || caseStudy.CarouselHover.length === 0) {
      return null;
    }
    
    // Use the first hover image in the array
    const hoverImg = caseStudy.CarouselHover[0];
    
    if (hoverImg.url) {
      return getStrapiMediaUrl(hoverImg.url);
    }
    
    if (hoverImg.formats) {
      // Try small format first
      if (hoverImg.formats.small && hoverImg.formats.small.url) {
        return getStrapiMediaUrl(hoverImg.formats.small.url);
      }
      
      // Then try thumbnail
      if (hoverImg.formats.thumbnail && hoverImg.formats.thumbnail.url) {
        return getStrapiMediaUrl(hoverImg.formats.thumbnail.url);
      }
    }
    
    // Return null if no valid image is found
    return null;
  };

  if (loading) return <div className="text-center py-20">Loading blogs...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (caseStudies.length === 0) return null;

  return (
    <div className="bg-[url('../public/img/background-image-0.png')] bg-cover bg-center py-16">
      <div className="mx-auto px-2">
        <h2 className="text-4xl md:text-5xl font-bold text-[#203E40] text-center mb-10">Blogs</h2>
        
        <div className="relative">
          <button 
            onClick={scrollLeft}
            className="absolute left-[10px] top-1/2 -translate-y-1/2 z-10 w-[37px] flex justify-center items-center bg-white/90 border-[1.5px] border-gray-300 rounded-2xl p-3 px-5 shadow-lg"
            aria-label="Previous blog"
          >
            <span className="sr-only">Previous</span>
            <div><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="22px" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path></svg></div>
          </button>

          <div 
            ref={containerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar mb-14 py-4 px-10"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none'
            }}
          >
            {caseStudies.map((caseStudy) => {
              // Get the image URLs for this case study
              const carouselImageUrl = getCarouselImageUrl(caseStudy);
              const hoverImageUrl = getCarouselHoverUrl(caseStudy);
              const isCurrentHovered = hoveredCaseStudy === caseStudy.id;
              
              return (
                <div 
                  key={caseStudy.id}
                  className="w-[85vw] sm:w-[91vw] md:w-[460px] flex-none snap-center cursor-pointer"
                  onMouseEnter={() => setHoveredCaseStudy(caseStudy.id)}
                  onMouseLeave={() => setHoveredCaseStudy(null)}
                >
                  
                  <div className="rounded-2xl overflow-hidden h-[300px] transition-transform duration-300 hover:scale-[1.02]">
                  <Link to={`/mainblogs/case-study/${caseStudy.Slug}`}>
                    <div className="relative h-[75%] overflow-hidden">
                      {carouselImageUrl ? (
                        <img
                          src={isCurrentHovered && hoverImageUrl ? hoverImageUrl : carouselImageUrl}
                          alt={caseStudy.Title}
                          className="w-full h-full object-cover brightness-[0.85] filter transition-all duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                          <img
                            src="/img/Curota_logo_Dark.svg" 
                            alt="Logo"
                            className="w-16 h-16 opacity-20"
                          />
                        </div>
                      )}
                      {/* Reading time badge - changes color on hover */}
                      <div className={`absolute top-4 right-4 ${hoveredCaseStudy === caseStudy.id ? 'bg-white' : 'bg-[#AED0CC]'} backdrop-blur-sm rounded-xl flex items-center px-[11px] py-[5px] transition-colors duration-300`}>
                          <img src='/img/clock.png' alt='vector' className='h-6 w-6 mr-1 mb-1 inline'></img>
                          <span className="text-sm font-medium text-gray-700 my-auto pb-[2px]">{caseStudy.ReadingTime || 5} min</span>
                      </div>
                    </div>
                    
                      <div 
                        className={`text-[#284A4E] h-[25%] flex ${hoveredCaseStudy === caseStudy.id ? 'bg-white' : 'bg-[#AED0CC]'} transition-colors duration-300 items-center p-5`}>
                        <h3 className="text-base md:text-[18px] font-medium leading-tight">{caseStudy.Title}</h3>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <button 
            onClick={scrollRight}
            className="absolute right-[10px] top-1/2 -translate-y-1/2 z-10 w-[37px] flex justify-center items-center bg-white/90 border-[1.5px] border-gray-300 rounded-2xl p-3 px-5 shadow-lg"
            aria-label="Next blog"
          >
            <span className="sr-only">Next</span>
            <div><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="22px" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path></svg></div>
          </button>
        </div>
        
        {/* Progress indicator */}
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