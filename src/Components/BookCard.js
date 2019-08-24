import React from 'react'
import { Card, Badge } from "react-bootstrap"

class BookCard extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      imgUrl : props.imgUrl,
      bookId: props.bookId,
      title : props.title,
      description : props.description,
      availability : props.availability,
      genre : props.genre,
    }
    this.getDetails = this.getDetails.bind(this)
  }

  getDetails = (id) =>{
    window.location.href =`http://localhost:3000/book/${id}`
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
        {this.state.availability === 1 ? <Badge variant="warning" className="availability-badge">Available</Badge>: <Badge variant="danger" className="availability-badge">Unavailable</Badge>}
      </figure>
      <Card.Body>
        <Card.Title>{this.state.title}</Card.Title>
        <Badge variant="warning">{this.state.genre}</Badge>
        <Card.Text>
          {description.length > 30 ?  description.substr(0,75)+'...': description}
        </Card.Text>
      </Card.Body>
    </Card>
  )}
}

export default BookCard