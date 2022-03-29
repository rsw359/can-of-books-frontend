import React from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch books for the logged in user  */
  getBooks = async () => {
    try {
      let results = await axios.get(`${SERVER}/books`);//do i need to use: process.env.REACT_APP_SERVER ??
      this.setState({
        books: results.data
      })
    } catch (error) {
      console.log('an error has occured: ', error.response.data)
    }
  }


  render() {

    /* TODO: render user's books in a Carousel */

    return (
      <>
        <Carousel fade>
          <Carousel.Item>
            <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=First slide&bg=373940"
              alt="First slide"/>
              <Carousel.Caption>
                <h3>{this.state.books.length ? (
                <p>Book Carousel coming soon</p>) :
                (<h3>No Books Found :(</h3>)}</h3>
              </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=Second slide&bg=282c34"
              alt="Second slide"/>

              <Carousel.Caption>
                <h3>{this.state.books.length ? (
                <p>Book Carousel coming soon</p>) :
                (<h3>No Books Found :(</h3>)}</h3>
              </Carousel.Caption>

          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="holder.js/800x400?text=Third slide&bg=20232a"
              alt="Third slide"/>

              <Carousel.Caption>
                <h3>{this.state.books.length ? (
                <p>Book Carousel coming soon</p>) :
                (<h3>No Books Found :(</h3>)}</h3>
              </Carousel.Caption>

          </Carousel.Item>
        </Carousel>


        {/* {this.state.books.length ? (<p>Book Carousel coming soon</p>) : (<h3>No Books Found :(</h3>)} */}
      </>
    )
  }
}

export default BestBooks;
