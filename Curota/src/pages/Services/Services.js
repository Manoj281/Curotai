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
const ServiceExampleCard = ({img}) => (
  <div className="p-4 h-[150px] flex items-center justify-center">
    <img src={img} alt='servicesimg' className='h-full rounded-lg'/>
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
              <ServiceExampleCard img='/img/testimg.png'/>
              <ServiceExampleCard img='/img/testimg.png'/>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium text-[#203e40] mb-2">Business Application</h4>
              <p className="text-[#203e40]/80 mb-4">
                Image segmentation enables businesses to extract meaningful insights from visual data by
                identifying and isolating specific objects within images. This technology is widely used in industries
                like mobility, retail for inventory management, in agriculture for crop monitoring, and in
                healthcare for diagnostic imaging. By leveraging image segmentation, companies can automate
                processes, reduce human error, and enhance decision-making capabilities, ultimately driving
                efficiency and improving outcomes across various sectors.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-[#203e40] mb-2">Use Cases</h4>
              <p className="text-[#203e40]/80">
                Image segmentation is essential in numerous real-world applications. In autonomous vehicles, it
                helps identify roads, pedestrians, and obstacles. In medical imaging, it aids in detecting tumors or
                organ boundaries. E-commerce platforms use it to enhance visual search and recommend similar
                products. Additionally, in smart farming, segmentation assists in assessing plant health and detecting
                weeds. These diverse use cases highlight how segmentation enhances precision and functionality in
                both everyday and specialized tasks.
              </p>
            </div>
          </div>
          </section>
          <section id="bounding-box">
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-[#203e40] mb-6">Bounding Box</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ServiceExampleCard img='/img/testimg.png'/>
              <ServiceExampleCard img='/img/testimg.png'/>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium text-[#203e40] mb-2">Business Application</h4>
              <p className="text-[#203e40]/80 mb-4">
                Bounding box annotation plays a crucial role in training AI models for object detection across various
                industries. In retail, it powers smart checkout systems and shelf monitoring. In logistics, it supports
                automated package tracking and sorting. By labeling objects within images accurately, businesses
                can enhance machine vision capabilities, streamline operations, and reduce manual intervention.
                Bounding box annotation forms the foundation for systems that require precise object localization
                and real-time analysis.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-[#203e40] mb-2">Use Cases</h4>
              <p className="text-[#203e40]/80">
                Bounding boxes are widely used in real-world applications like surveillance systems to detect
                intruders, in autonomous vehicles to identify pedestrians and traffic signs, and in warehouse
                robotics for item recognition and sorting. E-commerce platforms utilize them for tagging and
                categorizing products in images. They're also vital in agriculture, helping detect and track livestock or
                monitor equipment. This type of annotation is essential for any application where identifying the
                position and size of objects is key.
              </p>
            </div>
          </div>
          </section>
          <section id="polygon">
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-[#203e40] mb-6">Polygon</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ServiceExampleCard img='/img/testimg.png'/>
              <ServiceExampleCard img='/img/testimg.png'/>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium text-[#203e40] mb-2">Business Application</h4>
              <p className="text-[#203e40]/80 mb-4">
                Polygon annotation is essential for businesses that require high-precision object recognition,
                especially for irregularly shaped items. It's widely used in industries like agriculture for mapping crop
                areas, in retail for shelf analysis, and in insurance for damage assessment. By outlining the exact
                shape of objects, polygon annotation allows machine learning models to better understand complex
                scenes, resulting in more accurate analytics, enhanced automation, and improved decision-making
                across a range of business processes.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-[#203e40] mb-2">Use Cases</h4>
              <p className="text-[#203e40]/80">
                Polygon annotation excels in scenarios requiring detailed shape recognition. In autonomous driving,
                it defines the precise contours of road elements, vehicles, and pedestrians. In medical imaging, it
                enables accurate segmentation of tumors or organs. Drones use it to monitor landscapes or
                construction sites, while fashion e-commerce platforms apply it for outlining clothing items. This
                level of precision supports more refined machine learning outputs, especially in environments where
                object boundaries are complex and irregular.
              </p>
            </div>
          </div>
          </section>
          <section id="keypoint">
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-[#203e40] mb-6">Keypoint</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ServiceExampleCard img='/img/testimg.png'/>
              <ServiceExampleCard img='/img/testimg.png'/>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium text-[#203e40] mb-2">Business Application</h4>
              <p className="text-[#203e40]/80 mb-4">
                Keypoint annotation is critical for businesses that rely on detailed motion tracking and pose
                estimation. It is commonly used in sectors like fitness tech for form correction, entertainment for
                motion capture, and healthcare for physical therapy analysis. By marking specific points on objects
                or the human body—such as joints or facial landmarks—companies can develop AI systems that
                understand subtle movements, improve user interaction, and enhance performance monitoring or
                safety mechanisms.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-[#203e40] mb-2">Use Cases</h4>
              <p className="text-[#203e40]/80">
                Keypoint annotation is widely used to track human poses in sports analytics, enabling performance
                optimization and injury prevention. In augmented reality (AR), it allows for real-time facial tracking
                and expression mapping. It's also employed in robotics for gesture recognition, and in driver
                monitoring systems to detect fatigue or distraction. These use cases demonstrate its value in
                applications where identifying precise positions and movements of body parts or components is
                essential for intelligent response.
              </p>
            </div>
          </div>
          </section>
          
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-[#203e40] mb-6">Image Classification</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ServiceExampleCard img='/img/testimg.png'/>
              <ServiceExampleCard img='/img/testimg.png'/>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium text-[#203e40] mb-2">Business Application</h4>
              <p className="text-[#203e40]/80 mb-4">
                Image classification is a powerful tool for businesses aiming to automate visual content analysis. It
                enables rapid sorting, tagging, and organization of large image datasets. Industries like e-commerce
                use it for product categorization, healthcare for disease detection in scans, and agriculture for
                identifying plant species or conditions. By training models to recognize and classify images,
                companies can streamline workflows, improve data accuracy, and enhance user experiences through
                intelligent visual recognition systems.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-[#203e40] mb-2">Use Cases</h4>
              <p className="text-[#203e40]/80">
                Image classification is used in various domains such as social media platforms for detecting
                inappropriate content, in manufacturing for identifying defects on production lines, and in wildlife
                conservation for recognizing animal species in camera trap images. It also supports smartphone apps
                in identifying food items, plants, or landmarks. These use cases highlight how classification helps
                systems interpret images quickly and accurately, driving smarter automation and decision-making in
                everyday and specialized applications.
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ServiceExampleCard img='/img/testimg.png'/>
              <ServiceExampleCard img='/img/testimg.png'/>
            </div>
              <p className="text-[#203e40]/80 mb-6">
                Identifies objects by placing rectangular boxes around them, useful for object detection and localization tasks (e.g., vehicles, pedestrians).
              </p>
              <div className="mb-6">
                <h4 className="text-lg font-medium text-[#203e40] mb-2">Business Application</h4>
                <p className="text-[#203e40]/80 mb-4">
                  Bounding box annotation in video enables businesses to track and analyze objects frame-by-frame
                  with precision. It is crucial in industries like security for surveillance monitoring, automotive for
                  autonomous vehicle navigation, and retail for customer behavior analysis. By continuously tracking
                  objects across time, businesses gain insights into movement patterns and interactions. This data
                  fuels advanced machine learning models that support automation, real-time decision-making, and
                  improved safety in dynamic, video-based environments.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-[#203e40] mb-2">Use Cases</h4>
                <p className="text-[#203e40]/80">
                  Video bounding box annotation is used in traffic management systems to monitor vehicle flow and
                  detect violations. In sports, it helps track players and the ball for performance analytics. Surveillance
                  systems use it to detect suspicious behavior or unauthorized access. It's also applied in warehouse
                  automation for tracking goods and machinery. These use cases highlight its value in understanding
                  real-time movement, enabling predictive analytics, and enhancing situational awareness in complex,
                  time-based scenarios.
                </p>
              </div>
          </div>
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-[#203e40] mb-6">Polygon Annotation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ServiceExampleCard img='/img/testimg.png'/>
              <ServiceExampleCard img='/img/testimg.png'/>
            </div>
              <p className="text-[#203e40]/80 mb-6">
                Outlines irregularly shaped objects precisely, beneficial for capturing accurate object boundaries in complex visual environments.
              </p>
              <div className="mb-6">
                <h4 className="text-lg font-medium text-[#203e40] mb-2">Business Application</h4>
                <p className="text-[#203e40]/80 mb-4">
                  Polygon annotation in video provides detailed object tracking by outlining complex shapes across
                  frames. This is especially valuable for industries like autonomous driving, where precise object
                  boundaries are critical for safe navigation, or in construction and mining, where tracking irregular
                  machinery is necessary. Businesses use polygon annotation to improve model accuracy in dynamic
                  environments, enabling smarter automation, enhanced object recognition, and better decision-
                  making through highly detailed visual analysis over time.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-[#203e40] mb-2">Use Cases</h4>
                <p className="text-[#203e40]/80">
                  Polygon annotation is used in self-driving car development to accurately detect and track
                  pedestrians, vehicles, and road signs with irregular shapes. In sports broadcasting, it enables precise
                  player and equipment tracking for advanced analytics. It's also applied in drone surveillance for
                  monitoring large and complex structures, like buildings or farmlands. These use cases demonstrate
                  how polygon annotation enhances machine perception in videos where high granularity and object
                  precision are essential.
                </p>
              </div>
          </div>
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-[#203e40] mb-6">Semantic Segmentation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ServiceExampleCard img='/img/testimg.png'/>
              <ServiceExampleCard img='/img/testimg.png'/>
            </div>
              <p className="text-[#203e40]/80 mb-6">
                Classifies every pixel in a frame into predefined categories (e.g., background, objects), useful for fine-grained scene understanding.
              </p>
              <div className="mb-6">
                <h4 className="text-lg font-medium text-[#203e40] mb-2">Business Application</h4>
                <p className="text-[#203e40]/80 mb-4">
                  Semantic segmentation in video annotation enables businesses to analyze scenes at the pixel level,
                  allowing for highly accurate object and environment understanding. It is widely used in industries
                  like automotive for autonomous driving, smart cities for traffic and pedestrian monitoring, and
                  agriculture for crop and soil analysis. By classifying each pixel across video frames, companies can
                  build robust AI models that respond intelligently to complex visual inputs, improving safety,
                  efficiency, and automation capabilities.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-[#203e40] mb-2">Use Cases</h4>
                <p className="text-[#203e40]/80">
                  Semantic segmentation is used in autonomous vehicles to distinguish roads, sidewalks, pedestrians,
                  and vehicles in real-time video streams. In healthcare, it assists in analyzing endoscopy or surgery
                  videos by identifying tissues and instruments. Smart city systems use it to monitor public spaces and
                  manage traffic flows. It also supports environmental monitoring through drone footage analysis.
                  These use cases show how pixel-level video analysis enables smarter, context-aware systems across
                  various high-impact applications.
                </p>
              </div>
          </div>
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-[#203e40] mb-6">Instance Segmentation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ServiceExampleCard img='/img/testimg.png'/>
              <ServiceExampleCard img='/img/testimg.png'/>
            </div>
              <p className="text-[#203e40]/80 mb-6">
                Identifies individual objects at a pixel-level, differentiating multiple instances of the same class in a frame (e.g., distinguishing multiple people in a crowd).
              </p>
              <div className="mb-6">
                <h4 className="text-lg font-medium text-[#203e40] mb-2">Business Application</h4>
                <p className="text-[#203e40]/80 mb-4">
                  Instance segmentation in video annotation allows businesses to identify and track individual objects,
                  even when they overlap or interact. It is crucial for industries like autonomous driving, where
                  distinguishing between individual pedestrians, vehicles, and other objects is vital for safety. In retail,
                  it helps track multiple products in a single video frame, enabling better inventory management and
                  automated checkout systems. By providing precise object-level identification, instance segmentation
                  enhances automation and decision-making processes in dynamic environments.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-[#203e40] mb-2">Use Cases</h4>
                <p className="text-[#203e40]/80">
                  Instance segmentation is applied in autonomous vehicles to detect and differentiate individual
                  objects, such as pedestrians and other cars, in real-time traffic videos. In sports analytics, it helps
                  track players and equipment, even in crowded scenarios. In medical imaging, instance segmentation
                  aids in isolating and analyzing individual cells or organs for disease diagnosis. It's also used in
                  industrial environments for monitoring multiple machines or tools in video feeds, ensuring efficient
                  operation and safety. These use cases show its power in real-time, object-level analysis.
                </p>
              </div>
          </div>
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-[#203e40] mb-6">Keypoint Annotation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ServiceExampleCard img='/img/testimg.png'/>
              <ServiceExampleCard img='/img/testimg.png'/>
            </div>
              <p className="text-[#203e40]/80 mb-6">
                Marks important points on objects, often used in human pose estimation, facial recognition, and gesture analysis.
              </p>
          </div>
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-[#203e40] mb-6">3D Cuboid Annotation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ServiceExampleCard img='/img/testimg.png'/>
              <ServiceExampleCard img='/img/testimg.png'/>
            </div>
              <p className="text-[#203e40]/80 mb-6">
                Defines objects using 3D bounding boxes, helpful in autonomous driving, robotics, and drone navigation systems.
              </p>
              <div className="mb-6">
                <h4 className="text-lg font-medium text-[#203e40] mb-2">Business Application</h4>
                <p className="text-[#203e40]/80 mb-4">
                  3D cuboid annotation in video allows businesses to detect and track objects in three-dimensional
                  space, providing a more accurate representation of the physical world. It's used in industries like
                  autonomous driving, where understanding the spatial relationship between objects is crucial for
                  navigation and collision avoidance. In logistics and warehousing, it helps with tracking the position
                  and movement of 3D objects like packages or equipment, supporting improved automation, real-
                  time tracking, and operational efficiency.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-[#203e40] mb-2">Use Cases</h4>
                <p className="text-[#203e40]/80">
                  3D cuboid annotation is essential for autonomous vehicles, helping them understand the position
                  and dimensions of objects like other vehicles and pedestrians in a 3D environment. In
                  manufacturing, it supports robot navigation by accurately mapping the locations of machinery and
                  parts. It's also used in construction for tracking the dimensions and movement of large equipment or
                  materials. Additionally, in retail, it can be applied for visualizing product placement in three-
                  dimensional shelf layouts for optimized inventory management.
                </p>
              </div>
          </div>
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-[#203e40] mb-6">Polyline Annotation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ServiceExampleCard img='/img/testimg.png'/>
              <ServiceExampleCard img='/img/testimg.png'/>
            </div>
              <p className="text-[#203e40]/80 mb-6">
                Draws continuous lines to represent linear objects such as roads, lanes, or boundaries, beneficial for navigation and autonomous driving scenarios.
              </p>
              <div className="mb-6">
                <h4 className="text-lg font-medium text-[#203e40] mb-2">Business Application</h4>
                <p className="text-[#203e40]/80 mb-4">
                  Polyline annotation in video is used to outline the path or trajectory of moving objects, providing
                  critical data for industries like transportation and robotics. In autonomous driving, it helps track road
                  lanes, traffic flow, and vehicle paths. In sports analytics, it can be used to track player movements or
                  ball trajectories. By capturing movement patterns with high accuracy, polyline annotation supports
                  more precise AI models for navigation, performance analysis, and real-time decision-making.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-[#203e40] mb-2">Use Cases</h4>
                <p className="text-[#203e40]/80">
                  Polyline annotation is commonly applied in autonomous vehicles to track and predict the movement
                  of traffic, road lanes, and obstacles. In sports, it is used to trace the path of the ball or players,
                  providing insights into performance and strategy. In robotics, polyline annotations assist in guiding
                  robot movements along predefined paths. Additionally, it's used in video surveillance to track
                  intruders or monitor specific routes within a defined area, enhancing security operations.
                </p>
              </div>
          </div>
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-[#203e40] mb-6">Event/Temporal Annotation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ServiceExampleCard img='/img/testimg.png'/>
              <ServiceExampleCard img='/img/testimg.png'/>
            </div>
              <p className="text-[#203e40]/80 mb-6">
              Marks start and end timestamps of events or actions within videos, essential for activity recognition and behavior analysis.
              </p>
              <div className="mb-6">
                <h4 className="text-lg font-medium text-[#203e40] mb-2">Business Application</h4>
                <p className="text-[#203e40]/80 mb-4">
                  Event/temporal annotation in video involves labeling specific events or actions that occur over time,
                  allowing businesses to track and analyze dynamic processes. In sectors like security, it helps identify
                  unusual behaviors or specific incidents within surveillance footage. In sports, it's used to annotate
                  key moments like goals, fouls, or player actions. By understanding events in the temporal context,
                  businesses can automate analysis, improve decision-making, and enhance monitoring systems
                  across various industries.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-[#203e40] mb-2">Use Cases</h4>
                <p className="text-[#203e40]/80">
                  Event/temporal annotation is crucial for detecting specific actions in videos, such as in sports where
                  key events like goals or penalties are marked for analysis. In security surveillance, it helps pinpoint
                  security breaches, suspicious activities, or alarms. In healthcare, it can identify critical moments in
                  medical procedures or patient movements. It's also used in behavior analysis, helping businesses
                  track customer actions or interactions in video data, improving customer insights and marketing
                  strategies.
                </p>
              </div>
              <p className="text-[#203e40]/80 mt-6">
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
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-[#203e40] mb-6">Standard Annotation</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <ServiceExampleCard img='/img/testimg.png'/>
                <ServiceExampleCard img='/img/testimg.png'/>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-medium text-[#203e40] mb-2">Business Application</h4>
                <p className="text-[#203e40]/80 mb-4">
                  Standard GIS annotation involves labelling basic geographical features like roads, rivers, or
                  landmarks within spatial data. It's commonly used in urban planning, environmental monitoring, and
                  navigation systems. By tagging features with clear, consistent labels, businesses can create more
                  accurate maps, improve asset management, and support planning decisions. It enables industries to
                  visualize and manage geographical data efficiently, fostering better decision-making, disaster
                  management, and resource allocation.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-[#203e40] mb-2">Use Cases</h4>
                <p className="text-[#203e40]/80">
                  Standard GIS annotation is used in city planning to mark streets, utilities, and important
                  infrastructure. It aids in environmental monitoring by tagging bodies of water, forests, and
                  conservation areas for easier tracking. In navigation, it helps in labeling roads, intersections, and
                  points of interest for better route planning. Real estate companies use it to annotate land parcels
                  and zoning areas for property assessments. These examples show how basic feature identification
                  supports better geographical insights.
                </p>
              </div>
            </div>
            
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-[#203e40] mb-6">Feature-Linked Annotation</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <ServiceExampleCard img='/img/testimg.png'/>
                <ServiceExampleCard img='/img/testimg.png'/>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-medium text-[#203e40] mb-2">Business Application</h4>
                <p className="text-[#203e40]/80 mb-4">
                  Feature-linked GIS annotation connects geographical data with additional attributes, allowing
                  businesses to gain deeper insights into spatial relationships. This is crucial in fields like agriculture for
                  mapping soil types, in transportation for tracking infrastructure health, and in utilities for managing
                  power grids. By linking geographic features with detailed metadata, businesses can perform
                  advanced analysis, optimize resource use, and implement more targeted solutions for urban
                  development, environmental protection, and disaster response.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-[#203e40] mb-2">Use Cases</h4>
                <p className="text-[#203e40]/80">
                  Feature-linked GIS annotation is used in agriculture for annotating crop fields with data on soil type,
                  moisture levels, and irrigation patterns to improve yield prediction. In transportation, it helps
                  annotate road segments with traffic patterns, accident hotspots, and maintenance schedules to
                  enhance infrastructure management. Utilities companies use it to track power lines with data on
                  grid health, service interruptions, and maintenance needs. These use cases show the power of
                  linking spatial data with actionable attributes to support smarter decision-making.
                </p>
              </div>
            </div>
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