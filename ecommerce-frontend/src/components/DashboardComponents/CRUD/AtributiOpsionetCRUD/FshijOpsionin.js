import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark,faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";

export default function FshijOpsionin(props) {

    async function fshijOpsionin(){
        if(props.id){
            try {
               const response = await axios
                .delete(`https://localhost:7061/api/AtributiOption/remove-option/${props.id}`
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
        <Modal show={true} onHide={() => props.mbyllFshij()}  contentClassName="custom-modal-content">
            <Modal.Header closeButton>
                <Modal.Title className="crudFshijLabel">Fshij Opsionin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5 className="crudFshijTekst">
                    A jeni te sigurt qe deshironi ta kete opsion nga ky atribut?
                </h5>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.mbyllFshij()} className="crudFormAnuloButoni">
                    Anulo <FontAwesomeIcon icon={faXmark} />
                </Button>
                <Button
                    className="crudFshijButoni"
                    onClick={fshijOpsionin}
                >
                    Fshij <FontAwesomeIcon icon={faTrash} />
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}
