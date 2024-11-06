import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";

export default function ShtoKompanine(props) {
    const [kompanite,setKompanite] = useState([]);
    const [emriKompanise,setEmriKompanise] = useState("");
    //const [refreshKey,setRefreshKey] = useState("");
    const [warning,setWarning] = useState("");

    useEffect(()=>{
        try {
            axios
            .get('https://localhost:7061/api/Kompania/shfaqKompanine')
            .then((response) => {
              setKompanite(response.data);
            });
          } catch (err) {
            console.log(err);
          }
    },[/*props.refreshKey*/])

    const anulo=()=>{
      setEmriKompanise("");
      setWarning("");
      props.mbyllShtoKompanine();
    }
/*
    const handleEmri =(value)=>{
        setWarning("");
        setEmriKompanise(value);
    }*/
        const handleEmri = (value) => {
            setWarning("");
            setEmriKompanise(value);
        }

    function validoFormen(){
        let validated=true;
        if (!emriKompanise || emriKompanise.trim() === "") {
            setWarning("Emri i kompanise nuk duhet te jete i zbrazet!");
            validated = false;
        }

       /* if(kompanite.filter((k)=> k.emri.toLowerCase() === emriKompanise.toLowerCase()).length>0){
            setWarning("Ekziszon nje kompani me emrin e njejte.Zgjedh nje emer tjeter!")
            validated = false;
        }*/
            if (kompanite.some((k) => k.emri && k.emri.toLowerCase() === emriKompanise.toLowerCase())) {
                setWarning("Ekziszon nje kompani me emrin e njejte.Zgjedh nje emer tjeter!");
                validated = false;
            }
        return validated
    }
    async function shtoKompanine(){
        const isValid = validoFormen();

        if(isValid){
            try {
               const response = await axios
                .post('https://localhost:7061/api/Kompania/shtoKompanine',{
                    emri:emriKompanise,
                })
                // .then((response) => {
                  //setKompanine(response.data);
                  console.log(response);
                  props.refreshTeDhenat();
                  toast.success("Kompania eshte shtuar me sukses!");
                  props.mbyllShtoKompanine();
                  // setRefreshKey(Date.now);
                  setEmriKompanise("");
                // });
              } catch (err) {
                toast.error("Ndodhi nje problem ne server");
                console.log(err);
              }
        }

    }

    return (
    <>
      <Modal 
     /* show={props.shfaqFormen}*/ show = {true} onHide={props.mbyllShtoKompanine}
      centered
      >
        <Modal.Header>
          <Modal.Title className="crudFormLabel">
            Shto Kompanine e re
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                Lloji (Emri) i Kompanise<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                onChange={(e)=> handleEmri(e.target.value)}
                value={emriKompanise}
                type="text"
                placeholder="Lloji Kompanise"
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={anulo} className="crudFormAnuloButoni">
            Anulo <FontAwesomeIcon icon={faXmark} />
          </Button>
          <Button className="crudFormeSubmitButoni" 
          onClick={shtoKompanine}
           variant="contained"
          >
            Shto Kompanine <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
