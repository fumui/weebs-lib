import React from 'react'
import {Modal, Button} from 'react-bootstrap'
import AddBookForm from './AddBookForm';

function ModalLayer(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Book
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddBookForm />
      </Modal.Body>
    </Modal>
  );
}

function AddBookModal() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div>
      <Button variant="light" size="lg" onClick={() => setModalShow(true)}>
        Add Book
      </Button>

      <ModalLayer
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}
export default AddBookModal