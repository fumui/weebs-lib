import React from 'react'
import {connect} from 'react-redux';
import {Dropdown} from 'react-bootstrap'
import {getGenres} from '../Publics/Actions/genres'

class GenreDropdown extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      genresList: [],
      history: props.history,
    }
  }

  goToGenrePath = (genreName) =>{
    this.state.history.push(`/home/genre/${genreName}/`)
  }

  componentDidMount = async () => {
    if(this.props.genre.genresList.length === 0){
      await this.props.dispatch(getGenres())
      this.setState ({genresList: this.props.genre.genresList})
    }
  };
  render() {
    const {genresList} = this.props.genre
    return(
      <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          All Categories
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {genresList.length > 0 ? 
            genresList.map((genre) => {
              return <Dropdown.Item key={genre.name} onClick={()=>{this.goToGenrePath(genre.name)}}>{genre.name}</Dropdown.Item>
            }):
            <Dropdown.Item href="#">Loading...</Dropdown.Item>}
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}
const mapStateToProps = state => {
  return{
    genre: state.genre
  }
}
export default connect(mapStateToProps)(GenreDropdown)