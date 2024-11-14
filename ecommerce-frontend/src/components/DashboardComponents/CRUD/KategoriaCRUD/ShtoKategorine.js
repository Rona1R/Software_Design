import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";

export default function ShtoKategorine(props) {
    const [emriKategorise,setEmriKategorise] = useState("");
    const [pershkrimiKategorise,setPershkrimiKategorise] = useState("");
    const [warning,setWarning] = useState("");


    const anulo=()=>{
      setEmriKategorise("");
      setPershkrimiKategorise("");
      setWarning("");
      props.mbyllShtoKategorine();
    }

    const handleEmri =(value)=>{
        setWarning("");
        setEmriKategorise(value);
    }

    const handlePershkrimi=(value)=>{
        setPershkrimiKategorise(value);
    }
    
    function validoFormen(){
        let validated=true;
        if (!emriKategorise || emriKategorise.trim() === "") {
            setWarning("Emri i kategorise nuk duhet te jete i zbrazet!");
            validated = false;
        }
        return validated
    }
    async function shtoKategorine(){
        const isValid = validoFormen();

        if(isValid){
            try {
               const response = await axios
                .post('https://localhost:7061/api/Kategoria/shtoKategorine',{
                    emri:emriKategorise,
                    pershkrimi:pershkrimiKategorise
                })
                // .then((response) => {
                  //setKategorite(response.data);
                  console.log(response);
                  props.refreshTeDhenat();
                  toast.success("Kategoria eshte shtuar me sukses!");
                  props.mbyllShtoKategorine();
                  // setRefreshKey(Date.now);
                  setEmriKategorise("");
                  setPershkrimiKategorise("");
                // });
              } catch (err) {
                console.log(err);
                if (err.response && err.response.status === 400) {
                  setWarning(err.response.data);
                }else{
                  toast.error("Ndodhi nje problem ne server");
                }
              }
        }

    }

    return (
    <>
      <Modal 
     /* show={props.shfaqFormen}*/ show = {true} onHide={props.mbyllShtoKategorine}
      centered
      >
        <Modal.Header>
          <Modal.Title className="crudFormLabel">
            Shto Kategorine e re
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3"
             controlId="crudForm.KategoriaEmri"
            >
              <Form.Label>
                Lloji (Emri) i Kategorise<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                onChange={(e)=> handleEmri(e.target.value)}
                value={emriKategorise}
                type="text"
                placeholder="Lloji Kategorise"
                autoFocus
              />
              {
              warning && (
                 <p /*style={{color:"red"}}*/  className={`crudFormWarning ${warning ? 'fade-in' : ''}`}>
                 {warning}
                 </p>
                 )
              }
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="crudForm.KategoriaPershkrimi"
            >
              <Form.Label>Pershkrimi Kategorise</Form.Label>
              <Form.Control
                 onChange={(e) => handlePershkrimi(e.target.value)}
                value={pershkrimiKategorise}
                type="text"
                placeholder="Pershkrimi Kategorise"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={anulo} className="crudFormAnuloButoni">
            Anulo <FontAwesomeIcon icon={faXmark} />
          </Button>
          <Button className="crudFormeSubmitButoni" 
          onClick={shtoKategorine}
           variant="contained"
          >
            Shto Kategorine <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
