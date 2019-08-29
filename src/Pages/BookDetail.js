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
import store from '../Publics/Store'

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
      unsubscibe : store.subscribe(this.listener)
    }
  }

  listener = ()=>{
    const current = store.getState().book.booksList.find((book)=>{return book.id == Number(this.props.bookId)});
    console.log(current, this.state.bookData)
    if(current !== this.state.bookData){
      this.setState({bookData: current})
    }
  }

  getBookData = async () => {
    await this.props.dispatch(getBookById(this.props.bookId))
      this.setState(
        {bookData: this.props.book.booksList.find((book)=>{return book.id == Number(this.props.bookId)})},
        async ()=>{
          await this.props.dispatch(getLatestBorrowingByBookId(this.props.bookId))
          const borrowedBy = this.props.borrowing.borrowingData ? this.props.borrowing.borrowingData[0].user_id : 0
          this.setState({
            borrowedBy: borrowedBy
          })
        }
      )
  }

  componentDidMount = async () => {
    if(!window.localStorage.getItem("token"))
      this.props.history.push('/')
      
    if(!this.state.bookData){
      this.getBookData()
    }
    await this.props.dispatch(getProfile())
    this.setState({
      userData: this.props.user.userProfile
    })
  }

  componentWillUnmount = () => {
    this.state.unsubscibe()
  }

  handleDelete = (event) => {
    this.props.dispatch(deleteBook(this.state.bookData.id))
      .then(()=>{
        this.setState({
          showModal:true,
          modalTitle:"Success",
          modalMessage:`Success deleting Book`,
          redirectOnCloseModal:true
        })
      })
      .catch(() => {
        this.setState({
          showModal:true,
          modalTitle:"Failed",
          modalMessage:this.props.book.errMessage
        })
      })
  }

  handleReturn = async (event) => {
    const data = {
      book_id:this.state.bookData.id,
      user_id:this.state.userData.id,
    }
    this.props.dispatch(returnBook(data))
      .then(()=>{
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
      })
      .catch(() => {
        this.setState({
          showModal:true,
          modalTitle:"Failed",
          modalMessage:this.props.borrowing.errMessage
        })
      })
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
      const newImageUrl = bookData.image.includes('yenpress')? bookData.image.split('w=')[0] + `w=${window.innerWidth}`:bookData.image
      return (
        <div style={{overflow:"hidden"}}>
          <Link 
            to="../../home" 
            variant="light" 
            className=" btn btn-light back-button"
          >
            <FontAwesomeIcon  icon={faArrowLeft} />
          </Link>
          <div className="book-detail-image">
            <img 
              className="cover-img"
              src={newImageUrl} 
              alt="cover"
            />
            <img 
              className="book-img" 
              src={bookData.image} 
              alt="miniCover"
            />
          </div>
          
          {this.state.userData.level === 'admin' ? 
          <div className="book-detail-control">
            <Row>
              <EditBookModal variant="outline-light" history={this.props.history} bookId={this.state.bookData.id} bookData={this.state.bookData} />
              <Button variant="outline-light" size="lg" onClick={this.handleDelete}>Delete</Button>
            </Row>
          </div>
          :''}

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
              {(new Date(bookData.date_released.split('T')[0])).toDateString()}
            </div>
            <Container className="book-description">{bookData.description}</Container>
          </div>

          {this.state.userData.level === 'admin' ? 
            bookData.availability === 1 ?
              <AddBorrowingModal bookId={bookData.id} className="borrow-button" variant="warning" />
              :
              <Button
              variant="warning" 
              size="lg"  
              className="borrow-button"
              onClick={this.handleReturn}
              >
                Return
              </Button>
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
}
  const mapStateToProps = (state) => {
    return{
      book: state.book,
      user: state.user,
      borrowing: state.borrowing
    }
  }
export default connect(mapStateToProps)(BookDetail)