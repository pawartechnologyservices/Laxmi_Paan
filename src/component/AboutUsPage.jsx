import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLocation } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import CountUp from 'react-countup';
import './AboutUsPage.css';
import './Timeline.css';

// Import images
import datesImage from '../assets/date.webp';
import saffronImage from '../assets/saffron.webp';
import gulkandImage from '../assets/gulkand.webp';
import cherryImage from '../assets/cherry.jpg';
import panImage from '../assets/calcuttapan.jpeg';
import chantiImage from '../assets/cashew.webp';
import founderImage from '../assets/founder.jpeg';
import gen1Image from '../assets/founder.jpeg';
import gen2Image from '../assets/founder.jpeg';
import gen3Image from '../assets/founder.jpeg';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const leftSlideVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const rightSlideVariants = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, ease: "easeOut" }
  }
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const specialtyCardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 0.77, 0.47, 0.97],
      scale: { type: "spring", stiffness: 100 }
    }
  }
};

const JourneySection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false });
  const [counterStarted, setCounterStarted] = useState(false);
  const counterRef = useRef(null);
  const [counterInView, setCounterInView] = useState(false);

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCounterInView(true);
          setCounterStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) observer.observe(counterRef.current);
    return () => {
      if (counterRef.current) observer.unobserve(counterRef.current);
    };
  }, []);

  const generationData = [
    {
      id: 1,
      year: "1958",
      name: "Shree Rajanna Battul",
      title: "The Beginning",
      description: [
        "In the lanes of a small town, Shree Rajanna Battul opened a modest paan counter.",
        "No fancy shop. No grand name. Just one counter, one flavour — and a heart filled with vision.",
        "He believed that paan wasn't just a taste — it was an emotion, a part of every celebration, and a companion to deep conversations.",
        "His dedication to purity and quality laid the foundation for what would become more than just a business — it became a legacy."
      ],
      quote: "Har leaf mein vishwas tha, har flavour mein sanskaar.",
      image: gen1Image,
      layout: 'right'
    },
    {
      id: 2,
      year: "1975",
      name: "Shree Ramchandra Battul",
      title: "The Evolution",
      description: [
        "Carrying his father's dreams forward, Ramchandra ji didn't just sell paan —",
        "He built relationships. He gave people a place to return to — a warm store with familiar smiles, consistent flavours, and unforgettable experiences.",
        "This was the time when the brand 'Laxmi Paan' was born — Not just a name, but a symbol of trust for every visitor.",
        "He expanded from one counter to a fully established store, where memories were served with every paan."
      ],
      quote: "Yeh sirf dukaan nahi thi — yeh logon ka apna kona tha, jahan har flavor mein ghar ki mehfil thi.",
      image: gen2Image,
      layout: 'left'
    },
    {
      id: 3,
      year: "1996",
      name: "Manoj Ramchandra Battul",
      title: "The Rebirth",
      description: [
        "The third generation didn't just inherit the business —",
        "He brought a vision, blending tradition with the pulse of the modern world.",
        "With his leadership, Laxmi Paan saw rebranding, innovation, and expansion, but never lost the essence passed down from his father and grandfather.",
        "He introduced new flavours, packaging, and a brand identity that resonated with both elders and youth.",
        "From old loyal customers to new-age explorers, everyone found their taste at Laxmi Paan."
      ],
      quote: "Manoj ji ne paan ko ek culture banaya — jismein virasat bhi thi aur naye daur ki zubaan bhi.",
      image: gen3Image,
      layout: 'right'
    }
  ];

  const counterVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="journey-container">
      <motion.div
        className="journey-header"
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants}>Our journey</motion.h2>
        <motion.h3 variants={itemVariants}>🇮🇳 Laxmi Paan – A Heartfelt Legacy Since 1958 🌿</motion.h3>
        <motion.p className="intro-text" variants={itemVariants}>
          From a humble little counter started with dreams and dedication, to becoming a beloved name that has touched countless lives — this is the story of our family, our passion, and our promise across generations.
        </motion.p>
      </motion.div>

      <div className="generations-timeline-simple">
        {generationData.map((gen) => (
          <motion.div
            key={gen.id}
            className="generation-simple"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div 
              className="generation-content-simple" 
              variants={gen.layout === 'left' ? leftSlideVariants : rightSlideVariants}
            >
              <div className="generation-year-simple">{gen.year}</div>
              <h3 className="generation-name-simple">{gen.name}</h3>
              <h4 className="generation-title-simple">{gen.title}</h4>
              <div className="generation-description-simple">
                {gen.description.map((line, index) => (
                  <motion.p key={index} variants={itemVariants}>{line}</motion.p>
                ))}
              </div>
              <motion.div 
                className="generation-image-container-simple" 
                variants={fadeInVariants}
              >
                <img src={gen.image} alt={gen.name} className="generation-image-simple" />
              </motion.div>
              <motion.div 
                className="generation-quote-simple"
                variants={itemVariants}
              >"{gen.quote}"</motion.div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="legacy-counter" ref={counterRef}>
        <motion.div
          className="counter-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={counterVariants}
        >
          <motion.div className="counter-item" variants={cardVariants}>
            <div className="counter-number">
              {counterInView && <CountUp start={0} end={3} duration={2.5} suffix="+" />}
            </div>
            <div className="counter-label">Generations</div>
            <p>From Rajanna to Manoj, a legacy of passion</p>
          </motion.div>

          <motion.div className="counter-item" variants={cardVariants}>
            <div className="counter-number">
              {counterInView && <CountUp start={0} end={65} duration={2.5} suffix="+" />}
            </div>
            <div className="counter-label">Years</div>
            <p>Of love, tradition, and innovation</p>
          </motion.div>

          <motion.div className="counter-item" variants={cardVariants}>
            <div className="counter-icon">🌟</div>
            <div className="counter-label">One Family</div>
            <p>One Promise. One Laxmi Paan</p>
          </motion.div>
        </motion.div>

        <motion.div
          className="thank-you-message"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="thank-you-text">
            Thank you for being part of our journey, for believing in our tradition, 
            and for savoring the taste that binds us all.
          </p>
          <div className="signature">- The Laxmi Paan Family</div>
        </motion.div>
      </div>
    </div>
  );
};

const AboutContent = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

const specialties = [
  { 
    image: datesImage, 
    title: "Dates", 
    description: "Natural sweetness from premium dates",
    hoverColor: "rgba(0, 105, 40, 0.8)"  // ← updated to match #006928
  },
  { 
    image: saffronImage, 
    title: "Saffron", 
    description: "Royal touch of Kashmir's finest",
    hoverColor: "rgba(0, 105, 40, 0.8)"
  },
  { 
    image: gulkandImage, 
    title: "Gulkand", 
    description: "Rose petal preserve for cooling effect",
    hoverColor: "rgba(0, 105, 40, 0.8)"
  },
  { 
    image: cherryImage, 
    title: "Cherry", 
    description: "Tangy sweetness for balance",
    hoverColor: "rgba(0, 105, 40, 0.8)"
  },
  { 
    image: panImage, 
    title: "Calcutta Paan", 
    description: "Authentic traditional blend",
    hoverColor: "rgba(0, 105, 40, 0.8)"
  }
  // { 
  //   image: chantiImage, 
  //   title: "Chanti Sugandh", 
  //   description: "Aromatic herbs for freshness",
  //   hoverColor: "rgba(0, 105, 40, 0.8)"
  // }
];

  return (
    <motion.div 
      className="about-content"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.div className="brand-intro" variants={containerVariants}>
        <motion.h2 variants={itemVariants}>About Laxmi Paan</motion.h2>
        <motion.h3 variants={itemVariants}>Tradition in Every Fold. Taste in Every Leaf.</motion.h3>
        <motion.p variants={itemVariants}>
          Laxmi Paan – RS Battul is more than just a brand—it's a symbol of purity, tradition, and taste. 
          Born in the heritage town of RS Battul, Maharashtra, our journey is rooted in generations of 
          pan-making expertise, blended seamlessly with modern hygiene and flavor innovation.
        </motion.p>
        
        <motion.div className="specialties-container" variants={fadeInVariants}>
          <motion.h4 className="specialties-heading" variants={itemVariants}>Our Specialties</motion.h4>
          <motion.p className="specialties-intro" variants={itemVariants}>
            We specialize in crafting natural mouth fresheners and handcrafted paan using premium, 
            handpicked ingredients that delight your senses:
          </motion.p>
          
  <div className="specialty-staggered-grid">
      {/* First row - 3 cards */}
      <div className="specialty-row first-row">
        {specialties.slice(0, 3).map((item, index) => (
          <motion.div 
            key={index}
            className="specialty-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={specialtyCardVariants}
          >
            <img src={item.image} alt={item.title} className="specialty-image" />
            <div className="specialty-overlay" style={{ backgroundColor: item.hoverColor }}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Second row - 2 cards (offset) */}
      <div className="specialty-row second-row">
        {specialties.slice(3, 5).map((item, index) => (
          <motion.div 
            key={index + 3}
            className="specialty-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={specialtyCardVariants}
          >
            <img src={item.image} alt={item.title} className="specialty-image" />
            <div className="specialty-overlay" style={{ backgroundColor: item.hoverColor }}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
        </motion.div>
        
        <motion.p variants={itemVariants}>
          Each bite promises not just taste, but authentic Indian tradition, making it ideal for 
          both daily refreshment and elegant gifting.
        </motion.p>
        
        <motion.div 
          className="quality-badge"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <strong>100% Natural – No Artificial Colors – No Preservatives</strong>
        </motion.div>
        
        <motion.p variants={itemVariants}>
          Whether it's post-meal enjoyment or a festive celebration, Laxmi Paan adds a special 
          touch of Indian richness to every moment.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const FounderContent = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div 
      className="founder-content"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.h2 variants={itemVariants}>Our Founder</motion.h2>
      
      <motion.div className="founder-details-container" variants={containerVariants}>
        <motion.div className="founder-text-container" variants={containerVariants}>
          <motion.h3 variants={itemVariants}>The Vision Behind Laxmi Paan</motion.h3>
          <motion.p variants={itemVariants}>
            Founded by a passionate entrepreneur from RS Battul with a deep-rooted family 
            background in paan craftsmanship, Laxmi Paan was established to preserve the 
            cultural richness of paan while elevating its standards for today's generation.
          </motion.p>
          <motion.p variants={itemVariants}>
            Driven by a desire to offer products that are flavorful, hygienic, and trustworthy, 
            the founder turned a legacy into a premium experience.
          </motion.p>
          
          <motion.div 
            className="founder-image-container"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            <img src={founderImage} alt="Laxmi Paan Founder" className="founder-image" />
          </motion.div>

          <motion.div 
            className="founder-quote-container"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="founder-quote">
              "We believe in Laxmi paan Masala that's not just tasty, but trustworthy."
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="vision-mission-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div className="vision-mission-column" variants={itemVariants}>
          <motion.div 
            className="vm-card vision-card"
            initial="hidden"
            whileInView="visible"
            variants={leftSlideVariants}
          >
            <h3>Our Vision</h3>
            <p>
              To become a leading brand in the natural mouth freshener and paan segment by 
              combining Indian traditions with contemporary standards of purity, style, and 
              customer satisfaction.
            </p>
          </motion.div>
        </motion.div>
        
        <motion.div className="vision-mission-column" variants={itemVariants}>
          <motion.div 
            className="vm-card mission-card"
            initial="hidden"
            whileInView="visible"
            variants={rightSlideVariants}
          >
            <h3>Our Mission</h3>
            <ul>
              <li>To offer high-quality, natural paan and mouth fresheners rooted in heritage</li>
              <li>To uphold the highest standards of hygiene and packaging</li>
              <li>To build a trusted brand that resonates across India and the world</li>
              <li>To promote Indian flavors through sustainable and honest business practices</li>
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const AboutUsPage = () => {
  const [activeTab, setActiveTab] = useState('about');
  const journeyRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToJourney) {
      setActiveTab('journey');
      setTimeout(() => {
        journeyRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.state]);

  const tabs = [
    { id: 'about', label: 'About LaxmiPaan' },
    { id: 'founder', label: 'Our Founder' },
    { id: 'journey', label: 'Our Journey' }
  ];

  return (
    <div className="about-us-page">
      <div className="about-banner">
        <div className="banner-overlay"></div>
        <div className="banner-text-container">
          <div className="banner-main-text">OUR STORY</div>
          <div className="banner-subtext">Three Generations. One Promise.</div>
        </div>
      </div>

      <div className="tabs-container">
        <div className="tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="tab-content">
        {activeTab === 'about' && <AboutContent />}
        {activeTab === 'founder' && <FounderContent />}
        {activeTab === 'journey' && (
          <div className="journey-content" ref={journeyRef}>
            <JourneySection />
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutUsPage;