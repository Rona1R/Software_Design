import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark,faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";

export default function DeleteReview(props) {

    async function fshijReview(){
        if(props.id){
            try {
                await axios
                  .delete(`https://localhost:7061/api/Review/fshijReview/${props.id}`)
                  props.refreshTeDhenat();
                  props.mbyllFshij();
                  props.showDeletedNotification();
              } catch (error) {
                toast.error("Ndodhi nje problem ne server");
                console.log(error);
              }
         }
    }

    return (
    <>
        <Modal show={props.shfaqFshij} onHide={() => props.mbyllFshij()}>
            <Modal.Header closeButton>
                <Modal.Title className="crudFshijLabel">Fshij Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5 className="crudFshijTekst">
                    A jeni te sigurt qe deshironi ta fshini kete review?
                </h5>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.mbyllFshij()} className="crudFormAnuloButoni">
                    Anulo <FontAwesomeIcon icon={faXmark} />
                </Button>
                <Button
                    className="crudFshijButoni"
                    onClick={fshijReview}
                >
                    Fshij <FontAwesomeIcon icon={faTrash} />
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}
