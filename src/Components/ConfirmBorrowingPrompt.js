import React, {Fragment} from 'react'
import {Modal, Button, Container, Row} from 'react-bootstrap'
import {connect} from 'react-redux'
import {confirmBorrowingRequests, rejectBorrowingRequests} from '../Publics/Actions/borrowings';

class ConfirmBorrowingPrompt extends React.Component{
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
    await this.props.dispatch(confirmBorrowingRequests(this.props.borrowingData.id, this.props.borrowingData.book_id))
      .catch(() => {
        this.setState({
          showResponseModal:true,
          modalTitle:"Failed",
          modalMessage:this.props.borrowing.errMessage
        })
      })
    this.setState({
      showResponseModal:true,
      modalResponseTitle:"Success",
      modalResponseMessage:`Borrowing Confirmed`,
    })
  }
  handleReject = async (event) => {
    await this.props.dispatch(rejectBorrowingRequests(this.props.borrowingData.id))
      .catch(() => {
        this.setState({
          showResponseModal:true,
          modalTitle:"Failed",
          modalMessage:this.props.borrowing.errMessage
        })
      })
    this.setState({
      showResponseModal:true,
      modalResponseTitle:"Success",
      modalResponseMessage:`Request Rejected`,
    })
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
          size="sm"
        >
          <Modal.Body>
            <Container className="deleteModalBody">
              <Row><h3>Confirm borrowing of {this.props.borrowingData.title} by {this.props.borrowingData.username}</h3></Row>
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
    borrowing: state.borrowing,
  }
}
export default connect(mapStateToProps)(ConfirmBorrowingPrompt)