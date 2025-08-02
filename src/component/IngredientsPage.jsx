import React from 'react';
import './IngredientsPage.css';
import { FaLeaf, FaShieldAlt, FaFlask, FaHistory } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

// Import your ingredient images
import gulkandImg from '../assets/gulkand.webp';
import saffronImg from '../assets/saffron.webp';
import paanLeafImg from '../assets/calcuttapan.jpeg';
import cherryImg from '../assets/cherry.jpg';
import dryFruitsImg from '../assets/cashew.webp';
import datesImg from '../assets/date.webp';

const IngredientsPage = () => {
  // Animation controls for each section
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

const ingredients = [
  {
    name: "Gulkand",
    description: "Made from fresh Damask rose petals — sweet, cooling, and aromatic. Our gulkand is prepared using traditional methods to preserve its natural goodness and therapeutic properties.",
    image: gulkandImg
  },
  {
    name: "Saffron (Kesar)",
    description: "Premium-grade saffron strands from Kashmir to elevate both flavor and luxury. Each strand is hand-picked to ensure the highest quality and rich aroma.",
    image: saffronImg
  },
  {
    name: "Calcutta Paan Leaf",
    description: "Hand-selected for its freshness, tenderness, and authenticity. Grown in the fertile soils of West Bengal, these leaves provide the perfect base for our paan.",
    image: paanLeafImg
  },
  {
    name: "Cherry",
    description: "Adds a burst of sweet flavor and vibrant color in every bite. We use only the freshest, juiciest cherries to complement the other ingredients.",
    image: cherryImg
  },
  {
    name: "Dates (Khajoor)",
    description: "Adds richness and smooth texture — enhances sweetness naturally. We source premium Medjool dates known for their superior quality and natural sweetness.",
    image: datesImg
  }
];

  const safetyFeatures = [
    {
      title: "100% Natural Ingredients",
      description: "No artificial colors, flavors, or preservatives. We believe in keeping our products as nature intended.",
      icon: <FaLeaf style={{ color: '#006928' }} className="safety-icon pulse" />
    },
    {
      title: "Hygienic Production",
      description: "Manufactured in FDA-approved facilities following strict hygiene protocols to ensure your safety.",
      icon: <FaShieldAlt style={{ color: '#006928' }} className="safety-icon float" />
    },
    {
      title: "Quality Tested",
      description: "Every batch undergoes rigorous quality checks before reaching you.",
      icon: <FaFlask style={{ color: '#006928' }} className="safety-icon pulse" />
    },
    {
      title: "Traditional Methods",
      description: "We combine traditional preparation techniques with modern hygiene standards.",
      icon: <FaHistory style={{ color: '#006928' }} className="safety-icon float" />
    }
  ];

  const productionSteps = [
    {
      step: "Selection",
      description: "Hand-picking the finest ingredients from trusted sources across India",
      icon: "🌿"
    },
    {
      step: "Cleaning",
      description: "Triple-washed with purified water and natural cleansers",
      icon: "🚿"
    },
    {
      step: "Preparation",
      description: "Traditional methods with modern hygiene standards",
      icon: "👐"
    },
    {
      step: "Packaging",
      description: "Hygienic, airtight packaging to preserve freshness",
      icon: "📦"
    }
  ];

  // Animation variants
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const slideUpVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <motion.div 
      className="ingredients-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Full Width Banner */}
      <motion.div 
        className="full-width-ingredients-banner"
        variants={fadeInVariants}
      >
        <div className="ingredients-banner-content">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            The Essence of LaxmiPaan
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Finest Ingredients. Timeless Taste.
          </motion.p>
        </div>
      </motion.div>

      {/* Main Ingredients Section */}
      <motion.section 
        className="main-ingredients"
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <motion.h2 className="section-title" variants={slideUpVariants}>
          Our Premium Ingredients
        </motion.h2>
        <motion.div className="ingredients-grid" variants={containerVariants}>
          {ingredients.map((item, index) => (
            <motion.div 
              key={index} 
              className="ingredient-card"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="ingredient-image-container">
                <motion.img 
                  src={item.image} 
                  alt={item.name} 
                  className="ingredient-image"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                />
              </div>
              <div className="ingredient-content">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Safety & Quality Section */}
      <motion.section 
        className="safety-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="safety-container">
          <motion.h2 className="section-title" variants={slideUpVariants}>
            Our Safety Promise
          </motion.h2>
          <motion.div className="safety-grid" variants={containerVariants}>
            {safetyFeatures.map((item, index) => (
              <motion.div 
                key={index} 
                className="safety-card"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                {item.icon}
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Production Process Section */}
      <motion.section 
        className="production-details"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2 className="section-title" variants={slideUpVariants}>
          Our Careful Process
        </motion.h2>
        <motion.p className="section-subtitle" variants={slideUpVariants}>
          Every step is meticulously crafted to preserve the authenticity and quality of our traditional paan
        </motion.p>
        
        <motion.div className="production-steps" variants={containerVariants}>
          {productionSteps.map((item, index) => (
            <motion.div 
              key={index} 
              className="production-step"
              variants={itemVariants}
              custom={index}
              whileHover={{ scale: 1.05 }}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-icon">{item.icon}</div>
              <h3>{item.step}</h3>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default IngredientsPage;