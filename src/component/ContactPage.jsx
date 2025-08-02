import React, { useState } from 'react';
import './ContactPage.css';
import { database } from '../firebase';
import { ref, push } from "firebase/database";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendWhatsAppMessage = (data) => {
    // Format phone number (remove any non-digit characters)
    const phoneNumber = '919673961161'.replace(/\D/g, '');
    
    // Create message content
    const messageContent = encodeURIComponent(
      `New Contact Form Submission:\n\n` +
      `*Name:* ${data.name}\n` +
      `*Email:* ${data.email}\n` +
      `*Phone:* ${data.phone || 'Not provided'}\n` +
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
    setSubmitting(true);
    
    try {
      // Create reference to 'contactMessages' path
      const messagesRef = ref(database, 'contactMessages');
      
      // Push new message with timestamp
      await push(messagesRef, {
        ...formData,
        timestamp: new Date().toISOString()
      });
      
      // Send WhatsApp message
      sendWhatsAppMessage(formData);
      
      // Reset form and show success
      setFormData({ name: '', email: '', phone: '', message: '' });
      setSubmitStatus({
        success: true,
        message: 'Message sent successfully! We will contact you soon.'
      });
    } catch (error) {
      console.error("Error submitting form: ", error);
      setSubmitStatus({
        success: false,
        message: 'Failed to send message. Please try again later.'
      });
    } finally {
      setSubmitting(false);
      // Clear status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ success: false, message: '' });
      }, 5000);
    }
  };

  return (
    <div className="contact-container">
      {/* Banner Section */}
      <div className="contact-banner">
        <div className="banner-content">
          {/* Optional: Add banner content if needed */}
        </div>
      </div>

      {/* Status Message */}
      {submitStatus.message && (
        <div className={`submit-status ${submitStatus.success ? 'success' : 'error'}`}>
          {submitStatus.message}
        </div>
      )}

      {/* Contact Form and Map Section */}
      <div className="contact-content-wrapper">
        <div className="contact-content">
          {/* Contact Form */}
          <div className="contact-form-container">
            <div className="form-intro">
              <h2>Get In Touch</h2>
              <p>
                Have questions or need assistance? Our team is here to help. 
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="contact-form">
              <h3>Send us a message</h3>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="submit-btn"
                disabled={submitting}
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Map */}
          <div className="contact-map">
            <h2>Our Location</h2>
            <div className="map-container">
              <iframe
                title="Company Location"
                src="https://maps.google.com?q=Battuls+Laxmi+Paan+Ghar+No.+2003/27,+Gunjalwadi,+Sangamner+Kh.,+Sangamner,+Dist.+Ahilyanagar,+Maharashtra+422605"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Address and Contact Info Section */}
      <div className="contact-info-wrapper">
        <div className="contact-info">
          <div className="info-item">
            <h3>Address</h3>
            <p>Battuls Laxmi Paan</p>
            <p>Ghar No. 2003/27, Gunjalwadi, Sangamner Kh.,</p>
            <p>Sangamner, Dist. Ahilyanagar, Maharashtra – 422605</p>
          </div>
          <div className="info-item">
            <h3>Phone</h3>
            <p>+91 7709107551</p>
          </div>
          <div className="info-item">
            <h3>Email</h3>
            <p>laxmipaan1976@gmail.com</p>
          </div>
          <div className="info-item">
            <h3>Hours</h3>
            <p>Monday - Friday: 9am - 5pm</p>
            <p>Saturday: 10am - 2pm</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;