import { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

class LoginForm extends Component {
  // write a state function for user state
  constructor(props) {
    super(props);
    this.state = {
      email: null,
    };
  }

  handleState = (e) => {
    e.preventDefault();
    this.setState({
      email: e.target.value
    });
  }
  //handle submit to call the props login function, passes in this.state.user

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.loginHandler(this.state.email);
  };
  render() {
    console.log(this.state.user);
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={this.handleState} />
        </Form.Group>

        {/* <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group> */}

        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    );
  }
}

export default LoginForm;
