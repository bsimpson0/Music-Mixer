import React from "react";

const Header = () => {
  return (
    <header>
      <div className="container header-content">
        <div className="logo">
          <span className="logo-icon">♪</span>
          <h1>Music<span className="highlight">Mixer</span></h1>
        </div>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Create</a></li>
            <li><a href="#">Discover</a></li>
            <li><a href="#">Community</a></li>
            <li><a href="#">Sign In</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;