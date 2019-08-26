import React from 'react'
import {Link} from 'react-router-dom'
import {Container, Row, Button} from 'react-bootstrap'
import Axios from 'axios';
import '../App.css'

import BookModal from './BookModal'
import AddBookForm from './AddBookForm';
class UserSideBar extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: props.username || "dummy",
      image: props.image || "https://icon-library.net/images/user-login-icon/user-login-icon-17.jpg",
      email: props.email || "dummy@gmail.com",
      level: props.level || "regular",
      fullname: props.fullname || "dummyfullname",
      id: props.id ,
      history: props.history,
    }
    this.handleLogout = this.handleLogout.bind(this)
  }
  handleLogout = (event) => { 
    window.localStorage.removeItem("token")
    if(window.localStorage.getItem("token") === null)
      this.props.history.push('/')
  }
  componentDidMount(){
    Axios.get("http://localhost:3030/users/profile",{
      headers:{
        Authorization : window.localStorage.getItem("token")
      }
    })
      .then(res => {
        const userData=res.data.data;
        this.setState({
          username : userData.username,
          fullname : userData.fullname,
          email : userData.email,
          level : userData.level,
          id : userData.id,
        })
      })
      .catch(err => console.log(err))
  }
  render(){
    return (
    <div>
      <img src={this.state.image} alt="user"  className="User-picture"/>
      <h5>{this.state.fullname}</h5>
      <Container className="sidebar-buttons ">
        <Row className="justify-content-md-center"><Link to="/home/explore" className="btn btn-light btn-lg" size="lg" variant="light">Explore</Link></Row>
        <Row className="justify-content-md-center"><Link to="/home/history" className="btn btn-light btn-lg" size="lg" variant="light">History</Link></Row>
        {
          this.state.level === "admin" ? 
          <Row className="justify-content-md-center">
            <BookModal title="Add Book" content={<AddBookForm history={this.state.history}/>}/>
          </Row>
          :''
        }
        <Row className="justify-content-md-center"><Button size="lg" variant="light" onClick={this.handleLogout} >Logout</Button></Row>
      </Container>
    </div>)
  }
}
export default UserSideBar