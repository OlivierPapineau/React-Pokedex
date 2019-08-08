import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteProps,
  Redirect,
  withRouter,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Pages/Home";
import PokemonListPage from "./components/Pages/PokemonListPage";
import About from "./components/Pages/About";
import PokemonPage from "./components/Pages/PokemonPage";
import ItemPage from "./components/Pages/ItemPage";
import ItemListPage from "./components/Pages/ItemListPage";
import FavoritesPage from "./components/Pages/FavoritesPage";
import LogoutButton from "./components/Pages/_pageElements/loginPageElements/LogoutButton";
interface IPrivateRouteProps extends RouteProps {
  component: any;
  loggedIn: boolean;
}

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

export interface IAppProps {}

export interface IAppState {
  loggedIn: boolean;
  user: {
    username?: string;
    age?: number;
  };
}

const initState = () => {
  return {
    loggedIn:
      Object.hasOwnProperty.call(window.localStorage, "USER_loggedIn") &&
      window.localStorage.USER_loggedIn === "true",
    user: {},
  };
};

const AppContext = React.createContext(initState());

class App extends React.Component<IAppProps, IAppState> {
  readonly state = initState();

  constructor(props: IAppProps) {
    super(props);
  }

  login = () => {
    this.setState({ loggedIn: true });
    window.localStorage.setItem("USER_loggedIn", "true");
  };

  logout = () => {
    this.setState({ loggedIn: false });
    window.localStorage.setItem("USER_loggedIn", "false");
  };

  render() {
    const { loggedIn } = this.state;
    const navbarLinks = ["Home", "Pokemon", "Items", "Favorites", "About"];
    console.log("APP PROPS: ", this.props);

    if (!loggedIn) {
      navbarLinks.push("Login");
    }
    return (
      <Router>
        <div>
          <Navbar links={navbarLinks}>
            <LogoutButton loggedIn={loggedIn} logout={this.logout} />
          </Navbar>
          <AppContext.Provider value={this.state}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/pokemon" component={PokemonListPage} />
              <Route path="/pokemon/:id" component={PokemonPage} />
              <Route path="/about" component={About} />
              <Route exact path="/items" component={ItemListPage} />
              <Route path="/items/:id" component={ItemPage} />
              <PrivateRoute
                component={FavoritesPage}
                exact
                loggedIn={loggedIn}
                path="/favorites"
              />
              <Route
                exact
                path="/login"
                render={() => (
                  <Login loggedIn={loggedIn} doLogin={this.login} />
                )}
              />
            </Switch>
          </AppContext.Provider>
        </div>
      </Router>
    );
  }
}

interface ILoginProps {
  doLogin: () => any;
  // location: { form: { pathname: string; search: string }; state: any };
  loggedIn: boolean;
}
class Login extends React.Component<ILoginProps, {}> {
  readonly state = {
    redirectToReferrer: false,
  };

  login = () => {
    this.props.doLogin();
    // authentication.authenticate(() => {
    //   this.setState(() => ({
    //     redirectToReferrer: true,
    //   }));
    // });
  };

  render() {
    console.log(this.props);

    const { loggedIn } = this.props;
    // const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (loggedIn) return <Redirect to={"/"} />;
    if (redirectToReferrer === true) return <Redirect to={"/"} />;

    return (
      <div className="container mt-5">
        <p>You must log in to view the page</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

const PrivateRoute = (props: IPrivateRouteProps) => {
  const { component: Component, loggedIn, ...rest } = props;
  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

// const AButton = ({ history, loggedIn }: { history: any; loggedIn: boolean }) =>
//   loggedIn ? (
//     <p>
//       Welcome!
//       <button
//         onClick={() => {
//           authentication.signout(() => history.push("/"));
//         }}
//         type="button"
//         className="btn btn-danger"
//       >
//         Sign out
//       </button>
//     </p>
//   ) : (
//     <p>You are not logged in</p>
//   );

// const AuthButton = withRouter(AButton as any);

export default App;
export { authentication };
