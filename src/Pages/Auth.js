import React from 'react';
import { Route } from 'react-router-dom';

import RegisterForm from '../Components/RegisterForm';
import LoginForm from '../Components/LoginForm';
import Library from "../library picture.svg";
import Bookshelf from '../bookshelf.svg';

class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      loggedIn: this.isLoggedIn()
    }
    if(this.isLoggedIn())  
      props.history.push('/')
  }

  isLoggedIn(){
    return window.localStorage.getItem("token")
  }

  render(){
    return(
      <div style={{margin: 0 }}>
        <div style={{position:"relative"}}>
          <div style={{maxWidth:"60vh"}}>
            <img src={Library} alt="Library" className="Library-picture"/>
            <h1 id="inspire">Book is a window<br/>to the world</h1>
            <p id="disclaimer">Photo by Mark Pan4ratte on Unsplash</p>
          </div>
          <div style={{float: "right"}}>
            <img src={Bookshelf} alt='bookshelf' width="100px" style={{margin:"1vh"}} />
          </div>
        </div>
          <Route
            path={'/login'}
            render={() => {
              return (
              this.state.loggedIn ? this.props.history.push('/') :
                <div style={{position:"relative"}}>
                  <div className="Header" style={{position:"absolute", marginTop:"20vh", marginLeft:"100vh"}}>
                    <h1>Login</h1>
                    <h5>Welcome Back, Please Login to your account</h5>
                  </div>
                  <LoginForm style={{position:"absolute", marginTop:"37vh", marginLeft:"105vh"}}/>
                </div>
              );
            }}
          />
          <Route
            path={'/register'}
            render={() => {
              return (
                <div style={{position:"relative"}}>
                  <div className="Header" style={{position:"absolute", marginTop:"15vh", marginLeft:"100vh"}}>
                    <h1>Register</h1>
                    <h5>Welcome Back, register to create account</h5>
                  </div>
                  <RegisterForm style={{position:"absolute", marginTop:"30vh", marginLeft:"105vh"}}/>
                </div>
              );
            }}
          />
        
      </div>
    )
  }
}
export default Login