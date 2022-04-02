import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class UpdateBookModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookUpdate: {},
      title: '',
      description: '',
      author: '',
      email: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let updatedEntry = {
      title: this.state.title || this.props.book.title,
      description: this.state.description || this.props.book.description,
      author: this.state.author || this.props.book.author,
      _id: this.props.book._id,
      __v: this.props.book.__v,
      email: this.props.user
    };
    console.log(updatedEntry);
    this.props.updateBook(updatedEntry);
    this.props.hideModal();
  };

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
  setEditBook = () => {
    this.props.updateBook();
  };
  
  render() {
    return (
      <>
        <Modal
          style={{ width: '25rem' }}
          show={this.props.showModal}
          onHide={this.props.hideModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Book Editor</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" onInput={this.handleTitle} />
            </Form.Group>
            <Form.Group controlId="desc">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" onInput={this.handleDescription} />
            </Form.Group>
            <Form.Group controlId="author">
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" onInput={this.handleAuthor} />
            </Form.Group>
            <Button type="submit">Do It!</Button>
          </Form>
        </Modal>
      </>
    );
  }
}

export default UpdateBookModal;
