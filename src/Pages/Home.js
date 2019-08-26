import React from 'react'
import Sidebar from 'react-sidebar'
import { Route } from 'react-router-dom';
import Axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'
import {Button, Navbar, Form, InputGroup, FormControl } from 'react-bootstrap'

import BooksList from '../Components/BooksList'
import UserSideBar from '../Components/UserSideBar'
import Bookshelf from '../bookshelf.svg'
import GenreDropdown from "../Components/GenreDropdown"
import YearDropdown from '../Components/YearDropdown'
import PopularBooksCarousel from '../Components/PopularBooksCarousel';
import SortByDropdown from '../Components/SortByDropdown';

class Home extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      sidebarOpen : false,
      search:"",
      userData:undefined
    }
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
  }
  onSetSidebarOpen = (open) => {
    this.setState({
      sidebarOpen : open
    })
  }
  componentWillMount(){
    if(!window.localStorage.getItem("token"))
      window.location.replace("http://localhost:3000/")
    
    Axios.get("http://localhost:3030/users/profile",{
      headers:{
        Authorization : window.localStorage.getItem("token")
      }
    })
      .then(res => {
        const userData=res.data.data;
        this.setState({
          userData:userData
        })
      })
      .catch(err => console.log(err))
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
          styles={{ sidebar: { background: "white", zIndex:"20", position:"fixed" } }}
        >
        </Sidebar>
        <Navbar className="bg-light justify-content-between">
          <Button variant="light" onClick={() => this.onSetSidebarOpen(true)}>
            <FontAwesomeIcon icon={faBars}/>
          </Button>
          <GenreDropdown history={this.props.history}/>
          <YearDropdown history={this.props.history}/>
          <SortByDropdown history={this.props.history}/>
          <Form inline>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1"><FontAwesomeIcon icon={faSearch}/></InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                name="search"
                placeholder="Search book"
                aria-label="Search book"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Form>
          <Navbar.Brand href="#home"><img src={Bookshelf} alt="bookshelf"/>Weeb's Library</Navbar.Brand>
        </Navbar>
        <Route 
          path="/home" 
          exact={true}
          render={({history}) => {
            let params = new URLSearchParams(window.location.search)
            return(
              <div>
                <PopularBooksCarousel />
                <BooksList history={history} sortby={params.get("sortby")} dataSource={`http://localhost:3030/books`} key={window.location.href} />
              </div>
            );
          }} 
        />
        <Route 
          path="/home/explore" 
          exact={true}
          render={() => {
            return(
              <div>
                <BooksList dataSource={`http://localhost:3030/books${window.location.search}`}/>
              </div>
            );
          }} 
        />
        <Route 
          path="/home/history" 
          exact={true}
          render={() => {
            if(this.state.userData !== undefined )
              return(
                <div>
                  <BooksList dataSource={`http://localhost:3030/borrowings/history/${this.state.userData.id}`}/>
                </div>
              );
            else 
              return(
                <div>
                  Loading...
                </div>
              );
          }} 
        />
        <Route 
          path="/home/genre/:genre" 
          component={(url) => {
            return <BooksList dataSource={`http://localhost:3030/books/genre/${url.match.params.genre}`}/>;
          }} 
        />
        <Route 
          path="/home/year/:year" 
          component={(url) => {
            return <BooksList dataSource={`http://localhost:3030/books/year/${url.match.params.year}`}/>;
          }} 
        />
      </div>
    )
  }
}
export default Home