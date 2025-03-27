// src/components/FeaturedArticles.js
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

const FeaturedArticles = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredArticle, setHoveredArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Fetch articles with media/images included
        const response = await fetch(`${process.env.REACT_APP_STRAPI_URL}/api/featured-articles?populate=*`);
        const result = await response.json();
        
        if (result && result.data) {
          setArticles(result.data);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles');
        setLoading(false);
      }
    };
    
    fetchArticles();
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
  }, [articles]); // Re-run when articles change as it affects scrollWidth

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

  // Helper function to get image URL if available
  const getImageUrl = (article) => {
    // Check for Image in the format from your API (direct object, not data.attributes)
    if (article.Image && article.Image.url) {
      return getStrapiMediaUrl(article.Image.url);
    }
    
    // Check for smaller format if available
    if (article.Image && article.Image.formats && article.Image.formats.small && article.Image.formats.small.url) {
      return getStrapiMediaUrl(article.Image.formats.small.url);
    }
    
    // Fallback to thumbnail if available
    if (article.Image && article.Image.formats && article.Image.formats.thumbnail && article.Image.formats.thumbnail.url) {
      return getStrapiMediaUrl(article.Image.formats.thumbnail.url);
    }
    
    // Check other potential image fields
    if (article.image && article.image.url) {
      return getStrapiMediaUrl(article.image.url);
    }
    
    // Return null if no image is found
    return null;
  };

  if (loading) return <div className="text-center py-20 text-white">Loading articles...</div>;
  if (error) return <div className="text-center py-20 text-red-300">{error}</div>;
  if (articles.length === 0) return null;

  return (
    <div className="bg-contain bg-[url('../public/img/background-image-0.png')] py-16">
      <div className="mx-auto px-2">
        <h2 className="text-4xl md:text-5xl font-bold text-[#C6E7E2] text-center mb-16">Blogs</h2>
        
        <div className="relative">
          <button 
            onClick={scrollLeft}
            className="absolute left-[10px] top-1/2 -translate-y-1/2 z-10 w-[37px] flex justify-center items-center bg-white/90 border-[1.5px] border-gray-300 rounded-2xl p-3 px-5 shadow-lg"
            aria-label="Previous article"
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
            {articles.map((article) => (
              <div 
                key={article.id}
                className="w-[85vw] sm:w-[91vw] md:w-[460px] flex-none snap-center cursor-pointer"
                onMouseEnter={() => setHoveredArticle(article.id)}
                onMouseLeave={() => setHoveredArticle(null)}
              >
                <div className="rounded-2xl overflow-hidden h-[300px] shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                  <div className="relative h-[75%] overflow-hidden">
                    {getImageUrl(article) ? (
                      <img
                        src={getImageUrl(article)}
                        alt={article.Title}
                        className="w-full h-full object-cover brightness-[0.85] filter"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-500">Article Image</span>
                      </div>
                    )}
                    {/* Reading time badge - changes to white on hover */}
                    <div className={`absolute top-4 right-4 ${hoveredArticle === article.id ? 'bg-white' : 'bg-[#C6E7E2]'} backdrop-blur-sm rounded-full flex items-center px-[11px] py-[6px] transition-colors duration-300`}>
                      <svg className="w-4 h-4 mr-1 text-gray-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span className="text-sm font-medium text-gray-700">{article.ReadingTime || 5} min</span>
                    </div>
                  </div>
                  <Link to={`/articles/${article.Slug}`}>
                    <div 
                      className={`text-[#284A4E] h-[25%] flex ${hoveredArticle === article.id ? 'bg-white' : 'bg-[#C6E7E2]'} transition-colors duration-300 items-center p-5`}
                    >
                      <h3 className="text-base md:text-[18px] font-medium leading-tight">{article.Title}</h3>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={scrollRight}
            className="absolute right-[10px] top-1/2 -translate-y-1/2 z-10 w-[37px] flex justify-center items-center bg-white/90 border-[1.5px] border-gray-300 rounded-2xl p-3 px-5 shadow-lg"
            aria-label="Next article"
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

export default FeaturedArticles;