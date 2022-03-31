import React from 'react';
import axios from 'axios';
import { Carousel, Container } from 'react-bootstrap';
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
      console.log('Error: ', error.response.data);
    }
  }
  postBooks = async (postedBook) => {
    try {
      let results = await axios.post(`${SERVER}/books`, postedBook);
      this.setState({
        books: [...this.state.books, results.data]
      });
    } catch (error) {
      console.log('Error: ', error.response.data);
    }
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
              {this.state.books.map(book => (
                <Carousel.Item key={book._id}>
                  <h2>{book.title}</h2>
                  <p>{book.description}</p>
                </Carousel.Item>
              ))}
            </Carousel>
            <Newbook postBook={this.postBooks} user={this.props.user} />
          </Container>
        ) : (
          <Container>
            <h3>No books? Thats embarassing, you should read more.</h3>
            <Newbook postBook={this.postBooks} user={this.props.user} />
          </Container>
        )}
      </>
    );
  }
}

export default BestBooks;
