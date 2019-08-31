import React,{Fragment} from 'react'
import {Link} from 'react-router-dom'
import {Container, Row, Button} from 'react-bootstrap'
import '../App.css'
import {connect} from 'react-redux';

import {getProfile, logout} from '../Publics/Actions/users';
import AddBookModal from './AddBookModal';
import AddBorrowingModal from './AddBorrowingModal';
import ReturnBookModal from './ReturnBookModal';
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
  handleLogout = async (event) => { 
    window.localStorage.removeItem("token")
    await this.props.dispatch(logout())
    if(window.localStorage.getItem("token") === null)
      this.props.history.push('/')
  }
  componentDidMount = async() => {
    if(!this.props.user.userProfile){
      await this.props.dispatch(getProfile())
      this.setState({
        ...this.props.user.userProfile
      })
    }
  }
  render(){
    if(this.props.user.userProfile){
      return (
        <div>
          <img src={this.props.user.userProfile.image||"https://icon-library.net/images/user-login-icon/user-login-icon-17.jpg"} alt="user"  className="User-picture"/>
          <Container style={{textAlign:"left"}}>
            <h6>ID Number : {this.props.user.userProfile.id}</h6>
            <h6>Username : {this.props.user.userProfile.username}</h6>
            <h6>Fullname : {this.props.user.userProfile.fullname}</h6>
          </Container>
          <Container className="sidebar-buttons ">
            <Row className="justify-content-md-center"><Link to="/home/explore" className="btn btn-light btn-lg" size="lg" variant="light">Explore</Link></Row>
            <Row className="justify-content-md-center"><Link to="/home/history" className="btn btn-light btn-lg" size="lg" variant="light">History</Link></Row>
            {
              this.props.user.userProfile.level === "admin" ? 
              <Fragment>
                <Row className="justify-content-md-center">
                  <AddBookModal history={this.state.history}/>
                </Row>
                <Row className="justify-content-md-center">
                  <AddBorrowingModal variant="light"/>
                </Row>
                <Row className="justify-content-md-center">
                  <ReturnBookModal variant="light"/>
                </Row>
              </Fragment>
              :''
            }
            <Row className="justify-content-md-center"><Button size="lg" variant="light" onClick={this.handleLogout} >Logout</Button></Row>
          </Container>
        </div>
      )
    }else{
      return(
        <h5>Loading....</h5>
      )
    }
  }
    
}
const mapStateToProps = (state) => {
  return{
    user: state.user
  }
}
export default connect(mapStateToProps)(UserSideBar)