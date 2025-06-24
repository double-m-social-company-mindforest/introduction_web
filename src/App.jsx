import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation.jsx';
import HorizontalScroll from './components/HorizontalScroll.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <HorizontalScroll />
      </div>
    </Router>
  );
}

export default App;