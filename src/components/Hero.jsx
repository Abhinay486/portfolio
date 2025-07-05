import React from 'react';
import Avatar from './Avatar';
import './Hero.css'; // We'll create this for Hero specific styles

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Welcome to My Portfolio</h1>
        <p>This is a demonstration of a cool animated avatar.</p>
        <p>The orb's eyes follow your cursor, and the orb itself tilts gently.</p>
      </div>
      <div className="hero-avatar-container">
        <Avatar />
      </div>
    </section>
  );
};

export default Hero;
