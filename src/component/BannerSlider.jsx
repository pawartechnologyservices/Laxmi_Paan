import React from 'react';
import './BannerSlider.css';
import backgroundImage from '../assets/mmmmm.png';
import productImage from '../assets/mock.png';
import { motion } from 'framer-motion';

const BannerSlider = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const textVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const imageVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 10
      }
    }
  };

  return (
    <div className="paan-banner-slider">
      {/* Background Image */}
      <img src={backgroundImage} alt="Banner Background" className="paan-banner-background" />
      
      {/* Overlay Content */}
      <motion.div 
        className="paan-banner-overlay"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Product Image on Left */}
        <motion.div 
          className="paan-product-container"
          variants={imageVariants}
        >
          <img src={productImage} alt="Laxmi Paan Product" className="paan-product-image" />
        </motion.div>
        
        {/* Text on Right */}
        <motion.div 
          className="paan-text-content"
          variants={containerVariants}
        >
          <motion.h1 
            className="paan-main-heading" 
            variants={textVariants}
          >
            Laxmi Paan
          </motion.h1>
          <motion.p 
            className="paan-sub-heading"
            variants={textVariants}
            style={{animationDelay: '0.3s'}}
          >
            Tradition in every fold,<br />
            Taste in every leaf
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BannerSlider;