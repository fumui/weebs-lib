import React from 'react'
import {Form, InputGroup,FormControl} from 'react-bootstrap'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export const SearchBook = (props)=>{
  return (
    <Form inline>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faSearch}/></InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          onKeyPress={(evt)=>{
            if(evt.key === 'Enter') {
              evt.preventDefault()
              props.history.push(`/home?search=${evt.target.value}`)
            }
          }}
          name="search"
          placeholder="Search book"
          aria-label="Search book"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
    </Form>
  )
}