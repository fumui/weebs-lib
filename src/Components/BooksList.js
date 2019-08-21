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
      totalPage:1,
      page: 1,
      limit: 10,
    }
  }

  componentDidMount(){
    Axios.get(this.state.dataSource)
      .then((result) =>{
        this.setState({
          data: result.data.data
        })
      })
  }

  render(){
    const {data} = this.state
    return(
      <div>
        <div style={{display: 'flex', flexWrap:"wrap", flexDirection: 'row'}} className="justify-content-between">
          {data.map((book, index) => {
            return(
              <BookCard  
              key={index}
              imgUrl={book.image} 
              title={book.title}
              description={book.description.substr(0,75)+'...'} />
            )
          })}
        </div>
        {/* <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis />

          <Pagination.Item>{10}</Pagination.Item>
          <Pagination.Item>{11}</Pagination.Item>
          <Pagination.Item active>{12}</Pagination.Item>
          <Pagination.Item>{13}</Pagination.Item>
          <Pagination.Item disabled>{14}</Pagination.Item>

          <Pagination.Ellipsis />
          <Pagination.Item>{20}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination> */}
      </div>
    )
  }
}
export default BooksList