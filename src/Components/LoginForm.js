import React from 'react';
import Axios from 'axios';
import {Form, Button} from 'react-bootstrap';
import {Link, Redirect} from 'react-router-dom';

class LoginForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      style: props.style,
      email: '',
      password:'',
      loggedIn:false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loggingIn = this.loggingIn.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    Axios.post('http://localhost:3030/users/login', {
      email: this.state.email, 
      password: this.state.password
    })
    .then(this.loggingIn)
    .catch(function (error) {
      console.log(error);
    });
    event.preventDefault();
  }
  
  loggingIn(res){
    const token = res.data.token
    document.cookie = `token=${token}`
    window.location.reload()
  }

  render(){
    if(document.cookie.includes('token')) return <Redirect to="../"/>
    else return(
      <Form style={this.state.style} onSubmit={this.handleSubmit}>
        <div className="card app-form-group">
          <Form.Group controlId="formBasicEmail" className="card-body" style={{textAlign:"left"}}>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email" 
              placeholder="Enter email" 
              style={{border:"none"}} 
              className="app-form-control"
              name="email"
              onChange={this.handleChange}
            />
          </Form.Group>
        </div>
        <div className="card app-form-group">
          <Form.Group controlId="formBasicPassword" className="card-body" style={{textAlign:"left"}}>
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password" 
              className="app-form-control"
              name="password"
              onChange={this.handleChange}
            />
          </Form.Group>
        </div>
        <Button variant="dark" type="submit" className="btn-black">
          Login
        </Button>
        <Link to="./register" className="btn btn-light" >Sign up</Link>
        
      </Form>
    )
  }
}
export default LoginForm