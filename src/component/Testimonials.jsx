import React, { useState, useRef, useEffect } from "react";
import { RiDoubleQuotesL } from "react-icons/ri";
import "./Testimonials.css";

// Import your local images
import rahulImg from "../assets/rahul.jpg";
import khushiImg from "../assets/khushi.jpg";
import kunalImg from "../assets/kunal.jpg";
import swapnilImg from "../assets/swapnil.jpg";
import kripaImg from "../assets/kripa.jpg";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef(null);
  const autoSlideInterval = useRef(null);

  const testimonials = [
    {
      id: 1,
      quote: "Love the simplicity",
      text: "Laxmi Paan is not a product — it's a tradition. The freshness and traditional taste bring back my childhood memories. Kudos to the consistency they've had over so many years!",
      name: "Rahul Pawar",
      role: "Founder of PTS",
      img: rahulImg, // Using imported image
    },
    {
      id: 2,
      quote: "Excellent Designs",
      text: "Love the paan at Laxmi Paan! It's just right, not too sweet, not too strong. It's my post-meal go-to — best in class and hygienic every time.",
      name: "Khushi Shimpi",
      role: "customer",
      img: khushiImg, // Using imported image
    },
    {
      id: 3,
      quote: "Efficient and Reliable",
      text: "Fan of original Indian flavor, Laxmi Paan never fails. Packaging, scent, and quality say so much about their heritage and dedication.",
      name: "Kunal Pawar",
      role: "customer",
      img: kunalImg, // Using imported image
    },
    {
      id: 4,
      quote: "Outstanding Service",
      text: "Tested lots but nothing comes close to Laxmi Paan. It's rich in flavor and prepared with love — just like how my grandfather used to enjoy it. Truly a legacy in every bite!",
      name: "Swapnil Gunkhe",
      role: "customer",
      img: swapnilImg, // Using imported image
    },
    {
      id: 5,
      quote: "Creative Solutions",
      text: "Laxmi Paan is the epitome of tradition and flavor. Their paan is always fresh and handcrafted. Once you taste it, there's no turning back!",
      name: "Kripa Shah",
      role: "customer",
      img: kripaImg, // Using imported image
    }
  ];

  const nextSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex >= testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex <= 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Start auto sliding
  const startAutoSlide = () => {
    autoSlideInterval.current = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds
  };

  // Stop auto sliding
  const stopAutoSlide = () => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
      autoSlideInterval.current = null;
    }
  };

  // Handle drag start
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    stopAutoSlide(); // Pause auto-slide when user interacts
  };

  // Handle dragging
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handle drag end
  const handleMouseUp = () => {
    setIsDragging(false);
    const slider = sliderRef.current;
    const cardWidth = slider.querySelector('.section__card').offsetWidth;
    const scrollPos = slider.scrollLeft;
    const newIndex = Math.round(scrollPos / cardWidth);
    
    setCurrentIndex(Math.max(0, Math.min(newIndex, testimonials.length - 1)));
    startAutoSlide(); // Resume auto-slide after user interaction
  };

  // Handle touch events for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    stopAutoSlide();
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    handleMouseUp();
    startAutoSlide();
  };

  // Auto-scroll to current index
  useEffect(() => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const card = slider.querySelector('.section__card');
      if (card) {
        const cardWidth = card.offsetWidth + 32; // including gap
        slider.scrollTo({
          left: currentIndex * cardWidth,
          behavior: 'smooth'
        });
      }
    }
  }, [currentIndex]);

  // Initialize and clean up auto-slide
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  return (
    <section className="section__container">
     <h1>What our customers say</h1>
      <p className="subtitle">Every satisfied customer has a story to tell; discover the genuine encounters that really set our brand apart.</p>
      <div className="slider-containers">
        <button className="slider-arrow left-arrow" onClick={prevSlide}>
          &lt;
        </button>
        <div 
          className="section__grid"
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={() => setIsDragging(false)}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {testimonials.map((testimonial) => (
            <div className="section__card" key={testimonial.id}>
              <span><RiDoubleQuotesL /></span>
              <h4>{testimonial.quote}</h4>
              <p>{testimonial.text}</p>
              <img src={testimonial.img} alt="user" />
              <h5>{testimonial.name}</h5>
              <h6>{testimonial.role}</h6>
            </div>
          ))}
        </div>
        <button className="slider-arrow right-arrow" onClick={nextSlide}>
          &gt;
        </button>
      </div>
     {/* <div className="Testimonial-dots-containers">
        {testimonials.map((_, index) => (
          <span 
            key={index} 
            className={`dots ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div> */}


    </section>
  );
};

export default Testimonials;