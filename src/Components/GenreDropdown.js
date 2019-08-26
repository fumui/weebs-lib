import React from 'react'
import Axios from 'axios'
import {Dropdown} from 'react-bootstrap'

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

  componentDidMount = () => {
    Axios.get ('http://localhost:3030/genres')
      .then (res => {
        this.setState ({genresList: res.data.data});
      })
      .catch (err => console.log ('error =', err));
  };
  render() {
    const {genresList} = this.state
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
export default GenreDropdown