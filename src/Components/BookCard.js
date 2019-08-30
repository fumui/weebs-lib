import React from 'react'
import { Card, Badge } from "react-bootstrap"
import { Redirect } from 'react-router-dom'

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
      redirectToDetails:false,
    }
  }

  redirectToDetails = () =>{
    this.setState({redirectToDetails:true})
  }
  render(){
    if (this.state.redirectToDetails)
      return <Redirect to={`/book/${this.state.bookId}`}/>
    const {description} = this.state
    return(
      <Card 
        style={{ width: '25%',cursor:"pointer", margin: '3%'}} 
        onClick={() => {this.redirectToDetails()}}
      >
        <figure>
          <Card.Img variant="top" src={this.state.imgUrl} className="book-image"/>
          {this.state.availability === 1 ? <Badge variant="warning" className="availability-badge">Available</Badge>: <Badge variant="danger" className="availability-badge">Unavailable</Badge>}
        </figure>
        <Card.Body>
          <Card.Title>{this.state.title}</Card.Title>
          <Badge variant="warning">{this.state.genre}</Badge>
          <Card.Text>
            {description.length > 75 ?  description.substr(0,75)+'...': description}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default BookCard