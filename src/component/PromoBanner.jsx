import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './PromoBanner.css';

const GiftingSection = () => {
  const [activeTab, setActiveTab] = useState('weddings');
  const [hoveredPackage, setHoveredPackage] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Animation controls for scroll-triggered animations
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('Signing in with:', email, password);
    setShowSignIn(false);
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    console.log('Creating account with:', { name, email, phone, password });
    setShowCreateAccount(false);
  };

  return (
    <motion.section 
      className="gifting-section"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <div className="container">
        {/* Animated Header */}
        <motion.div className="section-header" variants={itemVariants}>
          <motion.h2 
            className="animated-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Elegant Gifting by Laxmi Paan
          </motion.h2>
          <motion.div 
            className="divider animated"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.div>

        {/* Intro Paragraph */}
        <motion.div className="intro-paragraph fade-in" variants={itemVariants}>
          <p>
            Our excellent in quality paan masala and mouth freshener line is a representation of Indian custom, festivity, and hospitality and is not only for use after meals. Laxmi Pan makes a classy and considerate present for any occasion, including weddings, Diwali, and business gatherings.
          </p>
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div 
          className="cta-section zoom-in"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: "easeOut"
              }
            }
          }}
        >
          <div className="cta-content">
            <motion.h3 
              variants={itemVariants}
            >
              Unlock Exclusive Gifting Benefits
            </motion.h3>
            <motion.p 
              className="cta-subtext"
              variants={itemVariants}
            >
              {showCreateAccount 
                ? 'Join our community to access special benefits' 
                : 'Sign in to access special discounts, track orders, and save your favorite gift combinations.'}
            </motion.p>
            
            {!showCreateAccount && (
              <motion.div 
                className="cta-buttons"
                variants={itemVariants}
              >
                <button 
                  className="primary-cta" 
                  onClick={() => {
                    setShowSignIn(!showSignIn);
                    setShowCreateAccount(false);
                  }}
                >
                  {showSignIn ? 'Hide Sign In' : 'Sign In for Benefits'}
                </button>
                <button className="secondary-cta">Request a Custom Quote</button>
              </motion.div>
            )}

            {showSignIn && !showCreateAccount && (
              <motion.div 
                className="signin-form"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleSignIn}>
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="signin-button">
                    Sign In
                  </button>
                  <div className="signin-links">
                    <a href="#forgot">Forgot password?</a>
                    <a 
                      href="#register" 
                      onClick={(e) => {
                        e.preventDefault();
                        setShowCreateAccount(true);
                        setShowSignIn(false);
                      }}
                    >
                      Create account
                    </a>
                  </div>
                </form>
              </motion.div>
            )}

            {showCreateAccount && (
              <motion.div 
                className="create-account-form"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleCreateAccount}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      placeholder="Create Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="create-account-button">
                    Create Account
                  </button>
                  <div className="account-links">
                    <span>Already have an account?</span>
                    <a 
                      href="#login" 
                      onClick={(e) => {
                        e.preventDefault();
                        setShowSignIn(true);
                        setShowCreateAccount(false);
                      }}
                    >
                      Sign In
                    </a>
                  </div>
                </form>
              </motion.div>
            )}
          </div>
          
          <motion.div 
            className="cta-perks"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.4
                }
              }
            }}
          >
            <motion.div 
              className="perk-item"
              variants={{
                hidden: { x: -20, opacity: 0 },
                visible: { x: 0, opacity: 1 }
              }}
            >
              <span className="perk-icon">✔</span>
              <span>Exclusive member discounts</span>
            </motion.div>
            <motion.div 
              className="perk-item"
              variants={{
                hidden: { x: -20, opacity: 0 },
                visible: { x: 0, opacity: 1 }
              }}
            >
              <span className="perk-icon">✔</span>
              <span>Faster checkout</span>
            </motion.div>
            <motion.div 
              className="perk-item"
              variants={{
                hidden: { x: -20, opacity: 0 },
                visible: { x: 0, opacity: 1 }
              }}
            >
              <span className="perk-icon">✔</span>
              <span>Early access to new products</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default GiftingSection;