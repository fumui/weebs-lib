import React,{Fragment} from 'react';
import {Row, Col, Form, Button, Modal} from 'react-bootstrap';
import {connect} from 'react-redux';

import {addBook} from '../Publics/Actions/books';
import {getGenres} from '../Publics/Actions/genres';

class AddBookForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      genreList:[],
      formData:{
        title: '',
        description:'',
        date_released:new Date().toISOString().split('T')[0],
        genre_id:1,
      },
      image:{},
      showModal:false,
      modalTitle:"",
      modalMessage:"",
      history:props.history,
    }
  }

  handleClose = () => {
    this.setState({showModal: false})
    this.props.closeModal()
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
    console.log(this.state.formData)
  }

  handleFile = (e) => {
    const files = Array.from(e.target.files)
    this.setState({image:files[0]})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let availability = this.props.user.userProfile.level === 'admin'? 1 : 2;
    let formData = new FormData() 
    formData.append('title', this.state.formData.title)
    formData.append('description', this.state.formData.description)
    formData.append('date_released', this.state.formData.date_released)
    formData.append('genre_id', this.state.formData.genre_id)
    formData.append('image', this.state.image)
    formData.append('availability', availability)
    
    this.props.dispatch(addBook(formData))
      .then(()=>{
        this.setState({
          showModal: true,
          modalTitle:"Success",
          modalMessage:"Success Adding Book",
        })
      })
      .catch(() => {
        this.setState({
          showModal:true,
          modalTitle:"Failed",
          modalMessage:this.props.book.errMessage
        })
      })
  }

  componentDidMount = async () => {
    await this.props.dispatch(getGenres())
    this.setState ({genreList: this.props.genre.genresList})
  };
  render(){
    const today = new Date()
    const {genreList} = this.state
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit} encType = "multipart/form-data">
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="2">
              Title
            </Form.Label>
            <Col sm="10">
              <Form.Control onChange={this.handleChange} type="text" name="title" placeholder="Title..." required/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextDescription">
            <Form.Label column sm="2">
            Description
            </Form.Label>
            <Col sm="10">
              <Form.Control onChange={this.handleChange} type="text" name="description" placeholder="Description..." required/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextImageURL">
            <Form.Label column sm="2">
            Image
            </Form.Label>
            <Col sm="10">
              <Form.Control onChange={this.handleFile} type="file" name="image" placeholder="Image URL..." required/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextDateReleased">
            <Form.Label column sm="2">
            Date Released
            </Form.Label>
            <Col sm="10">
              <Form.Control onChange={this.handleChange} defaultValue={today.toISOString().split('T')[0]} required name="date_released" type="date" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextGenre">
            <Form.Label column sm="2">Genre</Form.Label>
            <Col sm="10">
              <Form.Control onChange={this.handleChange} as="select" name="genre_id" required>
                <option>Select Genre</option>
                {genreList.length !== 0 ? genreList.map((genre) => {
                  return <option value={genre.id} key={genre.id}> {genre.name} </option>
                })
                :<option>Loading...</option>
              }
              </Form.Control>
            </Col>
          </Form.Group>

          <Button style={{float:"right"}} variant="warning" type="submit" className="btn-black">
            Save
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
    );
  }
}
const mapStateToProps = state => {
  return{
    book: state.book,
    genre: state.genre,
    user: state.user
  }
}
export default connect(mapStateToProps)(AddBookForm)