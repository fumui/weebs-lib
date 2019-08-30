import React,{Fragment} from 'react';
import {connect} from 'react-redux';
import { Alert, Button, Spinner, Container } from 'react-bootstrap';

import BookCard from './BookCard';
import {getBooks} from '../Publics/Actions/books'

class BooksList extends React.Component{
  componentDidMount(){
    this.getDataBooks(1);
  }

  page = (page) => {
    this.getDataBooks(Number(this.props.book.page) + page)
  }

  getDataBooks = async (page) => {
    await this.props.dispatch(getBooks(this.props.dataSource, page, this.props.sortby, this.props.search, this.props.availability))
  }
  
  render(){
    return(
        <div style={{marginTop:"3vh",padding:"3vw", textAlign:"left"}}>
          <h3>List Book</h3>
          <div style={{display: 'flex', flexWrap:"wrap", flexDirection: 'row'}} className="justify-content-between">
            {
               this.props.book.booksList.length !== 0? 
               this.props.book.booksList.map((book, index) => {
                return(
                    <BookCard  
                      onClick={() => this.getDetails(index)}
                      key={book.id}
                      imgUrl={book.image} 
                      availability={book.availability}
                      genre={book.genre}
                      bookId={book.id}
                      title={book.title}
                      description={book.description.substr(0,75)+'...'} />
                  )
                })
                :
                this.props.book.isLoading ? 
                <Container>
                  <h4><Spinner animation="border"/>Loading</h4>
                </Container>
                :
                <Alert variant='danger'>Book Not Found</Alert>
            }
          </div>
          {this.props.book.page ? 
          <Fragment>
            <Button className="btn btn-warning" 
              disabled={Number(this.props.book.page) === 1}
              onClick={()=>{this.page(-1)}}
            >
              {'<'}
            </Button>
            <Button variant="warning">{this.props.book.page}</Button>
            <Button className="btn btn-warning" onClick={()=>{this.page(1)}}>{'>'}</Button>
          </Fragment>
          :
          ''
          }
        </div>
         
    )
  }

}
const mapStateToProps = state => {
  return{
    book: state.book
  }
}
export default connect(mapStateToProps)(BooksList)