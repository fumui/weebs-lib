import React from 'react'
import Sidebar from 'react-sidebar'
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import {Button, Navbar} from 'react-bootstrap'

import BooksList from '../Components/BooksList'
import UserSideBar from '../Components/UserSideBar'
import Bookshelf from '../bookshelf.svg'
import GenreDropdown from "../Components/GenreDropdown"
import YearDropdown from '../Components/YearDropdown'
import PopularBooksCarousel from '../Components/PopularBooksCarousel';
import SortByDropdown from '../Components/SortByDropdown';
import {SearchBook} from '../Components/SearchBook';
import {getProfile} from '../Publics/Actions/users';
import AvailabilityDropdown from '../Components/AvailabilityDropdown';

class Home extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      sidebarOpen : false,
      search:"",
      userData:undefined,
    }
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
    
  }
  onSetSidebarOpen = (open) => {
    this.setState({
      sidebarOpen : open
    })
  }
  componentDidMount= async () => {
    if(window.localStorage.getItem("token") === null)
      this.props.history.push('/')
      await this.props.dispatch(getProfile())
      this.setState({
        userData: this.props.user.userProfile
      })
  }

  render(){
    return(
      <div>
        <Sidebar
          sidebar={
            <UserSideBar
              history={this.props.history}
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
          <AvailabilityDropdown history={this.props.history} />
          <SearchBook history={this.props.history}/>
          <Navbar.Brand onClick={()=>{this.props.history.push("/home")}}><img src={Bookshelf} alt="bookshelf"/>Weeb's Library</Navbar.Brand>
        </Navbar>
        <Route 
          path="/home" 
          exact={true}
          render={({history}) => {
            let params = new URLSearchParams(window.location.search)
            return(
              <div>
                <PopularBooksCarousel history={history}/>
                <BooksList 
                  availability={params.get("availability")} 
                  history={history} 
                  sortby={params.get("sortby")} 
                  search={params.get("search")} 
                  dataSource={`http://localhost:3030/books`} 
                  key={window.location.href + this.state} />
              </div>
            );
          }} 
        />
        <Route 
          path="/home/explore" 
          exact={true}
          render={({history}) => {
            let params = new URLSearchParams(window.location.search)
            return(
              <div>
                <BooksList history={history} sortby={params.get("sortby")} search={params.get("search")} dataSource={`http://localhost:3030/books`} key={window.location.href} />
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
const mapStateToProps = (state) => {
  return{
    user: state.user,
  }
}
export default connect(mapStateToProps)(Home)