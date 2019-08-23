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
    this.onClickMinus = this.onClickMinus.bind(this)
  }
  onClickPlus = () =>{
    const curr = window.location.href
    let newHref = window.location.origin
    const containsSearchQuery = curr.includes('?')
    const containsPageQuery = curr.includes('page')
    if(containsPageQuery){
      let index = curr.indexOf("page")
      let nextPage = Number(curr.charAt( (index+5) )) + 1
      newHref = curr.replace(curr.substr(index, 6),`page=${nextPage}`)
    }else if(containsSearchQuery){
      newHref = curr.concat('&page=2')
    }else{
      newHref = curr.concat('?page=2')
    }
    window.location.href = newHref
  }
  onClickMinus = () =>{
    const curr = window.location.href
    let index = curr.indexOf("page")
    let prevPage = Number(curr.charAt( (index+5) )) - 1
    let newHref = curr.replace(curr.substr(index, 6),`page=${prevPage}`)
    window.location.href = newHref
  }
  componentDidMount(){
    console.log(this.state)
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
    const hasPrevPage = window.location.search.includes("page") || window.location.search.includes("page=1")
    console.log(hasPrevPage)
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
                  description={book.description.substr(0,75)+'...'} />
                )
              }
            ):<Alert variant='danger'>Book Not Found</Alert>
          }
          </div>
        <Button 
          disabled={!hasPrevPage}
          onClick={this.onClickMinus}>-</Button>
        <Button onClick={this.onClickPlus}>+</Button>
      </div>
    )
  }
}
export default BooksList