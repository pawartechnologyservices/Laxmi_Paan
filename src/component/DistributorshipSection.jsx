import React, { useState, useEffect } from 'react';
import { GiProfit, GiLeafSwirl, GiPresent, GiShop, GiCash } from 'react-icons/gi';
import { MdLocalShipping, MdSupportAgent, MdStars } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './DistributorshipSection.css';
import { database, auth } from '../firebase';
import { ref, set, push } from "firebase/database";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import Popup from './Popup';

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

  const [currentUser, setCurrentUser] = useState(null);
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popup, setPopup] = useState({
    show: false,
    type: '',
    message: ''
  });

  // Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setAuthMode('authenticated');
      } else {
        setCurrentUser(null);
        setAuthMode('signin');
      }
    });
    return () => unsubscribe();
  }, []);

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

  const showPopup = (type, message) => {
    setPopup({
      show: true,
      type,
      message
    });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      setPopup({
        show: false,
        type: '',
        message: ''
      });
    }, 5000);
  };

  const closePopup = () => {
    setPopup({
      show: false,
      type: '',
      message: ''
    });
  };

  const sendWhatsAppNotification = (data) => {
    // Format phone number (remove any non-digit characters)
    const phoneNumber = '919359436769'.replace(/\D/g, '');
    
    // Create message content
    const messageContent = encodeURIComponent(
      `New Distributorship Application:\n\n` +
      `*Name:* ${data.fullName}\n` +
      `*Phone:* ${data.phoneNumber}\n` +
      `*Email:* ${data.email || 'Not provided'}\n` +
      `*Business:* ${data.businessName}\n` +
      `*Location:* ${data.cityState}\n` +
      `*Business Type:* ${data.businessType}\n` +
      `*Reason:*\n${data.interestReason}\n\n` +
      `_Sent from Laxmi Paan Website_`
    );
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${messageContent}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (authData.password !== authData.confirmPassword) {
      showPopup('error', "Passwords don't match!");
      return;
    }
    
    // Check password requirements
    if (passwordError) {
      showPopup('error', passwordError);
      return;
    }
    
    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        authData.email, 
        authData.password
      );
      
      // Store additional user info in Realtime Database
      const userInfoRef = ref(database, `users/${userCredential.user.uid}/info`);
      await set(userInfoRef, {
        name: authData.name,
        email: authData.email,
        createdAt: new Date().toISOString()
      });
      
      // Update UI state
      setAuthMode('authenticated');
      setAuthData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      
      showPopup('success', 'Account created successfully!');
    } catch (error) {
      console.error("Sign up error: ", error);
      
      // Custom error messages for Firebase authentication errors
      let errorMessage = 'Failed to create account. Please try again.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email already in use. Please sign in or use a different email.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please use a stronger password.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address. Please enter a valid email.';
      }
      
      showPopup('error', errorMessage);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    
    if (!authData.email || !authData.password) {
      showPopup('error', 'Please enter both email and password');
      return;
    }
    
    try {
      await signInWithEmailAndPassword(
        auth, 
        authData.email, 
        authData.password
      );
      showPopup('success', 'Sign in successful!');
    } catch (error) {
      console.error("Sign in error: ", error);
      
      // Custom error messages for Firebase authentication errors
      let errorMessage = 'Failed to sign in. Please try again.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found. Please create an account first.';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password. Please check your credentials.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Account temporarily locked. Please try again later.';
      } else {
        errorMessage = error.message || 'Failed to sign in. Please try again.';
      }
      
      showPopup('error', errorMessage);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      showPopup('success', 'Signed out successfully!');
    } catch (error) {
      console.error("Sign out error: ", error);
      showPopup('error', 'Failed to sign out. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      showPopup('error', 'You need to be signed in to submit an application. Please create an account first.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create reference to user's distributorship applications
      const applicationsRef = ref(database, `users/${currentUser.uid}/distributorshipApplications`);
      
      // Push new application with timestamp
      const newApplicationRef = push(applicationsRef);
      await set(newApplicationRef, {
        ...formData,
        timestamp: new Date().toISOString()
      });
      
      // Send WhatsApp notification
      sendWhatsAppNotification(formData);
      
      // Reset form and show success
      setFormData({
        fullName: '',
        phoneNumber: '',
        email: '',
        businessName: '',
        cityState: '',
        businessType: '',
        interestReason: '',
      });
      
      showPopup('success', 'Application submitted successfully! We will contact you soon.');
    } catch (error) {
      console.error("Error submitting application: ", error);
      showPopup('error', error.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
          <div className="auth-message">
            <p>You need to create an account or sign in to access the distributorship application form.</p>
          </div>
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
          {currentUser && (
            <div className="user-info">
              Signed in as: {currentUser.email}
            </div>
          )}
          
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Apply Now'}
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
      {/* Popup Component */}
      {popup.show && (
        <Popup 
          type={popup.type} 
          message={popup.message} 
          onClose={closePopup} 
        />
      )}

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