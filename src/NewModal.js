import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


export default class NewModal extends Component {
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
  createBook = (e) => {
    e.preventDefault();
    let createdBook = {
      title: e.target.title,
      description: e.target.description,
      status: e.target.status
    };
    console.log(createdBook);
  }
  handleTitle = (e) => {
    this.setState({
      title: e.target.value
    });
  }
  handleDescription = (e) => {
    this.setState({
      description: e.target.value
    });
  }
  handleStatus = (e) => {
    this.setState({
      status: e.target.value
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
              <Form.label>Title</Form.label>
              <Form.Control type="text" onInput={this.handleTitle} />
              <Form.label>Description</Form.label>
              <Form.Control type="text" onInput={this.handleDescription} />
              <Form.label>Status</Form.label>
              <Form.Check type="checkbox" onInput={this.handleStatus} label="Status" />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
