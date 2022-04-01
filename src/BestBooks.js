import React from 'react';
import axios from 'axios';
import { Carousel, Container, Button } from 'react-bootstrap';
import Newbook from './Newbook';
import UpdateBookModal from './UpdateBookModal';

let SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false
    };
  }
  getBooks = async () => {
    try {
      let results = await axios.get(`${SERVER}/books?email=${this.props.user}`);
      this.setState({
        books: results.data
      });

    } catch (error) {
      console.log('get book error: ', error.response.data);
    }
  };

  postBooks = async (newBook) => {
    try {
      let results = await axios.post(`${SERVER}/books`, newBook);
      this.setState({
        books: [...this.state.books, results.data]
      });
    } catch (error) {
      console.log('Error: ', error.response.data);
    }
  }

  updateBook = async (updatedEntry) => {
    try {
      let url = `${SERVER}/books/${updatedEntry._id}`;
      let updatedBook = await axios.put(url, updatedEntry);
      console.log(updatedEntry);
      let updatedBookData = this.state.books.map(currentBook => {
        return currentBook._id === updatedEntry._id ? updatedBook.data :
          currentBook;
      });
      this.setState({
        books: updatedBookData
      });
    } catch (error) {
      console.error('update error', error.message);
    }
  };


  deleteBook = async (id) => {
    try {
      console.log('deleteBook', id);
      let url = `${SERVER}/books/${id}`;
      await axios.delete(url);
      let updatedBooks = this.state.books.filter(Book => Book._id !== id);
      this.setState({
        books: updatedBooks
      });
    } catch (error) {
      console.log('delete book error: ', error.response.data);
    }
    this.getBooks();
  }
  componentDidMount() {
    this.getBooks();
  }

  displayModal = () => {
    this.setState({
      showModal: true,
    });
  };

  hideModal = () => {
    this.setState({
      showModal: false
    });
  };


  render() {
    return (
      <>
        <h2>BOOKshare</h2>
        {this.state.books ? (
          <Container>
            <Carousel>
              {this.state.books.map((book, idx) => (
                <Carousel.Item key={idx}>
                  <img
                    className="rounded mx-auto d-block"
                    src="https://place-hold.it/300x500"
                    alt="First slide" />
                  <Carousel.Caption>
                    <h2>{book.title}</h2>
                    <p>{book.description}</p>
                    <Button onClick={() => this.deleteBook(book._id)}>Delete</Button>
                    <Button onClick={this.displayModal}>Edit a Book</Button>
                    <UpdateBookModal updateBook={this.updateBook} user={this.props.user} book={book} showModal={this.state.showModal} hideModal={this.hideModal} />
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
            <Newbook postBook={this.postBooks} user={this.props.user} getNew={this.getBooks} />

          </Container>
        ) : (
          <Container>
            <h3>Hmm, no books here. Why dont you add one?</h3>
            <Newbook postBook={this.postBooks} user={this.props.user} getNew={this.getBooks} />
          </Container>
        )}
      </>
    );
  }
}

export default BestBooks;
