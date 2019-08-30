import React,{Fragment} from 'react';
import {Row, Col, Form, Button, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';

import {getLatestBorrowingByBookId,returnBook} from '../Publics/Actions/borrowings';

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
    this.setState({showModal: false})
    this.props.closeModal()
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
        .then(()=>{
          this.setState({
            showModal:true,
            modalTitle:"Success",
            modalMessage:"Book successfully returned",
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