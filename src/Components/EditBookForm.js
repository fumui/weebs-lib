import React, {Fragment} from 'react';
import {Modal, Row, Col, Form, Button} from 'react-bootstrap';
import {connect} from 'react-redux'
import {editBook} from '../Publics/Actions/books';
import {getGenres} from '../Publics/Actions/genres';

class EditBookForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      genreList:[],
      idBook: props.idBook,
      formData:{
        image: props.image,
        title: props.title,
        genre_id: props.genre_id,
        description: props.description,
        date_released: props.date_released,
      },
      showModal:false,
      modalTitle:"",
      modalMessage:"",
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleClose = ()=>{
    this.setState({showModal: false})
  }


  handleChange= (event) => {
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

  handleSubmit = async (event)=>{
    event.preventDefault();
    await this.props.dispatch(editBook(this.state.idBook,this.state.formData))
    
    this.setState({
      showModal:true,
      modalTitle:"Success",
      modalMessage:"Success edit book",
    })
  }

  componentDidMount = async () => {
    await this.props.dispatch(getGenres())
    this.setState ({genreList: this.props.genre.genresList})
  };
  render(){
    const {genreList} = this.state
    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row} controlId="formPlaintextTitle">
            <Form.Label column sm="2">
              Title
            </Form.Label>
            <Col sm="10">
              <Form.Control value={this.state.formData.title} onChange={this.handleChange} type="text" name="title" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextDescription">
            <Form.Label column sm="2">
            Description
            </Form.Label>
            <Col sm="10">
              <Form.Control value={this.state.formData.description} onChange={this.handleChange} type="text" name="description" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextImageURL">
            <Form.Label column sm="2">
            Image URL
            </Form.Label>
            <Col sm="10">
              <Form.Control value={this.state.formData.image} onChange={this.handleChange} type="text" name="image"  />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextDateReleased">
            <Form.Label column sm="2">
            Date Released
            </Form.Label>
            <Col sm="10">
              <Form.Control value={this.state.formData.date_released} onChange={this.handleChange} name="date_released" type="date" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextGenre">
            <Form.Label column sm="2">Genre</Form.Label>
            <Col sm="10">
              <Form.Control onChange={this.handleChange} as="select" name="genre_id">
                {genreList.length !== 0 ? genreList.map((genre) => {
                  const selected = this.state.genre_id === genre.id 
                  return <option selected={selected} value={genre.id} key={genre.id}> {genre.name} </option>
                })
                :<option>Loading...</option>
              }
              </Form.Control>
            </Col>
          </Form.Group>

          <Button  style={{float:"right"}} variant="warning" type="submit" className="btn-black">
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
const mapStateToProps = (state) => {
  return{
    book: state.book,
    genre: state.genre
  }
}
export default connect(mapStateToProps)(EditBookForm)