import React from 'react'
import {connect} from 'react-redux'
import {Dropdown} from 'react-bootstrap'

import {getBookYears} from '../Publics/Actions/books';

class YearDropdown extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      history: props.history,
    }
  }
  goToYearPath = (year) =>{
    this.state.history.push(`/home/year/${year}/`)
  }


  componentDidMount = () => {
    if(this.props.book.yearsList.length === 0){
      this.props.dispatch(getBookYears())
    }
  };
  render() {
    const {yearsList} = this.props.book
    return(
      <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          All Time
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {yearsList.length > 0 ? 
            yearsList.map((year, index) => {
              return <Dropdown.Item key={year.year} onClick={()=>{this.goToYearPath(year.year)}}>{year.year}</Dropdown.Item>
            }):
            <Dropdown.Item key="0" href="#">Loading...</Dropdown.Item>}
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
export default connect(mapStateToProps)(YearDropdown)