import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, RouteProps, Redirect, withRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PokemonListPage from './components/PokemonListPage';
import About from './components/About';
import PokemonPage from './components/PokemonPage';
import ItemPage from './components/ItemPage';
import ItemListPage from './components/ItemListPage';
import FavoritesPage from './components/FavoritesPage';

interface IPrivateRouteProps extends RouteProps {}

const authentication = {
  isAuthenticated: false,
  authenticate(cb: any) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb: any) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar links={['Home', 'Pokemon', 'Items', 'Favorites', 'About', 'Login']}>
          <AuthButton />
        </Navbar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/pokemon" component={PokemonListPage} />
          <Route path="/pokemon/:id" component={PokemonPage} />
          <Route path="/about" component={About} />
          <Route exact path="/items" component={ItemListPage} />
          <Route path="/items/:id" component={ItemPage} />
          <PrivateRoute exact path="/favorites" component={FavoritesPage} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
};

class Login extends React.Component<any, {}> {
  readonly state = {
    redirectToReferrer: false,
  };

  login = () => {
    authentication.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true,
      }));
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) return <Redirect to={from} />;

    return (
      <div className="container mt-5">
        <p>You must log in to view the page</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

const PrivateRoute = (props: IPrivateRouteProps) => {
  const { component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={props =>
        authentication.isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )}
    />
  );
};

const AuthButton = withRouter(
  ({ history }) =>
    authentication.isAuthenticated ? (
      <p>
        Welcome!
        <button
          onClick={() => {
            authentication.signout(() => history.push('/'));
          }}
          type="button"
          className="btn btn-danger"
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in</p>
    ),
);

export default App;
export { authentication };
