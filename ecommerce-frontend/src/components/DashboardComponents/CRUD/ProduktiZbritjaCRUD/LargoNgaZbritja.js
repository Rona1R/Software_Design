import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark,faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";

export default function LargoNgaZbritja(props) {

  
    async function largoNgaZbritja(){
        if(props.id){
            try {
               await axios
                .put(`https://localhost:7061/api/ProduktiZbritja/largoProduktinNgaZbritja/${props.id}`
                 )
                // .then(() => {
                  props.refreshTeDhenat();
                  props.mbyllFshij();
                  toast.success("Produkti u largua nga Zbritja me sukses!");
                // });
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
                <Modal.Title className="crudFshijLabel">Largo nga zbritja</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5 className="crudFshijTekst">A jeni te sigurt qe deshironi ta largoni kete produkt nga Zbritja?</h5>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.mbyllFshij()} className="crudFormAnuloButoni">
                    Anulo <FontAwesomeIcon icon={faXmark} />
                </Button>
                <Button
                    className="crudFshijButoni"
                    onClick={largoNgaZbritja}
                >
                    Largo nga zbritja <FontAwesomeIcon icon={faTrash} />
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}
