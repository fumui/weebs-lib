import React,{Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Form, Button, Modal, Spinner} from 'react-bootstrap';

import {register} from '../Publics/Actions/users';

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
  }

  handleClose = ()=>{
    this.setState({showModal: false})
  }

  handleChange = (event) => {
    let newFormData = {...this.state.formData}
    const target = event.target
    const name = target.name
    const value = target.value
    newFormData[name] = value
    this.setState({
      formData: newFormData
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch(register(this.state.formData))
      .then(res=>{
        this.setState({
          showModal:true,
          modalTitle:"Success",
          modalMessage: res.action.payload.data.message,
        })
      })
      .catch(()=>{
        this.setState({
          showModal:true,
          modalTitle:"Failed",
          modalMessage: this.props.user.errMessage,
        })
      })
    
  }
  render(){
    return(
      <Fragment>
        <Form style={this.state.style} onSubmit={this.handleSubmit}> 
          <div className="app-form-group card ">
            <Form.Group controlId="formBasicUsername" className="card-body" style={{textAlign:"left"}}>
              <Form.Label>Username</Form.Label>
              <Form.Text className="text-muted">
                min 6 and max 30 characters of (a-Z,0-9) 
              </Form.Text>
              <Form.Control name="username" onChange={this.handleChange} type="text" placeholder="Enter username" style={{border:"none"}} className="app-form-control"/>
            </Form.Group>
          </div>
          <div className="app-form-group card ">
            <Form.Group controlId="formBasicName" className="card-body" style={{textAlign:"left"}}>
              <Form.Label>Full Name</Form.Label>
              <Form.Control name="fullname" onChange={this.handleChange} type="text" placeholder="Full Name" className="app-form-control"/>
            </Form.Group>
          </div><div className="app-form-group card ">
            <Form.Group controlId="formBasicEmail" className="card-body" style={{textAlign:"left"}}>
              <Form.Label>Email address</Form.Label>
              <Form.Control name="email" onChange={this.handleChange} type="email" placeholder="Enter email" style={{border:"none"}} className="app-form-control"/>
            </Form.Group>
          </div>
          <div className="app-form-group card ">
            <Form.Group controlId="formBasicPassword" className="card-body" style={{textAlign:"left"}}>
              <Form.Label>Password</Form.Label>
              <Form.Text className="text-muted">
                min 8 and max 30 characters of (a-Z,0-9) 
              </Form.Text>
              <Form.Control name="password" onChange={this.handleChange} type="password" placeholder="Password" className="app-form-control"/>
            </Form.Group>
          </div>
          <Link to="./login" className="btn btn-light" >Log in</Link>
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
              Register
            </Button>
          }
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
const mapStateToProps = state => {
  return{
    user: state.user
  }
}
export default connect(mapStateToProps)(RegisterForm)