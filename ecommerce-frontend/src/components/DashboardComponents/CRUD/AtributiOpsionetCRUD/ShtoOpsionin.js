import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";
import {Alert} from "react-bootstrap";

export default function ShtoOpsionin(props) {
    const [opsioni,setOpsioni] = useState({
        optionValue: "",
        atributiId: props.atributiId // atributi per te cilin po shtohet ky opsion
    })
    const [emriWarning,setEmriWarning] = useState("");
    const [error,setError] = useState("");


    const anulo=()=>{
      props.mbyllShto();
    }

    const handleChange = (e) => {
        setOpsioni({ ...opsioni, [e.target.name]: e.target.value });
    };
    
    function validoFormen(){
        let validated=true;
        if (!opsioni.optionValue || opsioni.optionValue.trim() === "") {
            setEmriWarning("Emri i opsionit nuk duhet te jete i zbrazet!");
            validated = false;
        }

        return validated;
    }

    async function shtoOpsionin(){ 
        const isValid = validoFormen();
        if(isValid)
        {       
            try {
               const response = await axios
                .post('https://localhost:7061/api/AtributiOption/add-attribute-option',opsioni)           
                  console.log(response);
                  props.refreshTeDhenat();
                  toast.success(response.data);
                  props.mbyllShto();
              } catch (err) {
                if (err.response && err.response.status === 400) { // BACKEND VALIDIMI
                    setError(err.response.data);
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
      show = {true} onHide={props.mbyllShto}
      contentClassName="custom-modal-content"
      >
        <Modal.Header>
          <Modal.Title className="crudFormLabel">
            Shto Opsionin e ri
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3"
             controlId="crudForm.KategoriaEmri"
            >
              <Form.Label>
                Vlera <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                name="optionValue"
                onChange={(e) => {
                    handleChange(e);
                    setEmriWarning("");
                  }} 
                value={opsioni.optionValue}
                type="text"
                placeholder="Vendos vleren e opsionit..."
                autoFocus
              />
              {emriWarning && (
                <p
                  /*style={{color:"red"}}*/ className={`crudFormWarning ${
                emriWarning ? "fade-in" : ""
                  }`}
                >
                  {emriWarning}
                </p>
              )}
            </Form.Group>
          </Form>
          {error && <Alert  style={{ marginTop: '10px' ,backgroundColor:"darkred",fontWeight:"bold"}}>{error}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={anulo} className="crudFormAnuloButoni">
            Anulo <FontAwesomeIcon icon={faXmark} />
          </Button>
          <Button className="crudFormeSubmitButoni" 
           onClick={shtoOpsionin}
           variant="contained"
          >
            Shto <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
