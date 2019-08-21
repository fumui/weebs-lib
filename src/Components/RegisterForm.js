import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';

class RegisterForm extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      style: props.style
    }
  }

  render(){
    return(
      <Form style={this.state.style}>
        <div className="card app-form-group">
          <Form.Group controlId="formBasicUsername" className="card-body" style={{textAlign:"left"}}>
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" style={{border:"none"}} className="app-form-control"/>
          </Form.Group>
        </div>
        <div className="card app-form-group">
          <Form.Group controlId="formBasicName" className="card-body" style={{textAlign:"left"}}>
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Full Name" className="app-form-control"/>
          </Form.Group>
        </div><div className="card app-form-group">
          <Form.Group controlId="formBasicEmail" className="card-body" style={{textAlign:"left"}}>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" style={{border:"none"}} className="app-form-control"/>
          </Form.Group>
        </div>
        <div className="card app-form-group">
          <Form.Group controlId="formBasicPassword" className="card-body" style={{textAlign:"left"}}>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" className="app-form-control"/>
          </Form.Group>
        </div>
        <Link to="./login" className="btn btn-light" >Log in</Link>
        <Button variant="dark" type="submit" className="btn-black">
          Sign up
        </Button>
      </Form>
    )
  }
}
export default RegisterForm