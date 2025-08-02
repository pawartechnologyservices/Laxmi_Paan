import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import './Timeline.css';

// Placeholder images - replace these with your actual image imports
import img1958 from '../assets/pan/pan.png';
import img1968 from '../assets/pan/pan.png';
import img1978 from '../assets/pan/pan.png';

const TimelineItem = ({ year, image, title, content, isImageLeft }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  // Split content by bullet points and render each on a new line
  const renderBulletPoints = () => {
    return content.split('•').filter(point => point.trim() !== '').map((point, index) => (
      <div key={index} className="bullet-point">
        <span className="bullet-icon">•</span> 
        <span>{point.trim()}</span>
      </div>
    ));
  };

  return (
    <div 
      ref={ref}
      className={`timeline-item ${inView ? 'visible' : ''}`}
    >
      {/* Desktop layout remains unchanged */}
      <div className={`item-content desktop-only ${isImageLeft ? 'left' : 'right'}`}>
        {isImageLeft ? (
          <div className="year-image-container">
            <img src={image} alt={year} className="timeline-image" />
          </div>
        ) : (
          <>
            <h3>{title}</h3>
            <div className="bullet-points-container">
              {renderBulletPoints()}
            </div>
          </>
        )}
      </div>
      
      <div className="timeline-center-circle desktop-only">
        <div className="node-circle"></div>
        <div className="node-year">{year}</div>
      </div>
      
      <div className={`item-content desktop-only ${isImageLeft ? 'left' : 'right'}`}>
        {isImageLeft ? (
          <>
            <h3>{title}</h3>
            <div className="bullet-points-container">
              {renderBulletPoints()}
            </div>
          </>
        ) : (
          <div className="year-image-container">
            <img src={image} alt={year} className="timeline-image" />
          </div>
        )}
      </div>

      {/* Mobile-specific layout */}
      <div className="mobile-only">
        <div className="item-content mobile-text">
          <h3>{title}</h3>
          <div className="bullet-points-container">
            {renderBulletPoints()}
          </div>
        </div>
        
        <div className="item-content mobile-image">
          <div className="year-image-container">
            <img src={image} alt={year} className="timeline-image" />
          </div>
        </div>
        
        <div className="timeline-center-circle mobile-year">
          <div className="node-circle"></div>
          <div className="node-year">{year}</div>
        </div>
      </div>
    </div>
  );
};

const TimelineDividers = () => {
  const navigate = useNavigate();
  const [headerRef, headerInView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

const timelineData = [
  {
    year: "1958",
    image: img1958,
    title: "The journey began with shree Rajanna Battul",
    content: "• A single counter, a single flavour, but a heart full of hope • A vision rooted in quality, tradition, and trust",
    isImageLeft: false
  },
  {
    year: "1975",
    image: img1968,
    title: "With love and dedication, Ramchandra Battul took the torch",
    content: "• Introduced the iconic Laxmi Paan • Built a home for our customers — a full-fledged brand store where memories were made",
    isImageLeft: true
  },
  {
    year: "1996",
    image: img1978,
    title: "The third generation, Manoj Ramchandra Battul, brought new energy and vision",
    content: "• Rebranded, modernized, but never lost the soul of tradition • Made Laxmi Paan a name that lives in every household's heart",
    isImageLeft: false
  }
];

  return (
    <div className="timeline-container">
      {/* Header Section */}
      <div 
        ref={headerRef}
        className={`header-section ${headerInView ? 'visible' : ''}`}
      >
        <h1>Journey of Laxmi paan Products</h1>
        <p className="intro">
         Experience powerful aromas that spark curiosity and encourage a renewed desire for luxurious living. Let's explore the turning points in our history of innovation, expansion, and advancement to see how Laxmi Pan Masala climbed to prominence as one of India's most reputable brands. 
          "Authentic Taste Since 1958".
        </p>
      </div>

      {/* Timeline with vertical line and nodes */}
      <div className="timeline">
        {/* Vertical line */}
        <div className="timeline-line"></div>

        {/* Timeline Items */}
        <div className="timeline-items">
          {timelineData.map((item, index) => (
            <TimelineItem
              key={index}
              year={item.year}
              image={item.image}
              title={item.title}
              content={item.content}
              isImageLeft={item.isImageLeft}
            />
          ))}
        </div>
      </div>

       {/* Golden Read More Button */}
      <div className="read-more-container">
        <button 
          className="golden-read-more-btn"
          onClick={() => navigate('/about', { state: { scrollToJourney: true } })}
        >
          VIEW FULL JOURNEY
        </button>
      </div>
    </div>
  );
};

export default TimelineDividers;