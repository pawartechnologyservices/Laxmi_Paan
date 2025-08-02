import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import './FloatingIngredientsBanner.css';

// Import local images
import dateImg from '../assets/date.webp';
import cherryImg from '../assets/cherry.jpg';
import gulkandImg from '../assets/gulkand.webp';
import saffronImg from '../assets/saffron.webp';
import panImg from '../assets/calcuttapan.jpeg';
import cashewImg from '../assets/cashew.webp';
import backgroundImg from '../assets/ll.png';

const FloatingIngredientsBanner = () => {
  const controls = useAnimation();
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3
  });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const ingredients = [
    { name: "Dates", image: dateImg },
    { name: "Cherry", image: cherryImg },
    { name: "Gulkand", image: gulkandImg },
    { name: "Saffron", image: saffronImg },
    { name: "Calcutta Pan", image: panImg },
    { name: "Cashew", image: cashewImg }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatVariants = {
    float: {
      y: ["0%", "-5%", "0%"],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  const galleryItemVariants = {
    hidden: { 
      opacity: 0,
      rotateY: 90,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "backOut"
      }
    }
  };

  const handleExploreClick = () => {
    navigate('/ingredients');
  };

  return (
    <section 
      className="ingredients-banner-section"
      ref={ref}
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="ingredients-overlay"></div>
      <div className="ingredients-banner-container">
        <motion.div 
          className="ingredients-header"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="centered-title">INGREDIENTS</h1>
        </motion.div>
        
        <motion.div 
          className="ingredients-content"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="left-description">
            <motion.h2
              variants={textVariants}
            >
              Premium Quality Ingredients
            </motion.h2>
            
            <motion.p 
              className="description"
              variants={textVariants}
            >
              Experience the depth of flavor and tradition in each bite. Delicious dates,
              juicy cherries, aromatic gulkand, royal saffron strands, genuine Calcutta pan,
              and premium cashews are all hand-picked ingredients that go into making our Pan Masala.
              <br/><br/>
              Each ingredient is picked not only for its flavor but also for the legacy it leaves behind,
              combining to create a cohesive, daring, revitalizing, and unforgettable experience.
            </motion.p>
            
            <motion.button
              className="explore-button"
              variants={textVariants}
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={handleExploreClick}
            >
              Explore Ingredients
            </motion.button>
          </div>
          
          <div className="gallery-wrapper">
            <motion.div 
              className="container-3d"
              variants={floatVariants}
              animate="float"
            >
              {ingredients.map((ingredient, index) => (
                <motion.span 
                  key={index} 
                  style={{ '--i': index + 1 }}
                  variants={galleryItemVariants}
                >
                  <img src={ingredient.image} alt={ingredient.name} />
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FloatingIngredientsBanner;