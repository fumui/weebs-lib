import React from "react";
import {Table, Button, Container, Card,Alert} from 'react-bootstrap'
import {connect} from 'react-redux'

import {getBorrowingRequests} from '../Publics/Actions/borrowings';
import ConfirmBorrowingPrompt from "./ConfirmBorrowingPrompt";
class BorrowingHistoryTable extends React.Component{

  constructor(props){
    super(props)
    if(props.borrowing.borrowingRequestsData.length === 0){
      console.log('masuk')
      props.dispatch(getBorrowingRequests())
    }
  }

  render(){
    return (
      <Container>
      {this.props.borrowing.borrowingRequestsData.length !== 0 ? 
        <Table responsive>
          <thead>
            <tr>
              <td>Book Id</td>
              <td>Title</td>
              <td>Requester</td>
              <td>Action</td>
              <td>Details</td>
            </tr>
          </thead>
          <tbody>
              {this.props.borrowing.borrowingRequestsData.map(borrowing => {
                return(
                  <tr key={borrowing.id} >
                    <td>{borrowing.book_id}</td>
                    <td>{borrowing.title}</td>
                    <td>{borrowing.username}</td>
                    <td><Card body><ConfirmBorrowingPrompt borrowingData = {borrowing}/></Card></td>
                    <td><Card body><Button style={{zIndex : 10}} variant="warning" onClick={()=>{this.props.history.push(`/book/${borrowing.book_id}`)}}>Book Details</Button></Card></td>
                  </tr>
                  )
                })
              }:<tr><td></td></tr>
          </tbody>
        </Table>
        :
        <Alert variant='warning'>You haven't borrow any book yet</Alert>}
      </Container>
    )
  }
}
const mapStateToProps = state => {
  return {
    borrowing: state.borrowing,
    user: state.user,
  }
}
export default connect(mapStateToProps)(BorrowingHistoryTable)
