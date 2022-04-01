import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import NewModal from './NewModal';

class Newbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newEntryModal: false,       
    };
    
  }


  displayModal= () => {
    console.log('clicked');
    this.setState({
      newEntryModal: true,
    });
    console.log(this.state.newEntryModal);
  };

  hideModal = () => {
    this.setState({
      newEntryModal: false,
    });
    this.props.getNew();
  };


  render() {
    return (

      <main>
        <Button variant="warning" onClick={this.displayModal}>Add a book</Button>
        <NewModal postBook={this.props.postBook} display={this.state.newEntryModal} hide={this.hideModal} user={this.props.user}/>
      </main>

    );


  }

}

export default Newbook;
