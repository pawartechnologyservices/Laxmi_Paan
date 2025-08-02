import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Navbar from './component/Navbar';
import BannerSlider from './component/BannerSlider';
import PromoBanner from './component/PromoBanner';
import FloatingIngredientsBanner from './component/FloatingIngredientsBanner';
import Footer from './component/Footer';
import AboutSection from './component/AboutSection';
import Timeline from './component/Timeline';
import Banner from './component/banner';
import DistributorshipSection from './component/DistributorshipSection';
import Testimonials from './component/Testimonials';
import FloatingContactButton from './component/FloatingContactButton';
import AboutPage from './component/AboutUsPage';
import IngredientsPage from './component/IngredientsPage';
import ContactPage from './component/ContactPage';

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function Home() {
  return (
    <div className="app-container">
      <BannerSlider/>
      <AboutSection/>
      <FloatingIngredientsBanner/>
      <Timeline/>
      <Banner/>
      <DistributorshipSection/>
      <PromoBanner/>
      <Testimonials/>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <ScrollToTop /> {/* Add this component here */}
      <div className="app-wrapper">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/ingredients" element={<IngredientsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Add other routes as needed */}
        </Routes>
        <Footer/>
        <FloatingContactButton/>
      </div>
    </Router>
  );
}

export default App;