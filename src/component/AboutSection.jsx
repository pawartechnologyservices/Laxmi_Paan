import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import { motion, useInView } from 'framer-motion';
import './AboutSection.css';
import aboutImage from '../assets/abo.png';
import { FiRefreshCw, FiHeart, FiUsers, FiZap } from 'react-icons/fi';

const AboutSection = () => {
  const navigate = useNavigate(); // Add this hook
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

const features = [
  {
    title: "Awaken",
    description: "Designed to awaken your senses and invigorate your day, each bite delivers a burst of freshness.",
    icon: <FiRefreshCw size={24} />
  },
  {
    title: "Elevate",
    description: "Honor the spirit of taste and tradition. Allow each flavor to uplift your spirit and mood.",
    icon: <FiHeart size={24} />
  },
  {
    title: "Nostalgia",
    description: "Let flavors decide to take you once more in time — from fond memories to childhood nostalgia.",
    icon: <FiUsers size={24} />
  },
  {
    title: "Ignite",
    description: "Admire powerful aromas that pique interest and inspire a renewed desire for luxury.",
    icon: <FiZap size={24} />
  }
];


  return (
    <section className="about-section" ref={ref}>
      <motion.div 
        className="about-container"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div className="about-content" variants={textVariants}>
          <h2>Our Exclusive Products</h2>
          {/* <p>
            Founded by RS BATTUL, Laxmi Paan was born from the desire to modernize traditional paan while staying rooted in 
            culture. With deep family roots in the paan business, the founder brings together generational expertise with modern 
            quality control, branding, and ethical manufacturing. 
          </p> */}
          <h3>"We believe in paan that's not just tasty, but trustworthy."</h3>
          
          <div className="features-container">
            <div className="features-grid">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="feature-card"
                  variants={itemVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="feature-header">
                    <div className="feature-icon">{feature.icon}</div>
                    <h4>{feature.title}</h4>
                  </div>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="know-more-below"
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: features.length * 0.1 }}
            >
              <motion.a
                href="/about" // This can stay as fallback
                className="know-more-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                 onClick={(e) => {
          e.preventDefault(); // Prevent default anchor behavior
          navigate('/about'); // Programmatic navigation
        }}
              >
                Unfold the Story
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div className="about-image" variants={imageVariants}>
          <img 
            src={aboutImage} 
            alt="Laxmi paan Masala" 
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/600x600?text=About+Us';
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSection;