import React, { Component } from 'react';
import { Button, Container } from 'react-bootstrap';
import NewModal from './NewModal';

export default class Newbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newEntryModal: false,
      title: '',
      description: '',
      status: '',
      email: ''
    };
  }


  displayModal = () => {
    this.setState({
      newEntryModal: true,
    });
  };
  hideModal = () => {
    this.setState({
      newEntryModal: false,
    });
  };


  render() {
    return (

      <Container>
        <Button variant="warning" onClick={this.displayModal}>Add a book</Button>{' '}
        <NewModal display={this.state.displayModal} hide={this.state.hideModal} />
      </Container>

    );


  }

}
