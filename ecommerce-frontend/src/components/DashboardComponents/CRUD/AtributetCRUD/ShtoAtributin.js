import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from "react-toastify";
import { Menu, MenuItem } from "@mui/material";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import {Alert} from "react-bootstrap";

export default function ShtoAtributin(props) {
    const [atributi,setAtributi] = useState({
        name: "",
        dataType: ""
    })
    const [emriWarning,setEmriWarning] = useState("");
    const [typeWarning,setTypeWarning] = useState("");
    const [error,setError] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const datatypes = ["text","number","option-list"];


    const anulo=()=>{
      props.mbyllShto();
    }

    const handleChange = (e) => {
        setAtributi({ ...atributi, [e.target.name]: e.target.value });
    };
    
    const handleOpsioni = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleMenuItemClick = (type)=>{
        setTypeWarning("");
        setAtributi({ ...atributi, dataType : type });
        setAnchorEl(null);
    }

    function validoFormen(){
        let validated=true;
        if (!atributi.name || atributi.name.trim() === "") {
            setEmriWarning("Emri i atributit nuk duhet te jete i zbrazet!");
            validated = false;
        }

        if (!atributi.dataType || atributi.dataType.trim() === "") {
            setTypeWarning("Lloji i inputit qe pritet per kete atribut duhet zgjedhur patjeter!");
            validated = false;
        }

        return validated;
    }

    async function shtoAtributin(){ 
        const isValid = validoFormen();
        if(isValid)
        {       
            try {
               const response = await axios
                .post('https://localhost:7061/api/Atributi/create-attribute',atributi)           
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
      centered
      >
        <Modal.Header>
          <Modal.Title className="crudFormLabel">
            Shto Atributin e ri
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3"
             controlId="crudForm.KategoriaEmri"
            >
              <Form.Label>
                Emri <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                name="name"
                onChange={(e) => {
                    handleChange(e);
                    setEmriWarning("");
                  }} 
                value={atributi.name}
                type="text"
                placeholder="Vendos emrin e atributit..."
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
            <Form.Group
              className="mb-3"
              controlId="crudForm.NenkategoriaPershkrimi"
            >
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleOpsioni}
                variant="contained"
                className="crudDropdownButton"
              >
                {atributi.dataType? atributi.dataType : "Zgjedh Llojin e inputit"} <FontAwesomeIcon icon={faCaretDown}/>
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
                    datatypes.map((type,index)=>(
                        <MenuItem className="crudDropdownListItem" key={index} /*onClick={() => handleMenuItemClick(k.id,k.emri)}*/
                        onClick={() => handleMenuItemClick(type)}
                        >{type}
                        </MenuItem>
                    ))
                }
              </Menu>
              <p style={{
                fontSize: '1em',
                marginTop:"5px",
                color: '#333',
                backgroundColor: '#f9f9f9',
                padding: '5px',
                borderLeft: '5px solid #ff5722',
                borderRadius: '5px',
                lineHeight: '1.5',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
             }}>
                Nese zgjedhni option-list , do keni mundesi qe ti shtoni opsionet ne menyre dinamike tek tabela 'Opsionet'
              </p>
              {typeWarning && (
                <p
                className={`crudFormWarning ${
                typeWarning ? "fade-in" : ""
                  }`}
                >
                  {typeWarning}
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
           onClick={shtoAtributin}
           variant="contained"
          >
            Shto <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
