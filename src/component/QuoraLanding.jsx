import React, { useState, useEffect } from 'react';
import './QuoraLanding.css';
import centerImage from '../assets/banner_img.png'; 

const QuoraLanding = () => {
  const [currentWord, setCurrentWord] = useState('');
  const words = ['Make', 'Your', 'Quora'];
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (animationComplete) return;

    const typeEffect = setTimeout(() => {
      const current = words[wordIndex];
      
      if (!isDeleting && charIndex < current.length) {
        setCurrentWord(current.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setCurrentWord(current.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setIsDeleting(!isDeleting);
        if (!isDeleting) {
          if (wordIndex < words.length - 1) {
            setWordIndex(wordIndex + 1);
            setCharIndex(0);
          } else {
            // Animation complete when we reach the last word ("Quora")
            setAnimationComplete(true);
          }
        }
      }
    }, isDeleting ? 100 : 200);

    return () => clearTimeout(typeEffect);
  }, [charIndex, isDeleting, wordIndex, animationComplete]);

  return (
    <div className="quora-landing">
       <div className="quora-inner">
      <header className="header">
        <div className="logo">
          <h1 className={`animated-text ${animationComplete ? 'animation-complete' : ''}`}>
            {currentWord}
          </h1>
        </div>
        <nav className="nav">
          <div className="menu-container">
            <button 
              className="menu-button" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              onMouseEnter={() => setIsMenuOpen(true)}
            >
              Menu
            </button>
            {isMenuOpen && (
              <div 
                className="dropdown-menu"
                onMouseLeave={() => setIsMenuOpen(false)}
              >
                <a href="/products">Product</a>
                <a href="/about">About Us</a>
                <a href="/blogs">Blogs</a>
                <a href="/contact">Contact</a>
              </div>
            )}
          </div>
        </nav>
      </header>

      <main className="main-content">
        <div className="hero-text">
          <p className="tagline">Quora is like having a personal assistant for<br/> your entire home.</p>
          <button className="pre-order-button">Pre-order →</button>
        </div>

        <div className="center-image">
          <img 
            src={centerImage} 
            alt="Quora smart home assistant"
            className="center-image-content"
          />
        </div>
      </main>
    </div>
    </div>
  );
};

export default QuoraLanding;