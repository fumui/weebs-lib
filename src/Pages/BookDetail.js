import React from 'react'
import Axios from 'axios';
import {Button, Container, Row, Modal, Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import BookModal from '../Components/BookModal';
import EditBookForm from '../Components/EditBookForm';
import {deleteBook} from '../Publics/Actions/books';
import {getProfile} from '../Publics/Actions/users';
import {borrow, returnBook, getLatestBorrowingByBookId} from '../Publics/Actions/borrowings';

class BookDetail extends React.Component{
  constructor(props){
    super(props)
    console.log(props)
    this.state= {
      bookUrl:props.bookUrl,
      bookData: props.book.booksList.find((book)=>{return book.id === Number(props.bookId)}),
      userData:{},
      borrowedBy:0,
      showModal:false,
      modalTitle:"",
      modalMessage:"",
    }
    this.handleDelete=this.handleDelete.bind(this);
    this.handleBorrow=this.handleBorrow.bind(this);
    this.handleClose=this.handleClose.bind(this);
  }

  componentDidMount = async () => {
    if(!window.localStorage.getItem("token"))
      this.props.history.push('/')
      
    await this.props.dispatch(getLatestBorrowingByBookId(this.props.bookId))
    const borrowedBy = this.props.borrowing.borrowingData ? this.props.borrowing.borrowingData[0].user_id : 0
    this.setState({
      borrowedBy: borrowedBy
    })
    await this.props.dispatch(getProfile())
    this.setState({
      userData: this.props.user.userProfile
    })
  }

  handleDelete = async (event) => {
    await this.props.dispatch(deleteBook(this.state.bookData.id))
    this.setState({
      showModal:true,
      modalTitle:"Success",
      modalMessage:`Success deleting Book`,
      redirectOnCloseModal:true
    })
  }

  handleBorrow = async (event) => {
    const target= event.target
    const action = target.innerHTML
    const data = {
      book_id:this.state.bookData.id,
      user_id:this.state.userData.id,
    }
    if(action === "Borrow"){
      await this.props.dispatch(borrow(data))
      this.setState({
        showModal:true,
        modalTitle:"Success",
        modalMessage:"Book Borrowed",
        borrowedBy:data.user_id,
        bookData:{
          ...this.state.bookData,
          availability:0
        }
      })
    }else if(action === "Return"){
      await this.props.dispatch(returnBook(data))
      this.setState({
        showModal:true,
        modalTitle:"Success",
        modalMessage:"Book Returned",
        borrowedBy:0,
        bookData:{
          ...this.state.bookData,
          availability:1
        }
      })
    }
  }

  handleClose = ()=>{
    this.setState({showModal: false})
    if (this.state.redirectOnCloseModal)
      this.props.history.push('/')
  }

  render(){
    const {bookData} = this.state
    console.log(this.state)
    if(bookData === undefined){
      console.log(this.state)
      return (
        <div className="container">
          <h1>Loading...</h1>
        </div>
      )
    }else if(bookData === null){
      console.log(this.state)
      return (
        <Alert variant="danger">Book Not Found</Alert>
      )
    }else{
      const newImageUrl = bookData.image.split('w=')[0] + `w=${window.innerWidth}`
      return (
        <div style={{overflow:"hidden"}}>
          <Link to="../../home" variant="light" className=" btn btn-light back-button"><FontAwesomeIcon  icon={faArrowLeft} /></Link>
          <div className="book-detail-image">
            <img className="cover-img" src={newImageUrl} alt="cover"/>
            <img className="book-img" src={bookData.image}  alt="miniCover"/>
          </div>
          {this.state.userData.level === 'admin' ? 
          <div className="book-detail-control">
            <Row>
              <BookModal
                title="Edit Book"
                variant="outline-light"
                content={
                  <EditBookForm 
                    idBook={bookData.id}
                    title={bookData.title}
                    description={bookData.description}
                    image={bookData.image}
                    date_released={bookData.date_released}
                    genre_id={bookData.genre_id}
                  />
                }
              />
              <Button variant="outline-light" size="lg" onClick={this.handleDelete}>Delete</Button>
            </Row>
          </div>
          :''}
          <div className="book-detail-data">
            <Button variant="warning" className="genre-button">{bookData.genre}</Button>
            <Button variant="outline-warning" className="availability-button">{bookData.availability === 1 ? "Available": "Not Available"}</Button>
            <div className="book-title">{bookData.title}</div>
            <div className="book-date-released">{(new Date(bookData.date_released)).toDateString()}</div>
            <Container className="book-description">{bookData.description}</Container>
          </div>
          <Button 
            disabled={bookData.availability !== 1 && this.state.userData.id !== this.state.borrowedBy} 
            variant="warning" 
            size="lg"  
            className="borrow-button"
            onClick={this.handleBorrow}
          >
            {this.state.userData.id === this.state.borrowedBy ?"Return":"Borrow"}
          </Button>
          <Modal show={this.state.showModal} onHide={this.handleClose}>
            <Modal.Header>
              <Modal.Title>{this.state.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {this.state.modalMessage}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )
    }
  }
}
  const mapStateToProps = (state) => {
    return{
      book: state.book,
      user: state.user,
      borrowing: state.borrowing
    }
  }
export default connect(mapStateToProps)(BookDetail)