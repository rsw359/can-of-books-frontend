import React from 'react';
import Header from './Header';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BestBooks from './BestBooks';
import Profile from './Profile';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';
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
        <h1>Book Share</h1>
        {
          this.props.auth0.isAuthenticated
            ? <LogoutButton />
            : <LoginButton />
        }
        <Router>
          <Header user={this.state.user} onLogout={this.logoutHandler} />
          <Switch>
            <Route exact path="/">
              {this.props.auth0.isAuthenticated ? <BestBooks user={this.state.user} /> : <h2>Please Log In</h2>}
            </Route>
            <Route exact path="/Profile">
              <Profile userInfo={this.state.user} />
            </Route>
            <Route exact path="/LoginButton">
              {/* <LoginForm loginHandler={this.setLogin} /> */}
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
