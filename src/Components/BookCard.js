import React from 'react'
import { Card } from "react-bootstrap"
import {Redirect} from 'react-router-dom';

class BookCard extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      imgUrl : props.imgUrl,
      bookId: props.bookId,
      title : props.title,
      description : props.description,
    }
    this.getDetails = this.getDetails.bind(this)
  }

  getDetails = (id) =>{
    window.location.href =`/book/${id}`
  }
  render(){
    const {description} = this.state
    return(
    <Card 
      style={{ width: '25%', margin: '3%'}} 
      onClick={() => this.getDetails(this.state.bookId)}
    >
      <figure>
        <Card.Img variant="top" src={this.state.imgUrl} className="book-image"/>
      </figure>
      <Card.Body>
        <Card.Title>{this.state.title}</Card.Title>
        <Card.Text>
          {description.length > 30 ?  description.substr(0,75)+'...': description}
        </Card.Text>
      </Card.Body>
    </Card>
  )}
}

export default BookCard