import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h4>MusicMixer</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Team</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4>Features</h4>
            <ul>
              <li><a href="#">Mixer Studio</a></li>
              <li><a href="#">Song Library</a></li>
              <li><a href="#">AI Matching</a></li>
              <li><a href="#">Share Your Mix</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4>Community</h4>
            <ul>
              <li><a href="#">User Gallery</a></li>
              <li><a href="#">Forums</a></li>
              <li><a href="#">Events</a></li>
              <li><a href="#">Top Charts</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Terms & Privacy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 MusicMixer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;