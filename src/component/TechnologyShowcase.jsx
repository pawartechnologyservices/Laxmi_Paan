import React from 'react';
import './TechnologyShowcase.css';

const TechnologyShowcase = () => {
  const technologies = [
    "7.45 Degrees*",
    "Codecraft_",
    "CoreOS",
    "Fourpoints",
    "Norsa Star",
    "Quora Tech"
  ];

  return (
    <div className="technology-showcase">
      <h1>Cutting-edge technology meets <br />timeless design</h1>

      {/* Brands slider */}
      <div className="brands-slider-container">
        <div className="brands-slider">
          <div className="brands-track">
            {[...technologies, ...technologies].map((tech, index) => (
              <div key={index} className="brand-item">
                {tech}
                {index < technologies.length * 2 - 1 && <span className="separator">•</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* Testimonial Section */}
      <div className="testimonial-section">
        <div className="curved-box">
          <div className="testimonial-container">

            {/* Testimonial Image */}
            <div className="testimonial-image">
              <img
                src="https://framerusercontent.com/images/C4AB5PRdkU4tzYpdiXzH9YwF00.jpeg"
                alt="Testimonial"
                className="testimonial-img"
              />
            </div>

            {/* Testimonial Content */}
            <div className="testimonial-content">
              <div className="testimonial-tag">
                Testimonial
              </div>
              <p className="testimonial-text">
                Quora made our home feel smarter instantly. The setup was simple,
                intuitive, and surprisingly fast. From the moment we connected it,
                everything just worked — seamlessly and beautifully.
              </p>
              <p className="testimonial-author">— Sarah, Kickflip</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <div className="menu-footer">
        <button className="remix-button">Remix for free →</button>
        <div className="made-in">Made in Framer</div>
      </div> */}
    </div>
  );
};

export default TechnologyShowcase;
