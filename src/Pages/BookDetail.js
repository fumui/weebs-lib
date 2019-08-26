import React from 'react'
import Axios from 'axios';
import {Button, Container, Row, Modal, Alert} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import BookModal from '../Components/BookModal';
import EditBookForm from '../Components/EditBookForm';
class BookDetail extends React.Component{
  constructor(props){
    super(props)
    this.state= {
      bookUrl:props.bookUrl,
      bookData:undefined,
      userData:{
        level:'regular',
        id:undefined,
      },
      borrowedBy:0,
      showModal:false,
      modalTitle:"",
      modalMessage:"",
    }
    this.handleDelete=this.handleDelete.bind(this);
    this.handleBorrow=this.handleBorrow.bind(this);
    this.handleClose=this.handleClose.bind(this);
  }

  componentDidMount(){
    if(!window.localStorage.getItem("token"))
      this.props.history.push('/')
      
    Axios.get(this.state.bookUrl)
      .then(result => {
        console.log(result.data.data)
        const bookData = result.data.data !== null? result.data.data[0]:null
        this.setState({bookData:bookData})
        return Axios.get(`http://localhost:3030/borrowings/book/${bookData.id}`,{
          headers:{
            Authorization : window.localStorage.getItem("token")
          }
        })
      })
      .then(res=> this.setState({
        borrowedBy: res.data.data[0].user_id
      }))
      .catch(err => console.log(err))
    
    Axios.get("http://localhost:3030/users/profile",{
      headers:{
        Authorization : window.localStorage.getItem("token")
      }
    })
      .then(res => {
        const userData=res.data.data;
        console.log("userdata", userData)
        this.setState({
          userData:userData,
        })
      })
      .catch(err => console.log(err))
  }

  handleDelete(event){
    Axios.delete(`http://localhost:3030/books/${this.state.bookData.id}`,{
      headers:{
        Authorization : window.localStorage.getItem("token")
      }
    })
      .then(res => {
        this.setState({
          showModal:true,
          modalTitle:"Success",
          modalMessage:res.data.message,
        })
      })
      .catch(err => console.log(err))
  }

  handleBorrow(event){
    const target= event.target
    const action = target.innerHTML
    const data = {
      book_id:this.state.bookData.id,
      user_id:this.state.userData.id,
    }
    if(action === "Borrow"){
      Axios.post(`http://localhost:3030/borrowings/`,data,{
        headers:{
          Authorization : window.localStorage.getItem("token")
        }
      })
        .then(res => {
          this.setState({
            showModal:true,
            modalTitle:"Success",
            modalMessage:res.data.message,
          })
        })
        .catch(err => console.log(err))
    }else if(action === "Return"){
      Axios.patch(`http://localhost:3030/borrowings/`,data,{
        headers:{
          Authorization : window.localStorage.getItem("token")
        }
      })
        .then(res => {
          this.setState({
            showModal:true,
            modalTitle:"Success",
            modalMessage:res.data.message,
          })
        })
        .catch(err => console.log(err))
    }
  }

  handleClose = ()=>{
    this.setState({showModal: false})
    this.props.history.push('/')
  }

  render(){
    const {bookData} = this.state
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
export default BookDetail