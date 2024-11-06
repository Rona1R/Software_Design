import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faXmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";

export default function EditoKategorine(props) {
    const [kategorite,setKategorite] = useState([]);
    const [kategoria,setKategoria] = useState({}); 
    const [emriKategoriseUpdated,setEmriKategoriseUpdated] = useState("");
    const [pershkrimiKategoriseUpdated,setPershkrimiKategoriseUpdated] = useState("");
   // const [refreshKey,setRefreshKey] = useState("");
    const [warning,setWarning] = useState("");

    useEffect(()=>{
        try {
            axios
            .get('https://localhost:7061/api/Kategoria/shfaqKategorite')
            .then((response) => {
              setKategorite(response.data);
            });
          } catch (err) {
            console.log(err);
          }
    },[/*props.refreshKey refreshKey*/])

    useEffect(() => {
        console.log("BRENDA FUNKSIONIT "+props.id);
        if (props.id /*&& props.shfaqFormenEdit*/) {
            console.log("Kategoria to edit:"+props.id);
          try {
            axios
              .get(`https://localhost:7061/api/Kategoria/shaqKategorineSipasID/${props.id}`)
              .then((response) => {
                setKategoria(response.data);
                setEmriKategoriseUpdated(response.data.emri);
                setPershkrimiKategoriseUpdated(response.data.pershkrimi);
                // setRefreshKey(Date.now());
                console.log("Kategoria per tu edituar eshte : --------------");
                console.log(response.data);
              });
          } catch (err) {
            console.log(err);
          }
        }
      }, [props.id,/*,props.refreshKeyrefreshKey*/]);

      const handleEmri=(value)=>{
        setWarning("");
        setEmriKategoriseUpdated(value)
      }
      const handlePershkrimi=(value)=>{
        setPershkrimiKategoriseUpdated(value)
      }

    
     const anulo=()=>{
    //    setEmriKategoriseUpdated(kategoria.emri);
    //    setPershkrimiKategoriseUpdated(kategoria.pershkrimi);
       setWarning("");
       props.mbyllEditKategorine();
     }

    
    function validoFormen(){
        let validated=true;
        if (!emriKategoriseUpdated || emriKategoriseUpdated.trim() === "") {
            setWarning("Emri i kategorise nuk duhet te jete i zbrazet!");
            validated = false;
        }

        if(kategorite.filter((k)=>k.emri.toLowerCase() === emriKategoriseUpdated.toLowerCase() && k.id !== kategoria.id).length>0){
            setWarning("Ekziszon nje kategori me emrin e njejte.Zgjedh nje emer tjeter!")
            validated = false;
        }
        return validated
    }

    async function editoKategorine(){
        const isValid = validoFormen();
        console.log("Te dhenat e kategorise te edituara :"+JSON.stringify(kategoria));
    
        if(isValid){
            try {
               const response = await axios
                .put(`https://localhost:7061/api/Kategoria/perditesoKategorine/${props.id}`,{
                    emri: emriKategoriseUpdated,
                    pershkrimi: pershkrimiKategoriseUpdated
                })
                // .then((response) => {
                  //setKategorite(response.data);
                  console.log(response);
                  props.refreshTeDhenat();
                  props.mbyllEditKategorine();
                  toast.success("Kategoria eshte updatuar me sukses!");
                  //setRefreshKey(Date.now());
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
      <Modal 
     /* show={props.shfaqFormenEdit}*/ show = {true} onHide={props.mbyllEditKategorine}
      centered
      >
        <Modal.Header>
          <Modal.Title className="crudFormLabel">Perditeso Kategorine</Modal.Title>
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
                value={emriKategoriseUpdated || ""}
                type="text"
                placeholder="Lloji Kategoris"
                autoFocus
              />
              {
                warning && 
                 <p /*style={{color:"red"}}*/className={`crudFormWarning ${warning ? 'fade-in' : ''}`}>
                 {warning}
                 </p>
              }
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="crudForm.KategoriaPershkrimi"
            >
              <Form.Label>Pershkrimi Kategorise</Form.Label>
              <Form.Control
                onChange={(e) => handlePershkrimi(e.target.value)}
                value={pershkrimiKategoriseUpdated || ""}
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
          <Button className="crudFormeSubmitButoni" variant="contained"
            onClick={editoKategorine}
          >
            Ruaj  <FontAwesomeIcon icon={faCheckCircle} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
