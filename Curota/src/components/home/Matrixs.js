import React from 'react';

const MetricsSection = () => {
  const metrics = [
    { value: '< 1 min', title: 'Average Per Object Time' },
    { value: '98%', title: 'Accuracy' },
    { value: '100 objects/frame', title: 'Avg. Objects Segmented Per Frame' },
    { value: 'As small as 10 pixels', title: 'Min. Object Size Segmented' }
  ];

  return (
    <section className="g-[#203e40] py-12 px-4 sm:px-6 md:px-8 pb-[75px]">
      <div className="max-w-7xl mx-auto">
        <div className="mt-[30px] md:mt-[30px] mb-8 mx-0 lg:mx-[155px] md:mx-[100px] sm:mx-[50px] xs:mx-[30px]">
          <div className=" rounded-3xl p-6 py-8 md:p-11 md:py-16 bg-cover bg-[url('../public/img/matrixbg.png')]">
            <div className="flex flex-col lg:flex-row justify-between gap-6 md:gap-8">
              {/* Metrics heading and description - First on mobile, Second on desktop */}
              <div className="text order-last lg:order-first p-6 md:pb-10 my-auto">
                <h3 className="text-2xl md:text-2xl lg:text-4xl text-[#203e40] font-semibold mb-2 my-auto">
                  Metrics
                </h3>
                <p className="text-sm md:text-[16px] text-[#203e40] max-w-[240px]">
                Core Annotation Metrics Demonstrating Our Commitment to Accuracy, Efficiency, and Scalable Data Labeling Excellence
                </p>
              </div>
              
              {/* Metrics grid - 2x2 layout - Second on mobile, First on desktop */}
              <div className="grid grid-cols-2 gap-3  order-first lg:order-last pr-4">
                {metrics.map((metric, index) => (
                  <div key={index} className="text-[#203e40] border border-gray-200/50 p-2">
                    <div className="text-xl md:text-[25px] font-bold mb-1 font-sans text-center">
                      {metric.value}
                    </div>
                    <div className="text-sm md:text-[16px] text-center">
                      {metric.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;