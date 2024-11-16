import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark,faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";

export default function FshijNenkategorine(props) {

  
    async function fshijNenKategorine(){
        console.log("BRENDA FUNKSIONIT FSHIJ:"+props.id);
        if(props.id){
            console.log("Kategoria per tu fshire "+props.id);
            try {
               const response = await axios
                .delete(`https://localhost:7061/api/NenKategoria/FshijNenKategorine/${props.id}`
                 )
                
                  console.log(response);
                  props.refreshTeDhenat();
                  props.mbyllFshij();
                  toast.success("Nenkategoria eshte fshire me sukses!");
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
                <Modal.Title className="crudFshijLabel">Fshij Nen-kategorine</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5 className="crudFshijTekst">A jeni te sigurt qe deshironi ta fshini kete nen-kategori?
                <p style={{color:"red",fontWeight:"bold"}}> (Nese deshironi te mos fshihen produktet, levizni ne nenkategorine e re para se te vazhdoni!)</p> 
                </h5>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.mbyllFshij()} className="crudFormAnuloButoni">
                    Anulo <FontAwesomeIcon icon={faXmark} />
                </Button>
                <Button
                    className="crudFshijButoni"
                    onClick={fshijNenKategorine}
                >
                    Fshij Nen-kategorine <FontAwesomeIcon icon={faTrash} />
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}
