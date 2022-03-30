import React from 'react';
import Card from 'react-bootstrap/Card';
import LoginButton from './LoginButton';
import './Login.css';



class Login extends React.Component {
  constructor(props) {
    super(props);
    
  }
  
  render() {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Log In</Card.Title>
          <Card.Text>
            Click Below to Log In
          </Card.Text>
          <LoginButton loginHandler={this.props.loginHandler} />
        </Card.Body>
      </Card>
    );
  }
}

export default Login;
