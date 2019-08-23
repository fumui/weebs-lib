import React from 'react'
import {Modal, Button} from 'react-bootstrap'

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
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.content}
      </Modal.Body>
    </Modal>
  );
}

function BookModal(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div>
      <Button variant={props.variant || "light"} size="lg" onClick={() => setModalShow(true)}>
        {props.title}
      </Button>

      <ModalLayer
        show={modalShow}
        onHide={() => setModalShow(false)}
        title={props.title}
        content={props.content}
      />
    </div>
  );
}
export default BookModal