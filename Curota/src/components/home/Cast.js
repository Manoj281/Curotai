// src/components/TestimonialCarousel.js
import React, { useRef, useState, useEffect } from 'react';

// Helper function to get Strapi media URL
const getStrapiMediaUrl = (imagePath) => {
  if (!imagePath) return null;
  
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  return `${process.env.REACT_APP_STRAPI_URL}${imagePath}`;
};

const TestimonialCarousel = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // Fetch testimonials with media/images included
        const response = await fetch(`${process.env.REACT_APP_STRAPI_URL}/api/testimonials?populate=*`);
        const result = await response.json();
        
        if (result && result.data) {
          setTestimonials(result.data);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('Failed to load testimonials');
        setLoading(false);
      }
    };
    
    fetchTestimonials();
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
  }, [testimonials]); // Re-run when testimonials change as it affects scrollWidth

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -700, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 700, behavior: 'smooth' });
    }
  };

  // Helper function to extract text content from the Content field
  const getContentText = (content) => {
    if (!content || !Array.isArray(content)) return '';
    
    // Extract text from the Content field structure
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
  
  // Helper function to get person image URL
  const getPersonImageUrl = (testimonial) => {
    if (testimonial.Image && testimonial.Image.url) {
      return getStrapiMediaUrl(testimonial.Image.url);
    }
    return null;
  };
  
  // Helper function to get company logo URL
  const getCompanyLogoUrl = (testimonial) => {
    if (testimonial.CompanyLogo && testimonial.CompanyLogo.url) {
      return getStrapiMediaUrl(testimonial.CompanyLogo.url);
    }
    
    // Use smaller formats if available
    if (testimonial.CompanyLogo && testimonial.CompanyLogo.formats) {
      if (testimonial.CompanyLogo.formats.small) {
        return getStrapiMediaUrl(testimonial.CompanyLogo.formats.small.url);
      }
      if (testimonial.CompanyLogo.formats.thumbnail) {
        return getStrapiMediaUrl(testimonial.CompanyLogo.formats.thumbnail.url);
      }
    }
    
    return null;
  };

  if (loading) return <div className="text-center py-20">Loading testimonials...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  

  return (
    <div className="h-[72vh] min-h-[620px] bg-cover bg-[url('../public/img/background-image-0.png')] bg-center pt-[40px]">
      <div className="mb-auto sm:px-4 h-full flex flex-col justify-center pb-[60px]">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-[#203e40]">
            Why Trust us?
          </h1>
        </div>
        <div className="relative">
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-[37px] flex justify-center items-center bg-white/90 border-[1.5px] border-gray-300 rounded-2xl p-3 px-5 shadow-lg"
            aria-label="Previous testimonial"
          >
            <span className="sr-only">Previous</span>
            <div><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="22px" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path></svg></div>
          </button>

          <div 
            ref={containerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-6"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              marginLeft: '30px',
              marginRight: "30px"
            }}
          >
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="relative max-w-[92vw] md:max-w-[550px] h-[350px] flex-none snap-center bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-start gap-4 mb-4">
                  {getPersonImageUrl(testimonial) ? (
                    <img
                      src={getPersonImageUrl(testimonial)}
                      alt={testimonial.Name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-500">No image</span>
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-2xl">{testimonial.Name}</h3>
                      {testimonial.Country && (
                        <span className="text-2xl">
                          {testimonial.Country === 'de' ? '🇩🇪' : testimonial.Country}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-lg">{testimonial.Title}, {testimonial.Company}</p>
                    {testimonial.Company && (
                      <div className="absolute right-6 top-6 gap-2 mt-1">
                        
                        {getCompanyLogoUrl(testimonial) && (
                          <img 
                            src={getCompanyLogoUrl(testimonial)} 
                            alt={`${testimonial.Company} logo`}
                            className="h-7 w-auto"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed line-clamp-6">
                  {getContentText(testimonial.Content)}
                </p>
              </div>
            ))}
          </div>

          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-[37px] flex justify-center items-center bg-white/90 border-[1.5px] border-gray-300 rounded-2xl p-3 px-5 shadow-lg"
            aria-label="Next testimonial"
          >
            <span className="sr-only">Next</span>
            <div><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="22px" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path></svg></div>
          </button>
        </div>

        {/* Navigator style progress indicator */}
        <div className="mt-8 w-48 h-2 mx-auto bg-gray-200 rounded-full relative">
          <div 
            className="h-full w-[25px] bg-teal-500 rounded-full absolute transition-all duration-300"
            style={{ 
              left: `calc(${scrollProgress}% - 25px * ${scrollProgress / 100})`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;