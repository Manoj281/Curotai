import React from "react";

const AIPitCrew = () => {
  const logos = [
    { id: 1, url: '/img/googlelogo.png' },
    { id: 2, url: '/img/Azure.png' },
    { id: 3, url: '/img/aws.png' },
    { id: 3, url: '/img/anker.png' },
  ];

  return (
    <div className="bg-[#284A4E]">
      {/* Animated Logo Strip */}
      <div className="w-full bg-[#284A4E] overflow-hidden relative py-2 md:py-3 lg:py-3">
        <div className="flex gap-8 logo-animation">
          {/* Duplicating logos for smooth loop */}
          {[...Array(6)].map((_, setIndex) => (
            <div key={setIndex} className="flex shrink-0 items-center justify-center">
              {logos.map((logo) => (
                <div
                  key={`${setIndex}-${logo.id}`}
                  className="flex items-center justify-center mx-4 md:mx-6 lg:mx-8 shrink-0"
                >
                  <img
                    src={logo.url}
                    alt="Partner Logo"
                    className="min-w-[80px] md:max-w-[100px] lg:max-w-[140px] h-[30px] md:h-[30px] lg:h-[30px] object-contain opacity-80"
                    style={{ 
                      filter: 'brightness(0) invert(1) hue-rotate(90deg)',
                      imageRendering: 'crisp-edges'
                    }}
                  />
                </div>
              ))}
            </div>
          ))};
        </div>
      </div>

      {/* Rest of your content... */}
      <div className="pb-[80px] lg:pb-0 min-h-[60vh] max-w-[1440px] mx-[10px] sm:mx-auto xl:mr-[1.5%] flex flex-col lg:flex-row justify-between gap-0 px-7  lg:pl-10 md:gap-1 pt-0 sm:pt-[4vw]">
        <div className="w-full lg:w-[45%] order-2 lg:order-1">
          <h2 className="text-3xl md:text-5xl font-bold text-[#cfebe7] mb-6">
            Your AI Pit Crew
          </h2>
          <p className="text-xl text-[#cfebe7] mb-8">
            Curota is committed to gear you up for the AI fast-track
          </p>
          <p className="text-lg text-white mb-8">
            We are your pit crew, that would ensure you stay focused on excelling in the AI race while we do the heavy lifting
          </p>
          <p className="text-lg text-white mb-8">
            At Curota.ai, we understand that accurate and precise data labeling is the cornerstone of successful AI/ML initiatives.
          </p>
          {/*<button className=" bg-white text-[#203e40] max-w-[300px] px-6 py-3 rounded-2xl mb-[30px] font-medium flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all">
            <div className="inline">
            Client Stories
            </div>
            <div>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="transform translate-y-[1px]"
            >
              <path 
                d="M14 5l7 7m0 0l-7 7m7-7H3" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            </div>
          </button>*/}
        </div>
        <div className="w-full md:max-w-[50vw] xl:max-w-[25wv] max-h-[340px] h-[300px] sm:h-[600px] lg:h-auto order-1 lg:order-2 rounded-xl overflow-hidden mx-auto  xs:mb-[20px]">
          <div className="w-full h-[350px] sm:h-full bg-[url('../public/img/AiPit.png')] bg-contain bg-no-repeat mx-auto bg-center rounded-xl block lg:hidden"></div>
          <div className="w-full h-[350px] sm:h-[500px] xl:w-[740px] lg:w-[590px] md:w-[580px]  bg-[url('../public/img/AiPitdesk.png')] bg-contain bg-no-repeat bg-center rounded-xl hidden lg:block"></div>
        </div>
      </div>
      
      <style jsx>{`
        .logo-animation {
          animation: slide 20s linear infinite;
        }

        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Optional: Pause animation on hover */
        .logo-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default AIPitCrew;