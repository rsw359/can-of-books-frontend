import { React, Component } from 'react';

class LogoutButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }
  render() {
    return (
      <button onClick={this.props.onLogout}>
        Log Out
      </button>
    );
  }
}

export default LogoutButton;
