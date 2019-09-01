import React,{Fragment} from 'react';
import {Row, Col, Form, Button, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';

import {getLatestBorrowingByBookId,returnBook} from '../Publics/Actions/borrowings';
import {setAvailability} from '../Publics/Actions/books';

class ReturnBookForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      formData:{
        user_id: undefined,
        book_id: props.bookId
      },
      showModal:false,
      modalTitle:"",
      modalMessage:"",
      history:props.history,
    }
  }

  handleClose = ()=>{
    this.props.closeModal()
    this.setState({showModal: false})
    if(this.state.modalTitle !== "Failed")
      this.props.dispatch(setAvailability(this.state.formData.book_id, 1))
  }

  handleChange = (event) => {
    let newFormData = {...this.state.formData}
    const target = event.target
    const name = target.name
    const value = target.value
    newFormData[name] = value
    this.setState({
      formData: newFormData
    })
    console.log(this.state.formData)
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.props.dispatch(getLatestBorrowingByBookId(this.state.formData.book_id))
      .catch((err) => {
        console.error(err)
      })
    const borrowedBy = this.props.borrowing.borrowingData ? this.props.borrowing.borrowingData[0].user_id : undefined
    const borrowed_at = this.props.borrowing.borrowingData ? this.props.borrowing.borrowingData[0].borrowed_at : undefined
    if(borrowedBy === undefined){
      this.setState({
        showModal:true,
        modalTitle:"Failed",
        modalMessage:"This book has not been borrowed",
      })
    }
    else if(borrowedBy != this.state.formData.user_id){
      this.setState({
        showModal:true,
        modalTitle:"Failed",
        modalMessage:"This book is not borrowed by user with id " + this.state.formData.user_id,
      })
    }
    else{
      this.props.dispatch(returnBook(this.state.formData))
        .then((res)=>{
          let borrowedDate = new Date(borrowed_at)
          let returnedDate = new Date(res.value.data.data.returned_at)
          let borrrowedTimeElapsed = returnedDate.getTime() - borrowedDate.getTime()
          let expirationTime =(1000*60*60*24*7)
          let sanction = 0
          let sanctionMessage = ''
          if(borrrowedTimeElapsed > expirationTime)
            sanction = (borrrowedTimeElapsed / expirationTime) * 2000
          
          if(sanction > 0)
            sanctionMessage = `with Sanction : Rp ${sanction}`
          
          this.setState({
            showModal:true,
            modalTitle:"Success",
            modalMessage:`Book successfully returned ${sanctionMessage}`,
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
  }
  render(){
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row} controlId="formPlaintextUserId">
            <Form.Label column sm="2">
              User ID
            </Form.Label>
            <Col sm="10">
              <Form.Control onChange={this.handleChange} type="text" name="user_id" placeholder="User ID..." required/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextBookId">
            <Form.Label column sm="2">
            Book ID
            </Form.Label>
            <Col sm="10">
              <Form.Control onChange={this.handleChange} value={this.props.bookId} type="text" name="book_id" placeholder="Book ID..." readOnly={this.props.readOnly}/>
            </Col>
          </Form.Group>

          <Button style={{float:"right"}} variant="warning" type="submit" className="btn-black">
            Save
          </Button>
        </Form>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>{this.state.modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.modalMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return{
    book: state.book,
    borrowing: state.borrowing
  }
}
export default connect(mapStateToProps)(ReturnBookForm)