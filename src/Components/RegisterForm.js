import React,{Fragment} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import {Form, Button, Modal} from 'react-bootstrap';

class RegisterForm extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      style: props.style,
      formData:{
        username: '',
        fullname:'',
        email:'',
        password:'',
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose=this.handleClose.bind(this);
  }

  handleClose = ()=>{
    this.setState({showModal: false})
    window.location.reload()
  }

  handleChange(event){
    let newFormData = {...this.state.formData}
    const target = event.target
    const name = target.name
    const value = target.value
    newFormData[name] = value
    this.setState({
      formData: newFormData
    })
  }

  handleSubmit(event){
    Axios.post('http://localhost:3030/users/register',this.state.formData)
      .then(res => {
        this.setState({
          showModal:true,
          modalTitle:"Success",
          modalMessage:res.data.message,
        })
      })
      .catch(err => console.log(err))
    event.preventDefault();
  }
  render(){
    return(
      <Fragment>
        <Form style={this.state.style} onSubmit={this.handleSubmit}> 
          <div className="card app-form-group">
            <Form.Group controlId="formBasicUsername" className="card-body" style={{textAlign:"left"}}>
              <Form.Label>Username</Form.Label>
              <Form.Control name="username" onChange={this.handleChange} type="text" placeholder="Enter username" style={{border:"none"}} className="app-form-control"/>
            </Form.Group>
          </div>
          <div className="card app-form-group">
            <Form.Group controlId="formBasicName" className="card-body" style={{textAlign:"left"}}>
              <Form.Label>Full Name</Form.Label>
              <Form.Control name="fullname" onChange={this.handleChange} type="text" placeholder="Full Name" className="app-form-control"/>
            </Form.Group>
          </div><div className="card app-form-group">
            <Form.Group controlId="formBasicEmail" className="card-body" style={{textAlign:"left"}}>
              <Form.Label>Email address</Form.Label>
              <Form.Control name="email" onChange={this.handleChange} type="email" placeholder="Enter email" style={{border:"none"}} className="app-form-control"/>
            </Form.Group>
          </div>
          <div className="card app-form-group">
            <Form.Group controlId="formBasicPassword" className="card-body" style={{textAlign:"left"}}>
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" onChange={this.handleChange} type="password" placeholder="Password" className="app-form-control"/>
            </Form.Group>
          </div>
          <Link to="./login" className="btn btn-light" >Log in</Link>
          <Button variant="dark" type="submit" className="btn-black">
            Sign up
          </Button>
        </Form>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
            <Modal.Header>
              <Modal.Title>{this.state.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.state.modalMessage}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
      </Fragment>
    )
  }
}
export default RegisterForm