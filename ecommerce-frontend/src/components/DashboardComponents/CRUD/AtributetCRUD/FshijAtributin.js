import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark,faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";

export default function FshijAtributin(props) {

    async function fshijAtributin(){
        if(props.id){
            try {
               const response = await axios
                .delete(`https://localhost:7061/api/Atributi/delete-attribute/${props.id}`
                 )
                  props.refreshTeDhenat();
                  props.mbyllFshij();
                  toast.success(response.data);
              } catch (err) {
                toast.error("Ndodhi nje problem ne server");
                console.log(err);
              }
         }
    }

    return (
    <>
        <Modal show={true} onHide={() => props.mbyllFshij()}>
            <Modal.Header closeButton>
                <Modal.Title className="crudFshijLabel">Fshij Atributin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5 className="crudFshijTekst">
                    A jeni te sigurt qe deshironi ta fshini kete atribut?
                </h5>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.mbyllFshij()} className="crudFormAnuloButoni">
                    Anulo <FontAwesomeIcon icon={faXmark} />
                </Button>
                <Button
                    className="crudFshijButoni"
                    onClick={fshijAtributin}
                >
                    Fshij <FontAwesomeIcon icon={faTrash} />
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}
