import React from 'react'
import {Dropdown} from 'react-bootstrap';

const sort =(props,sort) =>{
  props.history.push("?sortby="+sort)
}

export default function SortByDropdown(props){
  return(
    <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          Sort By
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={()=>{sort(props,"title asc")}}>Title Ascending</Dropdown.Item>
          <Dropdown.Item onClick={()=>{sort(props,"title desc")}}>Title Descending</Dropdown.Item>
          <Dropdown.Item onClick={()=>{sort(props,"date_released asc")}}>Date Released Ascending</Dropdown.Item>
          <Dropdown.Item onClick={()=>{sort(props,"date_released desc")}}>Date Released Descending</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
  )
}