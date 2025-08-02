import React, { useEffect, useRef, useState } from 'react';
import './PanMasalaAnimation.css';

// Import all images
import banner1 from '../assets/bg.jpg';
import banner2 from '../assets/bg2.jpg';
import banner3 from '../assets/bg3.jpg';
import banner4 from '../assets/bg4.jpg';
import banner5 from '../assets/bg5.jpg';

import aroma1 from '../assets/betelnut.avif';
import aroma2 from '../assets/cardamom_seeds.avif';
import aroma3 from '../assets/sandle.webp';
import aroma4 from '../assets/rose_pettle.webp';
import aroma5 from '../assets/kewda.avif';

// Import new sliding images
import slideImg1 from '../assets/betel.webp';
import slideImg2 from '../assets/cardamom2 (1).avif';
import slideImg3 from '../assets/sandale.avif';
import slideImg4 from '../assets/rose.avif';
import slideImg5 from '../assets/kewda.avif';

// Add this import at the top with your other image imports
import mockupImage from '../assets/mockup.png'; // Replace with your actual mockup image path


const PanMasalaAnimation = () => {
  const [scrollDirection, setScrollDirection] = useState('down');
  const banners = [
    { 
      id: 1, 
      bgImg: banner1, 
      overlayImg: aroma1, 
      slideImg: slideImg1, 
      title: "Aromatic Flavours", 
      subtitle: "Betelnut" 
    },
    { 
      id: 2, 
      bgImg: banner2, 
      overlayImg: aroma2, 
      slideImg: slideImg2, 
      title: "Spicy Notes", 
      subtitle: "Cardamom", 
      rightAlign: true 
    },
    { 
      id: 3, 
      bgImg: banner3, 
      overlayImg: aroma3, 
      slideImg: slideImg3, 
      title: "Fresh Taste", 
      subtitle: "Sandalwood Oil" 
    },
    { 
      id: 4, 
      bgImg: banner4, 
      overlayImg: aroma4, 
      slideImg: slideImg4, 
      title: "Sweet Aroma", 
      subtitle: "Rose Essence", 
      rightAlign: true 
    },
    { 
      id: 5, 
      bgImg: banner5, 
      overlayImg: aroma5, 
      slideImg: slideImg5, 
      title: "Earthy Tone", 
      subtitle: "Ruh Kewda" 
    },
  ];

 const bannerRefs = useRef([]);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up');
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const slideImg = entry.target.querySelector('.slide-img');
          if (!slideImg) return;

          if (entry.isIntersecting) {
            if (scrollDirection === 'down') {
              slideImg.classList.add('animate-down');
              slideImg.classList.remove('animate-up');
            } else {
              slideImg.classList.add('animate-up');
              slideImg.classList.remove('animate-down');
            }
          } else {
            if (scrollDirection === 'down') {
              slideImg.classList.remove('animate-down');
            } else {
              slideImg.classList.remove('animate-up');
            }
          }
        });
      },
      { threshold: 0.4 }
    );

    bannerRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      bannerRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [scrollDirection]);

  return (
    <div className="horizontal-banners-container">
      {banners.map((banner, index) => (
        <div 
          key={banner.id} 
          className="banner-item"
          ref={(el) => (bannerRefs.current[index] = el)}
        >
          <div className="banner-bg" style={{ backgroundImage: `url(${banner.bgImg})` }}>
            <img 
              src={banner.slideImg} 
              alt={banner.title} 
              className={`slide-img ${banner.rightAlign ? 'right' : 'left'}`}
            />
            
            <div className={`overlay-content ${banner.rightAlign ? 'right-align' : ''}`}>
              <div className="image-text-wrapper">
                <img src={banner.overlayImg} alt={banner.title} className="overlay-img" />
                <div className="text-content">
                  <h3>{banner.title}</h3>
                  <p>{banner.subtitle}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
       {/* Add this mockup section */}
      <div className="mockup-container">
        <img src={mockupImage} alt="Product Mockup" className="mockup-image" />
      </div>
    </div>
  );
};
   

export default PanMasalaAnimation;