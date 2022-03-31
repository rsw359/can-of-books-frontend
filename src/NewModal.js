import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


class NewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // newEntryModal: false,
      title: '',
      description: '',
      author: ''
    };
  }
  
  createBook = () => {
    let newBook= ({
      title: this.state.title,
      description: this.state.description,
      author: this.state.author
    });
    this.props.postBooks(newBook);
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
          <Modal.Title>Add a book, Dammit</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" onInput={this.handleTitle} />
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" onInput={this.handleDescription} />
              <Form.Label>author</Form.Label>
              <Form.Check type="checkbox" onInput={this.handleAuthor} label="author" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.createBook}>Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default NewModal;
