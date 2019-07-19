import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar links={['Home', 'Pokemon', 'About']} />
    </div>
  );
};

export default App;
