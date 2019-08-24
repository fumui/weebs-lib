import React from 'react'
import {Dropdown} from 'react-bootstrap';

export default function SortByDropdown(){
  return(
    <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          Sort By
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item key="0" href="/home/?sortby=title">Title</Dropdown.Item>
          <Dropdown.Item key="1" href="/home/?sortby=date_released">Date</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
  )
}