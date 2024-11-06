import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";

export default function EditKompanine(props) {
    const [kompanite,setKompanite] = useState([]);
    const [kompania,setKompania] = useState({}); 
    const [emriKompaniseUpdated,setEmriKompaniseUpdated] = useState("");
   // const [refreshKey,setRefreshKey] = useState("");
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
    },[/*props.refreshKey refreshKey*/])

    useEffect(() => {
        console.log("BRENDA FUNKSIONIT "+props.id);
        if (props.id /*&& props.shfaqFormenEdit*/) {
            console.log("Kompania to edit:"+props.id);
          try {
            axios
              .get(`https://localhost:7061/api/Kompania/shfaqKompaninesipasID/${props.id}`)
              .then((response) => {
                setKompania(response.data);
                setEmriKompaniseUpdated(response.data.emri);
                // setRefreshKey(Date.now());
                console.log("Kompania per tu edituar eshte : --------------");
                console.log(response.data);
              });
          } catch (err) {
            console.log(err);
          }
        }
      }, [props.id,/*,props.refreshKeyrefreshKey*/]);

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

        if(kompanite.filter((k)=>k.emri.toLowerCase() === emriKompaniseUpdated.toLowerCase() && k.id !== kompania.id).length>0){
            setWarning("Ekziszon nje kompani me emrin e njejte.Zgjedh nje emer tjeter!")
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
                // .then((response) => {
             
                  console.log(response);
                  props.refreshTeDhenat();
                  props.mbyllEditKompanine();
                  toast.success("Kompania eshte updatuar me sukses!");
                 
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
     /* show={props.shfaqFormenEdit}*/ show = {true} onHide={props.mbyllEditKompanine}
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
                 <p /*style={{color:"red"}}*/className={`crudFormWarning ${warning ? 'fade-in' : ''}`}>
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
