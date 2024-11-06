import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark,faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";

export default function FshijKompanine(props) {

  
    async function fshijKompanine(){
        console.log("BRENDA FUNKSIONIT FSHIJ:"+props.id);
        if(props.id){
            console.log("Kompania per tu fshire "+props.id);
            try {
               const response = await axios
                .delete(`https://localhost:7061/api/Kompania/FshijKompanine/${props.id}`
                 )
                // .then((response) => {
                  console.log(response);
                  props.refreshTeDhenat();
                  props.mbyllFshij();
                  toast.success("Kompania eshte fshire me sukses!");
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
                <Modal.Title className="crudFshijLabel">Fshij Kompanine</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5 className="crudFshijTekst">A jeni te sigurt qe deshironi ta fshini kete kompani?
                <p style={{color:"red",fontWeight:"bold"}}>(Nese deshironi te mos fshihen produktet, levizni ne kompanine e re para se te vazhdoni!)</p>
                </h5>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => props.mbyllFshij()} className="crudFormAnuloButoni">
                    Anulo <FontAwesomeIcon icon={faXmark} />
                </Button>
                <Button
                    className="crudFshijButoni"
                    onClick={fshijKompanine}
                >
                    Fshij Kompanine<FontAwesomeIcon icon={faTrash} />
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}
