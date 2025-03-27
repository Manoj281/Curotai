// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import CaseStudyDetail from './pages/CaseStudy/CaseStudy';
import Contact from './components/Contact';
import Services from './pages/Services/Services'
import MainBlogs from './pages/CaseStudy/Mainblogs'
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
      <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/mainblogs/case-study/:slug" element={<CaseStudyDetail />} />
            <Route path='/services' element={<Services />}/>
            <Route path="/mainblogs" element={<MainBlogs />} />
          </Routes>
        </main>
        <Contact />
        <Footer />
      </div>
    </Router>
  );
};

export default App;


