import React from 'react';
import './style.css'; // Global styles
import Hero from './components/Hero'; // Import the Hero component

function App() {
  return (
    <div className="App">
      {/* You can keep a header if you like, or remove it if Hero is the main content */}
      <header className="App-header">
        <h1>Interactive Orb Avatar</h1>
      </header>
      <main>
        <Hero />
      </main>
      <footer>
        <p>Scroll around and move your mouse to see the effect!</p>
      </footer>
    </div>
  );
}

export default App;
