import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Ingredients.css';

// Sample images (replace with your actual images)
import datesImg from '../assets/dates.png';
import gulkandhImg from '../assets/gulkands.png';
import cherryImg from '../assets/cheerys.png';
import calcuttapanImg from '../assets/calcuttapan.png';
import saffronImg from '../assets/saffrons.png';
import cashewImg from '../assets/cashews.png';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

const Ingredients = () => {
  const containerRef = useRef();
  const ingredientRefs = useRef([]);
  
  const ingredients = [
    { id: 'dates', name: 'Premium Dates', img: datesImg, color: '#a0522d' },
    { id: 'gulkandh', name: 'Authentic Gulkandh', img: gulkandhImg, color: '#ff69b4' },
    { id: 'cherry', name: 'Juicy Cherry', img: cherryImg, color: '#e0115f' },
    { id: 'calcuttapan', name: 'Calcutta Pan', img: calcuttapanImg, color: '#8b4513' },
    { id: 'saffron', name: 'Pure Saffron', img: saffronImg, color: '#f4c430' },
    { id: 'cashew', name: 'Premium Cashew', img: cashewImg, color: '#d2b48c' }
  ];

  useGSAP(() => {
    // Initial setup for 3D perspective
    gsap.set(ingredientRefs.current, {
      rotationY: 15,
      rotationX: -5,
      transformPerspective: 1000,
      transformOrigin: "center center",
      opacity: 0,
      y: 50
    });

    // Entrance animation
    gsap.to(ingredientRefs.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Scroll-triggered 3D animation
    ingredientRefs.current.forEach((el, index) => {
      // Rotation animation on scroll
      gsap.to(el, {
        rotationY: 0,
        rotationX: 0,
        duration: 2,
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          end: "top 25%",
          scrub: 1,
          toggleActions: "play none none none"
        },
        ease: "power2.inOut"
      });

      // Hover effects
      el.addEventListener('mouseenter', () => {
        gsap.to(el, {
          scale: 1.05,
          z: 20,
          duration: 0.3,
          boxShadow: `0 15px 30px rgba(0,0,0,0.15)`,
          backgroundColor: ingredients[index].color + '15' // Add opacity to color
        });
        
        // Tilt effect on hover
        gsap.to(el.querySelector('.ingredient-image'), {
          z: 30,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)"
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          scale: 1,
          z: 0,
          duration: 0.3,
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          backgroundColor: "#ffffff"
        });
        
        gsap.to(el.querySelector('.ingredient-image'), {
          z: 0,
          duration: 0.5
        });
      });

      // Mouse move parallax effect
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = ((x - centerX) / centerX) * 5;
        const rotateX = ((centerY - y) / centerY) * -5;
        
        gsap.to(el, {
          rotationY: rotateY,
          rotationX: rotateX,
          duration: 0.5
        });
      });
      
      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.5
        });
      });
    });
  }, { scope: containerRef });

  return (
    <section className="ingredients-section" ref={containerRef}>
      <div className="ingredients-header">
        <h2>Our Premium Ingredients</h2>
        <p className="subtitle">Carefully selected for quality and authenticity</p>
      </div>
      
      <div className="ingredients-grid">
        {ingredients.map((ingredient, index) => (
          <div 
            key={ingredient.id}
            ref={el => ingredientRefs.current[index] = el}
            className="ingredient-3d"
            id={ingredient.id}
          >
            <div className="ingredient-image-container">
              <img 
                src={ingredient.img} 
                alt={ingredient.name} 
                className="ingredient-image"
                loading="lazy"
              />
            </div>
            <h3>{ingredient.name}</h3>
            <div className="ingredient-overlay" style={{ backgroundColor: ingredient.color + '20' }}></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Ingredients;