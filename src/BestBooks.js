import React from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';

let SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  /* TODO: Make a GET request to your API to fetch books for the logged in user  */
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


  componentDidMount() {
    this.getBooks();
  }


  render() {
    /* TODO: render user's books in a Carousel */

    return (
      <>
        {
          this.state.books ? (
            <Carousel fade>
              {this.state.books.map(book => (
                <Carousel.Item key={book._id}>
                  <h2>{book.title}</h2>
                  <p>{book.description}</p>
                </Carousel.Item>
              )
              )}
            </Carousel>
          ) : (<p>There are no books.</p>)
        }
      </>
    );
  }
}

export default BestBooks;
