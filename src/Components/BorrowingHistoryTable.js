import React from "react";
import {Table, Button, Container, Card,Alert} from 'react-bootstrap'
import {connect} from 'react-redux'

import {getBorrowingHistory} from '../Publics/Actions/borrowings';
class BorrowingHistoryTable extends React.Component{

  constructor(props){
    super(props)
    if(props.borrowing.borrowingHistoryData.length === 0)
      props.dispatch(getBorrowingHistory())
  }

  render(){
    return (
      <Container>
      {this.props.borrowing.borrowingHistoryData.length !== 0 ? 
        <Table responsive>
          <thead>
            <tr>
              <td>Book Id</td>
              <td>Title</td>
              <td>Borrowing Date</td>
              <td>Expiration Date</td>
              <td>Returning Date</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
              {this.props.borrowing.borrowingHistoryData.map(book => {
                const borrowingDate = new Date(book.borrowed_at)
                let expirationDate = new Date()
                expirationDate.setTime(borrowingDate.getTime() + (1000*60*60*24*7))
                console.log(expirationDate)
                return(
                  <tr key={book.borrowed_at + book.returned_at} >
                    <td>{book.book_id}</td>
                    <td>{book.title}</td>
                    <td>{borrowingDate.toDateString()}</td>
                    <td>{expirationDate.toDateString()}</td>
                    <td>{book.returned_at ? new Date(book.returned_at).toDateString() : "Not Yet Returned"}</td>
                    <td><Card body><Button style={{zIndex : 10}} variant="warning" onClick={()=>{this.props.history.push(`/book/${book.book_id}`)}}>Book Details</Button></Card></td>
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
