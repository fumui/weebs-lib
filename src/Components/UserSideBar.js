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
      image: props.image || "https://previews.123rf.com/images/jeremywhat/jeremywhat1106/jeremywhat110600966/9895276-round-half-tone-images-round-black-white-pattern-design.jpg",
      email: props.email || "dummy@gmail.com",
      level: props.level || "regular",
      fullname: props.fullname || "dummyfullname",
      id: props.id ,
    }
  }
  componentDidMount(){
    Axios.get("http://localhost:3030/users/profile",{
      headers:{
        Authorization : document.cookie.split("=")[1],
      }
    })
      .then(res => {
        const userData=res.data.data;
        console.log("userdata", userData)
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
            <BookModal title="Add Book" content={<AddBookForm />}/>
          </Row>
          :''
        }
      </Container>
    </div>)
  }
}
export default UserSideBar