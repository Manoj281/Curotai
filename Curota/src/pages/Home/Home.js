// pages/Home/Home.js
import React from 'react';
import HeroSection from '../../components/home/HeroSection';
import PitCrewSection from '../../components/home/PitCrewSection';
import WelcomeSection from '../../components/home/AnnotationServices';
import WelcomeToCurota from '../../components/home/WelcomeToCurota';
import Cast from '../../components/home/Cast';
import CaseStudies from '../../components/home/CaseStudies';
import FeaturedArticles from '../../components/home/FeaturedArticles';
import Ourservices from '../../components/home/Ourservices';
import Matrix from '../../components/home/Matrixs'

const Home = () => {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <PitCrewSection />

      <Ourservices/>
      <div className="bg-[#203e40] pt-10 sm:pt-10 ">
        <WelcomeToCurota />
        <WelcomeSection />
        <Matrix/>
        <CaseStudies/>

      </div>
    </div>
  );
};

export default Home;