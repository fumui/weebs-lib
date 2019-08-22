import React from 'react';
import Axios from 'axios';
import BookCard from './BookCard';
import {Pagination} from 'react-bootstrap';

class BooksList extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      dataSource: props.dataSource || "http://localhost:3030/books",
      data: [],
      page: 1,
      limit: 12,
    }
    this.nextPage = this.nextPage.bind(this)
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
  
  nextPage = () =>{
    this.setState({page:(Number(this.state.page)+1)})
  }

  render(){
    const {data} = this.state
    return(
      <div>
        <div style={{display: 'flex', flexWrap:"wrap", flexDirection: 'row'}} className="justify-content-between">
          {data.map((book, index) => {
            return(
              <BookCard  
              onClick={() => this.getDetails(index)}
              key={index}
              imgUrl={book.image} 
              bookId={book.id}
              title={book.title}
              description={book.description.substr(0,75)+'...'} />
            )
          })}
        </div>
        <Pagination className="justify-content-md-center">
          { this.state.page === 1?<Pagination.Item active>{1}</Pagination.Item>
          :<div>
            <Pagination.Prev />
            <Pagination.Item active>{this.state.page}</Pagination.Item>
          </div>
          }
          <Pagination.Next onClick={() => this.nextPage()}/>
        </Pagination>
      </div>
    )
  }
}
export default BooksList