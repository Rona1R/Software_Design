import React from "react";
import { Modal,Button } from "react-bootstrap";

const ProductImageModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="popUpHeader">
        <Modal.Title id="contained-modal-title-vcenter">
          {props.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={props.img} alt={props.name} style={{width:"100%"}}/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className="productButton">Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ProductImageModal;
