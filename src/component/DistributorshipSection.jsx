import React, { useState } from 'react';
import { GiProfit, GiLeafSwirl, GiPresent, GiShop, GiCash } from 'react-icons/gi';
import { MdLocalShipping, MdSupportAgent, MdStars } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './DistributorshipSection.css';

const DistributorshipSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    businessName: '',
    cityState: '',
    businessType: '',
    interestReason: '',
  });

  const [authMode, setAuthMode] = useState('signin');
  const [authData, setAuthData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [passwordError, setPasswordError] = useState('');

  // Password validation function
  const validatePassword = (password) => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return 'Password must contain at least one special character';
    }
    if ((password.match(/[0-9]/g) || []).length < 2) {
      return 'Password must contain at least two numbers';
    }
    return '';
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const benefitCardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [formRef, formInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [benefitsRef, benefitsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAuthChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'password') {
      const error = validatePassword(value);
      setPasswordError(error);
    }
    
    setAuthData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (authData.password !== authData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    // Check password requirements
    if (passwordError) {
      alert(passwordError);
      return;
    }
    
    // In a real app, you would send this to your backend
    alert('Account created successfully! Please sign in.');
    setAuthMode('signin');
    setAuthData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!authData.email || !authData.password) {
      alert('Please enter both email and password');
      return;
    }
    
    // Check password requirements
    if (passwordError) {
      alert(passwordError);
      return;
    }
    
    setAuthMode('authenticated');
    alert('Sign in successful!');
  };

  const handleSignOut = () => {
    setAuthMode('signin');
    setAuthData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your application! We will contact you soon.');
    setFormData({
      fullName: '',
      phoneNumber: '',
      email: '',
      businessName: '',
      cityState: '',
      businessType: '',
      interestReason: '',
    });
  };

  const renderAuthForm = () => {
    if (authMode === 'signup') {
      return (
        <>
          <h3>Create Account</h3>
          <form onSubmit={handleSignUp}>
            <div className="form-group">
              <label htmlFor="name">Full Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={authData.name}
                onChange={handleAuthChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={authData.email}
                onChange={handleAuthChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password*</label>
              <input
                type="password"
                id="password"
                name="password"
                value={authData.password}
                onChange={handleAuthChange}
                required
              />
              {passwordError && <div className="error-message">{passwordError}</div>}
              <div className="password-hint">
                Password must contain:
                <ul>
                  <li>At least 6 characters</li>
                  <li>1 special symbol (!@#$%^&*)</li>
                  <li>2 numbers</li>
                </ul>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password*</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={authData.confirmPassword}
                onChange={handleAuthChange}
                required
              />
            </div>

            <motion.button 
              type="submit" 
              className="submit-btns"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Account
            </motion.button>

            <div className="auth-switch">
              Already have an account?{' '}
              <button 
                type="button" 
                onClick={() => setAuthMode('signin')}
                className="auth-switch-btn"
              >
                Sign In
              </button>
            </div>
          </form>
        </>
      );
    } else if (authMode === 'signin') {
      return (
        <>
          <h3>Sign In to Apply</h3>
          <form onSubmit={handleSignIn}>
            <div className="form-group">
              <label htmlFor="email">Email Address*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={authData.email}
                onChange={handleAuthChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password*</label>
              <input
                type="password"
                id="password"
                name="password"
                value={authData.password}
                onChange={handleAuthChange}
                required
              />
              {passwordError && <div className="error-message">{passwordError}</div>}
            </div>

            <motion.button 
              type="submit" 
              className="submit-btns"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>

            <div className="auth-switch">
              Don't have an account?{' '}
              <button 
                type="button" 
                onClick={() => setAuthMode('signup')}
                className="auth-switch-btn"
              >
                Create Account
              </button>
            </div>
          </form>
        </>
      );
    } else {
      return (
        <>
          <h3>Apply for Distributorship</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name*</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number*</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="businessName">Business/Shop Name*</label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cityState">City & State*</label>
              <input
                type="text"
                id="cityState"
                name="cityState"
                value={formData.cityState}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="businessType">Type of Business*</label>
              <select
                id="businessType"
                name="businessType"
                value={formData.businessType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select business type</option>
                <option value="Retail Shop">Retail Shop</option>
                <option value="Supermarket">Supermarket</option>
                <option value="Pan Shop">Pan Shop</option>
                <option value="Event Gifting">Event Gifting</option>
                <option value="Franchise">Franchise</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="interestReason">Why are you interested in Laxmi Paan distributorship?*</label>
              <textarea
                id="interestReason"
                name="interestReason"
                value={formData.interestReason}
                onChange={handleInputChange}
                required
              />
            </div>
             <p className="bulk-order-note">
              <strong>Note:</strong> We offer special rewards and discounts for bulk orders. 
              Mention your expected order quantity in the message above for customized offers.
            </p>

            <motion.button 
              type="submit" 
              className="submit-btns"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Apply Now
            </motion.button>

            <div className="auth-switch">
              <button 
                type="button" 
                onClick={handleSignOut}
                className="auth-switch-btn"
              >
                Sign Out
              </button>
            </div>
          </form>
        </>
      );
    }
  };

  return (
    <section id="distributorship" className="distributorship-section">
      <div className="container">
        <motion.div 
          className="header-container"
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div className="header-content" variants={itemVariants}>
            <h2>Open for Distributorship – Join the Laxmi Paan Family</h2>
            <motion.p variants={itemVariants}>
              We are extending an invitation to franchise outlets, pan shops, supermarkets, event partners, and retailers to become our official distributors. Take part in the success of one of RS Battul's most dependable and delectable brands.
            </motion.p>
          </motion.div>
        </motion.div>

        <div className="content-row">
          <motion.div 
            className="form-section"
            ref={formRef}
            initial="hidden"
            animate={formInView ? "visible" : "hidden"}
            variants={itemVariants}
          >
            {renderAuthForm()}
          </motion.div>

          <motion.div 
            className="distributorship-content"
            ref={benefitsRef}
            initial="hidden"
            animate={benefitsInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.div className="benefits-section" variants={itemVariants}>
              <h3>Why Partner With Us?</h3>
              <div className="benefits-grid">
                <motion.div 
                  className="benefit-card"
                  variants={benefitCardVariants}
                >
                  <GiLeafSwirl className="benefit-icon" />
                  <h4>Trusted Local Brand</h4>
                </motion.div>
                <motion.div 
                  className="benefit-card"
                  variants={benefitCardVariants}
                >
                  <GiLeafSwirl className="benefit-icon" />
                  <h4>Premium, All-natural Ingredients</h4>
                </motion.div>
                <motion.div 
                  className="benefit-card"
                  variants={benefitCardVariants}
                >
                  <GiProfit className="benefit-icon" />
                  <h4>Attractive Profit Margins</h4>
                </motion.div>
                <motion.div 
                  className="benefit-card"
                  variants={benefitCardVariants}
                >
                  <GiPresent className="benefit-icon" />
                  <h4>Hygienic Packaging</h4>
                </motion.div>
                <motion.div 
                  className="benefit-card"
                  variants={benefitCardVariants}
                >
                  <MdSupportAgent className="benefit-icon" />
                  <h4>Marketing Support</h4>
                </motion.div>
                <motion.div 
                  className="benefit-card"
                  variants={benefitCardVariants}
                >
                  <MdLocalShipping className="benefit-icon" />
                  <h4>Fast-moving Products</h4>
                </motion.div>
              </div>
            </motion.div>

            {/* Show Bulk Order Rewards only when authenticated */}
            {authMode === 'authenticated' && (
              <motion.div 
                className="rewards-section"
                initial="hidden"
                animate={benefitsInView ? "visible" : "hidden"}
                variants={itemVariants}
              >
                <h3>
                  <MdStars className="reward-icon" /> Bulk Order Rewards
                </h3>
                <div className="rewards-grid">
                  <div className="reward-card">
                    <GiCash className="reward-icon" />
                    <h4>Volume Discounts</h4>
                    <p>Higher quantities = Better prices</p>
                  </div>
                  <div className="reward-card">
                    <MdLocalShipping className="reward-icon" />
                    <h4>Free Shipping</h4>
                    <p>On orders above ₹10,000</p>
                  </div>
                  <div className="reward-card">
                    <GiPresent className="reward-icon" />
                    <h4>Bonus Products</h4>
                    <p>Free samples with bulk orders</p>
                  </div>
                  <div className="reward-card">
                    <MdStars className="reward-icon" />
                    <h4>Priority Support</h4>
                    <p>Dedicated account manager</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DistributorshipSection;