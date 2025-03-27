import React, { useState,  useRef } from 'react';

const AccordionItem = ({ title, isOpen, onClick }) => (
  <div className="border-b border-gray-200 last:border-b-0  hover:bg-gray-200 hover:underline px-6 py-2">
    <div 
      className="flex items-center justify-between py-3 px-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 hover:underline">
        <div className="w-[13px] h-[13px] rounded-full border-[4.5px] border-[#d8e9e7] bg-[#203e40]"></div>
        <div className="text-[#203e40] font-helvetica text-lg ml-1">
          {title}
        </div>
      </div>
      <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L7 7L13 1" stroke="#203E40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
);

// Service Example Card Component
const ServiceExampleCard = () => (
  <div className="bg-[#e4f6f3] rounded-lg p-4 h-32 flex items-center justify-center">
    <div className="bg-[#95b5b1] w-24 h-10 rounded-lg"></div>
  </div>
);

// Image Classification Section Component
const ImageClassificationSection = () => (
  <div className="mb-12">
    <h3 className="text-2xl font-semibold text-[#203e40] mb-6">Image Classification</h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <ServiceExampleCard />
      <ServiceExampleCard />
    </div>
    
    <div className="mb-6">
      <h4 className="text-lg font-medium text-[#203e40] mb-2">Business Application</h4>
      <p className="text-[#203e40]/80 mb-4">
        Datasets are the core of Computer Vision, essential for realizing the prowess of AI and Machine Learning. They convert visual 
        information into structured data that machines comprehend, a process we specialize in. We meticulously transform real-world 
        visuals into annotated data, establishing a connection between human vision and machine understanding.
      </p>
    </div>
    
    <div>
      <h4 className="text-lg font-medium text-[#203e40] mb-2">Use Cases</h4>
      <p className="text-[#203e40]/80">
        Datasets are the core of Computer Vision, essential for realizing the prowess of AI and Machine Learning. They convert visual 
        information into structured data that machines comprehend, a process we specialize in. We meticulously transform real-world 
        visuals into annotated data, establishing a connection between human vision and machine understanding.
      </p>
    </div>
  </div>
);


