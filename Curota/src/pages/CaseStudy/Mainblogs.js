// src/components/Mainblogs.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Helper function to get Strapi media URL
const getStrapiMediaUrl = (imagePath) => {
  if (!imagePath) return null;
  
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  return `${process.env.REACT_APP_STRAPI_URL}${imagePath}`;
};

const CaseStudiesPage = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        // Populate both MainImage and CarouselImg for cards, and also CarouselHover
        const response = await fetch(
          `${process.env.REACT_APP_STRAPI_URL}/api/case-studies?populate[MainImage][populate]=*&populate[CarouselImg][populate]=*&populate[CarouselHover][populate]=*&populate[Metrics][populate]=*`
        );
        const result = await response.json();
        
        if (result && result.data) {
          console.log("API Response:", result.data); // Log the data to see its structure
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

  // Helper function to get carousel image URL
  const getCarouselImageUrl = (caseStudy) => {
    if (!caseStudy || !caseStudy.CarouselImg) return null;
    
    const carouselImg = caseStudy.CarouselImg;
    
    if (carouselImg.url) {
      return getStrapiMediaUrl(carouselImg.url);
    }
    
    if (carouselImg.formats) {
      // Try small format first
      if (carouselImg.formats.small && carouselImg.formats.small.url) {
        return getStrapiMediaUrl(carouselImg.formats.small.url);
      }
      
      // Then try thumbnail
      if (carouselImg.formats.thumbnail && carouselImg.formats.thumbnail.url) {
        return getStrapiMediaUrl(carouselImg.formats.thumbnail.url);
      }
    }
    
    // Return null if no valid image is found
    return null;
  };

  // Helper function to get carousel hover image URL
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

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Section with Logo and Title */}
      <div className="py-20 relative bg-cover bg-center bg-[url('../public/img/background-image-0.png')] flex flex-col items-center">
        <div className='m-[5vh]'></div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full h-[160px] mb-6"
        >
          <img src="/img/caselogo.png" alt="Logo icon" className="mx-auto w-[115px] h-[137px]" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-black text-center mb-4"
        >
          Blogs
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/60 backdrop-blur-sm py-2 px-6 rounded-full font-semibold text-[#203e40]"
        >
          <img src='/img/vector.png' alt='vector' className='h-5 w-5 mr-1 mb-1 inline'></img>
          NOS: {caseStudies.length}
        </motion.div>
      </div>

      {/* Case Studies Grid - Updated to match FeaturedArticles design */}
      <div className="container mx-auto px-4 sm:px-8 mt-[80px] mb-[400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8">
          {caseStudies.map((caseStudy, index) => {
            // Get the normal and hover image URLs for this case study
            const carouselImageUrl = getCarouselImageUrl(caseStudy);
            const hoverImageUrl = getCarouselHoverUrl(caseStudy);
            const isCurrentHovered = hoveredIndex === index;
            
            // Safely access properties with fallbacks
            const slug = caseStudy.Slug || `case-study-${index}`;
            const title = caseStudy.Title || 'Untitled Case Study';
            const readingTime = caseStudy.ReadingTime || 5;
            
            return (
              <motion.div
                key={caseStudy.id || index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="rounded-2xl overflow-hidden h-[300px] shadow-sm transition-transform duration-300 max-w-[400px] mx-auto hover:scale-[1.02]">
                  <Link to={`/mainblogs/case-study/${slug}`}>
                    <div className="relative h-[75%] overflow-hidden">
                      {carouselImageUrl ? (
                        <img
                          src={isCurrentHovered && hoverImageUrl ? hoverImageUrl : carouselImageUrl}
                          alt={title}
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
                      <div className={`absolute top-4 right-4 ${isCurrentHovered ? 'bg-white' : 'bg-[#C6E7E2]'} backdrop-blur-sm rounded-xl flex items-center px-[11px] py-[6px] transition-colors duration-300`}>
                        <img src='/img/clock.png' alt='clock' className='h-6 w-6 mr-1 mb-1 inline'></img>
                        <span className="text-sm font-medium text-gray-700 my-auto pb-[2px]">
                          {readingTime} min
                        </span>
                      </div>
                    </div>
                    
                    <div 
                      className={`text-[#284A4E] h-[25%] flex ${isCurrentHovered ? 'bg-white' : 'bg-[#C6E7E2]'} transition-colors duration-300 items-center p-5`}>
                      <h3 className="text-base md:text-lg font-medium leading-tight">
                        {title}
                      </h3>
                    </div>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-center mt-[80px]">
        <Link 
          to="/"
          className="flex items-center"
        >
          <button className="bg-[#d1e5e1] text-[#203e40] rounded-full shadow-xl px-16 py-5 flex items-center gap-6 hover:bg-[#c0d9d4] transition-colors duration-300">
            <span className="text-2xl font-semibold">Go Back</span>
            <svg stroke="currentColor" fill="[#203e40]" strokeWidth="0" viewBox="0 0 16 16" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M5.854 4.646a.5.5 0 010 .708L3.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clipRule="evenodd"></path>
              <path fillRule="evenodd" d="M2.5 8a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H3a.5.5 0 01-.5-.5z" clipRule="evenodd"></path>
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CaseStudiesPage;