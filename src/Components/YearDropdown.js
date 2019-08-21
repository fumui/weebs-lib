import React from 'react'
import Axios from 'axios'
import {Dropdown} from 'react-bootstrap'

class YearDropdown extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      yearsList: [],
    }
  }

  componentDidMount = () => {
    Axios.get ('http://localhost:3030/books/year/')
      .then (res => {
        this.setState ({yearsList: res.data.data});
      })
      .catch (err => console.log ('error =', err));
  };
  render() {
    const {yearsList} = this.state
    return(
      <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          All Time
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {yearsList.length > 0 ? 
            yearsList.map((year, index) => {
              return <Dropdown.Item key={index} href={`http://localhost:3000/home/year/${year.year}`}>{year.year}</Dropdown.Item>
            }):
            <Dropdown.Item key="0" href="#">Loading...</Dropdown.Item>}
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}
export default YearDropdown