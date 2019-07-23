import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PokemonListPage from './components/PokemonListPage';
import About from './components/About';
import PokemonPage from './components/PokemonPage';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar links={['Home', 'Pokemon', 'About']} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/pokemon" component={PokemonListPage} />
          <Route path="/pokemon/:id" component={PokemonPage} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
