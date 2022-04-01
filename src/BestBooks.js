import React from 'react';
import axios from 'axios';
import { Carousel, Container, Button } from 'react-bootstrap';
import Newbook from './Newbook';


let SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
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


  render() {
    return (
      <>
        <h2>Something something something best books, I dunno. . . .</h2>
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
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
            <Newbook postBook={this.postBooks} user={this.props.user} getNew={this.getBooks} />

          </Container>
        ) : (
          <Container>
            <h3>No books? Thats embarassing, you should read more.</h3>
            <Newbook postBook={this.postBooks} user={this.props.user} getNew={this.getBooks} />
          </Container>
        )}
      </>
    );
  }
}

export default BestBooks;
