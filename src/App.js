import React from 'react';
import Header from './Header';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import BestBooks from './BestBooks';
import Profile from './Profile';
// import LoginButton from './LoginButton';
import LoginForm from './LoginForm';
import LogoutButton from './LogoutButton';
import Login from './Login';
import Logout from './Logout';
import { withAuth0 } from "@auth0/auth0-react";





class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  setLogin = (user) => {
    console.log(user);
    this.setState({
      user,
    }, () => console.log(this.state.user));
  };

  logoutHandler = () => {
    this.setState({
      user: null,
    });
  }

  render() {
    return (
      <>
        <h1>Auth0</h1>
        {
          this.props.auth0.isAuthenticated
            ? <LogoutButton />
            : <LoginButton />
        }
        {
          this.props.auth0.isAuthenticated
            ? <Content />
            : <h2>Please Log In</h2>
        }
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler} />
          <Switch>
            <Route exact path="/">
              {this.state.user ? <BestBooks user={this.state.user} /> : <Login loginHandler={this.setLogin} />}
            </Route>
            <Route exact path="/Profile">
              <Profile userInfo={this.state.user} />
            </Route>
            <Route exact path="/LoginButton">
              <LoginForm loginHandler={this.setLogin} />
            </Route>
            <Route exact path="/LogoutButton">
              <LogoutButton onLogout={this.logoutHandler} />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
