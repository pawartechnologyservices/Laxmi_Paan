import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GiftingInnerPage.css';

const GiftingInnerPage = () => {
  const [activeTab, setActiveTab] = useState('weddings');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showCustomization, setShowCustomization] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const packages = {
    weddings: [
      {
        id: 1,
        name: 'Royal Wedding Package',
        description: 'Premium pan masala with gold foil packaging, perfect for wedding favors',
        price: 2999,
        image: '/images/wedding-package.jpg',
        contents: ['100 premium pouches', 'Custom branding', 'Elegant gift box']
      },
      {
        id: 2,
        name: 'Deluxe Wedding Set',
        description: 'Complete wedding gifting solution with variety of flavors',
        price: 4999,
        image: '/images/deluxe-wedding.jpg',
        contents: ['200 assorted pouches', 'Personalized tags', 'Premium packaging']
      }
    ],
    corporate: [
      {
        id: 3,
        name: 'Executive Gift Box',
        description: 'Sophisticated corporate gifting for clients and partners',
        price: 1999,
        image: '/images/corporate-gift.jpg',
        contents: ['50 premium pouches', 'Company branding', 'Luxury presentation box']
      }
    ],
    festivals: [
      {
        id: 4,
        name: 'Diwali Special Hamper',
        description: 'Festive collection perfect for Diwali gifts',
        price: 999,
        image: '/images/diwali-hamper.jpg',
        contents: ['25 festive pouches', 'Decorative box', 'Festive greeting card']
      }
    ]
  };

  const handleAddToCart = () => {
    // In a real app, you would add to cart logic here
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 3000);
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="gifting-inner-page">
      {/* Back Navigation */}
      <button className="back-button" onClick={handleBackClick}>
        &larr; Back to Gifting
      </button>

      {/* Main Content */}
      <div className="inner-page-container">
        {/* Package Details Section */}
        <div className="package-details-section">
          <div className="package-image-gallery">
            <div className="main-image">
              <img src={selectedPackage?.image || packages[activeTab][0].image} alt={selectedPackage?.name || packages[activeTab][0].name} />
            </div>
            <div className="thumbnail-gallery">
              {packages[activeTab].map(pkg => (
                <img 
                  key={pkg.id}
                  src={pkg.image} 
                  alt={pkg.name}
                  className={selectedPackage?.id === pkg.id ? 'active' : ''}
                  onClick={() => setSelectedPackage(pkg)}
                />
              ))}
            </div>
          </div>

          <div className="package-info">
            <h2>{selectedPackage?.name || packages[activeTab][0].name}</h2>
            <p className="price">₹{selectedPackage?.price || packages[activeTab][0].price}</p>
            <p className="description">{selectedPackage?.description || packages[activeTab][0].description}</p>
            
            <div className="package-contents">
              <h4>Package Includes:</h4>
              <ul>
                {(selectedPackage?.contents || packages[activeTab][0].contents).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <button 
              className="customize-button"
              onClick={() => setShowCustomization(!showCustomization)}
            >
              {showCustomization ? 'Hide Customization' : 'Add Customization'}
            </button>

            {showCustomization && (
              <div className="customization-options">
                <h4>Customize Your Gift:</h4>
                <textarea
                  placeholder="Enter your custom message (max 200 characters)"
                  maxLength={200}
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                />
                <small>{200 - customMessage.length} characters remaining</small>
              </div>
            )}

            <div className="action-buttons">
              <button className="add-to-cart" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="buy-now">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Related Packages */}
        <div className="related-packages">
          <h3>You May Also Like</h3>
          <div className="related-items">
            {packages[activeTab].filter(pkg => pkg.id !== (selectedPackage?.id || packages[activeTab][0].id)).map(pkg => (
              <div key={pkg.id} className="related-item" onClick={() => setSelectedPackage(pkg)}>
                <img src={pkg.image} alt={pkg.name} />
                <h4>{pkg.name}</h4>
                <p>₹{pkg.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="testimonials-section">
          <h3>What Our Customers Say</h3>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="rating">★★★★★</div>
              <p>"The wedding packages from Laxmi Pan were a hit with our guests. The quality and presentation were exceptional!"</p>
              <div className="customer-info">
                <span>- Rajesh K., Mumbai</span>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="rating">★★★★☆</div>
              <p>"Our corporate clients loved the Executive Gift Boxes. Will definitely order again for the next fiscal year."</p>
              <div className="customer-info">
                <span>- Priya M., Delhi</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="success-modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowSuccessModal(false)}>&times;</span>
            <h3>Added to Cart!</h3>
            <p>Your {selectedPackage?.name || packages[activeTab][0].name} has been added to your shopping cart.</p>
            <button onClick={() => navigate('/cart')}>View Cart</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftingInnerPage;