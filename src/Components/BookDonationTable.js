import React from "react";
import {Table, Button, Container, Card,Alert} from 'react-bootstrap'
import {connect} from 'react-redux'

import {getDonationBooks} from '../Publics/Actions/books';
import ConfirmDonation from "./ConfirmDonation";
class BookDonationTable extends React.Component{

  constructor(props){
    super(props)
    if(props.book.donatedBooksList.length === 0)
      props.dispatch(getDonationBooks())
  }

  render(){
    return (
      <Container>
      {this.props.book.donatedBooksList.length !== 0 ? 
        <Table responsive>
          <thead>
            <tr>
              <td>Image</td>
              <td>Title</td>
              <td>Description</td>
              <td>Genre</td>
              <td>Details</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
              {this.props.book.donatedBooksList.map(book => {
                return(
                  <tr key={book.book_id} >
                    <td><img src={book.image} style={{width:'15vw'}} /></td>
                    <td>{book.title}</td>
                    <td>{book.description}</td>
                    <td>{book.genre}</td>
                    <td><Card body><Button style={{zIndex : 10}} variant="warning" onClick={()=>{this.props.history.push(`/book/${book.book_id}`)}}>Book Details</Button></Card></td>
                    <td><Card body><ConfirmDonation bookData={book} variant="warning" /></Card></td>
                  </tr>
                  )
                })
              }:<tr><td></td></tr>
          </tbody>
        </Table>
        :
        <Alert variant='warning'>didn't find any donations</Alert>}
      </Container>
    )
  }
}
const mapStateToProps = state => {
  return {
    book: state.book,
    user: state.user,
  }
}
export default connect(mapStateToProps)(BookDonationTable)
