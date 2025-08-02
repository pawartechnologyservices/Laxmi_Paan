import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import logo from '../assets/logo2.png';
import './Footer.css';
import { database } from '../firebase'; // Make sure this path is correct
import { ref, push } from "firebase/database";

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const sendWhatsAppNotification = (email) => {
    // Format phone number (remove any non-digit characters)
    const phoneNumber = '919359436769'.replace(/\D/g, '');
    
    // Create message content
    const messageContent = encodeURIComponent(
      `New Newsletter Subscription:\n\n` +
      `*Email:* ${email}\n\n` +
      `_Sent from Laxmi Paan Website_`
    );
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${messageContent}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Create reference to 'newsletterSubscriptions' path
      const subscriptionsRef = ref(database, 'newsletterSubscriptions');
      
      // Push new subscription with timestamp
      await push(subscriptionsRef, {
        email: email,
        timestamp: new Date().toISOString()
      });
      
      // Send WhatsApp notification
      sendWhatsAppNotification(email);
      
      // Reset form and show success
      setEmail('');
      setSubscribed(true);
    } catch (err) {
      console.error("Error saving subscription: ", err);
      setError('Failed to subscribe. Please try again later.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setSubscribed(false);
        setError('');
      }, 5000);
    }
  };

  return (
    <footer className="footer-section">
      <div className="footer-overlay">
        <div className="footer-container">
          <div className="footer-columns">
            <div className="footer-column">
              <img src={logo} alt="Company Logo" className="footer-logo" />
              <p className="footer-about-text">
                "We believe in paan Masala that's not just tasty, but trustworthy."
              </p>
            </div>

            <div className="footer-column">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">Our Journey</Link></li>
                <li><Link to="/#distributorship">Distributorship</Link></li>
                <li><Link to="/rewards">Rewards</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Contact Info</h3>
              <ul>
                <li><a href="tel:+919922196472">+91 9922196472</a></li>
                <li><a href="mailto:laxmipaan1976@gmail.com">laxmipaan1976@gmail.com</a></li>
                <li>
                  <a 
                    href="https://maps.google.com?q=Battuls+Laxmi+Paan+Ghar+No.+2003/27,+Gunjalwadi,+Sangamner+Kh.,+Sangamner,+Dist.+Ahilyanagar,+Maharashtra+422605" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Battuls Laxmi Paan, Ghar No. 2003/27, Gunjalwadi, Sangamner Kh., Sangamner, Dist. Ahilyanagar, Maharashtra – 422605
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-column newsletter">
              <h3>Sign Up for Newsletter</h3>
              {subscribed ? (
                <div className="newsletter-success">Thank you for subscribing!</div>
              ) : (
                <form onSubmit={handleSubmit} className="newsletter-input">
                  <input 
                    type="email" 
                    placeholder="Enter your Email ID" 
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    required
                    disabled={isSubmitting}
                  />
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
              )}
              {error && <div className="newsletter-error">{error}</div>}
              <div className="social-icons">
                <a href="#" aria-label="Facebook" className="facebook-icon"><FaFacebook /></a>
                <a href="https://www.instagram.com/laxmipaan_official?igsh=MTFxbXk2djZ4bmprYw==" aria-label="Instagram" className="instagram-icon"><FaInstagram /></a>
                <a
                  href="https://wa.me/9922196472"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="whatsapp-icon"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="copyright">
              © {new Date().getFullYear()} <a href="https://www.pawartechnologyservices.com/" target="_blank" rel="noopener noreferrer" className="copyright-link">Pawar Technologies And Services</a>. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;