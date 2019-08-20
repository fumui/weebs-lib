import React from 'react';
import Sidebar from 'react-sidebar'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'
import {Button, Navbar, Form, InputGroup, FormControl} from 'react-bootstrap'
import UserSideBar from '../Components/UserSideBar';
import Bookshelf from '../bookshelf.svg'
import GenreDropdown from "../Components/GenreDropdown";
import YearDropdown from '../Components/YearDropdown';


class Home extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      sidebarOpen : false
    }
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
  }

  onSetSidebarOpen = (open) => {
    this.setState({
      sidebarOpen : open
    })
  }

  render(){
    return(
      <div>
        <Sidebar
          sidebar={
            <UserSideBar
              username="Fuad"
            />}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "white" } }}
        >
        </Sidebar>
        <Navbar className="bg-light justify-content-between">
          <Button variant="light" onClick={() => this.onSetSidebarOpen(true)}>
            <FontAwesomeIcon icon={faBars}/>
          </Button>
          <GenreDropdown/>
          <YearDropdown/>
          <Form inline>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faSearch}/></InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Search book"
                aria-label="Search book"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Form>
          <Navbar.Brand href="#home"><img src={Bookshelf} alt="bookshelf"/>Weeb's Library</Navbar.Brand>
        </Navbar>
      </div>
    )
  }
}
export default Home