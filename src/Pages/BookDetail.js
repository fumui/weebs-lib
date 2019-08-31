import React from 'react'
import {Button, Container, Row, Modal, Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {deleteBook, getBookById} from '../Publics/Actions/books';
import {getProfile} from '../Publics/Actions/users';
import {returnBook, getLatestBorrowingByBookId} from '../Publics/Actions/borrowings';
import EditBookModal from '../Components/EditBookModal';
import AddBorrowingModal from '../Components/AddBorrowingModal';
import ReturnBookModal from '../Components/ReturnBookModal';
import store from '../Publics/Store'

class BookDetail extends React.Component{
  constructor(props){
    super(props)
    this.state= {
      bookUrl:props.bookUrl,
      bookData: props.book.booksList.find((book)=>{return book.id === Number(props.bookId)}),
      borrowedBy:0,
      showModal:false,
      modalTitle:"",
      modalMessage:"",
      // unsubscribe: store.subscribe(this.listener)
    }
  }


  render(){
    const bookData = this.props.book.booksList.find((book)=>{return book.id === Number(this.props.bookId)})
    if(bookData === undefined){
      return (
        <div className="container">
          <h1>Loading...</h1>
        </div>
      )
    }else if(bookData === null){
      return (
        <Alert variant="danger">Book Not Found</Alert>
      )
    }else{
      let stringDateReleased = new Date(bookData.date_released).toDateString()
      const coverImageUrl = bookData.image.includes('yenpress')? bookData.image.split('w=')[0] + `w=${window.innerWidth}`:bookData.image
      return (
        <div style={{overflow:"hidden"}}>
          <Link 
            to="/home" 
            variant="light" 
            className=" btn btn-light back-button"
          >
            <FontAwesomeIcon  icon={faArrowLeft} />
          </Link>
          <div className="book-detail-image">
            <img 
              className="cover-img"
              src={coverImageUrl} 
              alt="cover"
            />
            <img 
              className="book-img" 
              src={bookData.image} 
              alt="miniCover"
            />
          </div>
          
          {this.props.user.userProfile.level === 'admin' ? 
            <div className="book-detail-control">
              <Row>
                <EditBookModal variant="outline-light" history={this.props.history} bookId={bookData.id} bookData={bookData} />
                <Button variant="outline-light" size="lg" onClick={this.handleDelete}>Delete</Button>
              </Row>
            </div>
            :''
          }

          <div className="book-detail-data">
            <Button 
              variant="warning" 
              className="genre-button"
            >
              {bookData.genre}
            </Button>
            <Button 
              variant="outline-warning" 
              className="availability-button"
            >
              {bookData.availability === 1 ? "Available": "Not Available"}
            </Button>
            <div className="book-title">{bookData.title}</div>
            <div className="book-date-released">
              {stringDateReleased}
            </div>
            <Container className="book-description">{bookData.description}</Container>
          </div>

          {this.props.user.userProfile.level === 'admin' ? 
            bookData.availability === 1 ?
              <AddBorrowingModal bookId={bookData.id} className="borrow-button" variant="warning" />
              :
              <ReturnBookModal  bookId={bookData.id} className="borrow-button" variant="warning" readOnlyBookId={true}/>
          :''}
          
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

  componentDidMount = async () => {
    if(!window.localStorage.getItem("token"))
      this.props.history.push('/')
      
    if(!this.state.bookData){
      this.getBookData()
    }
    if(!this.props.user.userProfile){
      await this.props.dispatch(getProfile())
      this.setState({
        userData: this.props.user.userProfile
      })
    }
  }

  componentWillUnmount = () => {
    // this.state.unsubscribe()
  }

  listener = ()=>{
    const currentBookData = store.getState().book.booksList.find((book)=>{return Number(book.id) === Number(this.props.bookId)});
    if(currentBookData !== this.state.bookData){
      this.setState({bookData: currentBookData})
    }
    if(!currentBookData){
      this.props.history.push('/')
    }

    // const currentBorrowingData = store.getState().borrowing.borrowingData
    // if(currentBorrowingData && currentBorrowingData.book_id == currentBookData.id && store.getState().borrowing.isFulfilled){
    //   if(currentBorrowingData.returned_at)
    //     this.setState({
    //       bookData:{
    //         ...currentBookData, availability:1
    //       }
    //     })
    //   else if (currentBorrowingData.borrowed_at && store.getState().borrowing.isFulfilled)
    //     this.setState({
    //       bookData:{
    //         ...currentBookData, availability:0
    //       }
    //     })
    //   }
  }


  getBookData = async () => {
    await this.props.dispatch(getBookById(this.props.bookId))
      this.setState(
        {bookData: this.props.book.booksList.find((book)=>{return Number(book.id) === Number(this.props.bookId)})},
        async ()=>{
          await this.props.dispatch(getLatestBorrowingByBookId(this.props.bookId))
          const borrowedBy = this.props.borrowing.borrowingData ? this.props.borrowing.borrowingData[0].user_id : 0
          this.setState({
            borrowedBy: borrowedBy
          })
        }
      )
  }

  handleDelete = async (event) => {
    await this.props.dispatch(deleteBook(this.state.bookData.id))
      .catch(() => {
        this.setState({
          showModal:true,
          modalTitle:"Failed",
          modalMessage:this.props.book.errMessage
        })
      })
    this.setState({
      showModal:true,
      modalTitle:"Success",
      modalMessage:`Success deleting Book`,
      redirectOnCloseModal:true
    })
  }
  handleClose = ()=>{
    this.setState({showModal: false})
    if (this.state.redirectOnCloseModal)
      this.props.history.push('/')
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