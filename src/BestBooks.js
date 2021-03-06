import React from 'react';
import axios from 'axios';
import { Carousel, Container, Button } from 'react-bootstrap';
import Newbook from './Newbook';
import UpdateBookModal from './UpdateBookModal';
import { withAuth0 } from "@auth0/auth0-react";

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
    // JSON Web Token = JWT (pronounced JOT)
    if (this.props.auth0.isAuthenticated) {
      // get token:
      const res = await this.props.auth0.getIdTokenClaims();


      // MUST use double underscores
      const jwt = res.__raw;
      // a console.log of the token // this is as far as you need to go for the lab. Get the jwt to log to the console.

      // as per axios docs, we can send an config object to make our call as well
      const config = {
        method: 'get',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/books',
        headers: {"Authorization": `Bearer ${jwt}`}
      };
      const bookResults = await axios(config);    


      //  // the way we have been doing it:
      // let url = `${process.env.REACT_APP_SERVER}/books`;
      // const bookResults = await axios.get(url);
      console.log(bookResults.data);
      this.setState ({
        books: bookResults.data
      })
    }
  }

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
        return currentBook._id === updatedEntry._id ?
          updatedBook.data :
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
                    className="d-block w-100"
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

export default withAuth0(BestBooks);
