import React from 'react';
import { Link } from 'react-router-dom';

const ProfileCard = ({ avatar, name, description, location, role }) => (
  <div className="bg-[#E5F5F3] rounded-3xl shadow-lg overflow-hidden flex flex-col items-center p-8 text-center mx-[25px] md:mx-0">
    <div className="w-48 h-48 rounded-[74px] mb-8 overflow-hidden border-6 border-white">
      <img src={avatar} alt={name} className="w-full h-full rounded-5xl object-cover" />
    </div>
    <h3 className="flex flex-row text-2xl font-bold text-[#203E40] mb-4 relative w-full min-h-[64px]">
      <div className="left-0 my-auto transform -translate-y-1/2 w-full h-px bg-gradient-to-l from-[#203E40] to-transparent text-center"></div>
      <span className="px-4 my-auto">{name}</span>
      <div className=" right-0 my-auto transform -translate-y-1/2 w-full h-px bg-gradient-to-r from-[#203E40] to-transparent"></div>
    </h3>
    <p className="text-base text-gray-700 mb-6 px-4 min-h-[168px]">{description}</p>
    <div className="flex items-center mb-6">
      <img src="/img/location.svg" alt="Location" className="w-6 mr-3" />
      <span className="text-md text-md">{location}</span>
    </div>
    <div className="bg-[#203E40] text-white uppercase text-md font-bold rounded-full px-7 py-3">
      {role}
    </div>
  </div>
);

const ContentSection = ({ title, content }) => (
  <div className="container mx-auto px-11 pt-6 mb-16">
    <h2 className="text-4xl font-bold text-[#203E40] mb-6">{title}</h2>
    <p className="text-[17px] text-gray-800">{content}</p>
  </div>
);

const AboutUs = () => {
  const teamMembers = [
    {
      avatar: "/img/Frame 260.png",
      name: "NIKITA PANDEY",
      description: "Nikita Pandey, Director of Operations at Curota.ai, brings over years of expertise in retail banking operations from HDFC Bank. With an MBA in Financial Administration, she excels in driving strategic and efficient operational excellence.",
      location: "Pune, India",
      role: "Director of Operations"
    },
    {
      avatar: "/img/Frame 260-2.png",
      name: "AYAN",
      description: "Ayan is a seasoned technology leader and entrepreneur, currently serving as a Founding Board Member at Curota.ai. With extensive experience in mobility tech, data, AI, and cloud solutions, he brings a wealth of knowledge from his roles at Ankercloud GmbH and as Co-Founder of Kruzr, an AI-powered mobility safety platform.",
      location: "Düsseldorf, Germany",
      role: "Founding Board Member"
    },
    {
      avatar: "/img/Frame 260-3.png",
      name: "MANOJ KUMAR",
      description: "Manoj Kumar, founding Board Member at Curota.ai, is an IT leader with years of expertise in solution architecture and project management. With an MBA from WHU and global exposure, he excels in driving innovative, scalable tech solutions.",
      location: "Düsseldorf, Germany",
      role: "Founding Board Member"
    },
    {
      avatar: "/img/amitgupta.png",
      name: "AMIT GUPTA",
      description: "Amit Kumar Gupta is the Co-founder and COO of Curota.ai. With years of diverse experience in technology and education, he is dedicated to driving innovation and supporting academic success.",
      location: "Bengaluru, India",
      role: "Chief Operations Officer"
    },
    {
      avatar: "/img/Frame 260-4.png",
      name: "ROHAN KANUNGO ",
      description: "Rohan Kanungo, Board Member at Curota.ai, brings deep expertise in MarTech, AI-driven platforms, product strategy, and consulting. With a proven track record of driving innovation and customer engagement, he is committed to shaping transformative solutions at the intersection of technology and business.",
      location: "Pune, India",
      role: "Board Advisory"
    },
    {
      avatar: "/img/Frame 260-5.png",
      name: "SOURAV KUMAR",
      description: "Sourav Kumar, Board Member at Curota.ai, brings over years of expertise in consulting for global transport and logistics companies, blending technology, strategy, and leadership. With an MBA from WHU and global exposure at institutions like Columbia Business School, he is driving innovation and transformation in the logistics industry.",
      location: "Düsseldorf, Germany",
      role: "Founding Board Member"
    }
  ];

  // Content for the Introduction and Why Curota sections
  const introContent = "We provide specialized, scalable, and secure training data annotation services designed to enhance the accuracy and efficiency of AI models. Our approach emphasizes domain expertise, zero-trust security, and GDPR-compliant processes. Our leadership team brings over 60 years of combined experience across various sectors, with offices in Düsseldorf and multiple locations in India.";
  
  const whyCurotaContent = "We ensure clear, consistent labels and balanced datasets, significantly reducing your training times and improving AI feature recognition. Our zero-trust security framework guarantees data residency and compliance, making annotation cost-effective and secure. Additionally, we offer an end-to-end AI/ML partnership model, providing scalable, high-quality annotations and infrastructure management tailored specifically to your business needs.";

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="w-full bg-[url('../public/img/aboutbg.png')] bg-cover bg-center text-center py-16 mb-8">
        <div className='m-[18vh]'></div>
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <img src="/img/skiled-force.png" alt="Skilled Force Icon" className="h-[145px]" />
          </div>
          <h1 className="text-5xl font-bold text-white">
            ABOUT US
          </h1>
        </div>
        <div className='m-[2vh]'></div>
      </div>

      {/* Content Sections - Only visible on md and larger screens */}
      <div className="hidden md:block mt-5">
        <ContentSection 
          title="Who are we?"
          content={introContent}
        />
        
        <ContentSection 
          title="Why Curota?"
          content={whyCurotaContent}
        />
      </div>

      {/* Team Members Section */}
      <div className="mx-auto px-4 lg:px-10 pt-[50px] flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <ProfileCard key={index} {...member} />
          ))}
        </div>
      </div>

      {/* Go Back Button */}
      <div className="flex justify-center my-12">
        <Link to="/">
          <button className="bg-[#203E40] text-white rounded-full shadow-xl px-16 py-5 flex items-center gap-6 hover:bg-[#2c5a5c] transition-colors duration-300">
            <span className="text-2xl font-semibold">Go Back</span>
            <svg stroke="currentColor" fill="white" strokeWidth="0" viewBox="0 0 16 16" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M5.854 4.646a.5.5 0 010 .708L3.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clipRule="evenodd"></path>
              <path fillRule="evenodd" d="M2.5 8a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H3a.5.5 0 01-.5-.5z" clipRule="evenodd"></path>
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
