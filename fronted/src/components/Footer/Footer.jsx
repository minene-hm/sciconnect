import React from "react";
import "./Footer.css";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaLinkedinIn,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <h3 className="footer-logo">SciConnect</h3>
            <p className="footer-desc">
              The premier AI and future science summit bringing together visionaries,
              researchers, and industry leaders.
            </p>
            <div className="footer-socials">
              <a href="#" aria-label="X (Twitter)"><FaXTwitter /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href="#" aria-label="GitHub"><FaGithub /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
            </div>
          </div>

          <div className="footer-newsletter-wrap">
            <h4 className="footer-heading">Stay Updated</h4>
            <p className="footer-newsletter-text">
              Subscribe to get the latest news and updates.
            </p>
            <form className="footer-newsletter">
              <input type="email" placeholder="Your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 SciConnect. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <span>|</span>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;