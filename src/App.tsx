import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PokemonListPage from './components/PokemonListPage';
import About from './components/About';
import PokemonPage from './components/PokemonPage';
import ItemPage from './components/ItemPage';
import ItemListPage from './components/ItemListPage';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar links={['Home', 'Pokemon', 'Items', 'About']} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/pokemon" component={PokemonListPage} />
          <Route path="/pokemon/:id" component={PokemonPage} />
          <Route path="/about" component={About} />
          <Route exact path="/items" component={ItemListPage} />
          <Route path="/items/:id" component={ItemPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
