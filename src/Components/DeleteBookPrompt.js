import React, {Fragment} from 'react'
import {Modal, Button, Container, Row} from 'react-bootstrap'
import {connect} from 'react-redux'
import {deleteBook} from '../Publics/Actions/books';

class DeleteBookPrompt extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showModal: false,
      showResponseModal:false,
      modalResponseTitle:"",
      modalResponseMessage:``,
      redirectOnCloseModal:false
    }
  }
  
  handleDelete = async (event) => {
    await this.props.dispatch(deleteBook(this.props.bookData.id))
      .catch(() => {
        this.setState({
          showResponseModal:true,
          modalTitle:"Failed",
          modalMessage:this.props.book.errMessage
        })
      })
    this.setState({
      showResponseModal:true,
      modalResponseTitle:"Success",
      modalResponseMessage:`Success deleting Book`,
      redirectOnCloseModal:true
    })
  }
  handleCloseResponse = ()=>{
    this.setState({showModal: false})
    if (this.state.redirectOnCloseModal)
      this.props.history.push('/')
  }

  render(){
    return(
      <Fragment>
        <Button 
          className= {this.props.className}
          variant={this.props.variant || "light"} 
          size="lg"
          onClick={() => {this.setState({showModal:true})}}>
          Delete
        </Button>
        <Modal
          show={this.state.showModal}
          onHide={() => {this.setState({showModal:false})}}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          size="sm"
        >
          <Modal.Body>
            <Container className="deleteModalBody">
              <Row><h3>Deleting {this.props.bookData.title}</h3></Row>
              <Row><h4>Are you sure?</h4></Row>
              <Row className="deleteModalButtons">
                <Button variant="secondary" onClick={() => {this.setState({showModal:false})}}>
                  No
                </Button>
                <Button variant="secondary" onClick={this.handleDelete}>
                  Yes
                </Button>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>

        <Modal show={this.state.showResponseModal} onHide={this.handleCloseResponse}>
          <Modal.Header>
            <Modal.Title>{this.state.modalResponseTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.modalResponseMessage}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseResponse}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    )
  }
}
export default connect(null)(DeleteBookPrompt)