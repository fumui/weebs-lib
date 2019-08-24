import React from 'react';
import Axios from 'axios';
import BookCard from './BookCard';
import { Alert } from 'react-bootstrap';

class BooksList extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      dataSource: props.dataSource || "http://localhost:3030/books",
      data: [],
    }
  }
  componentDidMount(){
    Axios.get(`${this.state.dataSource}`,{
      headers:{
        Authorization : document.cookie.split("=")[1],
      }
    })
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
        <div style={{marginTop:"3vh",padding:"3vw", textAlign:"left"}}>
          <h3>List Book</h3>
          <div style={{display: 'flex', flexWrap:"wrap", flexDirection: 'row'}} className="justify-content-between">
            {
              data !==null? data.map((book, index) => {
                return(
                    <BookCard  
                    onClick={() => this.getDetails(index)}
                    key={index}
                    imgUrl={book.image} 
                    availability={book.availability}
                    genre={book.genre}
                    bookId={book.id}
                    title={book.title}
                    description={book.description.substr(0,75)+'...'} />
                  )
                }
              ):<Alert variant='danger' style={{zIndex:2}}>Book Not Found</Alert>
            }
          </div>
        </div>
    )
  }
}
export default BooksList