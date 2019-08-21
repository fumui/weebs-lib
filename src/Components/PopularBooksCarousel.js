import React from 'react';
import {Carousel} from 'react-bootstrap'
import Axios from 'axios';

class PopularBookCarousel extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      popularBooksList:[]
    }
  }
  componentDidMount = () => {
    Axios.get ('http://localhost:3030/books/popular')
      .then (res => {
        this.setState ({popularBooksList: res.data.data});
      })
      .catch (err => console.log ('error =', err));
  };
  render(){
    const {popularBooksList} = this.state
    return (
      <Carousel style={{width:"50%", marginLeft:"25%", marginRight:"25%"}}>
        {popularBooksList.map((book, index) => {
          return (
          <Carousel.Item key={index} >
            <figure>
              <img
                className="d-block w-100 carousel-book-image"
                src={book.image}
                alt={book.title}
              />
            </figure>
            <Carousel.Caption bsPrefix='carousel-caption' className="book-carousel-caption">
              <h3>{book.title}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        )})}
          
        </Carousel>
  )}
}
export default PopularBookCarousel