import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


class NewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      author: '',
      email: ''
    };
  }
  createBook = (e) => {
    e.preventDefault();
    let newBook= ({
      title: this.state.title,
      description: this.state.description,
      author: this.state.author,
      email: this.props.user
    });
    console.log(newBook);
    this.props.postBook(newBook);
    this.props.hide();
  }
  handleTitle = (e) => {
    e.preventDefault();
    this.setState({
      title: e.target.value
    });
  }
  handleDescription = (e) => {
    e.preventDefault();
    this.setState({
      description: e.target.value
    });
  }
  handleAuthor = (e) => {
    e.preventDefault();
    this.setState({
      author: e.target.value
    });
  }



  render() {
    return (
      <Modal
        style={{ width: '25rem' }}
        show={this.props.display}
        onHide={this.props.hide}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a book</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={this.createBook}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" onInput={this.handleTitle} />
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" onInput={this.handleDescription} />
              <Form.Label>author</Form.Label>
              <Form.Check type="text" onInput={this.handleAuthor} label="author" />
            </Form.Group>
            <Button variant="primary" type="submit" >Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default NewModal;
