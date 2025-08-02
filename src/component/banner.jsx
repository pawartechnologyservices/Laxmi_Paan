import React from 'react';
import './banner.css';
import bannerImage from '../assets/k.png';
import rightImage from '../assets/mock.png';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Banner = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section className="banner">
      <img 
        src={bannerImage} 
        alt="Banner" 
        className="banner-image"
      />

      <motion.div
        className="banner-text"
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className="text-line">We believe in paan Masala</div>
        <div className="text-line">that's not just tasty, but trustworthy.</div>
      </motion.div>

      {/* Keep image non-motion to preserve layout */}
      <img
        src={rightImage}
        alt="Right side product"
        className="banner-right-image"
        
      />
    </section>
  );
};

export default Banner;
