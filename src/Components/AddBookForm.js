import React from 'react';
import {Row, Col, Form, Button} from 'react-bootstrap';
import Axios from 'axios';

class AddBookForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      genreList:[],
      formData:{
        title: '',
        description:'',
        image:'',
        date_released:'',
        genre_id:'',
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    console.log(this.state.formData)
  }

  handleSubmit(event){

    Axios.post('http://localhost:3030/books/',this.state.formData,{
      headers:{
        Authorization : document.cookie.split("=")[1],
      }
    })
      .then(res => console.log(res))
      .catch(err => console.log(err))
    event.preventDefault();
  }

  componentDidMount = () => {
    Axios.get ('http://localhost:3030/genres')
      .then (res => {
        this.setState ({genreList: res.data.data});
      })
      .catch (err => console.log ('error =', err));
  };
  render(){
    const {genreList} = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group as={Row} controlId="formPlaintextTitle">
          <Form.Label column sm="2">
            Title
          </Form.Label>
          <Col sm="10">
            <Form.Control onChange={this.handleChange} type="text" name="title" placeholder="Title..." />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPlaintextDescription">
          <Form.Label column sm="2">
          Description
          </Form.Label>
          <Col sm="10">
            <Form.Control onChange={this.handleChange} type="text" name="description" placeholder="Description..." />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPlaintextImageURL">
          <Form.Label column sm="2">
          Image URL
          </Form.Label>
          <Col sm="10">
            <Form.Control onChange={this.handleChange} type="text" name="image" placeholder="Image URL..." />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPlaintextDateReleased">
          <Form.Label column sm="2">
          Date Released
          </Form.Label>
          <Col sm="10">
            <Form.Control onChange={this.handleChange} name="date_released" type="date" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPlaintextGenre">
          <Form.Label column sm="2">Genre</Form.Label>
          <Col sm="10">
            <Form.Control onChange={this.handleChange} as="select" name="genre_id">
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
    );
  }
}
export default AddBookForm