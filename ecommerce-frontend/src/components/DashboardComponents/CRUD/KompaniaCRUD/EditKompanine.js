import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";

export default function EditKompanine(props) {
    const [kompania,setKompania] = useState({}); 
    const [emriKompaniseUpdated,setEmriKompaniseUpdated] = useState("");
    const [warning,setWarning] = useState("");

    useEffect(() => {
        if (props.id) {
          try {
            axios
              .get(`https://localhost:7061/api/Kompania/shfaqKompaninesipasID/${props.id}`)
              .then((response) => {
                setKompania(response.data);
                setEmriKompaniseUpdated(response.data.emri);
              });
          } catch (err) {
            console.log(err);
          }
        }
      }, [props.id]);

      const handleEmri=(value)=>{
        setWarning("");
        setEmriKompaniseUpdated(value)
      }
  
     const anulo=()=>{
  
       setWarning("");
       props.mbyllEditKompanine();
     }

    
    function validoFormen(){
        let validated=true;
        if (!emriKompaniseUpdated || emriKompaniseUpdated.trim() === "") {
            setWarning("Emri i kompanise nuk duhet te jete i zbrazet!");
            validated = false;
        }
        
        return validated
    }

    async function editoKompanine(){
        const isValid = validoFormen();
        console.log("Te dhenat e kompanise te edituara :"+JSON.stringify(kompania));
    
        if(isValid){
            try {
                const response = await axios
                .put(`https://localhost:7061/api/Kompania/perditesoKompanine/${props.id}`,{
                    emri: emriKompaniseUpdated
                })  
                props.refreshTeDhenat();
                props.mbyllEditKompanine();
                toast.success(response.data);
              } catch (err) {
                if (err.response && err.response.status === 400) { // backend validimi
                  setWarning(err.response.data);
                }
                else{
                  toast.error("Ndodhi nje problem ne server");
                  console.log(err);
                }
              }
        }

    }

    return (
    <>
      <Modal 
      show = {true} onHide={props.mbyllEditKompanine}
      centered
      >
        <Modal.Header>
          <Modal.Title className="crudFormLabel">Perditeso Kompanine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                Lloji (Emri) i Kompanise<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                onChange={(e)=> handleEmri(e.target.value)}
                value={emriKompaniseUpdated || ""}
                type="text"
                placeholder="Lloji Kompanise"
                autoFocus
              />
              {
                warning && 
                 <p className={`crudFormWarning ${warning ? 'fade-in' : ''}`}>
                 {warning}
                 </p>
              }
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={anulo} className="crudFormAnuloButoni">
            Anulo <FontAwesomeIcon icon={faXmark} />
          </Button>
          <Button className="crudFormeSubmitButoni" variant="contained"
            onClick={editoKompanine}
          >
            Ruaj  <FontAwesomeIcon icon={faCheckCircle} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
