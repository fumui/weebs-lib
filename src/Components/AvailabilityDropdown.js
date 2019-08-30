import React from 'react'
import {Dropdown} from 'react-bootstrap';

export default function AvailabilityDropdown(props){
  return(
    <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          Availability
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={()=>{props.history.push('?availability=1')}}>Available</Dropdown.Item>
          <Dropdown.Item onClick={()=>{props.history.push('?availability=0')}}>Borrowed</Dropdown.Item>
          <Dropdown.Item onClick={()=>{props.history.push('/')}}>Both</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
  )
}