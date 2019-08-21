import React from 'react';
import Axios from 'axios';
import BookCard from './BookCard';

class BooksList extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      data: []
    }
  }

  componentDidMount(){
    Axios.get("http://localhost:3030/books")
      .then((result) =>{
        this.setState({
          data: result.data.data
        })
      })
  }

  render(){
    const {data} = this.state
    return(
      <div style={{display: 'flex', flexWrap:"wrap", flexDirection: 'row'}}>
        {data.map((book) => {
          return(
            <BookCard  
            imgUrl={book.image} 
            title={book.title}
            description={book.description.substr(0,75)+'...'} />
          )
        })}
      </div>
    )
  }
}
export default BooksList