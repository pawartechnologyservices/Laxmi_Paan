import React, { useState } from 'react';
import { FaTimes, FaLeaf, FaEnvelope, FaPhone, FaFacebook, FaWhatsapp, FaInstagram, FaUser, FaPaperPlane } from 'react-icons/fa';
import './FloatingContactButton.css';
import { database } from '../firebase'; // Make sure this path is correct
import { ref, push } from "firebase/database";

const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });

  const toggleContactForm = () => {
    setIsOpen(!isOpen);
    // Clear status when closing
    if (isOpen) {
      setSubmitStatus({ success: false, message: '' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const sendWhatsAppMessage = (data) => {
    // Format phone number (remove any non-digit characters)
    const phoneNumber = '919359436769'.replace(/\D/g, '');
    
    // Create message content
    const messageContent = encodeURIComponent(
      `New Message from Floating Contact Form:\n\n` +
      `*Name:* ${data.name}\n` +
      `*Email:* ${data.email}\n` +
      `*Message:*\n${data.message}\n\n` +
      `_Sent from Laxmi Paan Website_`
    );
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${messageContent}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create reference to 'floatingContactMessages' path
      const messagesRef = ref(database, 'floatingContactMessages');
      
      // Push new message with timestamp
      await push(messagesRef, {
        ...formData,
        timestamp: new Date().toISOString()
      });
      
      // Send WhatsApp message
      sendWhatsAppMessage(formData);
      
      // Reset form and show success
      setFormData({ name: '', email: '', message: '' });
      setSubmitStatus({
        success: true,
        message: 'Message sent successfully!'
      });
      
      // Close form after 3 seconds
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form: ", error);
      setSubmitStatus({
        success: false,
        message: 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
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
          
          {submitStatus.message && (
            <div className={`floating-status ${submitStatus.success ? 'success' : 'error'}`}>
              {submitStatus.message}
            </div>
          )}
          
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