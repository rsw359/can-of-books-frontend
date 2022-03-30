import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Read More Books</Navbar.Brand>
        <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
        <NavItem><Link to="/BestBooks" className="nav-link">Profile</Link></NavItem>
        {/* TODO: if the user is logged in, render a navigation link to profile page */}
        {this.props.user ?
          <>
            <NavItem><Link to="/Profile" className="nav-link">Profile</Link></NavItem>
            <NavItem><Link to="/LogoutButton" className="nav-link">Profile</Link></NavItem>
          </>
          :
          <></>
        }

        {/* {this.state.user && <Button onClick={this.props.onLogout}></Button>} */}
      </Navbar>
    );
  }
}

export default Header;
