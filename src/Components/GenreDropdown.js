import React from 'react'
import {connect} from 'react-redux';
import {Dropdown} from 'react-bootstrap'
import {getBookGenres} from '../Publics/Actions/books'

class GenreDropdown extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      bookGenresList: [],
      history: props.history,
    }
  }

  goToGenrePath = (genreName) =>{
    this.state.history.push(`/home/genre/${genreName}/`)
  }

  componentDidMount = async () => {
    if(this.props.book.bookGenresList.length === 0){
      await this.props.dispatch(getBookGenres())
      this.setState ({bookGenresList: this.props.book.bookGenresList})
    }
  };
  render() {
    const {bookGenresList} = this.props.book
    return(
      <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          All Categories
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {bookGenresList.length > 0 ? 
            bookGenresList.map((genre) => {
              return <Dropdown.Item key={genre.genre} onClick={()=>{this.goToGenrePath(genre.genre)}}>{genre.genre}</Dropdown.Item>
            }):
            <Dropdown.Item href="#">Loading...</Dropdown.Item>}
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}
const mapStateToProps = state => {
  return{
    book: state.book
  }
}
export default connect(mapStateToProps)(GenreDropdown)