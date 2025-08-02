import React, { useState } from 'react';
import { FaTimes, FaLeaf, FaEnvelope, FaPhone, FaFacebook, FaWhatsapp, FaInstagram, FaUser, FaPaperPlane } from 'react-icons/fa';
import './FloatingContactButton.css';

const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleContactForm = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setIsOpen(false);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="floating-contact-container">
      <button 
        className={`floating-contact-button ${isOpen ? 'open' : ''}`}
        onClick={toggleContactForm}
        aria-label={isOpen ? 'Close contact form' : 'Open contact form'}
      >
        {isOpen ? <FaTimes /> : <FaLeaf />}
      </button>

      {isOpen && (
        <div className="contact-panel">
          <h3>Get In Touch</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Your message here..."
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="submit-buttons"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  <FaPaperPlane style={{ marginRight: '8px' }} />
                  Send Message
                </>
              )}
            </button>
          </form>

          <div className="contact-methods">
            <div className="direct-contact">
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>laxmipaan1976@gmail.com</span>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <span>+91 7709107551</span>
              </div>
            </div>

            <div className="social-icons">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="#facebook" aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href="https://wa.me/9922196472" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp />
                </a>
                <a href="https://www.instagram.com/laxmipaan_official?igsh=MTFxbXk2djZ4bmprYw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingContactButton;