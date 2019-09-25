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
        style={{ width: '29%',cursor:"pointer", margin: '2%', borderRadius: '0.25rem', boxShadow: '10px 10px 6px -2px rgba(112,112,112,0.7)'}} 
        onClick={() => {this.redirectToDetails()}}
      >
        <figure style={{ borderRadius: 'inherit', borderBottomLeftRadius: 0, borderBottomRightRadius:0 }}>
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