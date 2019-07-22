import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PokemonListPage from './components/PokemonListPage';
import About from './components/About';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar links={['Home', 'Pokemon', 'About']} />

        <Route exact path="/" component={Home} />
        <Route path="/pokemon" component={PokemonListPage} />
        <Route path="/about" component={About} />
      </div>
    </Router>
  );
};

export default App;
