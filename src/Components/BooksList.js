import React from 'react';
import {connect} from 'react-redux';
import { Alert, Button } from 'react-bootstrap';

import BookCard from './BookCard';
import {getBooks} from '../Publics/Actions/books'

class BooksList extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      dataSource: props.dataSource||"http://localhost:3030/books",
      history: props.history,
      data: null,
      page: 1,
      availability:props.availability,
    }
  }
  componentDidMount(){
    this.getDataBooks(1);
  }

  page = (page) => {
    this.getDataBooks(this.state.page + page)
  }

  getDataBooks = async (page) => {
    await this.props.dispatch(getBooks(this.state.dataSource, page, this.props.sortby, this.props.search, this.props.availability))
    this.setState({
      data: this.props.book,
      page: page
    })
  }
  
  render(){
    const {data} = this.state
    return(
        <div style={{marginTop:"3vh",padding:"3vw", textAlign:"left"}}>
          <h3>List Book</h3>
          <div style={{display: 'flex', flexWrap:"wrap", flexDirection: 'row'}} className="justify-content-between">
            {
               data !== null && data.booksList? 
               data.booksList.map((book, index) => {
                console.log(book.id)
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
                <Alert variant='danger'>Book Not Found</Alert>
              
            }
          </div>
          <Button className="btn btn-warning" 
            disabled={this.state.page === 1}
            onClick={()=>{this.page(-1)}}
            >{'<'}</Button>
          <Button variant="warning">{this.state.page}</Button>
          <Button className="btn btn-warning" onClick={()=>{this.page(1)}}>{'>'}</Button>
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