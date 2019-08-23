import React from 'react';
import Axios from 'axios';
import BookCard from './BookCard';
import { Button, Alert } from 'react-bootstrap';

class BooksList extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      dataSource: props.dataSource || "http://localhost:3030/books",
      data: [],
    }
    this.onClickPlus = this.onClickPlus.bind(this)
  }
  onClickPlus = () =>{
    const curr = window.location.href
    const containsSearchQuery = curr.includes('?')
    window.location.href = containsSearchQuery ? window.location.href + '&page=':''
  }
  componentDidMount(){
    console.log(this.state)
    Axios.get(`${this.state.dataSource}`)
      .then((result) =>{
        this.setState({
          data: result.data.data
        })
      })
      .catch(err => console.log(err))
  }

  render(){
    const {data} = this.state
    return(
      <div>
        <div style={{display: 'flex', flexWrap:"wrap", flexDirection: 'row'}} className="justify-content-between">
          {
            data !==null? data.map((book, index) => {
              return(
                <BookCard  
                onClick={() => this.getDetails(index)}
                key={index}
                imgUrl={book.image} 
                bookId={book.id}
                title={book.title}
                description={book.description.substr(0,75)+'...'} />)
              }
            ):<Alert variant='danger'>Book Not Found</Alert>
          }
        </div>
        <Button>-</Button>
        <Button onClick={this.onClickPlus}>+</Button>
      </div>
    )
  }
}
export default BooksList