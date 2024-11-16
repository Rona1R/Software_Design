import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faXmark ,faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Menu, MenuItem } from "@mui/material";

export default function EditNenkategorine(props) {
  const [nenkategoria, setNenkategoria] = useState({
    emri : "",
    kategoriaID : null
  });
  const [kategorite,setKategorite] = useState([]);
  const [selectedKategoria,setSelectedKategoria] = useState({
    id: null,
    emri:""
  });
  const [warning, setWarning] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  
  useEffect(
    () => {
      try {
        axios
          .get("https://localhost:7061/api/Kategoria/shfaqKategorite")
          .then((response) => {
            setKategorite(response.data);
          });
      } catch (err) {
        console.log(err);
      }
    },
    []
  );

  useEffect(

    ()=>{

      const fetchData = async ()=>{
        const response  = await  axios.get(`https://localhost:7061/api/NenKategoria/shfaqNenKategorine/${props.id}`);
        setNenkategoria({emri:response.data.emri, kategoriaID : response.data.kategoriaID});
        setSelectedKategoria({ id : response.data.kategoriaID,emri : response.data.kategoria});
      }

      fetchData();
    },[props.id]);
  const anulo = () => {
    setWarning("");
    props.mbyllEditNenKategorine();
  };

  const handleChange =(e)=> {
    setNenkategoria({...nenkategoria,[e.target.name]:e.target.value});
  }

  const handleKategoria = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (id,emri)=>{
    setSelectedKategoria({
      id : id,
      emri:emri
    });

    setNenkategoria({...nenkategoria,kategoriaID:id});
    setAnchorEl(null);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  function validoFormen(){
      let validated=true;
      if (!nenkategoria.emri || nenkategoria.emri.trim() === "") {
          setWarning("Emri i nen-kategorise nuk duhet te jete i zbrazet!");
          validated = false;
      }     
      return validated
  }
  async function editoNenkategorine(){
      const isValid = validoFormen();

      if(isValid){

          try {
              const response = await axios
              .put(`https://localhost:7061/api/NenKategoria/perditesoNenKategorine/${props.id}`,nenkategoria);
              
                //setKategorite(response.data);
                console.log(response);
                props.refreshTeDhenat();
                toast.success(response.data);
                props.mbyllEditNenKategorine();

            } catch (err) {
               if (err.response && err.response.status === 400) { // validimi per emer te njejte
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
        show={true}
        onHide={props.mbyllEditNenKategorine}
        centered
      >
        <Modal.Header>
          <Modal.Title className="crudFormLabel">
            Perditeso Nen-kategorine
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                Lloji (Emri) i Nen-kategorise
                <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                onChange={(e)=>{
                  setWarning("");
                  handleChange(e);
                }}
                name ="emri"
                value={nenkategoria.emri}
                type="text"
                placeholder="Lloji i nenkategorise"
                autoFocus
              />
              {warning && (
                <p className={`crudFormWarning ${warning ? 'fade-in' : ''}`}>
                  {warning}
                </p>
              )}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleKategoria}
                variant="contained"
                className="crudDropdownButton"
              >
                {selectedKategoria.emri ? selectedKategoria.emri : "Perzgjedh kategorine: "} <FontAwesomeIcon icon={faCaretDown}/>
              </Button>
              <span style={{ color: "red" ,paddingLeft:'2px'}}>*</span>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className="crudDropdownList"
              >
                {
                    kategorite.map((k)=>(
                        <MenuItem className="crudDropdownListItem" key={k.id} /*onClick={() => handleMenuItemClick(k.id,k.emri)}*/
                        onClick={() => handleMenuItemClick(k.id,k.emri)}
                        >{k.emri}
                        </MenuItem>
                    ))
                }
              </Menu>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={anulo}
            className="crudFormAnuloButoni"
          >
            Anulo <FontAwesomeIcon icon={faXmark} />
          </Button>
          <Button className="crudFormeSubmitButoni" variant="contained"
            onClick={editoNenkategorine}
          >
            Ruaj  <FontAwesomeIcon icon={faCheckCircle} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
