import { Component } from 'react';
import { Button } from 'react-bootstrap';
import LoginForm from './LoginForm';

export default class LoginButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  handleLogState = () => {
    this.setState({
      isLoggedIn: true,
    });
  }

  render() {
    return (
      <>
        {this.state.isLoggedIn
          ?
          <LoginForm loginHandler={this.props.loginHandler} />
          :
          <Button variant="primary" onClick={this.handleLogState}>Log In</Button>
        }
      </>
    );
  }
}
