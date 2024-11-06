import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark,faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";

export default function FshijKategorine(props) {

  
    async function fshijKategorine(){
        console.log("BRENDA FUNKSIONIT FSHIJ:"+props.id);
        if(props.id){
            console.log("Kategoria per tu fshire "+props.id);
            try {
                const response = await axios
                .delete(`https://localhost:7061/api/Kategoria/FshijKategorine/${props.id}`
                 )
                // .then((response) => {
                  console.log(response);
                  props.refreshTeDhenat();
                  props.mbyllFshij();
                  toast.success("Kategoria eshte fshire me sukses!");
                //   setEmriKategorise("");
                //   setPershkrimiKategorise("");
                // });
              } catch (err) {
                toast.error("Ndodhi nje problem ne server");
                console.log(err);
              }
         }
    }

    return (
    <>
        <Modal show={props.shfaqFshij} onHide={() => props.mbyllFshij()}>
            <Modal.Header closeButton>
                <Modal.Title className="crudFshijLabel">Fshij Kategorine</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5 className="crudFshijTekst">A jeni te sigurt qe deshironi ta fshini kete kategori?
                  <p  style={{color:"red",fontWeight:"bold"}}>
                  (Nese deshironi te mos fshihen produktet, levizni ne kategorine e re para se te vazhdoni!)  
                  </p> 
                </h5>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.mbyllFshij()} className="crudFormAnuloButoni">
                    Anulo <FontAwesomeIcon icon={faXmark} />
                </Button>
                <Button
                    className="crudFshijButoni"
                    onClick={fshijKategorine}
                >
                    Fshij Kategorine <FontAwesomeIcon icon={faTrash} />
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}
