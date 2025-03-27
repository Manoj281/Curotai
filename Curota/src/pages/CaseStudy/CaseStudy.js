import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

// Helper function to get Strapi media URL
const getStrapiMediaUrl = (imagePath) => {
  if (!imagePath) return null;
  
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  return `${process.env.REACT_APP_STRAPI_URL}${imagePath}`;
};

// Helper function to extract text from Strapi structured content
const extractText = (structuredContent) => {
  if (!structuredContent || !Array.isArray(structuredContent)) return '';
  
  let text = '';
  structuredContent.forEach(block => {
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

const NavigationItem = ({ title, activeSection, onClick }) => (
  <div className='relative z-30'>
    <div 
      className="flex items-center gap-2 py-3 cursor-pointer"
      onClick={() => onClick(title)}
    >
      <div className={`w-[15px] h-[15px] rounded-full border-[5px] border-[#d8e9e7] bg-[#203e40] z-10 ${activeSection === title ? 'bg-[#203e40]' : 'bg-[#203e40]/20'}`}></div>
      
      <div className={`text-[#203e40]/80 hover:text-[#203e40] font-helvetica ml-2 text-lg text-gray-500 transition-colors
        ${activeSection === title ? 'text-[#203e40] font-medium' : ''}`}
      >
        {title}
      </div>
    </div>
  </div>
);

const InfoBox = ({ title, icon, content, onClick, isActive }) => (
  <div 
    onClick={onClick}
    className={`z-10 rounded-2xl border border-[#203e40]/20 p-5 w-full ${isActive ? 'bg-[#e5f5f3]' : 'bg-white'} shadow-sm hover:shadow transition-shadow cursor-pointer`}
  >
    <div className="text-center text-gray-800 font-lg mb-3">{title}</div>
    <div className="flex  justify-center gap-3">
      <div>{icon}</div>
      <div className="text-[#203e40]/70 text-xl uppercase font-semibold">{content}</div>
    </div>
  </div>
);

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const [activeSection, setActiveSection] = useState('');
  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const testimonialsRef = useRef(null);
  const sectionRefs = useRef({});
  
  // First useEffect - guaranteed to be called in the same order
  useEffect(() => {
    if (caseStudy?.contentTitles?.length > 0 && !activeSection) {
      setActiveSection(caseStudy.contentTitles[0]);
    }
  }, [caseStudy?.contentTitles, activeSection]);
  
  useEffect(() => {
    // Process bullet points from Bulletpara array - moved inside
    const extractBulletPoints = (bulletparaArray) => {
      if (!bulletparaArray || !Array.isArray(bulletparaArray)) return [];
      
      return bulletparaArray
        .filter(bullet => bullet.BulletPara && bullet.BulletPara.length > 0)
        .map(bullet => extractText(bullet.BulletPara))
        .filter(text => text.trim() !== '');
    };

    // Check if Metrics has valid content - moved inside
    const hasValidMetrics = (metrics) => {
      if (!metrics) return false;
      if (!metrics.Items) return false;
      if (!Array.isArray(metrics.Items)) return false;
      if (metrics.Items.length === 0) return false;
      
      // Check if items have actual values
      return metrics.Items.some(item => item && item.Title && item.Value);
    };

    // Move processCaseStudyData inside useEffect
    const processCaseStudyData = (data) => {
      const processed = {
        ...data,
        contentSections: [],
        contentTitles: []
      };

      // Process InitialIntroduction if available
      if (data.InitialIntroduction && Array.isArray(data.InitialIntroduction) && data.InitialIntroduction.length > 0) {
        processed.InitialIntroduction = data.InitialIntroduction;
      }

      // Check if metrics should be included
      const shouldIncludeMetrics = hasValidMetrics(data.Metrics);

      // Process dynamic content sections
      if (data.Content && Array.isArray(data.Content)) {
        data.Content.forEach((section, index) => {
          // Add metrics after 2nd content section, but ONLY if it has valid content
          if (index === 2 && shouldIncludeMetrics) {
            processed.contentSections.push({
              type: 'metrics',
              title: data.Metrics.Title || 'Metrics',
              metricsData: {
                title: data.Metrics.Title,
                description: data.Metrics.Description,
                items: data.Metrics.Items
              }
            });
            processed.contentTitles.push(data.Metrics.Title || 'Metrics');
          }

          // Extract bullet points from Bulletpara field
          const bulletPoints = section.Bulletpara ? extractBulletPoints(section.Bulletpara) : [];

          // Add content section with paragraph and bullet points
          if (section.Paragraph && section.Paragraph.length > 0) {
            processed.contentSections.push({
              type: 'content',
              title: section.Title,
              content: extractText(section.Paragraph),
              bulletPoints: bulletPoints
            });
            processed.contentTitles.push(section.Title);
          }
        });
      }

      // Add testimonials title if testimonials exist
      if (data.Testimonial && data.Testimonial.length > 0) {
        processed.contentTitles.push('Client Testimonials');
      }

      setCaseStudy(processed);
    };

    const fetchCaseStudy = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_STRAPI_URL}/api/case-studies?populate[Content][populate]=*&populate[Metrics][populate]=*&populate[Testimonial][populate]=*&populate[MainImage][populate]=*&filters[Slug]=${slug}`);
        const result = await response.json();
        
        if (!result || !result.data || result.data.length === 0) {
          setError('Case study not found');
          setLoading(false);
          return;
        }
        
        // Process the data to create dynamic content
        processCaseStudyData(result.data[0]);
        setLoading(false);
        
        // Only scroll to top on initial load
        if (isInitialLoad) {
          window.scrollTo(0, 0);
          setIsInitialLoad(false);
        }
      } catch (err) {
        console.error('Error fetching case study details:', err);
        setError('Failed to load case study details');
        setLoading(false);
      }
    };
    
    fetchCaseStudy();
  }, [slug, isInitialLoad]);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = sectionRefs.current[sectionId];
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  const jumpToTestimonials = () => {
    setActiveSection('Client Testimonials');
    if (testimonialsRef.current) {
      testimonialsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (loading) return <div className="text-center py-20">Loading case study...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!caseStudy) return <div className="text-center py-20">Case study not found</div>;

  // Prepare testimonials
  const testimonials = caseStudy.Testimonial ? 
    caseStudy.Testimonial.filter(t => t.Name && t.Content) : [];

  return (
    <div className="bg-[#f0f8f8] min-h-screen">
      
      <div
        className="w-full text-center relative py-16"
        style={{
          position: 'relative',
        }}
      >
        {/* Background image with reduced opacity */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50 z-0"
          style={{
            backgroundImage: `url(${caseStudy.MainImage ? getStrapiMediaUrl(caseStudy.MainImage.url) : '../public/img/background-image-0.png'})`
          }}
        ></div>
        
        {/* Content with full opacity */}
        <div className="relative z-10">
          <div className='m-[18vh]'></div>
          <div className="mx-auto px-4">
            <h1 className="text-4xl md:text-4xl lg:text-4xl font-bold text-[#203e40] mb-6">
              {caseStudy.Title}
            </h1>
            <p className="text-xl text-center mx-auto max-w-[900px]">
              {caseStudy.InitialIntroduction ? extractText(caseStudy.InitialIntroduction) : ""}
            </p>
          </div>
          <div className='m-[4vh]'></div>
        </div>
      </div>

      <div className="relative w-full max-w-[800px] mx-auto px-4 -mt-16 z-10">
        {caseStudy.contentTitles && caseStudy.contentTitles.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className='w-[6px] md:h-[70%] h-[35%] absolute top-[47px] left-[45.2px] bg-[#d8e9e7] z-1'></div>
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-6 p-6 border-b md:border-b-0 md:border-r border-gray-200">
                {caseStudy.contentTitles.map((section) => (
                  <NavigationItem
                    key={section}
                    title={section}
                    activeSection={activeSection}
                    onClick={scrollToSection}
                  />
                ))}
              </div>
              <div className="md:col-span-6 p-6">
                <div className="space-y-6">
                  <InfoBox
                    title="Reading time"
                    className="w-2"
                    icon={<img src="/img/mingcute_time-fill.png" alt="Clock icon" className="w-6 h-6" />}
                    content={`${caseStudy.ReadingTime || 10} mins`}
                    isActive={false}
                  />
                    {testimonials.length > 0 && (
                      <div className='relative z-10'>
                        {/* 3D effect background div */}
                        <div className="absolute -bottom-1.5 -left-1.5 border-[1.5px] border-gray-300 rounded-[18px] w-full h-full z-0"></div>
                        <div className="relative z-10">
                          <InfoBox
                            title="Jump To"
                            icon={
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                                <path d="M8 2L15 9L8 16" fill="#203E40" fillOpacity="0.7"/>
                              </svg>
                            }
                            content="TESTIMONIALS"
                            onClick={jumpToTestimonials}
                            isActive={true}
                          />
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-screen px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          {caseStudy.contentSections && caseStudy.contentSections.map((section, index) => {
            if (section.type === 'metrics' && section.metricsData && section.metricsData.items && section.metricsData.items.length > 0) {
              return (
                <section 
                  key={`metrics-${index}`} 
                  ref={el => sectionRefs.current[section.title] = el} 
                  className="mb-16"
                >
                  <div className="bg-[#203e40] rounded-3xl overflow-hidden shadow-lg">
                    <div className="p-10 md:p-16">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        <div className="md:col-span-5">
                          <h3 className="text-4xl md:text-5xl text-[#e5f5f3] font-semibold mb-4">
                            {section.metricsData.title}
                          </h3>
                          {section.metricsData.description && (
                            <p className="text-white/80 text-lg">
                              {section.metricsData.description}
                            </p>
                          )}
                        </div>
                        <div className="md:col-span-7">
                          <div className="grid grid-cols-2 gap-8">
                            {section.metricsData.items.map((metric, metricIndex) => (
                              <div key={metricIndex} className="text-[#e5f5f3]">
                                <div className="text-4xl md:text-5xl font-bold mb-2">{metric.Value}</div>
                                <div className="text-xl">{metric.Title}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              );
            }

            if (section.type === 'content') {
              return (
                <section 
                  key={`content-${index}`} 
                  ref={el => sectionRefs.current[section.title] = el} 
                  className="mb-16"
                >
                  <h2 className="text-4xl font-bold text-[#203e40] mb-6">{section.title}</h2>
                  <div className="prose prose-lg max-w-none text-gray-800">
                    {section.content}
                    
                    {/* Display bullet points if they exist */}
                    {section.bulletPoints && section.bulletPoints.length > 0 && (
                      <ul className="mt-6 list-disc pl-5 space-y-2">
                        {section.bulletPoints.map((bullet, idx) => (
                          <li key={idx} className="text-gray-800">{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              );
            }

            return null; // Skip any section that doesn't match known types
          })}

          {/* Testimonials Section - only show if testimonials exist */}
          {testimonials.length > 0 && (
            <section 
              ref={el => {
                testimonialsRef.current = el;
                sectionRefs.current['Client Testimonials'] = el;
              }} 
              className="mt-12 md:mt-16 mb-12 md:mb-16"
            >
              <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold text-center text-[#203e40] mb-8 md:mb-12">
                TESTIMONIALS
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white rounded-xl p-5 sm:p-6 md:p-8 shadow-sm">
                    <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                      {/* Person image */}
                      <img 
                        src={testimonial.Image ? getStrapiMediaUrl(testimonial.Image.url) : "/img/carosuel-person.png"}
                        alt={testimonial.Name} 
                        className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-none object-cover"
                      />
                      <div>
                        <h3 className="text-lg sm:text-xl md:text-xl font-semibold text-[#203e40]">{testimonial.Name}</h3>
                        <p className="text-sm sm:text-base text-[#203e40]">{testimonial.Title}{testimonial.Company ? `, ${testimonial.Company}` : ''}</p>
                      </div>
                      <div className="ml-auto">
                        <img 
                          src={testimonial.CompanyLogo ? getStrapiMediaUrl(testimonial.CompanyLogo.url) : "/img/dji-logo.png"}
                          alt="Company Logo" 
                          className="h-6 sm:h-8 md:h-9 opacity-50"
                        />
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      {testimonial.Content}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <div className="fixed bottom-8 right-8">
        <button 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          className="bg-[#203e40] text-white p-3 rounded-full shadow-lg hover:bg-[#203e40]/90 transition-colors"
          aria-label="Back to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CaseStudyDetail;
