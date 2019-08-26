import React from 'react';
import Axios from 'axios';
import BookCard from './BookCard';
import { Alert, Button } from 'react-bootstrap';

class BooksList extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      dataSource: props.dataSource||"http://localhost:3030/books",
      history: props.history,
      data: null,
      page: 1,
      sortby: props.sortby,
    }
  }
  componentDidMount(){
    this.getDataBooks(1);
  }

  page = (page) => {
    this.getDataBooks(this.state.page + page)
  }

  getDataBooks = (page) => {
    let getPage = page || this.state.page
    let sorted = this.state.sortby !== undefined 
    let url = `${this.state.dataSource}?page=${getPage}`
    if(sorted)
      url += `&sortby=${this.state.sortby}`
    console.log(url)
    Axios.get(url,{
      headers:{
        Authorization : window.localStorage.getItem("token")
      }
    })
      .then((result) =>{
        this.setState({
          data: result.data.data,
          page: getPage
        })
      })
      .catch(err => console.log(err))
  }
  
  render(){
    console.log(this.state)
    console.log(this.props)
    const {data} = this.state
    return(
        <div style={{marginTop:"3vh",padding:"3vw", textAlign:"left"}}>
          <h3>List Book</h3>
          <div style={{display: 'flex', flexWrap:"wrap", flexDirection: 'row'}} className="justify-content-between">
            {
               data !== null ? 
               data.map((book, index) => {
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
export default BooksList