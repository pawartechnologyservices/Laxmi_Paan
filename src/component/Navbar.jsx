import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo6.png';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  const announcements = [
    // "Simply subscribe to your favorite Laxmi Pan and get delivery as per your chosen schedule",
    "No obligation - modify or cancel your subscription anytime",
    "Special discounts for loyal subscribers",
    "Free shipping on orders above ₹500"
  ];
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Our Journey", href: "/about" },
    // { name: "Ingredients", href: "/ingredients" },
    { name: "Distributorship", href: "/#distributorship" },
    { name: "Rewards", href: "/ " },
    { name: "Contact", href: "/contact" }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [announcements.length]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -100;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  };

  return (
    <>
      <div className={`announcement-bar ${scrolled ? 'hidden' : ''}`}>
        <p className="announcement-text">{announcements[currentAnnouncement]}</p>
      </div>

      <nav className="navbar">
        <div className="navbar-logo">
          <Link 
            to="/" 
            onClick={() => {
              if (location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <img src={logo} alt="Laxmi Pan Logo" />
          </Link>
        </div>

        <div className="nav-tabs desktop-only">
          {navLinks.map((link, index) => (
            link.name === "Distributorship" ? (
              <HashLink 
                key={index}
                to={link.href}
                className="nav-tab"
                scroll={el => scrollWithOffset(el)}
              >
                {link.name}
              </HashLink>
            ) : (
              <Link 
                key={index} 
                to={link.href} 
                className="nav-tab"
              >
                {link.name}
              </Link>
            )
          ))}
        </div>

        <div className="navbar-icons">
          <button className="hamburger mobile-only" onClick={toggleMenu}>
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </button>
        </div>

        <div className={`mobile-dropdown-menu mobile-only ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-dropdown-content">
            <div className="mobile-dropdown-links">
              {navLinks.map((link, index) => (
                link.name === "Distributorship" ? (
                  <HashLink
                    key={index}
                    to={link.href}
                    className="mobile-dropdown-link"
                    scroll={el => scrollWithOffset(el)}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </HashLink>
                ) : (
                  <Link 
                    key={index} 
                    to={link.href} 
                    className="mobile-dropdown-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;