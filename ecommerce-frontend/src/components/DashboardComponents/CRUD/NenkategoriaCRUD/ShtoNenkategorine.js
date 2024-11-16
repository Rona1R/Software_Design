import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark ,faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { Menu, MenuItem } from "@mui/material";

export default function ShtoNenkategorine(props) {
  const [kategorite,setKategorite] = useState([]);
  const [emriNenkategorise, setEmriNenKategorise] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedKategoria,setSelectedKategoria] = useState(null);
  const [warning, setWarning] = useState("");
  const [kategoriaWarning,setKategoriaWarning] = useState("");


  useEffect(
    () => {
      try {
        axios
          .get("https://localhost:7061/api/Kategoria/shfaqKategorite") // per dropdown
          .then((response) => {
            setKategorite(response.data);
          });
      } catch (err) {
        console.log(err);
      }
    },
    []
  );
  const anulo = () => {
    setEmriNenKategorise("");
    setKategoriaWarning("");
    setSelectedKategoria(null);
    setWarning("");
    props.mbyllShtoNenKategorine();
  };

  const handleEmri = (value) => {
    setWarning("");
    setEmriNenKategorise(value);
  };

  const handleKategoria = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (kategoria)=>{
    setKategoriaWarning("");
    setSelectedKategoria(kategoria);
    setAnchorEl(null);
  }
  
  const handleClose = () => {
    setAnchorEl(null);
  }

  function validoFormen(){
      let validated=true;
      if (!emriNenkategorise || emriNenkategorise.trim() === "") {
          setWarning("Emri i nen-kategorise nuk duhet te jete i zbrazet!");
          validated = false;
      }

      if(!selectedKategoria){
        setKategoriaWarning("Duhet te zgjidhni nje kategori patjeter!");
        validated = false;
      }

      return validated
  }
  async function shtoNenKategorine(){
      const isValid = validoFormen();

      if(isValid){
          try {
              const response = await axios
              .post('https://localhost:7061/api/NenKategoria/shtoNenKategorine',{
                    emri : emriNenkategorise,
                    kategoriaID : selectedKategoria.id
              })

              props.refreshTeDhenat();
              toast.success(response.data);
              props.mbyllShtoNenKategorine();
            } catch (err) {
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
        /* show={props.shfaqFormen}*/ show={true}
        onHide={props.mbyllShtoNenKategorine}
        centered
      >
        <Modal.Header>
          <Modal.Title className="crudFormLabel">
            Shto Nen-kategorine e re
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3"
            controlId="crudForm.NenkategoriaEmri"
            >
              <Form.Label>
                Lloji (Emri) i Nen-kategorise
                <span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                onChange={(e) => handleEmri(e.target.value)}
                value={emriNenkategorise}
                type="text"
                placeholder="Lloji i nenkategorise"
                autoFocus
              />
              {warning && (
                <p /*style={{color:"red"}}*/ className={`crudFormWarning ${warning ? 'fade-in' : ''}`}>
                  {warning}
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
                onClick={handleKategoria}
                variant="contained"
                className="crudDropdownButton"
              >
                {selectedKategoria? selectedKategoria.emri : "Zgjedh kategorine"} <FontAwesomeIcon icon={faCaretDown}/>
              </Button>
              <span style={{ color: "red" ,paddingLeft:'2px'}}>*</span>
              {
                kategoriaWarning && (
                    <p  className={`crudFormWarning ${kategoriaWarning ? 'fade-in' : ''}`}>
                        {kategoriaWarning}
                    </p>
                )
              }
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
                        onClick={() => handleMenuItemClick(k)}
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
          <Button
            className="crudFormeSubmitButoni"
            onClick={shtoNenKategorine}
            variant="contained"
          >
            Shto Nen-kategorine <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
