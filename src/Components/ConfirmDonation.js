import React, {Fragment} from 'react'
import {Modal, Button, Container, Row} from 'react-bootstrap'
import {connect} from 'react-redux'
import {getDonationBooks, confirmBookDonation, deleteBook} from '../Publics/Actions/books';

class ConfirmDonation extends React.Component{
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
  
  handleConfirm = async (event) => {
    await this.props.dispatch(confirmBookDonation(this.props.bookData.id))
      .catch(() => {
        this.setState({
          showResponseModal:true,
          modalTitle:"Failed",
          modalMessage:this.props.books.errMessage
        })
      })
    this.setState({
      showResponseModal:true,
      modalResponseTitle:"Success",
      modalResponseMessage:`Donation Confirmed`,
    })
    this.props.dispatch(getDonationBooks())
  }
  handleReject = async (event) => {
    await this.props.dispatch(deleteBook(this.props.bookData.id))
      .catch(() => {
        this.setState({
          showResponseModal:true,
          modalTitle:"Failed",
          modalMessage:this.props.books.errMessage
        })
      })
    this.setState({
      showResponseModal:true,
      modalResponseTitle:"Success",
      modalResponseMessage:`Request Rejected`,
    })
    this.props.dispatch(getDonationBooks())
  }

  handleCloseResponse = ()=>{
    this.setState({showModal: false, showResponseModal:false,})
  }

  render(){
    return(
      <Fragment>
        <Button 
          className= {this.props.className}
          variant={this.props.variant || "light"} 
          size="lg"
          onClick={() => {this.setState({showModal:true})}}>
          Confirm
        </Button>
        <Modal
          show={this.state.showModal}
          onHide={() => {this.setState({showModal:false})}}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          size="md"
        >
          <Modal.Body>
            <Container className="deleteModalBody">
              <Row><h3>Confirm donation {this.props.bookData.title}</h3></Row>
              <Row><h4>Are you sure?</h4></Row>
              <Row className="deleteModalButtons">
                <Button variant="secondary" onClick={() => {this.setState({showModal:false})}}>
                  No
                </Button>
                <Button variant="danger" onClick={this.handleReject}>
                  Reject
                </Button>
                <Button variant="warning" onClick={this.handleConfirm}>
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
const mapStateToProps = state => {
  return {
    books: state.books,
  }
}
export default connect(mapStateToProps)(ConfirmDonation)