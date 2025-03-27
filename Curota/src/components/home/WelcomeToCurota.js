import React from 'react';

// Feature card component with proper responsive layout
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white/10 rounded-2xl overflow-hidden flex flex-col h-full">
    <div className="p-5 sm:p-6 flex flex-col h-full">
      <img
        src={icon}
        alt={title}
        className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
      />
      <h3 className="text-xl sm:text-2xl font-semibold mt-4 text-white">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-gray-200 mt-2 leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

const WelcomeSection = () => {
  const features = [
    {
      icon: '/img/pixel-perfect.png',
      title: 'Pixel Perfect Annotation',
      description: 'Ensure high quality and accuracy with exact boundary definitions'
    },
    {
      icon: '/img/validation.png',
      title: 'Validation Led Engagement',
      description: 'Verify before you buy through our free pre-validation engagement model'
    },
    {
      icon: '/img/scalability.png',
      title: 'Dynamic Scalability',
      description: 'Lets you scale your annotation needs up or down without commitments'
    },
    {
      icon: '/img/security.png',
      title: 'Compliant and Secure',
      description: 'Zero-trust security with 100% data residency and access controls'
    }
  ];

  return (
    <section className="bg-[#203e40] py-6  sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-10 sm:mb-12 md:mb-16 text-center">
        <h1 className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 text-center">
          <div className="text-[#e7f6f4] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
            Welcome to
          </div>
          <div className="">
            <img src="./img/name-icon.svg" className="sm:max-w-[400px] max-w-[180px] sm:pb-[5px] pb-1  inline" alt="Company Logo" />
          </div>
          <div className="text-[#e7f6f4] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold font-sans">
            !
          </div>
        </h1>

        <h3 className="flex flex-row mx-auto text-2xl font-bold text-[#203E40] mb-6 relative max-w-[600px]">
          <div className="left-0 my-auto transform -translate-y-1/2 w-full h-px bg-gradient-to-l from-white to-transparent"></div>
          <p className="text-[#e7f6f4] mt-4 text-sm sm:text-base md:text-md italic font-medium min-w-[300px] lg:min-w-[400px] mx-auto">
            we transform data with precision and care, delivering excellence beyond just solutions.
          </p>
          <div className="right-0 my-auto transform -translate-y-1/2 w-full h-px bg-gradient-to-r from-white to-transparent"></div>
        </h3>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto pb-[70px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Why Curota card - First on mobile, left on desktop */}
          <div className="bg-white/10 rounded-2xl overflow-hidden h-auto md:h-full">
            {/* Browser-like header with dots */}
            <div className="h-10 border-b border-white/10 bg-white/5 flex items-center px-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#f06449]"></div>
                <div className="w-3 h-3 rounded-full bg-[#e79f47]"></div>
                <div className="w-3 h-3 rounded-full bg-[#03c39a]"></div>
              </div>
            </div>
            
            <div className="p-5 md:p-6 ">
                {/* Feature icons grid for desktop */}
                <div className="grid-cols-2 max-w-[220px] hidden md:grid mx-auto">
                  {features.map((feature, index) => (
                    <img
                      key={index}
                      src={feature.icon}
                      alt={feature.title}
                      className="w-full aspect-square rounded-lg object-cover"
                    />
                  ))}
                </div>

                {/* Desktop layout */}
                <div className="hidden md:block mt-3 p-2">
                  <div className="flex flex-row items-center gap-1 mb-4">
                    <h2 className="text-2xl md:text-3xl text-[#e7f6f4] font-semibold">Why Curota?</h2>
                  </div>
                
                  <div className="mt-2">
                    <p className="text-sm md:text-base text-white/90">
                      Secure, compliant, cost-effective and domain expert led annotation services, 
                      to help you fast-track accurate AI model development
                    </p>
                  </div>
                </div>
              
                {/* Mobile layout - text and icons in one row */}
                <div className="md:hidden flex flex-row items-center justify-between">
                  {/* Why Curota text */}
                  <div className="flex sm:flex-row flex-col sm:items-center xs:items-start gap-1 flex-shrink-0 mr-3">
                    <h2 className="text-2xl sm:text-2xl text-[#e7f6f4] font-semibold">Why</h2>
                    <div className="sm:inline-block xs:block">
                      <img src="./img/name-icon.svg" className="max-w-[115px] sm:max-w-[120px] pb-[5px] inline" alt="Company Logo" />
                    
                    <span className="text-xl sm:text-2xl text-[#e7f6f4] font-semibold">?</span>
                    </div>
                  </div>
                  
                  {/* Feature icons in 2x2 grid */}
                  <div className="grid grid-cols-2 gap-2 flex-shrink-0">
                    {features.map((feature, index) => (
                      <img
                        key={index}
                        src={feature.icon}
                        alt={feature.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    ))}
                  </div>
                </div>
            </div>
          </div>

          {/* Feature cards grid - 2 columns on all devices */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;