// Green header bar with icon for sections
const SectionHeader = ({ title, icon }) => (
  <div className="flex items-center bg-[#d8f0e9] rounded-t-lg mb-0">
    <div className="bg-[#203E401A] p-5 pr-4">
      {icon === 'image' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#203e40]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ) : icon === 'video' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#203e40]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#203e40]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      )}
    </div>
    <h2 className="ml-4 text-3xl text-[#203e40] font-semibold">{title}</h2>
  </div>
);

const ServicesPage = () => {
  const [activeSection, setActiveSection] = useState("Image Annotation");

  // Refs for each section
  const imageAnnotationRef = useRef(null);
  const videoAnnotationRef = useRef(null);
  const gisRef = useRef(null);
  

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    
    // Use setTimeout to ensure the DOM has updated
    setTimeout(() => {
      if (sectionId === 'Image Annotation' && imageAnnotationRef.current) {
        imageAnnotationRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (sectionId === 'Video Annotation' && videoAnnotationRef.current) {
        videoAnnotationRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (sectionId === 'GIS' && gisRef.current) {
        gisRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Updated section names to match the image
  const sections = [
    'Image Annotation',
    'Video Annotation',
    'GIS'
  ];

  return (
  <div className="min-h-screen bg-[#f0f8f8]">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-gray-900 to-gray-700 bg-blend-overlay bg-opacity-80 relative py-16" style={{ backgroundImage: "url('/img/movielogo.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-[url('../public/img/bgservices.png')] bg-cover opacity-85"></div>
        <div className="relative z-10 mx-auto px-4 text-center">
          <div className="m-[17vh]"></div>
          <div className="flex justify-center mb-8">
            <img src="/img/setting.png" alt="Insurance Icon" className="h-[100px]" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our Services
          </h1>
          <div className="m-[9vh]"></div>
        </div>
      </div>

      {/* Navigation Box */}
      <div className="w-full max-w-2xl mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
          <div id="image-annotation" ref={imageAnnotationRef}>
            {sections.map((section) => (
              <AccordionItem
                key={section}
                title={section}
                isOpen={activeSection === section}
                onClick={() => scrollToSection(section)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - All sections displayed at once with refs for scrolling */}
      <div className="mx-auto p-12 max-w-screen">
        {/* Image Annotation Section */}
        <div 
          className="rounded-lg overflow-hidden shadow-sm mb-12 border border-gray-200"
        >
          <SectionHeader title="Image Annotation" icon="image" />
          
          <div className="bg-white p-6">
          <section id="segmentation">
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-[#203e40] mb-6">Segmentation</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ServiceExampleCard />
              <ServiceExampleCard />
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium text-[#203e40] mb-2">Business Application</h4>
              <p className="text-[#203e40]/80 mb-4">
                Datasets are the core of Computer Vision, essential for realizing the prowess of AI and Machine Learning. They convert visual 
                information into structured data that machines comprehend, a process we specialize in. We meticulously transform real-world 
                visuals into annotated data, establishing a connection between human vision and machine understanding.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-[#203e40] mb-2">Use Cases</h4>
              <p className="text-[#203e40]/80">
                Datasets are the core of Computer Vision, essential for realizing the prowess of AI and Machine Learning. They convert visual 
                information into structured data that machines comprehend, a process we specialize in. We meticulously transform real-world 
                visuals into annotated data, establishing a connection between human vision and machine understanding.
              </p>
            </div>
          </div>
          </section>
          <section id="bounding-box">
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-[#203e40] mb-6">Bounding Box</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ServiceExampleCard />
              <ServiceExampleCard />
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium text-[#203e40] mb-2">Business Application</h4>
              <p className="text-[#203e40]/80 mb-4">
                Datasets are the core of Computer Vision, essential for realizing the prowess of AI and Machine Learning. They convert visual 
                information into structured data that machines comprehend, a process we specialize in. We meticulously transform real-world 
                visuals into annotated data, establishing a connection between human vision and machine understanding.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-[#203e40] mb-2">Use Cases</h4>
              <p className="text-[#203e40]/80">
                Datasets are the core of Computer Vision, essential for realizing the prowess of AI and Machine Learning. They convert visual 
                information into structured data that machines comprehend, a process we specialize in. We meticulously transform real-world 
                visuals into annotated data, establishing a connection between human vision and machine understanding.
              </p>
            </div>
          </div>
          </section>
          <section id="polygon">
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-[#203e40] mb-6">Polygon</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ServiceExampleCard />
              <ServiceExampleCard />
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium text-[#203e40] mb-2">Business Application</h4>
              <p className="text-[#203e40]/80 mb-4">
                Datasets are the core of Computer Vision, essential for realizing the prowess of AI and Machine Learning. They convert visual 
                information into structured data that machines comprehend, a process we specialize in. We meticulously transform real-world 
                visuals into annotated data, establishing a connection between human vision and machine understanding.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-[#203e40] mb-2">Use Cases</h4>
              <p className="text-[#203e40]/80">
                Datasets are the core of Computer Vision, essential for realizing the prowess of AI and Machine Learning. They convert visual 
                information into structured data that machines comprehend, a process we specialize in. We meticulously transform real-world 
                visuals into annotated data, establishing a connection between human vision and machine understanding.
              </p>
            </div>
          </div>
          </section>
          <section id="keypoint">
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-[#203e40] mb-6">Keypoint</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ServiceExampleCard />
              <ServiceExampleCard />
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium text-[#203e40] mb-2">Business Application</h4>
              <p className="text-[#203e40]/80 mb-4">
                Datasets are the core of Computer Vision, essential for realizing the prowess of AI and Machine Learning. They convert visual 
                information into structured data that machines comprehend, a process we specialize in. We meticulously transform real-world 
                visuals into annotated data, establishing a connection between human vision and machine understanding.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-[#203e40] mb-2">Use Cases</h4>
              <p className="text-[#203e40]/80">
                Datasets are the core of Computer Vision, essential for realizing the prowess of AI and Machine Learning. They convert visual 
                information into structured data that machines comprehend, a process we specialize in. We meticulously transform real-world 
                visuals into annotated data, establishing a connection between human vision and machine understanding.
              </p>
            </div>
          </div>
          </section>
          
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-[#203e40] mb-6">Image Classification</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ServiceExampleCard />
              <ServiceExampleCard />
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium text-[#203e40] mb-2">Business Application</h4>
              <p className="text-[#203e40]/80 mb-4">
                Datasets are the core of Computer Vision, essential for realizing the prowess of AI and Machine Learning. They convert visual 
                information into structured data that machines comprehend, a process we specialize in. We meticulously transform real-world 
                visuals into annotated data, establishing a connection between human vision and machine understanding.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-[#203e40] mb-2">Use Cases</h4>
              <p className="text-[#203e40]/80">
                Datasets are the core of Computer Vision, essential for realizing the prowess of AI and Machine Learning. They convert visual 
                information into structured data that machines comprehend, a process we specialize in. We meticulously transform real-world 
                visuals into annotated data, establishing a connection between human vision and machine understanding.
              </p>
            </div>
          </div>
          
          
          
          </div>
        </div>

        {/* Video Annotation Section */}
        <div 
          id="video-annotation" 
          ref={videoAnnotationRef}
          className="rounded-lg overflow-hidden shadow-sm mb-12 border border-gray-200"
        >
          <SectionHeader title="Video Annotation" icon="video" />
          
          <div className="bg-white p-6">
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-[#203e40] mb-6">Bounding Box Annotation</h3>
              <p className="text-[#203e40]/80">
              Identifies objects by placing rectangular boxes around them, useful for object detection and localization tasks (e.g., vehicles, pedestrians).

              </p>
            
          </div>
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-[#203e40] mb-6">Polygon Annotation</h3>
              <p className="text-[#203e40]/80">
              Outlines irregularly shaped objects precisely, beneficial for capturing accurate object boundaries in complex visual environments.

              </p>
            
          </div>
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-[#203e40] mb-6">Semantic Segmentation</h3>
              <p className="text-[#203e40]/80">
              Classifies every pixel in a frame into predefined categories (e.g., background, objects), useful for fine-grained scene understanding.

              </p>
            
          </div>
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-[#203e40] mb-6">Instance Segmentation</h3>
              <p className="text-[#203e40]/80">
              Identifies individual objects at a pixel-level, differentiating multiple instances of the same class in a frame (e.g., distinguishing multiple people in a crowd).

              </p>
            
          </div>
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-[#203e40] mb-6">IKey Point Annotation</h3>
              <p className="text-[#203e40]/80">
              Marks important points on objects, often used in human pose estimation, facial recognition, and gesture analysis.

              </p>
            
          </div>
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-[#203e40] mb-6">3D Cuboid Annotation</h3>
              <p className="text-[#203e40]/80">
              Defines objects using 3D bounding boxes, helpful in autonomous driving, robotics, and drone navigation systems.

              </p>
            
          </div>
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-[#203e40] mb-6">Polyline Annotation</h3>
              <p className="text-[#203e40]/80">
              Draws continuous lines to represent linear objects such as roads, lanes, or boundaries, beneficial for navigation and autonomous driving scenarios.

              </p>
            
          </div>
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-[#203e40] mb-6">Event Annotation (Temporal Annotation)</h3>
              <p className="text-[#203e40]/80">
              Marks start and end timestamps of events or actions within videos, essential for activity recognition and behavior analysis.

              </p>
              <p className="text-[#203e40]/80">
              These annotation types help create comprehensive, accurate, and robust training datasets suitable for diverse AI and machine learning applications.
              </p>
            
          </div>
          </div>
          </div>
          

        {/* GIS Section */}
        <div 
          id="GIS" 
          ref={gisRef}
          className="rounded-lg overflow-hidden shadow-sm mb-12 border border-gray-200"
        >
          <SectionHeader title="GIS" icon="map" />
          
          <div className="bg-white p-6">
            <ImageClassificationSection />
            <ImageClassificationSection />
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
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

export default ServicesPage;