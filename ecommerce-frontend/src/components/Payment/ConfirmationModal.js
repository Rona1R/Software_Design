import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft,faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function ConfirmationModal(props) {
  return (
    <Modal
      show={props.showConfirmationModal}
      onHide={()=>{props.closeConfirmationModal();props.openCheckout()}}
      centered
    >
      <Modal.Header>
        <Modal.Title className="crudFormLabel">Konfirmo Porosinë</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{color:"#000004",fontWeight:"bold",fontSize:"large",margin:"0 auto"}}>
             A jeni të sigurt që dëshironi të vendosni porosinë ?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            props.closeConfirmationModal(); 
            props.openCheckout(); 
          }}
          className="crudFormAnuloButoni"
        >
        <FontAwesomeIcon icon={faArrowLeft}/> Kthehu Mbrapa
        </Button>
        <Button variant="primary" className="crudFormeSubmitButoni" onClick={props.vendosPorosine}>
        <FontAwesomeIcon icon={faCheckCircle}/> Po, Vendos Porosinë
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
