import React from 'react';
import {Form, Button, Spinner} from 'react-bootstrap';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../Publics/Actions/users';
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
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      email: this.state.email, 
      password: this.state.password
    }
    await this.props.dispatch(login(data))
    window.localStorage.setItem("token", this.props.user.token)
    this.setState({
      loggedIn:true
    })
  }
  
  render(){
    if(window.localStorage.getItem("token")) return <Redirect to="../"/>
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
        {this.props.user.isLoading?
          <Button variant="dark" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>:
          <Button variant="dark" type="submit" className="btn-black">
            Login
          </Button>
        }
        <Link to="./register" className="btn btn-light" >Sign up</Link>
        
      </Form>
    )
  }
}
const mapStateToProps = state => {
  return{
    user: state.user
  }
}
export default connect(mapStateToProps)(LoginForm)