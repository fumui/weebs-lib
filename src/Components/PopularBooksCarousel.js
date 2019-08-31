import React from 'react';
import {Carousel} from 'react-bootstrap'
import {connect} from 'react-redux';
import {getNewestBooks} from '../Publics/Actions/books';

class PopularBookCarousel extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      popularBooksList: null
    }
    this.getDetails = this.getDetails.bind(this)
  }
  
  getDetails = (id) =>{
    this.props.history.push(`/book/${id}`)
  }
  componentDidMount = async () => {
    if(this.props.book.popularBooksList.length === 0){
      await this.props.dispatch(getNewestBooks())
      this.setState ({popularBooksList: this.props.book.popularBooksList})
    }
  };
  render(){
    const {popularBooksList} = this.props.book
    return (
      <Carousel style={{width:"45%", marginLeft:"25%", marginRight:"25%"}}>
        {popularBooksList !== null ? popularBooksList.map((book, index) => {
          return (
          <Carousel.Item key={index} onClick={()=>this.getDetails(book.id)}>
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
          )}
        ):<div></div>}
      </Carousel>
  )}
}
const mapStateToProps = state => {
  return{
    book: state.book
  }
}
export default connect(mapStateToProps)(PopularBookCarousel)