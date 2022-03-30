import { Component } from "react";
import { Button } from "react-bootstrap";



class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalDisplay: false
        }
    }
    displayModal = () => {
        this.setState ({
            modalDisplay: true;
        });
    };

    hideModal = () => {
        this.setState ({
            modalDisplay: false
        });
    };
    
    render() {
        return (
            <>
            </>
        )
    }
};