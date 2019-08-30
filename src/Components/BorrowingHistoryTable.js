import React from "react";
import {Table, Button, Container} from 'react-bootstrap'
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
            {this.props.borrowing.borrowingHistoryData.length !== 0 ? 
              this.props.borrowing.borrowingHistoryData.map(book => {
                const borrowingDate = new Date(book.borrowed_at)
                let expirationDate = new Date()
                expirationDate.setTime(borrowingDate.getTime() + (1000*60*60*24*7))
                console.log(expirationDate)
                return(
                  <tr>
                    <td>{book.book_id}</td>
                    <td>{book.title}</td>
                    <td>{borrowingDate.toDateString()}</td>
                    <td>{expirationDate.toDateString()}</td>
                    <td>{book.returned_at ? new Date(book.returned_at).toDateString() : "Not Yet Returned"}</td>
                    <td><Button variant="warning" onClick>Book Details</Button></td>
                  </tr>
                )
              })
              :''
            }
          </tbody>
        </Table>
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
