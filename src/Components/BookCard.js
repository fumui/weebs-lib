import React from 'react'
import { Card } from "react-bootstrap"

class BookCard extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      imgUrl : props.imgUrl,
      title : props.title,
      description : props.description,
    }
  }

  render(){
    const {description} = this.state
    return(
    <Card style={{ width: '20%'}}>
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