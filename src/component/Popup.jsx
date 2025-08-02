import React, { useEffect } from 'react';
import { FaTimes, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import './Popup.css';

const Popup = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="popup-overlay">
      <div className={`popup-container ${type}`}>
        <div className="popup-icon">
          {type === 'success' ? (
            <FaCheckCircle className="success-icon" />
          ) : (
            <FaExclamationTriangle className="error-icon" />
          )}
        </div>
        <div className="popup-content">
          <h3>{type === 'success' ? 'Success!' : 'Error!'}</h3>
          <p>{message}</p>
        </div>
        <button className="popup-close-btn" onClick={onClose}>
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default Popup;