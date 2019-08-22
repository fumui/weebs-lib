import React from 'react'
import Axios from 'axios';
import {Button, Card, Container} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
class BookDetail extends React.Component{
  constructor(props){
    super(props)
    this.state= {
      bookUrl:props.bookUrl,
      bookData:undefined,
    }
  }
  componentDidMount(){
    Axios.get(this.state.bookUrl)
      .then(result => {
        return this.setState({bookData:result.data.data[0]})
      })
      .catch(err => console.log(err))
  }

  render(){
    const {bookData} = this.state
    if(bookData !== undefined){
      const newImageUrl = bookData.image.split('w=')[0] + `w=${window.innerWidth}`
      return (
        <div style={{overflow:"hidden"}}>
          <Link to="../../home" variant="light" className=" btn btn-light back-button"><FontAwesomeIcon  icon={faArrowLeft} /></Link>
          <div className="book-detail-image">
            <img className="cover-img" src={newImageUrl} />
            <img className="book-img" src={bookData.image}  />
          </div>
          <div className="book-detail-data">
            <Button variant="warning" className="genre-button">{bookData.genre}</Button>
            <Button variant="outline-warning" className="availability-button">{bookData.availability === 1 ? "Available": "Not Available"}</Button>
            <div className="book-title">{bookData.title}</div>
            <div className="book-date-released">{(new Date(bookData.date_released)).toDateString()}</div>
            <Container className="book-description">{bookData.description}</Container>
          </div>
          <Button variant="warning" size="lg"  className="borrow-button">Borrow</Button>
        </div>
      )
    }else{
      return (
        <div className="container">
          <h1>Loading...</h1>
        </div>
      )
    }
  }

}
export default BookDetail