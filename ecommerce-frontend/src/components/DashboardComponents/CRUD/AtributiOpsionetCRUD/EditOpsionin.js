import { useState,useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle,faXmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";
import {Alert} from "react-bootstrap";

export default function EditOpsionin(props) {
    const [opsioni,setOpsioni] = useState({
        optionValue: "",
        atributiId: null // atributi per te cilin po shtohet ky opsion
    })
    const [emriWarning,setEmriWarning] = useState("");
    const [error,setError] = useState("");


    const anulo=()=>{
      props.mbyllEdit();
    }

    const handleChange = (e) => {
        setOpsioni({ ...opsioni, [e.target.name]: e.target.value });
    };
    
    useEffect(()=>{
        const fetchData = async ()=>{
            const response = await axios.get(`https://localhost:7061/api/AtributiOption/get-attribute-option/${props.id}`);
            setOpsioni(response.data);
        }
        
        fetchData();
    },[props.id])

    function validoFormen(){
        let validated=true;
        if (!opsioni.optionValue || opsioni.optionValue.trim() === "") {
            setEmriWarning("Emri i opsionit nuk duhet te jete i zbrazet!");
            validated = false;
        }

        return validated;
    }

    async function editOpsionin(){ 
        const isValid = validoFormen();
        if(isValid)
        {       
            try {
               const response = await axios
                .put(`https://localhost:7061/api/AtributiOption/edit-attribute-option/${props.id}`,opsioni)           
                  console.log(response);
                  props.refreshTeDhenat();
                  toast.success(response.data);
                  props.mbyllEdit();
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
      show = {true} onHide={props.mbyllEdit}
      contentClassName="custom-modal-content"
      >
        <Modal.Header>
          <Modal.Title className="crudFormLabel">
           Perditeso Opsionin
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
           onClick={editOpsionin}
           variant="contained"
          >
            Ruaj <FontAwesomeIcon icon={faCheckCircle} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
